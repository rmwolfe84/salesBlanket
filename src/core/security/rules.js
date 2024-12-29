// src/core/security/roles.js
export const ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    SETTER: 'setter',
    CLOSER: 'closer'
};

export const ROLE_PERMISSIONS = {
    [ROLES.ADMIN]: {
        canManageRoles: true,
        canManageTerritories: true,
        canViewAllData: true,
        canAssignTasks: true,
        canSetAutomations: true,
        canManageSettings: true,
        canDeleteData: true
    },
    [ROLES.MANAGER]: {
        canViewTeamData: true,
        canAssignTasks: true,
        canViewReports: true,
        canManageTeamTerritories: true,
        canApproveRequests: true
    },
    [ROLES.SETTER]: {
        canCreateLeads: true,
        canUpdateLeads: true,
        canViewAssignedTerritories: true,
        canCreateTasks: true,
        canCompleteAssignedTasks: true
    },
    [ROLES.CLOSER]: {
        canViewLeads: true,
        canUpdateLeads: true,
        canScheduleAppointments: true,
        canCompleteAssignedTasks: true,
        canViewAssignedTerritories: true
    }
};

// Role validation and checking functions
export const isValidRole = (role) => Object.values(ROLES).includes(role);

export const hasPermission = (userRole, permission) => {
    if (!userRole || !ROLE_PERMISSIONS[userRole]) return false;
    return ROLE_PERMISSIONS[userRole][permission] || false;
};

export const getDefaultRoleState = (role) => ({
    [ROLES.ADMIN]: false,
    [ROLES.MANAGER]: false,
    [ROLES.SETTER]: false,
    [ROLES.CLOSER]: false,
    role: role
});