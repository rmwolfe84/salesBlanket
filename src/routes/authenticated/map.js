// src/routes/map.js
import { registerComponent } from '../../core/component-registry.js';
import '../../components/shared/map-component.js';

export class MapView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="map-page">
                <div class="map-controls">
                    <div class="control-panel">
                        <button id="new-address" class="control-btn">
                            <span class="material-icons">add_location</span>
                            New Address
                        </button>
                        <button id="route-planner" class="control-btn">
                            <span class="material-icons">route</span>
                            Plan Route
                        </button>
                        <button id="territory-view" class="control-btn">
                            <span class="material-icons">grid_on</span>
                            Territory
                        </button>
                    </div>
                </div>
                
                <div class="map-container">
                    <map-component id="main-map"></map-component>
                </div>
                
                <div class="address-panel">
                    <!-- Will show selected address details -->
                </div>
            </div>
        `;

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.querySelector('#new-address').addEventListener('click', () => {
            const mapComponent = this.querySelector('#main-map');
            mapComponent.enableAddressCreation();
        });

        this.querySelector('#route-planner').addEventListener('click', () => {
            const mapComponent = this.querySelector('#main-map');
            mapComponent.showRoutePlanner();
        });

        this.querySelector('#territory-view').addEventListener('click', () => {
            const mapComponent = this.querySelector('#main-map');
            mapComponent.toggleTerritoryView();
        });
    }
}

registerComponent('map-view', MapView);