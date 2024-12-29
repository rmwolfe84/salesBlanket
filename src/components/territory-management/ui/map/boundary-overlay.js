// src/components/territory-management/ui/map/boundary-overlay.js

export class BoundaryOverlay extends HTMLElement {
    constructor() {
        super();
        this.map = null;
        this.territories = new Map(); // Map of territoryId -> polygon
        this.selectedTerritory = null;
        this.highlightedTerritory = null;
        this.initialized = false;

        // Default styles
        this.defaultStyle = {
            fillColor: '#4CAF50',
            fillOpacity: 0.2,
            strokeColor: '#4CAF50',
            strokeWeight: 2,
            zIndex: 1
        };

        this.selectedStyle = {
            fillColor: '#2196F3',
            fillOpacity: 0.3,
            strokeColor: '#2196F3',
            strokeWeight: 3,
            zIndex: 2
        };

        this.highlightedStyle = {
            fillColor: '#FFC107',
            fillOpacity: 0.3,
            strokeColor: '#FFC107',
            strokeWeight: 2,
            zIndex: 3
        };
    }

    async connectedCallback() {
        if (this.initialized) return;

        // Get map instance from parent
        this.map = this.closest('territory-map')?.map;
        if (!this.map) {
            console.error('Map not found');
            return;
        }

        await this.loadTerritories();
        this.setupEventListeners();
        
        this.initialized = true;
    }

    async loadTerritories() {
        try {
            const snapshot = await firebase.firestore()
                .collection('territories')
                .get();

            // Clear existing territories
            this.territories.forEach(polygon => polygon.setMap(null));
            this.territories.clear();

            // Add territories to map
            snapshot.docs.forEach(doc => {
                const territory = doc.data();
                this.addTerritory(doc.id, territory);
            });

            // Fit bounds to show all territories
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

    addTerritory(id, territory) {
        if (!territory.boundaries || !Array.isArray(territory.boundaries)) {
            console.error('Invalid territory boundaries:', id);
            return;
        }

        // Create polygon for territory
        const path = territory.boundaries.map(coord => 
            new google.maps.LatLng(coord.lat, coord.lng)
        );

        const polygon = new google.maps.Polygon({
            paths: path,
            ...this.defaultStyle,
            map: this.map
        });

        // Store reference
        this.territories.set(id, polygon);

        // Setup polygon listeners
        this.setupPolygonListeners(id, polygon);

        return polygon;
    }

    setupPolygonListeners(id, polygon) {
        // Click handler
        polygon.addListener('click', () => {
            this.selectTerritory(id);
        });

        // Hover handlers
        polygon.addListener('mouseover', () => {
            if (id !== this.selectedTerritory) {
                this.highlightTerritory(id);
            }
        });

        polygon.addListener('mouseout', () => {
            if (id === this.highlightedTerritory) {
                this.unhighlightTerritory();
            }
        });

        // Right click handler for context menu
        polygon.addListener('rightclick', (e) => {
            this.showContextMenu(id, e);
        });
    }

    selectTerritory(id) {
        // Reset previous selection
        if (this.selectedTerritory) {
            const prevPolygon = this.territories.get(this.selectedTerritory);
            if (prevPolygon) {
                prevPolygon.setOptions(this.defaultStyle);
            }
        }

        // Update selection
        this.selectedTerritory = id;
        const polygon = this.territories.get(id);
        if (polygon) {
            polygon.setOptions(this.selectedStyle);
        }

        // Dispatch selection event
        this.dispatchEvent(new CustomEvent('territory-selected', {
            detail: { territoryId: id }
        }));
    }

    highlightTerritory(id) {
        if (id === this.selectedTerritory) return;

        this.unhighlightTerritory();
        
        const polygon = this.territories.get(id);
        if (polygon) {
            polygon.setOptions(this.highlightedStyle);
            this.highlightedTerritory = id;
        }
    }

    unhighlightTerritory() {
        if (!this.highlightedTerritory) return;

        const polygon = this.territories.get(this.highlightedTerritory);
        if (polygon) {
            polygon.setOptions(
                this.highlightedTerritory === this.selectedTerritory ? 
                this.selectedStyle : 
                this.defaultStyle
            );
        }

        this.highlightedTerritory = null;
    }

    showContextMenu(id, event) {
        // Create context menu
        const menu = document.createElement('div');
        menu.className = 'territory-context-menu';
        menu.style.left = `${event.domEvent.pageX}px`;
        menu.style.top = `${event.domEvent.pageY}px`;

        menu.innerHTML = `
            <div class="menu-item" data-action="edit">
                <span class="material-icons">edit</span>
                Edit Territory
            </div>
            <div class="menu-item" data-action="assignments">
                <span class="material-icons">people</span>
                Manage Assignments
            </div>
            <div class="menu-item" data-action="regions">
                <span class="material-icons">account_tree</span>
                Manage Regions
            </div>
            <div class="menu-separator"></div>
            <div class="menu-item danger" data-action="delete">
                <span class="material-icons">delete</span>
                Delete Territory
            </div>
        `;

        // Setup menu item handlers
        menu.addEventListener('click', (e) => {
            const action = e.target.closest('.menu-item')?.dataset.action;
            if (action) {
                this.handleContextMenuAction(action, id);
            }
            menu.remove();
        });

        // Close menu on outside click
        document.addEventListener('click', () => menu.remove(), { once: true });

        // Add to DOM
        document.body.appendChild(menu);
    }

    handleContextMenuAction(action, territoryId) {
        switch (action) {
            case 'edit':
                this.dispatchEvent(new CustomEvent('edit-territory', {
                    detail: { territoryId }
                }));
                break;

            case 'assignments':
                this.dispatchEvent(new CustomEvent('manage-assignments', {
                    detail: { territoryId }
                }));
                break;

            case 'regions':
                this.dispatchEvent(new CustomEvent('manage-regions', {
                    detail: { territoryId }
                }));
                break;

            case 'delete':
                if (confirm('Are you sure you want to delete this territory?')) {
                    this.dispatchEvent(new CustomEvent('delete-territory', {
                        detail: { territoryId }
                    }));
                }
                break;
        }
    }

    // Public methods
    updateTerritory(id, boundaries) {
        const polygon = this.territories.get(id);
        if (!polygon) return;

        const path = boundaries.map(coord => 
            new google.maps.LatLng(coord.lat, coord.lng)
        );
        polygon.setPath(path);
    }

    deleteTerritory(id) {
        const polygon = this.territories.get(id);
        if (polygon) {
            polygon.setMap(null);
            this.territories.delete(id);

            if (this.selectedTerritory === id) {
                this.selectedTerritory = null;
            }
            if (this.highlightedTerritory === id) {
                this.highlightedTerritory = null;
            }
        }
    }

    getVisibleTerritories() {
        const bounds = this.map.getBounds();
        if (!bounds) return [];

        return Array.from(this.territories.entries())
            .filter(([_, polygon]) => {
                const territoryBounds = new google.maps.LatLngBounds();
                polygon.getPath().forEach(latLng => 
                    territoryBounds.extend(latLng)
                );
                return bounds.intersects(territoryBounds);
            })
            .map(([id]) => id);
    }
}

customElements.define('boundary-overlay', BoundaryOverlay);