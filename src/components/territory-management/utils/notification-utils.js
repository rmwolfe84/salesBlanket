// src/components/territory-management/utils/notification-utils.js

export function deduplicate(notifications) {
    const deduplicatedNotifications = [];
    const groupedNotifications = groupBy(notifications, 'context.actionId');

    for (const [actionId, group] of Object.entries(groupedNotifications)) {
        const combinedRoles = new Set();
        const territoryIds = new Set();
        const regionIds = new Set();
        const districtIds = new Set();

        group.forEach(notification => {
            notification.recipientRoles.roles.forEach(role => combinedRoles.add(role));
            if (notification.recipientRoles.territoryId) territoryIds.add(notification.recipientRoles.territoryId);
            if (notification.recipientRoles.regionId) regionIds.add(notification.recipientRoles.regionId);
            if (notification.recipientRoles.districtId) districtIds.add(notification.recipientRoles.districtId);
        });

        deduplicatedNotifications.push({
            ...group[0],
            recipientRoles: {
                roles: Array.from(combinedRoles),
                territoryIds: Array.from(territoryIds),
                regionIds: Array.from(regionIds),
                districtIds: Array.from(districtIds)
            }
        });
    }

    return deduplicatedNotifications;
}

function groupBy(array, key) {
    return array.reduce((result, item) => {
        const value = getNestedProperty(item, key);
        if (value) {
            (result[value] || (result[value] = [])).push(item);
        }
        return result;
    }, {});
}

function getNestedProperty(obj, key) {
    return key.split('.').reduce((o, x) => (o && o[x]), obj);
}