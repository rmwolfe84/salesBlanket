// src/components/settings/users/components/usermanagement.js
import '../styles/usermanagement.css';

const DEFAULT_USER_SETTINGS = {
    systemSettings: {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        dateFormat: 'MM/DD/YYYY',
        dataSync: true
    },
    preferences: {
        defaultView: 'dashboard',
        startingPage: 'daily-view',
        timeFormat: '12h',
        showNotifications: true
    },
    notifications: {
        emailNotifications: false,
        textNotifications: false,
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

export class UserManagement extends HTMLElement {
    constructor() {
        super();
        this.users = [];
        this.pendingInvites = [];
        this.initialized = false;
    }

    async connectedCallback() {
        if (this.initialized) return;
        this.initialized = true;

        const user = firebase.auth().currentUser;
        if (!user) return;

        try {
            const userDoc = await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .get();

            if (userDoc.data()?.role !== 'admin') {
                this.innerHTML = `
                    <div class="unauthorized-message">
                        <p>You don't have permission to manage users.</p>
                    </div>
                `;
                return;
            }

            await Promise.all([
                this.loadUsers(),
                this.loadPendingInvites()
            ]);

            this.render();
            this.setupEventListeners();
        } catch (error) {
            console.error('Error in UserManagement:', error);
            this.innerHTML = `
                <div class="error-message">
                    <p>An error occurred while loading user management.</p>
                </div>
            `;
        }
    }

    async loadUsers() {
        try {
            const snapshot = await firebase.firestore()
                .collection('users')
                .get();

            this.users = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error loading users:', error);
        }
    }

    async loadPendingInvites() {
        try {
            const snapshot = await firebase.firestore()
                .collection('userInvites')
                .where('status', '==', 'pending')
                .get();

            this.pendingInvites = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error loading invites:', error);
        }
    }

    render() {
        this.innerHTML = `
            <div class="user-management">
                <div class="section-header">
                    <h2>User Management</h2>
                    <button id="invite-user-btn" class="add-button">
                        <span class="material-icons">person_add</span>
                        Invite User
                    </button>
                </div>

                <!-- Active Users Section -->
                <div class="users-section">
                    <h3>Active Users</h3>
                    <div class="users-table">
                        ${this.renderUsersTable()}
                    </div>
                </div>

                <!-- Pending Invites Section -->
                <div class="pending-invites">
                    <h3>Pending Invites</h3>
                    <div class="invites-list">
                        ${this.renderPendingInvites()}
                    </div>
                </div>

                <!-- Invite Modal -->
                <div id="invite-modal" class="modal" style="display: none;">
                    <div class="modal-card">
                        <div class="modal-header">
                            <h3>Invite New User</h3>
                            <button class="close-button">&times;</button>
                        </div>
                        <form id="invite-form">
                            <div class="modal-content">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label>First Name<span class="required">*</span></label>
                                        <input type="text" name="firstName" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Last Name<span class="required">*</span></label>
                                        <input type="text" name="lastName" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Email<span class="required">*</span></label>
                                    <input type="email" name="email" required>
                                    <span class="field-hint">Company email required</span>
                                </div>
                                <div class="form-group">
                                    <label>Role<span class="required">*</span></label>
                                    <select name="role" required>
                                        <option value="">Select Role</option>
                                        <option value="setter">Setter</option>
                                        <option value="closer">Closer</option>
                                        <option value="manager">Manager</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn-cancel secondary-button">Cancel</button>
                                <button type="submit" class="btn-primary">Send Invite</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }

    renderUsersTable() {
        if (!this.users.length) {
            return '<div class="empty-state">No users found</div>';
        }

        return `
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.users.map(user => `
                        <tr data-user-id="${user.id}">
                            <td>${user.firstName} ${user.lastName}</td>
                            <td>${user.email}</td>
                            <td>${user.role}</td>
                            <td>
                                <span class="status-badge ${user.status || 'active'}">
                                    ${user.status || 'Active'}
                                </span>
                            </td>
                            <td>
                                <button class="icon-button edit-user" title="Edit User">
                                    <span class="material-icons">edit</span>
                                </button>
                                ${user.role !== 'admin' ? `
                                    <button class="icon-button deactivate-user" title="Deactivate User">
                                        <span class="material-icons">block</span>
                                    </button>
                                ` : ''}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    renderPendingInvites() {
        if (!this.pendingInvites.length) {
            return '<div class="empty-state">No pending invites</div>';
        }

        return this.pendingInvites.map(invite => `
            <div class="invite-card" data-id="${invite.id}">
                <div class="invite-info">
                    <span class="name">${invite.firstName} ${invite.lastName}</span>
                    <span class="email">${invite.email}</span>
                    <span class="role">${invite.role}</span>
                    <span class="date">${this.formatDate(invite.createdAt)}</span>
                </div>
                <button class="cancel-invite-btn" data-id="${invite.id}">
                    <span class="material-icons">close</span>
                </button>
            </div>
        `).join('');
    }

    formatDate(timestamp) {
        if (!timestamp) return '';
        const date = timestamp.toDate();
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).format(date);
    }

    setupEventListeners() {
        // Invite modal handlers
        const inviteBtn = this.querySelector('#invite-user-btn');
        const modal = this.querySelector('#invite-modal');
        const closeBtn = this.querySelector('.close-button');
        const cancelBtn = this.querySelector('.btn-cancel');
        const form = this.querySelector('#invite-form');

        if (inviteBtn && modal) {
            inviteBtn.addEventListener('click', () => {
                modal.style.display = 'flex';
            });
        }

        const closeModal = () => {
            if (modal) {
                modal.style.display = 'none';
                form?.reset();
            }
        };

        closeBtn?.addEventListener('click', closeModal);
        cancelBtn?.addEventListener('click', closeModal);

        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Form submission handler
        form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('.btn-primary');
            if (!submitBtn) return;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            try {
                const formData = new FormData(form);
                const userData = {
                    firstName: formData.get('firstName').trim(),
                    lastName: formData.get('lastName').trim(),
                    email: formData.get('email').toLowerCase().trim(),
                    role: formData.get('role')
                };

                await this.createUserInvite(userData);
                closeModal();
                await this.loadPendingInvites();
                this.render();
                this.showMessage('Invite sent successfully', 'success');
            } catch (error) {
                console.error('Error creating invite:', error);
                this.showMessage('Failed to send invite', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Invite';
            }
        });

        // Cancel invite handlers
        this.querySelectorAll('.cancel-invite-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const inviteId = e.currentTarget.dataset.id;
                if (confirm('Are you sure you want to cancel this invite?')) {
                    try {
                        await firebase.firestore()
                            .collection('userInvites')
                            .doc(inviteId)
                            .update({
                                status: 'cancelled',
                                cancelledAt: firebase.firestore.FieldValue.serverTimestamp()
                            });

                        await this.loadPendingInvites();
                        this.render();
                        this.showMessage('Invite cancelled successfully', 'success');
                    } catch (error) {
                        console.error('Error cancelling invite:', error);
                        this.showMessage('Failed to cancel invite', 'error');
                    }
                }
            });
        });

        // User action handlers
        this.querySelectorAll('.edit-user').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = e.currentTarget.closest('tr').dataset.userId;
                const user = this.users.find(u => u.id === userId);
                if (user) {
                    this.showEditUserModal(user);
                }
            });
        });

        this.querySelectorAll('.deactivate-user').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const userId = e.currentTarget.closest('tr').dataset.userId;
                if (confirm('Are you sure you want to deactivate this user?')) {
                    await this.deactivateUser(userId);
                }
            });
        });
    }

    async createUserInvite(userData) {
        try {
            // Create user document with default settings
            await firebase.firestore()
                .collection('users')
                .doc(userData.email)
                .set({
                    ...DEFAULT_USER_SETTINGS,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    role: userData.role,
                    status: 'invited',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });

            // Create invite record
            await firebase.firestore()
                .collection('userInvites')
                .add({
                    ...userData,
                    status: 'pending',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
        } catch (error) {
            console.error('Error creating user invite:', error);
            throw error;
        }
    }

    async deactivateUser(userId) {
        try {
            await firebase.firestore()
                .collection('users')
                .doc(userId)
                .update({
                    status: 'inactive',
                    deactivatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });

            await this.loadUsers();
            this.render();
            this.showMessage('User deactivated successfully', 'success');
        } catch (error) {
            console.error('Error deactivating user:', error);
            this.showMessage('Failed to deactivate user', 'error');
        }
    }

    showMessage(message, type) {
        const messageEl = document.createElement('div');
        messageEl.className = `settings-message ${type}`;
        messageEl.textContent = message;
        this.appendChild(messageEl);
        setTimeout(() => messageEl.remove(), 3000);
    }
}

customElements.define('user-management', UserManagement);