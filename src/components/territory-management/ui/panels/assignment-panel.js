// src/components/territory-management/ui/panels/assignment-panel.js
import '../../styles/panels.css';

export class AssignmentPanel extends HTMLElement {
    constructor() {
        super();
        this.territoryId = null;
        this.regionId = null;
        this.districtId = null;
        this.assignments = new Map();
        this.availableUsers = [];
        this.currentUser = null;
        this.initialized = false;
    }

    async connectedCallback() {
        if (this.initialized) return;

        // Get entity IDs from attributes
        this.territoryId = this.getAttribute('territory-id');
        this.regionId = this.getAttribute('region-id');
        this.districtId = this.getAttribute('district-id');

        // Set current user
        this.currentUser = firebase.auth().currentUser;
        if (!this.currentUser) return;

        await this.loadData();
        this.render();
        this.setupEventListeners();
        
        this.initialized = true;
    }

    async loadData() {
        try {
            // Load current assignments
            const entityRef = this.getEntityRef();
            const doc = await entityRef.get();
            
            if (!doc.exists) {
                console.error('Entity not found');
                return;
            }

            const data = doc.data();
            this.assignments = new Map(
                (data.assignments || []).map(assignment => [
                    assignment.userId,
                    assignment
                ])
            );

            // Load available users based on roles
            const usersSnapshot = await firebase.firestore()
                .collection('users')
                .where('status', '==', 'active')
                .get();

            this.availableUsers = usersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error loading assignment data:', error);
        }
    }

    getEntityRef() {
        const db = firebase.firestore();
        
        if (this.districtId) {
            return db.collection('territories')
                .doc(this.territoryId)
                .collection('regions')
                .doc(this.regionId)
                .collection('districts')
                .doc(this.districtId);
        }
        
        if (this.regionId) {
            return db.collection('territories')
                .doc(this.territoryId)
                .collection('regions')
                .doc(this.regionId);
        }
        
        return db.collection('territories').doc(this.territoryId);
    }

    getEntityType() {
        if (this.districtId) return 'district';
        if (this.regionId) return 'region';
        return 'territory';
    }

