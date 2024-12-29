// src/components/territory-management/ui/modals/assignment-modal.js

import '../../styles/modals.css';

export class AssignmentModal extends HTMLElement {
    constructor() {
        super();
        this.territoryId = null;
        this.regionId = null;
        this.districtId = null;
        this.assignmentType = null;
        this.availableUsers = [];
    }

    connectedCallback() {
        this.territoryId = this.getAttribute('territory-id');
        this.regionId = this.getAttribute('region-id');
        this.districtId = this.getAttribute('district-id');
        this.assignmentType = this.getAttribute('assignment-type');

        this.render();
        this.loadAvailableUsers();
    }

    render() {
        this.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Assign ${this.assignmentType}</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="assignment-form">
                        <div class="form-group">
                            <label>User</label>
                            <select name="userId" required>
                                <option value="">Select User</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Role</label>
                            <select name="role" required>
                                <option value="">Select Role</option>
                                ${this.getRoleOptions()}
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-cancel">Cancel</button>
                    <button type="submit" form="assignment-form" class="btn-assign">Assign</button>
                </div>
            </div>
        `;

        this.setupEventListeners();
    }

    getRoleOptions() {
        const roles = ['Territory Manager', 'Regional Manager', 'District Manager'];
        return roles.map(role => `<option value="${role}">${role}</option>`).join('');
    }

    async loadAvailableUsers() {
        // Load available users based on assignment type and entity
        // Update the user select options
    }

    setupEventListeners() {
        this.querySelector('.close-modal').addEventListener('click', () => this.close());
        this.querySelector('.btn-cancel').addEventListener('click', () => this.close());
        this.querySelector('.btn-assign').addEventListener('click', () => this.handleAssignment());
    }

    async handleAssignment() {
        // Get form data and create assignment
        // Close modal on success
    }

    close() {
        this.remove();
    }
}

customElements.define('assignment-modal', AssignmentModal);