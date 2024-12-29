// src/components/settings/RoleManagement.js
import '../styles/rolemanagement.css';

export class RoleManagement extends HTMLElement {
    constructor() {
        super();
        this.users = [];
        this.currentUserRole = null;
    }

    async connectedCallback() {
        // Check if user has admin rights
        const user = firebase.auth().currentUser;
        if (!user) return;

        const userDoc = await firebase.firestore()
            .collection('users')
            .doc(user.uid)
            .get();

        this.currentUserRole = userDoc.data()?.role;

        if (this.currentUserRole !== 'admin') {
            this.innerHTML = `
                <div class="unauthorized-message">
                    <p>You don't have permission to manage roles.</p>
                </div>
            `;
            return;
        }

        await this.loadUsers();
        this.render();
        this.setupEventListeners();
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

    render() {
        this.innerHTML = `
            <div class="role-management">
                <div class="role-header">
                    <h2>Role Management</h2>
                    <p class="role-description">Manage user roles and permissions.</p>
                </div>

                <div class="users-table">
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Current Role</th>
                                <th>New Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.users.map(user => `
                                <tr data-user-id="${user.id}">
                                    <td>
                                        <div class="user-info">
                                            <span class="user-name">${user.firstName} ${user.lastName}</span>
                                            <span class="user-email">${user.email}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="current-role ${user.role}">${user.role || 'No role'}</span>
                                    </td>
                                    <td>
                                        <select class="role-select" ${user.role === 'admin' ? 'disabled' : ''}>
                                            <option value="">Select Role</option>
                                            <option value="setter" ${user.role === 'setter' ? 'selected' : ''}>Setter</option>
                                            <option value="closer" ${user.role === 'closer' ? 'selected' : ''}>Closer</option>
                                            <option value="manager" ${user.role === 'manager' ? 'selected' : ''}>Manager</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button class="update-role-btn" ${user.role === 'admin' ? 'disabled' : ''}>
                                            Update Role
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        this.querySelectorAll('.update-role-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const row = e.target.closest('tr');
                const userId = row.dataset.userId;
                const newRole = row.querySelector('.role-select').value;

                if (!newRole) {
                    alert('Please select a role');
                    return;
                }

                try {
                    await this.updateUserRole(userId, newRole);
                    await this.loadUsers();
                    this.render();
                } catch (error) {
                    console.error('Error updating role:', error);
                    alert('Failed to update role. Please try again.');
                }
            });
        });
    }

    async updateUserRole(userId, newRole) {
        // Update in Firestore
        await firebase.firestore()
            .collection('users')
            .doc(userId)
            .update({
                role: newRole,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

        // Call cloud function to update custom claims
        const updateRole = firebase.functions().httpsCallable('setUserRole');
        await updateRole({ uid: userId, role: newRole });
    }
}

customElements.define('role-management', RoleManagement);