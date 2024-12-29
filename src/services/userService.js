// src/services/userService.js
import { USER_SCHEMA, createNewUserDocument, validateUserDocument } from '../core/schemas/userSchema.js';
import './userService.css';

export class UserService {
    // Keep your existing createUser but use schema validation
    static async createUser(userData) {
        try {
            const userDoc = createNewUserDocument({
                uid: userData.uid,
                email: userData.email
            });

            // Validate the document
            const errors = validateUserDocument(userDoc);
            if (errors.length > 0) {
                throw new Error(`Invalid user data: ${errors.join(', ')}`);
            }

            await firebase.firestore()
                .collection('users')
                .doc(userData.uid)
                .set(userDoc);

            return userDoc;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    // Add new invite functionality
    static async createUserFromInvite(inviteData) {
        try {
            const userDoc = createNewUserDocument({
                uid: inviteData.email, // Temporary ID
                email: inviteData.email
            });

            // Add invite-specific data
            userDoc.basicInfo.firstName = inviteData.firstName;
            userDoc.basicInfo.lastName = inviteData.lastName;
            userDoc.system.role = inviteData.role;

            // Create user document
            await firebase.firestore()
                .collection('users')
                .doc(inviteData.email)
                .set(userDoc);

            // Create invite record
            await firebase.firestore()
                .collection('userInvites')
                .add({
                    email: inviteData.email,
                    role: inviteData.role,
                    status: 'pending',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });

            return { success: true, userId: inviteData.email };
        } catch (error) {
            console.error('Error creating user invite:', error);
            throw error;
        }
    }

    // Keep your existing updateUserSettings method
    static async updateUserSettings(uid, settings) {
        await firebase.firestore()
            .collection('users')
            .doc(uid)
            .update({
                systemSettings: settings.systemSettings,
                preferences: settings.preferences,
                notifications: settings.notifications,
                appearance: settings.appearance,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
    }

    // Keep your existing updateEmployeeData method
    static async updateEmployeeData(uid, employeeData) {
        await firebase.firestore()
            .collection('users')
            .doc(uid)
            .update({
                employeeData,
                completedProfile: true,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
    }

    // Keep your existing backfillExistingUsers method
    static async backfillExistingUsers() {
        const snapshot = await firebase.firestore()
            .collection('users')
            .get();

        const batch = firebase.firestore().batch();

        snapshot.docs.forEach(doc => {
            const userData = doc.data();
            const defaultSettings = {
                systemSettings: {
                    language: 'en',
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    dateFormat: 'MM/DD/YYYY',
                    autoSave: true,
                    dataSync: true
                },
                preferences: {
                    defaultView: 'dashboard',
                    startingPage: 'daily-view',
                    timeFormat: '12h',
                    showNotifications: true
                },
                notifications: {
                    emailNotifications: userData.emailNotifications || false,
                    textNotifications: userData.textNotifications || false,
                    appNotifications: true,
                    quietHours: {
                        start: '22:00',
                        end: '07:00'
                    }
                },
                appearance: {
                    theme: 'light',
                    fontSize: 'medium',
                    layout: 'grid'
                }
            };

            batch.update(doc.ref, defaultSettings);
        });

        await batch.commit();
    }

    // Add additional user management methods
    static async getPendingInvites() {
        try {
            const snapshot = await firebase.firestore()
                .collection('userInvites')
                .where('status', '==', 'pending')
                .get();

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error getting pending invites:', error);
            throw error;
        }
    }

    static async acceptInvite(inviteId, authUser) {
        try {
            const invite = await firebase.firestore()
                .collection('userInvites')
                .doc(inviteId)
                .get();

            if (!invite.exists || invite.data().status !== 'pending') {
                throw new Error('Invalid or expired invite');
            }

            // Update user document with real uid
            await firebase.firestore()
                .collection('users')
                .doc(authUser.uid)
                .set({
                    'system.uid': authUser.uid,
                    'system.status': 'active',
                    lastActive: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });

            // Update invite status
            await invite.ref.update({
                status: 'accepted',
                acceptedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            return { success: true };
        } catch (error) {
            console.error('Error accepting invite:', error);
            throw error;
        }
    }
}