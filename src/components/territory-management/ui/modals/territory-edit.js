// src/components/territory-management/ui/modals/territory-edit.js

import '../../styles/panels.css';
import { boundaryManager } from '../../core/boundary-manager';
import { validationManager } from '../../core/validation-manager';

export class TerritoryEdit extends HTMLElement {
    constructor() {
        super();
        this.territoryId = null;
        this.territoryData = null;
        this.mapComponent = null;
        this.drawingEnabled = false;
        this.initialized = false;
    }

    async connectedCallback() {
        if (this.initialized) return;

        this.territoryId = this.getAttribute('territory-id');
        if (!this.territoryId) {
            console.error('Territory ID is required');
            return;
        }

        await this.loadTerritoryData();
        this.render();
        this.setupEventListeners();
        this.initialized = true;
    }

    async loadTerritoryData() {
        try {
            const doc = await firebase.firestore()
                .collection('territories')
                .doc(this.territoryId)
                .get();

            if (!doc.exists) {
                console.error('Territory not found');
                return;
            }

            this.territoryData = { id: doc.id, ...doc.data() };
        } catch (error) {
            console.error('Error loading territory data:', error);
        }
    }

    render() {
        this.innerHTML = `
            <div class="territory-edit-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Edit Territory</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        ${this.renderTabs()}
                        ${this.renderTabContent()}
                    </div>
                    <div class="modal-footer">
                        <button class="secondary-action" id="cancel-edit">Cancel</button>
                        <button class="primary-action" id="save-territory">Save Changes</button>
                    </div>
                </div>
            </div>
        `;
        this.initializeMap();
    }

    renderTabs() {
        return `
            <div class="edit-tabs">
                <button class="tab-button active" data-tab="details">Details</button>
                <button class="tab-button" data-tab="boundaries">Boundaries</button>
                <button class="tab-button" data-tab="settings">Settings</button>
            </div>
        `;
    }

    renderTabContent() {
        return `
            <div class="tab-content">
                ${this.renderDetailsTab()}
                ${this.renderBoundariesTab()}
                ${this.renderSettingsTab()}
            </div>
        `;
    }

    renderDetailsTab() {
        return `
            <div class="tab-pane active" id="details-tab">
                <form id="territory-details-form">
                    <div class="form-group">
                        <label>Territory Name</label>
                        <input type="text" name="name" value="${this.territoryData?.name || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea name="description" rows="3">${this.territoryData?.description || ''}</textarea>
                    </div>
                </form>
            </div>
        `;
    }

    renderBoundariesTab() {
        return `
            <div class="tab-pane" id="boundaries-tab">
                <div id="territory-map" style="height: 400px;"></div>
                <div class="boundary-info">
                    <div class="info-item">
                        <span class="info-label">Area:</span>
                        <span class="info-value" id="territory-area">Calculating...</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Perimeter:</span>
                        <span class="info-value" id="territory-perimeter">Calculating...</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderSettingsTab() {
        return `
            <div class="tab-pane" id="settings-tab">
                <form id="territory-settings-form">
                    <div class="form-group">
                        <label>Status</label>
                        <select name="status" required>
                            <option value="active" ${this.territoryData?.status === 'active' ? 'selected' : ''}>
                                Active
                            </option>
                            <option value="inactive" ${this.territoryData?.status === 'inactive' ? 'selected' : ''}>
                                Inactive
                            </option>
                        </select>
                    </div>
                </form>
            </div>
        `;
    }

    initializeMap() {
        const mapElement = this.querySelector('#territory-map');
        if (!mapElement || !this.territoryData?.boundaries) return;

        this.mapComponent = new google.maps.Map(mapElement, {
            center: this.initialLocation, // Example center
            zoom: 12,
            mapTypeControl: false,
            streetViewControl: false,
        });

        // Initialize boundary manager
        boundaryManager.initialize(this.mapComponent);

        // Add existing boundaries
        if (this.territoryData.boundaries) {
            boundaryManager.addBoundary(this.territoryId, this.territoryData.boundaries);
        }

        this.updateBoundaryInfo();
    }

    updateBoundaryInfo() {
        const boundaries = boundaryManager.getBoundary(this.territoryId);
        if (!boundaries) return;

        const area = google.maps.geometry.spherical.computeArea(boundaries) / 2589988.11; // sq miles
        const perimeter = google.maps.geometry.spherical.computeLength(boundaries) / 1609.34; // miles

        this.querySelector('#territory-area').textContent = `${area.toFixed(2)} sq mi`;
        this.querySelector('#territory-perimeter').textContent = `${perimeter.toFixed(2)} mi`;
    }

    setupEventListeners() {
        this.querySelector('.close-modal').addEventListener('click', () => this.close());
        this.querySelector('#cancel-edit').addEventListener('click', () => this.close());
        this.querySelector('#save-territory').addEventListener('click', () => this.saveChanges());

        this.querySelectorAll('.tab-button').forEach((button) => {
            button.addEventListener('click', () => this.switchTab(button.dataset.tab));
        });
    }

    switchTab(tabId) {
        this.querySelectorAll('.tab-button').forEach((btn) => btn.classList.toggle('active', btn.dataset.tab === tabId));
        this.querySelectorAll('.tab-pane').forEach((pane) => pane.classList.toggle('active', pane.id === `${tabId}-tab`));
    }

    async saveChanges() {
        try {
            const detailsForm = new FormData(this.querySelector('#territory-details-form'));
            const settingsForm = new FormData(this.querySelector('#territory-settings-form'));

            const updatedData = {
                name: detailsForm.get('name'),
                description: detailsForm.get('description'),
                status: settingsForm.get('status'),
            };

            await firebase.firestore()
                .collection('territories')
                .doc(this.territoryId)
                .update(updatedData);

            this.dispatchEvent(new CustomEvent('territory-updated', { detail: { territoryId: this.territoryId } }));
            this.close();
        } catch (error) {
            console.error('Error saving changes:', error);
            alert('Failed to save changes.');
        }
    }

    close() {
        if (this.mapComponent) {
            this.mapComponent = null;
        }
        this.remove();
    }
}

customElements.define('territory-edit', TerritoryEdit);
