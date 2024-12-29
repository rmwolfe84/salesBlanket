// src/components/territory-management/ui/panels/management-panel.js

import '../../styles/panels.css';

export class ManagementPanel extends HTMLElement {
    constructor() {
        super();
        this.territoryId = null;
        this.territoryData = null;
        this.userRole = null;
        this.initialized = false;
    }

    async connectedCallback() {
        if (this.initialized) return;

        this.territoryId = this.getAttribute('territory-id');
        if (!this.territoryId) {
            console.error('Territory ID is required');
            return;
        }

        await this.loadData();
        this.render();
        this.setupEventListeners();
        
        this.initialized = true;
    }

    async loadData() {
        try {
            // Load territory data
            const doc = await firebase.firestore()
                .collection('territories')
                .doc(this.territoryId)
                .get();

            if (!doc.exists) {
                console.error('Territory not found');
                return;
            }

            this.territoryData = { id: doc.id, ...doc.data() };

            // Get user role
            const user = firebase.auth().currentUser;
            if (user) {
                const userDoc = await firebase.firestore()
                    .collection('users')
                    .doc(user.uid)
                    .get();
                
                this.userRole = userDoc.data()?.role;
            }

        } catch (error) {
            console.error('Error loading management data:', error);
        }
    }

    render() {
        this.innerHTML = `
            <div class="management-panel">
                <div class="panel-header">
                    <h3>Territory Management</h3>
                    <p>${this.territoryData?.name || 'Loading...'}</p>
                </div>

                <div class="management-content">
                    <!-- Territory Status -->
                    <div class="status-section">
                        <h4>Status</h4>
                        <div class="status-controls">
                            <div class="status-indicator ${this.territoryData?.active ? 'active' : 'inactive'}">
                                ${this.territoryData?.active ? 'Active' : 'Inactive'}
                            </div>
                            ${this.canManageTerritory() ? `
                                <button class="action-button" id="toggle-status">
                                    ${this.territoryData?.active ? 'Deactivate' : 'Activate'} Territory
                                </button>
                            ` : ''}
                        </div>
                    </div>

                    <!-- Quick Actions -->
                    <div class="actions-section">
                        <h4>Quick Actions</h4>
                        <div class="action-grid">
                            ${this.renderActionButtons()}
                        </div>
                    </div>

                    <!-- Region Management -->
                    ${this.canManageRegions() ? `
                        <div class="regions-section">
                            <h4>Region Management</h4>
                            <div class="regions-summary">
                                <div class="summary-stat">
                                    <span class="stat-value">${this.territoryData?.regions?.length || 0}</span>
                                    <span class="stat-label">Total Regions</span>
                                </div>
                                <button class="action-button primary-action" id="manage-regions">
                                    <span class="material-icons">account_tree</span>
                                    Manage Regions
                                </button>
                            </div>
                        </div>
                    ` : ''}

                    <!-- Territory Settings -->
                    ${this.canManageTerritory() ? `
                        <div class="settings-section">
                            <h4>Territory Settings</h4>
                            <div class="settings-controls">
                                <button class="action-button" id="edit-boundaries">
                                    <span class="material-icons">edit</span>
                                    Edit Boundaries
                                </button>
                                <button class="action-button" id="territory-settings">
                                    <span class="material-icons">settings</span>
                                    Settings
                                </button>
                                <button class="action-button danger" id="delete-territory">
                                    <span class="material-icons">delete</span>
                                    Delete Territory
                                </button>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    renderActionButtons() {
        const actions = [];

        // View Actions - Available to all
        actions.push(`
            <button class="action-button" id="view-assignments">
                <span class="material-icons">people</span>
                View Assignments
            </button>
        `);

        actions.push(`
            <button class="action-button" id="view-analytics">
                <span class="material-icons">analytics</span>
                View Analytics
            </button>
        `);

        // Management Actions - Based on permissions
        if (this.canManageAssignments()) {
            actions.push(`
                <button class="action-button" id="manage-assignments">
                    <span class="material-icons">group_add</span>
                    Manage Assignments
                </button>
            `);
        }

        if (this.canExportData()) {
            actions.push(`
                <button class="action-button" id="export-data">
                    <span class="material-icons">download</span>
                    Export Data
                </button>
            `);
        }

        return actions.join('');
    }

    setupEventListeners() {
        // Status toggle
        this.querySelector('#toggle-status')?.addEventListener('click', () => {
            this.toggleTerritoryStatus();
        });

        // Quick actions
        this.querySelector('#view-assignments')?.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('view-assignments'));
        });

        this.querySelector('#view-analytics')?.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('view-analytics'));
        });

        this.querySelector('#manage-assignments')?.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('manage-assignments'));
        });

        this.querySelector('#export-data')?.addEventListener('click', () => {
            this.exportTerritoryData();
        });

        // Region management
        this.querySelector('#manage-regions')?.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('manage-regions'));
        });

        // Territory settings
        this.querySelector('#edit-boundaries')?.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('edit-boundaries'));
        });

        this.querySelector('#territory-settings')?.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('edit-settings'));
        });

        this.querySelector('#delete-territory')?.addEventListener('click', () => {
            this.confirmDeleteTerritory();
        });
    }

    async toggleTerritoryStatus() {
        if (!this.canManageTerritory()) return;

        const newStatus = !this.territoryData.active;
        const confirmed = await this.confirmStatusChange(newStatus);
        
        if (confirmed) {
            try {
                await firebase.firestore()
                    .collection('territories')
                    .doc(this.territoryId)
                    .update({
                        active: newStatus,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    });

                // Reload data and refresh UI
                await this.loadData();
                this.render();
                this.setupEventListeners();

                // Create notification for territory members
                this.notifyStatusChange(newStatus);

            } catch (error) {
                console.error('Error updating territory status:', error);
                alert('Failed to update territory status');
            }
        }
    }

    async confirmStatusChange(newStatus) {
        const action = newStatus ? 'activate' : 'deactivate';
        return confirm(`Are you sure you want to ${action} this territory? This will affect all users and operations within the territory.`);
    }

    async notifyStatusChange(newStatus) {
        const notificationData = {
            type: 'TERRITORY_STATUS',
            title: 'Territory Status Change',
            message: `Territory "${this.territoryData.name}" has been ${newStatus ? 'activated' : 'deactivated'}`,
            territoryId: this.territoryId,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };

        // Notify all users assigned to this territory
        const assignments = this.territoryData.assignments || [];
        for (const assignment of assignments) {
            await firebase.firestore()
                .collection('notifications')
                .add({
                    ...notificationData,
                    userId: assignment.userId
                });
        }
    }

    async exportTerritoryData() {
        if (!this.canExportData()) return;

        try {
            // Get territory data with related collections
            const territoryData = { ...this.territoryData };
            delete territoryData.id;

            // Get regions
            const regionsSnapshot = await firebase.firestore()
                .collection('territories')
                .doc(this.territoryId)
                .collection('regions')
                .get();

            territoryData.regions = regionsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Create export file
            const exportData = JSON.stringify(territoryData, null, 2);
            const blob = new Blob([exportData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            // Trigger download
            const a = document.createElement('a');
            a.href = url;
            a.download = `territory_${this.territoryId}_${Date.now()}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error exporting territory data:', error);
            alert('Failed to export territory data');
        }
    }

    async confirmDeleteTerritory() {
        if (!this.canManageTerritory()) return;

        const confirmed = await this.showDeleteConfirmation();
        if (confirmed) {
            try {
                await firebase.firestore()
                    .collection('territories')
                    .doc(this.territoryId)
                    .delete();

                this.dispatchEvent(new CustomEvent('territory-deleted'));

            } catch (error) {
                console.error('Error deleting territory:', error);
                alert('Failed to delete territory');
            }
        }
    }

    showDeleteConfirmation() {
        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.className = 'modal show';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Delete Territory</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure you want to delete this territory? This action cannot be undone.</p>
                        <p>All associated data will be permanently deleted, including:</p>
                        <ul>
                            <li>Region assignments</li>
                            <li>User assignments</li>
                            <li>Territory boundaries</li>
                            <li>Historical data</li>
                        </ul>
                        <div class="confirmation-input">
                            <label>Type "DELETE" to confirm:</label>
                            <input type="text" id="delete-confirmation" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="secondary-action">Cancel</button>
                        <button class="primary-action danger" id="confirm-delete" disabled>
                            Delete Territory
                        </button>
                    </div>
                </div>
            `;

            const closeModal = () => {
                modal.remove();
                resolve(false);
            };

            modal.querySelector('.close-modal').addEventListener('click', closeModal);
            modal.querySelector('.secondary-action').addEventListener('click', closeModal);

            const confirmInput = modal.querySelector('#delete-confirmation');
            const confirmButton = modal.querySelector('#confirm-delete');

            confirmInput.addEventListener('input', (e) => {
                confirmButton.disabled = e.target.value !== 'DELETE';
            });

            confirmButton.addEventListener('click', () => {
                modal.remove();
                resolve(true);
            });

            document.body.appendChild(modal);
        });
    }

    // Permission checks
    canManageTerritory() {
        return ['admin', 'territoryManager'].includes(this.userRole);
    }

    canManageRegions() {
        return ['admin', 'territoryManager', 'regionManager'].includes(this.userRole);
    }

    canManageAssignments() {
        return ['admin', 'territoryManager', 'regionManager'].includes(this.userRole);
    }

    canExportData() {
        return ['admin', 'territoryManager'].includes(this.userRole);
    }
}

customElements.define('management-panel', ManagementPanel);