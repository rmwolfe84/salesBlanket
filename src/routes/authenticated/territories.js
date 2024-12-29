import { registerComponent } from '../../core/component-registry.js';
import '../../components/territory-management/ui/map/territory-map.js';

export class TerritoriesView extends HTMLElement {
    constructor() {
        super();
        this.initialized = false;
        this.currentTerritory = null;
        this.userRole = null;
    }

    async connectedCallback() {
        if (this.initialized) return;

        await this.loadUserRole();
        this.render();
        this.setupEventListeners();

        this.initialized = true;
    }

    async loadUserRole() {
        try {
            const user = firebase.auth().currentUser;
            if (!user) throw new Error('User not authenticated');

            const doc = await firebase.firestore().collection('users').doc(user.uid).get();
            if (!doc.exists) throw new Error('User data not found');

            this.userRole = doc.data().role;
            console.log(`User role: ${this.userRole}`);
        } catch (error) {
            console.error('Error loading user role:', error);
        }
    }

    render() {
        this.innerHTML = `
            <div class="territories-page">
                <div class="page-header">
                    <h1>Territory Management</h1>
                    ${this.userRole === 'admin' ? `
                        <button id="create-territory" class="add-button">
                            <span class="material-icons">add</span>
                            Create Territory
                        </button>
                    ` : ''}
                </div>
                <div class="territories-layout">
                    <div class="map-section">
                        <territory-map id="territory-map"></territory-map>
                    </div>
                    <div class="details-section">
                        ${this.currentTerritory ? this.renderTerritoryDetails() : this.renderEmptyState()}
                    </div>
                </div>
            </div>
        `;
    }

    renderEmptyState() {
        return `
            <div class="empty-state">
                <span class="material-icons">map</span>
                ${this.userRole === 'admin' ?
                    '<p>Create a new territory or select an existing one to manage</p>' :
                    '<p>Select a territory to view details</p>'}
            </div>
        `;
    }

    renderTerritoryDetails() {
        return `
            <div class="territory-details">
                <h2>${this.currentTerritory.name}</h2>
                <p>Details and actions will go here.</p>
            </div>
        `;
    }

    setupEventListeners() {
        const mapComponent = this.querySelector('#territory-map');
        if (!mapComponent) {
            console.error('Territory map component not found');
            return;
        }

        mapComponent.addEventListener('territory-selected', (e) => {
            this.handleTerritorySelection(e.detail.territoryId);
        });

        mapComponent.addEventListener('territory-drawn', (e) => {
            this.handleTerritoryDrawn(e.detail.coordinates);
        });

        this.querySelector('#create-territory')?.addEventListener('click', () => {
            this.showTerritoryNamePrompt();
        });
    }

    async handleTerritorySelection(territoryId) {
        try {
            const doc = await firebase.firestore().collection('territories').doc(territoryId).get();
            if (!doc.exists) throw new Error('Territory not found');

            this.currentTerritory = { id: doc.id, ...doc.data() };
            this.render();
        } catch (error) {
            console.error('Error loading territory:', error);
        }
    }

    async handleTerritoryDrawn(coordinates) {
        if (!coordinates || coordinates.length === 0) {
            console.error('Invalid coordinates received:', coordinates);
            return;
        }

        const territoryData = {
            boundaries: { coordinates },
            createdAt: new Date().toISOString(),
            status: 'new',
            createdBy: firebase.auth().currentUser?.uid || 'unknown',
        };

        this.showCreateTerritoryModal(territoryData);
    }

    showTerritoryNamePrompt() {
        const territoryName = prompt('Enter the name of the new territory:');
        if (territoryName) {
            this.showLocationPrompt(territoryName);
        }
    }
    
    showLocationPrompt(territoryName) {
        const location = prompt('Enter the location (state, zip code, or full address) for the territory:');
        if (location) {
            this.geocodeLocation(location, territoryName);
        }
    }
    
    async geocodeLocation(location, territoryName) {
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=YOUR_API_KEY`);
            const data = await response.json();
    
            if (data.results.length > 0) {
                const { lat, lng } = data.results[0].geometry.location;
                this.showCreateTerritoryModal(territoryName, { lat, lng });
            } else {
                alert('Location not found. Please try again.');
            }
        } catch (error) {
            console.error('Geocoding error:', error);
            alert('An error occurred while geocoding the location. Please try again.');
        }
    }
    
    showCreateTerritoryModal(territoryName, location) {
        const modal = document.createElement('territory-create');
        modal.setAttribute('territory-name', territoryName);
        modal.setAttribute('initial-location', JSON.stringify(location));
        document.body.appendChild(modal);
    }
}

registerComponent('territories-view', TerritoriesView);

