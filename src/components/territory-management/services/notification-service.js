// src/components/territory-management/services/notification-service.js

export class NotificationService {
    constructor() {
        this.db = firebase.firestore();
        this.quietHoursEnabled = true;
    }

    // Check if notification should be sent based on user preferences
    async shouldNotify(userId, notificationType) {
        try {
            const userDoc = await this.db.collection('users').doc(userId).get();
            if (!userDoc.exists) return false;

            const userData = userDoc.data();
            const notificationSettings = userData.notifications || {};

            // Check if notification type is enabled
            if (!notificationSettings[notificationType]) return false;

            // Check quiet hours if enabled
            if (this.quietHoursEnabled && notificationSettings.quietHours) {
                const { start, end } = notificationSettings.quietHours;
                if (this.isInQuietHours(start, end)) return false;
            }

            return true;
        } catch (error) {
            console.error('Error checking notification preferences:', error);
            return false;
        }
    }

    // Check if current time is within quiet hours
    isInQuietHours(start, end) {
        const now = new Date();
        const [startHour, startMinute] = start.split(':').map(Number);
        const [endHour, endMinute] = end.split(':').map(Number);
        
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        // Convert times to minutes for easier comparison
        const currentTime = currentHour * 60 + currentMinute;
        const quietStart = startHour * 60 + startMinute;
        const quietEnd = endHour * 60 + endMinute;

        // Handle overnight quiet hours
        if (quietStart > quietEnd) {
            return currentTime >= quietStart || currentTime <= quietEnd;
        }

        return currentTime >= quietStart && currentTime <= quietEnd;
    }

    // Send email notification
    async sendEmailNotification(userId, notification) {
        if (!await this.shouldNotify(userId, 'emailNotifications')) return;

        // This would typically call your email service (e.g., SendGrid, Mailgun)
        // For now, we'll just log it
        console.log('Sending email notification:', {
            userId,
            subject: notification.title,
            message: notification.message
        });
    }

    // Send SMS notification
    async sendSMSNotification(userId, notification) {
        if (!await this.shouldNotify(userId, 'textNotifications')) return;

        // This would typically call your SMS service (e.g., Twilio)
        // For now, we'll just log it
        console.log('Sending SMS notification:', {
            userId,
            message: notification.message
        });
    }

    // Send in-app notification
    async sendInAppNotification(notification) {
        try {
            // Update notification status
            const notificationRef = this.db.collection('notifications')
                .doc(notification.id);

            await notificationRef.update({
                delivered: true,
                deliveredAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Dispatch event for UI update
            const event = new CustomEvent('notification-delivered', {
                detail: notification
            });
            document.dispatchEvent(event);

        } catch (error) {
            console.error('Error sending in-app notification:', error);
            throw error;
        }
    }

    // Send notification through all enabled channels
    async sendNotification(notification) {
        const { recipientId, priority } = notification;

        try {
            // Always send in-app notification
            await this.sendInAppNotification(notification);

            // For high priority notifications, attempt all channels
            if (priority === 'high') {
                await Promise.all([
                    this.sendEmailNotification(recipientId, notification),
                    this.sendSMSNotification(recipientId, notification)
                ]);
                return;
            }

            // For normal priority, check user preferences
            const userDoc = await this.db.collection('users')
                .doc(recipientId)
                .get();

            if (!userDoc.exists) return;

            const userData = userDoc.data();
            const { emailNotifications, textNotifications } = userData.notifications || {};

            // Send through enabled channels
            const notifications = [];
            if (emailNotifications) {
                notifications.push(this.sendEmailNotification(recipientId, notification));
            }
            if (textNotifications) {
                notifications.push(this.sendSMSNotification(recipientId, notification));
            }

            await Promise.all(notifications);

        } catch (error) {
            console.error('Error sending notification:', error);
            throw error;
        }
    }

    // Get notification history for user
    async getNotificationHistory(userId, options = {}) {
        try {
            let query = this.db.collection('notifications')
                .where('recipientId', '==', userId)
                .orderBy('createdAt', 'desc');

            if (options.limit) {
                query = query.limit(options.limit);
            }

            if (options.startAfter) {
                query = query.startAfter(options.startAfter);
            }

            const snapshot = await query.get();

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

        } catch (error) {
            console.error('Error getting notification history:', error);
            throw error;
        }
    }

    // Clear notification history
    async clearNotificationHistory(userId, options = {}) {
        try {
            const batch = this.db.batch();
            let query = this.db.collection('notifications')
                .where('recipientId', '==', userId);

            if (options.olderThan) {
                query = query.where('createdAt', '<', options.olderThan);
            }

            const snapshot = await query.get();

            snapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });

            await batch.commit();

        } catch (error) {
            console.error('Error clearing notification history:', error);
            throw error;
        }
    }
}

// Export singleton instance
export const notificationService = new NotificationService();