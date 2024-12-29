// src/components/territory-management/core/role-manager.js

export class RoleManager {
    constructor() {
        this.roleHierarchy = {
            admin: ['admin'],
            territoryManager: ['admin', 'territoryManager'],
            regionManager: ['admin', 'territoryManager', 'regionManager'],
            districtManager: ['admin', 'territoryManager', 'regionManager', 'districtManager'],
            teamLeader: ['admin', 'territoryManager', 'regionManager', 'districtManager', 'teamLeader'],
            setter: ['admin', 'territoryManager', 'regionManager', 'districtManager', 'teamLeader', 'setter'],
            closer: ['admin', 'territoryManager', 'regionManager', 'districtManager', 'teamLeader', 'closer']
        };

        this.permissions = {
            admin: {
                canManageRoles: true,
                canManageTerritories: true,
                canManageRegions: true,
                canManageDistricts: true,
                canAssignUsers: true,
                canViewAllData: true,
                canEditBoundaries: true,
                canApproveChanges: true
            },
            territoryManager: {
                canManageRegions: true,
                canManageDistricts: true,
                canAssignUsers: true,
                canViewTerritoryData: true,
                canEditBoundaries: true,
                canApproveChanges: true
            },
            regionManager: {
                canManageDistricts: true,
                canAssignTeamLeaders: true,
                canViewRegionData: true,
                canRequestChanges: true
            },
            districtManager: {
                canAssignTeamMembers: true,
                canViewDistrictData: true,
                canRequestChanges: true
            },
            teamLeader: {
                canViewTeamData: true,
                canAssignTasks: true,
                canRequestChanges: true
            },
            setter: {
                canViewAssignedAreas: true,
                canCreateLeads: true,
                canUpdateLeads: true
            },
            closer: {
                canViewAssignedAreas: true,
                canUpdateLeads: true,
                canCloseDeals: true
            }
        };
    }

    // Get all roles that can manage a given role
    getManagerRoles(role) {
        return Object.entries(this.roleHierarchy)
            .filter(([_, managedRoles]) => managedRoles.includes(role))
            .map(([managerRole]) => managerRole);
    }

    // Check if one role can manage another
    canManage(managerRole, subordinateRole) {
        return this.roleHierarchy[managerRole]?.includes(subordinateRole) || false;
    }

    // Get all roles that a given role can manage
    getManagedRoles(role) {
        const hierarchyLevel = this.roleHierarchy[role];
        if (!hierarchyLevel) return [];

        const roleIndex = hierarchyLevel.indexOf(role);
        return hierarchyLevel.slice(roleIndex + 1);
    }

    // Check if user has specific permission
    hasPermission(role, permission) {
        return this.permissions[role]?.[permission] || false;
    }

    // Get all permissions for a role
    getRolePermissions(role) {
        return { ...this.permissions[role] };
    }

    // Check role inheritance for territory/region/district
    async checkRoleInheritance(userId, territoryId, options = {}) {
        try {
            const territory = await firebase.firestore()
                .collection('territories')
                .doc(territoryId)
                .get();

            if (!territory.exists) return false;

            const territoryData = territory.data();
            const assignments = territoryData.assignments || [];

            // Check direct assignments
            const directAssignment = assignments.find(
                assignment => assignment.userId === userId
            );

            if (directAssignment) {
                return this.hasPermission(
                    directAssignment.role, 
                    options.permission || 'canViewAssignedAreas'
                );
            }

            // Check inherited permissions
            if (options.regionId) {
                const region = territoryData.regions?.find(
                    r => r.id === options.regionId
                );
                if (!region) return false;

                const regionAssignment = region.assignments?.find(
                    assignment => assignment.userId === userId
                );
                if (regionAssignment) {
                    return this.hasPermission(
                        regionAssignment.role,
                        options.permission || 'canViewAssignedAreas'
                    );
                }

                // Check district if specified
                if (options.districtId) {
                    const district = region.districts?.find(
                        d => d.id === options.districtId
                    );
                    if (!district) return false;

                    const districtAssignment = district.assignments?.find(
                        assignment => assignment.userId === userId
                    );
                    if (districtAssignment) {
                        return this.hasPermission(
                            districtAssignment.role,
                            options.permission || 'canViewAssignedAreas'
                        );
                    }
                }
            }

            // Check if user is admin
            const userDoc = await firebase.firestore()
                .collection('users')
                .doc(userId)
                .get();

            return userDoc.exists && userDoc.data().role === 'admin';
        } catch (error) {
            console.error('Error checking role inheritance:', error);
            return false;
        }
    }

    // Get effective role for user in territory/region/district
    async getEffectiveRole(userId, territoryId, options = {}) {
        try {
            const territory = await firebase.firestore()
                .collection('territories')
                .doc(territoryId)
                .get();

            if (!territory.exists) return null;

            const territoryData = territory.data();
            const assignments = territoryData.assignments || [];

            // Check territory level
            const territoryAssignment = assignments.find(
                assignment => assignment.userId === userId
            );
            if (territoryAssignment) return territoryAssignment.role;

            // Check region level
            if (options.regionId) {
                const region = territoryData.regions?.find(
                    r => r.id === options.regionId
                );
                if (region) {
                    const regionAssignment = region.assignments?.find(
                        assignment => assignment.userId === userId
                    );
                    if (regionAssignment) return regionAssignment.role;

                    // Check district level
                    if (options.districtId) {
                        const district = region.districts?.find(
                            d => d.id === options.districtId
                        );
                        if (district) {
                            const districtAssignment = district.assignments?.find(
                                assignment => assignment.userId === userId
                            );
                            if (districtAssignment) return districtAssignment.role;
                        }
                    }
                }
            }

            // Check if user is admin
            const userDoc = await firebase.firestore()
                .collection('users')
                .doc(userId)
                .get();

            return userDoc.exists && userDoc.data().role === 'admin' ? 'admin' : null;
        } catch (error) {
            console.error('Error getting effective role:', error);
            return null;
        }
    }
}

// Export singleton instance
export const roleManager = new RoleManager();