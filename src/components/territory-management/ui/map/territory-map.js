// src/components/territory-management/ui/map/territory-map.js

import { registerComponent } from '../../../../core/component-registry.js';

export class TerritoryMap extends HTMLElement {
    constructor() {
        super();
        this.map = null;
        this.drawingManager = null;
        this.territories = new Map(); // Store territory polygons
        this.currentTerritory = null;
        this.initialized = false;
    }

    async connectedCallback() {
        if (this.initialized) return;

        await this.loadGoogleMapsScript();
        this.render();
        await this.initializeMap();
        await this.loadTerritories();
        this.setupEventListeners();
        
        this.initialized = true;
    }

    loadGoogleMapsScript() {
        return new Promise((resolve, reject) => {
            if (window.google?.maps) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=drawing,geometry`;
            script.defer = true;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    render() {
        this.innerHTML = `
            <div class="territory-map-container">
                <div class="map-controls">
                    <div class="control-panel">
                        <button id="draw-territory" class="control-btn" disabled>
                            <span class="material-icons">draw</span>
                            Draw Territory
                        </button>
                        <button id="edit-boundary" class="control-btn" disabled>
                            <span class="material-icons">edit</span>
                            Edit Boundary
                        </button>
                    </div>
                </div>
                <div id="map" style="width: 100%; height: 100%;"></div>
            </div>
        `;
    }

    async initializeMap() {
        const mapElement = this.querySelector('#map');
        if (!mapElement) return;

        // Initialize the map
        this.map = new google.maps.Map(mapElement, {
            center: { lat: 39.8283, lng: -98.5795 }, // Center of USA
            zoom: 4,
            mapTypeControl: true,
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        // Initialize drawing manager
        this.drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: null,
            drawingControl: false,
            polygonOptions: {
                fillColor: '#4CAF50',
                fillOpacity: 0.2,
                strokeColor: '#4CAF50',
                strokeWeight: 2,
                editable: false
            }
        });

        this.drawingManager.setMap(this.map);

        // Enable controls for admin users
        const user = firebase.auth().currentUser;
        if (user) {
            const userDoc = await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .get();

            if (userDoc.exists && userDoc.data().role === 'admin') {
                this.querySelector('#draw-territory').disabled = false;
                this.querySelector('#edit-boundary').disabled = false;
            }
        }
    }

    async loadTerritories() {
        try {
            const snapshot = await firebase.firestore()
                .collection('territories')
                .get();

            snapshot.forEach(doc => {
                const territory = doc.data();
                this.addTerritoryToMap(doc.id, territory);
            });

            // Fit map bounds to show all territories
            if (snapshot.size > 0) {
                const bounds = new google.maps.LatLngBounds();
                this.territories.forEach(polygon => {
                    polygon.getPath().forEach(latLng => bounds.extend(latLng));
                });
                this.map.fitBounds(bounds);
            }
        } catch (error) {
            console.error('Error loading territories:', error);
        }
    }

    addTerritoryToMap(id, territory) {
        if (!territory.boundaries || !territory.boundaries.coordinates) return;

        const path = territory.boundaries.coordinates.map(coord => 
            new google.maps.LatLng(coord.lat, coord.lng)
        );

        const polygon = new google.maps.Polygon({
            paths: path,
            fillColor: '#4CAF50',
            fillOpacity: 0.2,
            strokeColor: '#4CAF50',
            strokeWeight: 2,
            editable: false,
            map: this.map
        });

        // Store reference
        this.territories.set(id, polygon);

        // Add click listener
        polygon.addListener('click', () => {
            this.selectTerritory(id, polygon);
        });
    }

    selectTerritory(id, polygon) {
        // Reset previous selection
        if (this.currentTerritory) {
            this.territories.get(this.currentTerritory).setOptions({
                fillColor: '#4CAF50',
                strokeColor: '#4CAF50'
            });
        }

        // Update selection
        this.currentTerritory = id;
        polygon.setOptions({
            fillColor: '#2196F3',
            strokeColor: '#2196F3'
        });

        // Dispatch selection event
        this.dispatchEvent(new CustomEvent('territory-selected', {
            detail: { territoryId: id },
            bubbles: true
        }));
    }

    setupEventListeners() {
        // Drawing controls
        this.querySelector('#draw-territory')?.addEventListener('click', () => {
            this.startDrawing();
        });

        this.querySelector('#edit-boundary')?.addEventListener('click', () => {
            this.toggleBoundaryEditing();
        });

        // Drawing completion handler
        google.maps.event.addListener(this.drawingManager, 'polygoncomplete', (polygon) => {
            this.handlePolygonComplete(polygon);
        });
    }

    startDrawing() {
        this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
        this.querySelector('#draw-territory').disabled = true;
    }

    toggleBoundaryEditing() {
        if (!this.currentTerritory) return;

        const polygon = this.territories.get(this.currentTerritory);
        const isEditable = !polygon.getEditable();
        
        polygon.setEditable(isEditable);
        this.querySelector('#edit-boundary').classList.toggle('active', isEditable);
    }

    handlePolygonComplete(polygon) {
        // Reset drawing mode
        this.drawingManager.setDrawingMode(null);
        this.querySelector('#draw-territory').disabled = false;

        // Get coordinates from polygon
        const coordinates = polygon.getPath().getArray().map(latLng => ({
            lat: latLng.lat(),
            lng: latLng.lng()
        }));

        // Dispatch event for territory creation
        this.dispatchEvent(new CustomEvent('territory-drawn', {
            detail: { coordinates },
            bubbles: true
        }));

        // Remove temporary polygon
        polygon.setMap(null);
    }

    // Public methods for external control
    enableDrawing() {
        this.startDrawing();
    }

    panToTerritory(territoryId) {
        const polygon = this.territories.get(territoryId);
        if (polygon) {
            const bounds = new google.maps.LatLngBounds();
            polygon.getPath().forEach(latLng => bounds.extend(latLng));
            this.map.fitBounds(bounds);
            this.selectTerritory(territoryId, polygon);
        }
    }
}

registerComponent('territory-map', TerritoryMap);
