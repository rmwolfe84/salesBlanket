// src/components/territory-management/core/notification-manager.js

import { roleManager } from './role-manager';

export class NotificationManager {
    constructor() {
        this.db = firebase.firestore();
        this.notificationsRef = this.db.collection('notifications');
        this.handlers = new Map();
        this.unsubscribe = null;
    }

    // Initialize notifications listener for current user
    async initialize() {
        const user = firebase.auth().currentUser;
        if (!user) return;

        // Setup real-time listener for user's notifications
        this.unsubscribe = this.notificationsRef
            .where('recipientId', '==', user.uid)
            .where('read', '==', false)
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        this.handleNewNotification(change.doc.data());
                    }
                });
            });
    }

    // Stop listening for notifications
    cleanup() {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
    }

    // Create a new notification
    async createNotification({
        recipientId,
        recipientRoles,
        type,
        title,
        message,
        context,
        priority = 'normal'
    }) {
        try {
            const notification = {
                recipientId,
                recipientRoles,
                type,
                title,
                message,
                context,
                priority,
                read: false,
                delivered: false,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                actionId: crypto.randomUUID()
            };

            await this.notificationsRef.add(notification);
            return notification;
        } catch (error) {
            console.error('Error creating notification:', error);
            throw error;
        }
    }

    // Create access request notification
    async createAccessRequest(territoryId, requesterId, requestedRole) {
        const requester = await this.db.collection('users').doc(requesterId).get();
        const territory = await this.db.collection('territories').doc(territoryId).get();

        if (!requester.exists || !territory.exists) {
            throw new Error('Invalid request data');
        }

        // Find managers who can approve this role
        const managerRoles = roleManager.getManagerRoles(requestedRole);
        const territoryData = territory.data();
        const assignments = territoryData.assignments || [];

        // Get all users with manager roles in this territory
        const managers = assignments.filter(assignment => 
            managerRoles.includes(assignment.role)
        );

        // Create notifications for each manager
        const notifications = managers.map(manager => 
            this.createNotification({
                recipientId: manager.userId,
                recipientRoles: [manager.role],
                type: 'ACCESS_REQUEST',
                title: 'New Access Request',
                message: `${requester.data().firstName} ${requester.data().lastName} has requested ${requestedRole} access to ${territoryData.name}`,
                context: {
                    territoryId,
                    requesterId,
                    requestedRole,
                    actionType: 'ACCESS_REQUEST'
                },
                priority: 'high'
            })
        );

        await Promise.all(notifications);
    }

    // Create territory change notification
    async createTerritoryChangeNotification(territoryId, changeType, changes, affectedUserIds = []) {
        const territory = await this.db.collection('territories').doc(territoryId).get();
        if (!territory.exists) return;

        const territoryData = territory.data();
        
        // Get all affected users (including managers)
        const assignments = territoryData.assignments || [];
        const notifyUserIds = new Set([
            ...affectedUserIds,
            ...assignments.map(a => a.userId)
        ]);

        // Create notifications for each affected user
        const notifications = Array.from(notifyUserIds).map(userId =>
            this.createNotification({
                recipientId: userId,
                type: 'TERRITORY_CHANGE',
                title: 'Territory Update',
                message: `${territoryData.name} has been updated: ${changeType}`,
                context: {
                    territoryId,
                    changeType,
                    changes,
                    actionType: 'TERRITORY_CHANGE'
                }
            })
        );

        await Promise.all(notifications);
    }

    // Create boundary change notification
    async createBoundaryChangeNotification(territoryId, level, entityId) {
        const territory = await this.db.collection('territories').doc(territoryId).get();
        if (!territory.exists) return;

        const territoryData = territory.data();
        const assignments = territoryData.assignments || [];

        // Create notifications for territory managers
        const notifications = assignments
            .filter(assignment => 
                roleManager.hasPermission(assignment.role, 'canApproveChanges')
            )
            .map(manager =>
                this.createNotification({
                    recipientId: manager.userId,
                    recipientRoles: [manager.role],
                    type: 'BOUNDARY_CHANGE',
                    title: 'Boundary Change Request',
                    message: `A boundary change has been requested for ${level} in ${territoryData.name}`,
                    context: {
                        territoryId,
                        level,
                        entityId,
                        actionType: 'BOUNDARY_CHANGE'
                    },
                    priority: 'high'
                })
            );

        await Promise.all(notifications);
    }

    // Register notification handler
    registerHandler(type, handler) {
        this.handlers.set(type, handler);
    }

    // Handle incoming notification
    handleNewNotification(notification) {
        const handler = this.handlers.get(notification.type);
        if (handler) {
            handler(notification);
        }

        // Dispatch event for UI updates
        const event = new CustomEvent('new-notification', {
            detail: notification
        });
        document.dispatchEvent(event);
    }

    // Mark notification as read
    async markAsRead(notificationId) {
        try {
            await this.notificationsRef.doc(notificationId).update({
                read: true,
                readAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (error) {
            console.error('Error marking notification as read:', error);
            throw error;
        }
    }

    // Get user's unread notifications
    async getUnreadNotifications(userId) {
        try {
            const snapshot = await this.notificationsRef
                .where('recipientId', '==', userId)
                .where('read', '==', false)
                .orderBy('createdAt', 'desc')
                .get();

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error getting unread notifications:', error);
            throw error;
        }
    }
}

// Export singleton instance
export const notificationManager = new NotificationManager();