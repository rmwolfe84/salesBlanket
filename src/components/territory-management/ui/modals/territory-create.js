// src/components/territory-management/ui/modals/territory-create.js

import { validationManager } from '../../core/validation-manager';
import { boundaryManager } from '../../core/boundary-manager';
import { notificationManager } from '../../core/notification-manager';

export class TerritoryCreateModal extends HTMLElement {
    constructor() {
        super();
        this.boundaries = null;
        this.drawingMode = true; // Start in drawing mode
        this.initialized = false;
    }

    connectedCallback() {
        if (!this.initialized) {
            this.territoryName = this.getAttribute('territory-name');
            this.initialLocation = JSON.parse(this.getAttribute('initial-location'));
            this.render();
            this.setupEventListeners();
            this.initializeMap();
            this.initialized = true;
        }
    }

    render() {
        this.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="territory-modal">
                <div class="modal-header">
                    <h2>${this.drawingMode ? 'Draw Territory Boundaries' : 'Territory Details'}</h2>
                    <button class="close-button">
                        <span class="material-icons">close</span>
                    </button>
                </div>

                <div class="modal-content">
                    ${this.drawingMode ? this.renderDrawingView() : this.renderDetailsForm()}
                </div>

                <div class="modal-footer">
                    ${this.drawingMode ? `
                        <button class="secondary-button" id="cancel-drawing">Cancel</button>
                        <button class="primary-button" id="continue-details" disabled>
                            Continue to Details
                        </button>
                    ` : `
                        <button class="secondary-button" id="back-to-drawing">
                            Back to Drawing
                        </button>
                        <button class="primary-button" id="create-territory">
                            Create Territory
                        </button>
                    `}
                </div>
            </div>
        `;
    }

    renderDrawingView() {
        return `
            <div class="drawing-container">
                <drawing-controls id="territory-drawing"></drawing-controls>
                <div class="map-container">
                    <div id="territory-map" style="width: 100%; height: 400px;"></div>
                </div>
            </div>
        `;
    }

    renderDetailsForm() {
        return `
            <form id="territory-form" class="territory-form">
                <div class="form-grid">
                    <div class="form-group full-width">
                        <label for="name">Territory Name<span class="required">*</span></label>
                        <input type="text" id="name" name="name" required 
                               placeholder="Enter territory name">
                    </div>

                    <div class="form-group">
                        <label for="manager">Territory Manager</label>
                        <select id="manager" name="manager">
                            <option value="">Select Manager</option>
                            <!-- Managers loaded dynamically -->
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="type">Territory Type</label>
                        <select id="type" name="type">
                            <option value="sales">Sales Territory</option>
                            <option value="service">Service Territory</option>
                            <option value="mixed">Mixed Use</option>
                        </select>
                    </div>

                    <div class="form-group full-width">
                        <label for="description">Description</label>
                        <textarea id="description" name="description" rows="3"
                                placeholder="Enter territory description"></textarea>
                    </div>

                    <div class="form-group">
                        <label>Territory Size</label>
                        <div class="territory-stats">
                            <div class="stat">
                                <span class="stat-value" id="territory-area">0</span>
                                <span class="stat-label">Square Miles</span>
                            </div>
                            <div class="stat">
                                <span class="stat-value" id="territory-perimeter">0</span>
                                <span class="stat-label">Miles Perimeter</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Initial Setup</label>
                        <div class="checkbox-group">
                            <label class="checkbox">
                                <input type="checkbox" name="createRegions">
                                Auto-create regions
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" name="assignTeams">
                                Assign teams
                            </label>
                        </div>
                    </div>
                </div>
            </form>
        `;
    }

    async setupEventListeners() {
        // Close modal
        this.querySelector('.close-button')?.addEventListener('click', () => {
            this.closeModal();
        });

        this.querySelector('.modal-backdrop')?.addEventListener('click', () => {
            this.closeModal();
        });

        // Mode switching buttons
        this.querySelector('#continue-details')?.addEventListener('click', () => {
            this.switchToDetails();
        });

        this.querySelector('#back-to-drawing')?.addEventListener('click', () => {
            this.switchToDrawing();
        });

        // Drawing controls events
        const drawingControls = this.querySelector('drawing-controls');
        if (drawingControls) {
            drawingControls.addEventListener('shape-completed', (e) => {
                this.boundaries = e.detail.coordinates;
                this.querySelector('#continue-details').disabled = false;
                this.updateTerritorySizeStats();
            });

            drawingControls.addEventListener('shape-changed', (e) => {
                this.boundaries = e.detail.coordinates;
                this.updateTerritorySizeStats();
            });
        }

        // Form submission
        const form = this.querySelector('#territory-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.createTerritory();
            });
        }

        // Load managers list
        await this.loadManagers();
    }

    async loadManagers() {
        try {
            const snapshot = await firebase.firestore()
                .collection('users')
                .where('role', '==', 'territoryManager')
                .get();

            const select = this.querySelector('#manager');
            if (!select) return;

            snapshot.docs.forEach(doc => {
                const manager = doc.data();
                const option = document.createElement('option');
                option.value = doc.id;
                option.textContent = `${manager.firstName} ${manager.lastName}`;
                select.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading managers:', error);
        }
    }

    updateTerritorySizeStats() {
        if (!this.boundaries) return;

        // Calculate area in square miles
        const area = google.maps.geometry.spherical.computeArea(
            this.boundaries.map(coord => new google.maps.LatLng(coord.lat, coord.lng))
        );
        const areaInSqMiles = (area / 2589988.11).toFixed(2); // Convert from sq meters to sq miles

        // Calculate perimeter in miles
        const perimeter = google.maps.geometry.spherical.computeLength(
            this.boundaries.map(coord => new google.maps.LatLng(coord.lat, coord.lng))
        );
        const perimeterInMiles = (perimeter / 1609.34).toFixed(2); // Convert from meters to miles

        // Update display
        this.querySelector('#territory-area').textContent = areaInSqMiles;
        this.querySelector('#territory-perimeter').textContent = perimeterInMiles;
    }

    switchToDetails() {
        this.drawingMode = false;
        this.render();
        this.setupEventListeners();
        this.updateTerritorySizeStats();
    }

    switchToDrawing() {
        this.drawingMode = true;
        this.render();
        this.setupEventListeners();
    }

    async createTerritory() {
        try {
            const form = this.querySelector('#territory-form');
            const formData = new FormData(form);

            const territoryData = {
                name: formData.get('name'),
                type: formData.get('type'),
                description: formData.get('description'),
                managerId: formData.get('manager'),
                boundaries: this.boundaries,
                createRegions: formData.get('createRegions') === 'on',
                assignTeams: formData.get('assignTeams') === 'on',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                createdBy: firebase.auth().currentUser.uid,
                active: true
            };

            // Validate territory data
            const validation = await validationManager.validate('territory', 'Creation', territoryData);
            if (!validation.valid) {
                alert(validation.errors.join('\n'));
                return;
            }

            // Create territory in Firestore
            const docRef = await firebase.firestore()
                .collection('territories')
                .add(territoryData);

            // Handle initial setup options
            if (territoryData.createRegions) {
                await this.createInitialRegions(docRef.id, territoryData);
            }

            if (territoryData.assignTeams) {
                await this.assignInitialTeams(docRef.id, territoryData);
            }

            // Notify territory manager
            if (territoryData.managerId) {
                await notificationManager.createNotification({
                    recipientId: territoryData.managerId,
                    type: 'TERRITORY_ASSIGNMENT',
                    title: 'New Territory Assignment',
                    message: `You have been assigned as manager of ${territoryData.name}`,
                    context: {
                        territoryId: docRef.id,
                        actionType: 'TERRITORY_ASSIGNMENT'
                    }
                });
            }

            // Dispatch success event
            this.dispatchEvent(new CustomEvent('territory-created', {
                detail: {
                    territoryId: docRef.id,
                    territory: territoryData
                }
            }));

            // Close modal
            this.closeModal();

        } catch (error) {
            console.error('Error creating territory:', error);
            alert('Failed to create territory. Please try again.');
        }
    }

    async createInitialRegions(territoryId, territoryData) {
        // Auto-divide territory into regions based on size
        const area = google.maps.geometry.spherical.computeArea(
            territoryData.boundaries.map(coord => new google.maps.LatLng(coord.lat, coord.lng))
        );
        
        // Determine number of regions based on area
        const numRegions = Math.ceil(area / (10 * 2589988.11)); // 10 square miles per region
        
        // Create regions (implementation would depend on your requirements)
        // This is a placeholder for the actual region creation logic
        for (let i = 0; i < numRegions; i++) {
            await firebase.firestore()
                .collection('territories')
                .doc(territoryId)
                .update({
                    regions: firebase.firestore.FieldValue.arrayUnion({
                        id: crypto.randomUUID(),
                        name: `Region ${i + 1}`,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    })
                });
        }
    }

    async assignInitialTeams(territoryId, territoryData) {
        // Implementation would depend on your team assignment logic
        // This is a placeholder for the actual team assignment logic
        console.log('Assigning teams to territory:', territoryId);
    }

    closeModal() {
        this.dispatchEvent(new CustomEvent('modal-closed'));
        this.remove();
    }
}

customElements.define('territory-create-modal', TerritoryCreateModal);