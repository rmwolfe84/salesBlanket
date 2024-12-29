// src/components/territory-management/core/validation-manager.js

import { BoundaryUtils } from '../utils/boundary-utils';
import { roleManager } from './role-manager';

export class ValidationManager {
    constructor() {
        this.db = firebase.firestore();
        this.validators = new Map();
        this.setupDefaultValidators();
    }

    setupDefaultValidators() {
        // Territory validators
        this.validators.set('territory', {
            validateCreation: async (data) => {
                const errors = [];
                
                // Check required fields
                if (!data.name?.trim()) {
                    errors.push('Territory name is required');
                }
                if (!data.boundaries || !Array.isArray(data.boundaries)) {
                    errors.push('Valid territory boundaries are required');
                }

                // Validate boundaries
                const boundaryValidation = BoundaryUtils.validateBoundaries(data.boundaries);
                if (!boundaryValidation.valid) {
                    errors.push(boundaryValidation.error);
                }

                // Check for overlaps with existing territories
                const snapshot = await this.db.collection('territories').get();
                for (const doc of snapshot.docs) {
                    const territory = doc.data();
                    if (BoundaryUtils.checkOverlap(data.boundaries, territory.boundaries)) {
                        errors.push(`Territory boundaries overlap with existing territory: ${territory.name}`);
                    }
                }

                return {
                    valid: errors.length === 0,
                    errors
                };
            },

            validateUpdate: async (territoryId, updates) => {
                const errors = [];
                
                const doc = await this.db.collection('territories').doc(territoryId).get();
                if (!doc.exists) {
                    errors.push('Territory not found');
                    return { valid: false, errors };
                }

                // Check boundary updates
                if (updates.boundaries) {
                    const boundaryValidation = BoundaryUtils.validateBoundaries(updates.boundaries);
                    if (!boundaryValidation.valid) {
                        errors.push(boundaryValidation.error);
                    }

                    // Check if new boundaries contain all existing regions
                    const territory = doc.data();
                    territory.regions?.forEach(region => {
                        if (!BoundaryUtils.containsTerritory(updates.boundaries, region.boundaries)) {
                            errors.push(`New boundaries would exclude region: ${region.name}`);
                        }
                    });
                }

                return {
                    valid: errors.length === 0,
                    errors
                };
            }
        });

        // Region validators
        this.validators.set('region', {
            validateCreation: async (territoryId, data) => {
                const errors = [];

                // Check required fields
                if (!data.name?.trim()) {
                    errors.push('Region name is required');
                }
                if (!data.boundaries || !Array.isArray(data.boundaries)) {
                    errors.push('Valid region boundaries are required');
                }

                const territory = await this.db.collection('territories').doc(territoryId).get();
                if (!territory.exists) {
                    errors.push('Territory not found');
                    return { valid: false, errors };
                }

                const territoryData = territory.data();

                // Check if region is within territory
                if (!BoundaryUtils.containsTerritory(territoryData.boundaries, data.boundaries)) {
                    errors.push('Region must be within territory boundaries');
                }

                // Check for overlaps with existing regions
                territoryData.regions?.forEach(region => {
                    if (BoundaryUtils.checkOverlap(data.boundaries, region.boundaries)) {
                        errors.push(`Region boundaries overlap with existing region: ${region.name}`);
                    }
                });

                return {
                    valid: errors.length === 0,
                    errors
                };
            }
        });

        // District validators
        this.validators.set('district', {
            validateCreation: async (territoryId, regionId, data) => {
                const errors = [];

                if (!data.name?.trim()) {
                    errors.push('District name is required');
                }
                if (!data.boundaries || !Array.isArray(data.boundaries)) {
                    errors.push('Valid district boundaries are required');
                }

                const territory = await this.db.collection('territories').doc(territoryId).get();
                if (!territory.exists) {
                    errors.push('Territory not found');
                    return { valid: false, errors };
                }

                const territoryData = territory.data();
                const region = territoryData.regions?.find(r => r.id === regionId);
                
                if (!region) {
                    errors.push('Region not found');
                    return { valid: false, errors };
                }

                // Check if district is within region
                if (!BoundaryUtils.containsTerritory(region.boundaries, data.boundaries)) {
                    errors.push('District must be within region boundaries');
                }

                // Check for overlaps with existing districts
                region.districts?.forEach(district => {
                    if (BoundaryUtils.checkOverlap(data.boundaries, district.boundaries)) {
                        errors.push(`District boundaries overlap with existing district: ${district.name}`);
                    }
                });

                return {
                    valid: errors.length === 0,
                    errors
                };
            }
        });

        // Assignment validators
        this.validators.set('assignment', {
            validateAssignment: async (territoryId, assignment) => {
                const errors = [];

                const { userId, role, level, regionId, districtId } = assignment;

                // Check user exists
                const userDoc = await this.db.collection('users').doc(userId).get();
                if (!userDoc.exists) {
                    errors.push('User not found');
                    return { valid: false, errors };
                }

                // Validate role assignment
                const assignerRole = await roleManager.getEffectiveRole(
                    firebase.auth().currentUser.uid,
                    territoryId,
                    { regionId, districtId }
                );

                if (!roleManager.canManage(assignerRole, role)) {
                    errors.push('You do not have permission to assign this role');
                }

                // Validate assignment level
                const territory = await this.db.collection('territories').doc(territoryId).get();
                if (!territory.exists) {
                    errors.push('Territory not found');
                    return { valid: false, errors };
                }

                const territoryData = territory.data();

                if (level === 'region') {
                    const region = territoryData.regions?.find(r => r.id === regionId);
                    if (!region) {
                        errors.push('Region not found');
                    }
                } else if (level === 'district') {
                    const region = territoryData.regions?.find(r => r.id === regionId);
                    if (!region) {
                        errors.push('Region not found');
                        return { valid: false, errors };
                    }

                    const district = region.districts?.find(d => d.id === districtId);
                    if (!district) {
                        errors.push('District not found');
                    }
                }

                return {
                    valid: errors.length === 0,
                    errors
                };
            }
        });
    }

