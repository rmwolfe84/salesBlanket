// src/components/territory-management/services/territory-service.js

import { BoundaryUtils } from '../utils/boundary-utils.js';

export class TerritoryService {
    constructor(firestore) {
        this.db = firestore;
        this.territories = this.db.collection('territories');
    }

    // Create new territory
    async createTerritory(territoryData) {
        try {
            // Validate boundaries
            const validation = BoundaryUtils.validateBoundaries(territoryData.boundaries);
            if (!validation.valid) {
                throw new Error(validation.error);
            }

            // Check for overlaps with existing territories
            const existingTerritories = await this.territories.get();
            for (const doc of existingTerritories.docs) {
                const territory = doc.data();
                if (BoundaryUtils.checkOverlap(territoryData.boundaries, territory.boundaries)) {
                    throw new Error('Territory boundaries overlap with existing territory');
                }
            }

            // Create territory document
            const territory = {
                ...territoryData,
                boundaries: BoundaryUtils.simplifyBoundaries(territoryData.boundaries),
                active: true,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                regions: [],
                districts: []
            };

            const docRef = await this.territories.add(territory);
            return { id: docRef.id, ...territory };
        } catch (error) {
            console.error('Error creating territory:', error);
            throw error;
        }
    }

    // Add region to territory
    async addRegion(territoryId, regionData) {
        try {
            const territory = await this.getTerritory(territoryId);

            // Validate region boundaries
            const validation = BoundaryUtils.validateBoundaries(regionData.boundaries);
            if (!validation.valid) {
                throw new Error(validation.error);
            }

            // Check if region is within territory
            if (!BoundaryUtils.containsTerritory(territory.boundaries, regionData.boundaries)) {
                throw new Error('Region must be within territory boundaries');
            }

            // Check for overlap with existing regions
            const overlappingRegion = territory.regions.find(region =>
                BoundaryUtils.checkOverlap(regionData.boundaries, region.boundaries)
            );
            if (overlappingRegion) {
                throw new Error('Region boundaries overlap with existing region');
            }

            // Add region
            const region = {
                id: crypto.randomUUID(),
                ...regionData,
                boundaries: BoundaryUtils.simplifyBoundaries(regionData.boundaries),
                districts: [],
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            await this.territories.doc(territoryId).update({
                regions: firebase.firestore.FieldValue.arrayUnion(region),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            return region;
        } catch (error) {
            console.error('Error adding region:', error);
            throw error;
        }
    }

    // Add district to region
    async addDistrict(territoryId, regionId, districtData) {
        try {
            const territory = await this.getTerritory(territoryId);
            const region = territory.regions.find(r => r.id === regionId);
            
            if (!region) {
                throw new Error('Region not found');
            }

            // Validate district boundaries
            const validation = BoundaryUtils.validateBoundaries(districtData.boundaries);
            if (!validation.valid) {
                throw new Error(validation.error);
            }

            // Check if district is within region
            if (!BoundaryUtils.containsTerritory(region.boundaries, districtData.boundaries)) {
                throw new Error('District must be within region boundaries');
            }

            // Check for overlap with existing districts
            const overlappingDistrict = region.districts.find(district =>
                BoundaryUtils.checkOverlap(districtData.boundaries, district.boundaries)
            );
            if (overlappingDistrict) {
                throw new Error('District boundaries overlap with existing district');
            }

            // Add district
            const district = {
                id: crypto.randomUUID(),
                ...districtData,
                boundaries: BoundaryUtils.simplifyBoundaries(districtData.boundaries),
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            const updatedRegions = territory.regions.map(r =>
                r.id === regionId
                    ? { ...r, districts: [...r.districts, district] }
                    : r
            );

            await this.territories.doc(territoryId).update({
                regions: updatedRegions,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            return district;
        } catch (error) {
            console.error('Error adding district:', error);
            throw error;
        }
    }

    // Assign user to territory/region/district
    async assignUser(territoryId, userId, role, options = {}) {
        try {
            const assignment = {
                userId,
                role,
                level: options.level || 'territory',
                regionId: options.regionId,
                districtId: options.districtId,
                assignedAt: firebase.firestore.FieldValue.serverTimestamp(),
                assignedBy: firebase.auth().currentUser.uid
            };

            await this.territories.doc(territoryId).update({
                assignments: firebase.firestore.FieldValue.arrayUnion(assignment),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            return assignment;
        } catch (error) {
            console.error('Error assigning user:', error);
            throw error;
        }
    }

    // Get territory by ID
    async getTerritory(territoryId) {
        const doc = await this.territories.doc(territoryId).get();
        if (!doc.exists) {
            throw new Error('Territory not found');
        }
        return { id: doc.id, ...doc.data() };
    }

    // Get territories in area
    async getTerritoriesInArea(bounds) {
        const snapshot = await this.territories.get();
        return snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(territory => {
                const territoryBounds = new google.maps.LatLngBounds();
                territory.boundaries.forEach(point => 
                    territoryBounds.extend(new google.maps.LatLng(point.lat, point.lng))
                );
                return bounds.intersects(territoryBounds);
            });
    }

    // Get user's territories
    async getUserTerritories(userId) {
        const snapshot = await this.territories
            .where('assignments', 'array-contains', { userId })
            .get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }
}

// Export singleton instance
export const territoryService = new TerritoryService(firebase.firestore());