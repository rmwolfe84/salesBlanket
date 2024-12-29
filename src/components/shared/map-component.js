// src/components/shared/map-component.js
import { registerComponent } from '../../core/component-registry.js';
import './map-component.css';

export class MapComponent extends HTMLElement {
    constructor() {
        super();
        this.map = null;
        this.markers = new Map();
        this.geocoder = null;
        this.drawingManager = null;
        this.territories = new Map();
        this.currentMode = 'view';
        this.infoWindow = null;
        this.bounds = null;
        this.mapInitialized = false;
    }

    connectedCallback() {
        // Create initial layout
        this.innerHTML = `
            <div class="map-container" style="width: 100%; height: 500px;">
                <div id="map" style="width: 100%; height: 100%;"></div>
                <div class="map-controls">
                    <div class="control-panel">
                        <button id="add-address" class="control-btn">
                            <span class="material-icons">add_location</span>
                            Add Address
                        </button>
                        <button id="draw-territory" class="control-btn">
                            <span class="material-icons">draw</span>
                            Draw Territory
                        </button>
                        <button id="optimize-route" class="control-btn">
                            <span class="material-icons">route</span>
                            Optimize Route
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Initialize map
        this.initializeMap();
    }

    async initializeMap() {
        try {
            // Load Google Maps script
            await this.loadGoogleMapsScript();
            
            // Initialize map
            const mapElement = this.querySelector('#map');
            this.map = new google.maps.Map(mapElement, {
                center: { lat: 39.8283, lng: -98.5795 }, // Center of USA
                zoom: 4,
                mapTypeControl: true,
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            // Initialize map components
            this.geocoder = new google.maps.Geocoder();
            this.infoWindow = new google.maps.InfoWindow();
            this.bounds = new google.maps.LatLngBounds();

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

            // Set initialization flag
            this.mapInitialized = true;

            // Setup event listeners
            this.setupEventListeners();

            // Load data
            await Promise.all([
                this.loadSavedAddresses(),
                this.loadTerritories()
            ]);

        } catch (error) {
            console.error('Map initialization error:', error);
        }
    }

    loadGoogleMapsScript() {
        return new Promise((resolve, reject) => {
            if (window.google?.maps) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA8kQcCqXqvKLn1C0pu0RWbr4Kw-gYF6jw&libraries=places,drawing,geometry';
            script.defer = true;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    setupEventListeners() {
        // Only setup listeners if map is initialized
        if (!this.mapInitialized) return;

        const addAddressBtn = this.querySelector('#add-address');
        const drawTerritoryBtn = this.querySelector('#draw-territory');
        const optimizeRouteBtn = this.querySelector('#optimize-route');

        if (addAddressBtn) {
            addAddressBtn.addEventListener('click', () => {
                if (this.mapInitialized) {
                    this.enableAddressCreation();
                }
            });
        }

        if (drawTerritoryBtn) {
            drawTerritoryBtn.addEventListener('click', () => {
                if (this.mapInitialized) {
                    this.toggleTerritoryDrawing();
                }
            });
        }

        if (optimizeRouteBtn) {
            optimizeRouteBtn.addEventListener('click', () => {
                if (this.mapInitialized) {
                    this.optimizeRoute();
                }
            });
        }

        // Map click handler for address creation
        if (this.map) {
            this.map.addListener('click', async (event) => {
                if (this.currentMode === 'add-address') {
                    await this.handleAddressCreation(event.latLng);
                }
            });
        }
    }

    async loadSavedAddresses() {
        if (!this.mapInitialized) return;

        const user = firebase.auth().currentUser;
        if (!user) return;

        try {
            const snapshot = await firebase.firestore()
                .collection('addresses')
                .where('userId', '==', user.uid)
                .get();

            snapshot.forEach(doc => {
                const data = doc.data();
                this.addMarker({
                    id: doc.id,
                    position: {
                        lat: data.latitude,
                        lng: data.longitude
                    },
                    status: data.status,
                    address: data.address,
                    data: data
                });
            });

            if (this.markers.size > 0) {
                this.fitBoundsToMarkers();
            }
        } catch (error) {
            console.error('Error loading addresses:', error);
        }
    }

    enableAddressCreation() {
        if (!this.mapInitialized) return;
        
        this.currentMode = 'add-address';
        this.map.setOptions({ draggableCursor: 'crosshair' });
    }

    optimizeRoute() {
        if (!this.mapInitialized) return;
        
        console.log('Route optimization to be implemented');
    }

    toggleTerritoryDrawing() {
        if (!this.mapInitialized) return;
        
        if (this.currentMode !== 'draw-territory') {
            this.currentMode = 'draw-territory';
            this.drawingManager.setMap(this.map);
            this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
        } else {
            this.currentMode = 'view';
            this.drawingManager.setMap(null);
        }
    }
}

registerComponent('map-component', MapComponent);