    render() {
        this.innerHTML = `
            <div class="assignment-panel">
                <div class="panel-header">
                    <h3>Manage Assignments</h3>
                    <p>${this.getEntityTypeDisplay()} Assignments</p>
                </div>

                <div class="current-assignments">
                    <h4>Current Assignments</h4>
                    ${this.renderCurrentAssignments()}
                </div>

                <div class="add-assignment">
                    <button class="add-button" id="add-assignment">
                        <span class="material-icons">person_add</span>
                        Add Assignment
                    </button>
                </div>

                <!-- Assignment Modal (hidden by default) -->
                <div id="assignment-modal" class="modal" style="display: none;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>Add Assignment</h3>
                            <button class="close-modal">&times;</button>
                        </div>
                        <form id="assignment-form">
                            <div class="form-group">
                                <label>User</label>
                                <select name="userId" required>
                                    <option value="">Select User</option>
                                    ${this.renderUserOptions()}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Role</label>
                                <select name="role" required>
                                    <option value="">Select Role</option>
                                    ${this.renderRoleOptions()}
                                </select>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="secondary-button cancel-modal">
                                    Cancel
                                </button>
                                <button type="submit" class="primary-button">
                                    Add Assignment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }

    renderCurrentAssignments() {
        if (this.assignments.size === 0) {
            return '<p class="empty-state">No current assignments</p>';
        }

        return `
            <div class="assignments-list">
                ${Array.from(this.assignments.values()).map(assignment => `
                    <div class="assignment-item" data-user-id="${assignment.userId}">
                        <div class="user-info">
                            <span class="user-name">
                                ${this.getUserName(assignment.userId)}
                            </span>
                            <span class="role-badge ${assignment.role}">
                                ${assignment.role}
                            </span>
                        </div>
                        <div class="assignment-actions">
                            <button class="icon-button edit-assignment">
                                <span class="material-icons">edit</span>
                            </button>
                            <button class="icon-button remove-assignment">
                                <span class="material-icons">delete</span>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderUserOptions() {
        return this.availableUsers
            .filter(user => !this.assignments.has(user.id))
            .map(user => `
                <option value="${user.id}">
                    ${user.firstName} ${user.lastName}
                </option>
            `).join('');
    }

    renderRoleOptions() {
        const entityType = this.getEntityType();
        const roles = this.getAvailableRoles(entityType);

        return roles.map(role => `
            <option value="${role.value}">${role.label}</option>
        `).join('');
    }

    getAvailableRoles(entityType) {
        switch (entityType) {
            case 'territory':
                return [
                    { value: 'territoryManager', label: 'Territory Manager' },
                    { value: 'supervisor', label: 'Supervisor' }
                ];
            case 'region':
                return [
                    { value: 'regionManager', label: 'Region Manager' },
                    { value: 'teamLeader', label: 'Team Leader' }
                ];
            case 'district':
                return [
                    { value: 'districtManager', label: 'District Manager' },
                    { value: 'setter', label: 'Setter' },
                    { value: 'closer', label: 'Closer' }
                ];
            default:
                return [];
        }
    }

    getEntityTypeDisplay() {
        const type = this.getEntityType();
        return type.charAt(0).toUpperCase() + type.slice(1);
    }

    getUserName(userId) {
        const user = this.availableUsers.find(u => u.id === userId);
        return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
    }

    setupEventListeners() {
        // Add assignment button
        this.querySelector('#add-assignment')?.addEventListener('click', () => {
            this.showAssignmentModal();
        });

        // Modal close buttons
        this.querySelectorAll('.close-modal, .cancel-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                this.hideAssignmentModal();
            });
        });

        // Assignment form submission
        this.querySelector('#assignment-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleAssignment(new FormData(e.target));
        });

        // Edit and remove buttons for existing assignments
        this.querySelectorAll('.edit-assignment').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = e.target.closest('.assignment-item').dataset.userId;
                this.editAssignment(userId);
            });
        });

        this.querySelectorAll('.remove-assignment').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = e.target.closest('.assignment-item').dataset.userId;
                this.removeAssignment(userId);
            });
        });
    }

    showAssignmentModal() {
        const modal = this.querySelector('#assignment-modal');
        if (modal) {
            modal.style.display = 'block';
        }
    }

    hideAssignmentModal() {
        const modal = this.querySelector('#assignment-modal');
        if (modal) {
            modal.style.display = 'none';
            modal.querySelector('form')?.reset();
        }
    }

    async handleAssignment(formData) {
        try {
            const userId = formData.get('userId');
            const role = formData.get('role');

            if (!userId || !role) {
                alert('Please fill in all required fields');
                return;
            }

            const assignment = {
                userId,
                role,
                assignedBy: this.currentUser.uid,
                assignedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            // Add assignment to entity
            await this.getEntityRef().update({
                assignments: firebase.firestore.FieldValue.arrayUnion(assignment)
            });

            // Create notification for assigned user
            await this.createAssignmentNotification(userId, role);

            // Refresh data and UI
            await this.loadData();
            this.render();
            this.setupEventListeners();
            this.hideAssignmentModal();

        } catch (error) {
            console.error('Error handling assignment:', error);
            alert('Failed to create assignment. Please try again.');
        }
    }

    async createAssignmentNotification(userId, role) {
        try {
            const entityType = this.getEntityType();
            const entityRef = this.getEntityRef();
            const entityDoc = await entityRef.get();
            const entityName = entityDoc.data().name;

            await firebase.firestore().collection('notifications').add({
                userId,
                type: 'ASSIGNMENT',
                title: `New ${entityType} Assignment`,
                message: `You have been assigned as ${role} to ${entityName}`,
                entityType,
                entityId: entityRef.id,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                read: false
            });
        } catch (error) {
            console.error('Error creating notification:', error);
        }
    }

    async editAssignment(userId) {
        const assignment = this.assignments.get(userId);
        if (!assignment) return;

        // Populate and show modal
        const form = this.querySelector('#assignment-form');
        if (form) {
            form.elements.userId.value = userId;
            form.elements.role.value = assignment.role;
            this.showAssignmentModal();
        }
    }

    async removeAssignment(userId) {
        const assignment = this.assignments.get(userId);
        if (!assignment) return;

        if (!confirm('Are you sure you want to remove this assignment?')) {
            return;
        }

        try {
            await this.getEntityRef().update({
                assignments: firebase.firestore.FieldValue.arrayRemove(assignment)
            });

            // Create removal notification
            await this.createAssignmentNotification(userId, 'removed');

            // Refresh data and UI
            await this.loadData();
            this.render();
            this.setupEventListeners();

        } catch (error) {
            console.error('Error removing assignment:', error);
            alert('Failed to remove assignment. Please try again.');
        }
    }
}

customElements.define('assignment-panel', AssignmentPanel);