    // Register custom validator
    registerValidator(type, validator) {
        this.validators.set(type, validator);
    }

    // Generic validation method
    async validate(type, action, ...args) {
        const validator = this.validators.get(type);
        if (!validator) {
            throw new Error(`No validator found for type: ${type}`);
        }

        const validationMethod = validator[`validate${action}`];
        if (!validationMethod) {
            throw new Error(`No validation method found for action: ${action}`);
        }

        return validationMethod(...args);
    }

    // Validate entire territory hierarchy
    async validateHierarchy(territoryId) {
        const errors = [];

        try {
            const territory = await this.db.collection('territories').doc(territoryId).get();
            if (!territory.exists) {
                return { valid: false, errors: ['Territory not found'] };
            }

            const territoryData = territory.data();

            // Validate territory boundaries
            const boundaryValidation = BoundaryUtils.validateBoundaries(territoryData.boundaries);
            if (!boundaryValidation.valid) {
                errors.push(`Territory boundary error: ${boundaryValidation.error}`);
            }

            // Validate regions
            territoryData.regions?.forEach(region => {
                // Check region boundaries
                const regionValidation = BoundaryUtils.validateBoundaries(region.boundaries);
                if (!regionValidation.valid) {
                    errors.push(`Region ${region.name} boundary error: ${regionValidation.error}`);
                }

                // Check if region is within territory
                if (!BoundaryUtils.containsTerritory(territoryData.boundaries, region.boundaries)) {
                    errors.push(`Region ${region.name} is not within territory boundaries`);
                }

                // Validate districts
                region.districts?.forEach(district => {
                    // Check district boundaries
                    const districtValidation = BoundaryUtils.validateBoundaries(district.boundaries);
                    if (!districtValidation.valid) {
                        errors.push(`District ${district.name} boundary error: ${districtValidation.error}`);
                    }

                    // Check if district is within region
                    if (!BoundaryUtils.containsTerritory(region.boundaries, district.boundaries)) {
                        errors.push(`District ${district.name} is not within region ${region.name} boundaries`);
                    }
                });
            });

            return {
                valid: errors.length === 0,
                errors
            };

        } catch (error) {
            console.error('Error validating hierarchy:', error);
            return {
                valid: false,
                errors: ['Internal validation error']
            };
        }
    }
}

// Export singleton instance
export const validationManager = new ValidationManager();