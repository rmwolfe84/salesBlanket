// src/components/territory-management/ui/map/drawing-controls.js

export class DrawingControls extends HTMLElement {
    constructor() {
        super();
        this.map = null;
        this.drawingManager = null;
        this.currentShape = null;
        this.mode = 'view'; // 'view', 'draw', 'edit'
        this.initialized = false;
    }

    async connectedCallback() {
        if (this.initialized) return;
        
        this.render();
        await this.initializeDrawingManager();
        this.setupEventListeners();
        
        this.initialized = true;
    }

    render() {
        this.innerHTML = `
            <div class="drawing-toolbar">
                <button class="tool-btn" id="draw-territory" title="Draw Territory">
                    <span class="material-icons">draw</span>
                </button>
                <button class="tool-btn" id="edit-shape" title="Edit Shape" disabled>
                    <span class="material-icons">edit</span>
                </button>
                <button class="tool-btn" id="delete-shape" title="Delete Shape" disabled>
                    <span class="material-icons">delete</span>
                </button>
                <div class="divider"></div>
                <button class="tool-btn" id="save-territory" title="Save Territory" disabled>
                    <span class="material-icons">save</span>
                </button>
                <button class="tool-btn" id="cancel-drawing" title="Cancel">
                    <span class="material-icons">close</span>
                </button>
            </div>
            <div class="drawing-instructions" style="display: none;">
                <p>Click on the map to start drawing territory boundaries</p>
                <ul>
                    <li>Click to place points</li>
                    <li>Double-click or click first point to complete</li>
                    <li>Press ESC to cancel</li>
                </ul>
            </div>
        `;
    }

    async initializeDrawingManager() {
        // Get map instance from parent
        this.map = this.closest('territory-map')?.map;
        if (!this.map) {
            console.error('Map not found');
            return;
        }

        // Initialize drawing manager
        this.drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: null,
            drawingControl: false,
            polygonOptions: {
                fillColor: '#4CAF50',
                fillOpacity: 0.2,
                strokeColor: '#4CAF50',
                strokeWeight: 2,
                editable: false,
                draggable: false,
                zIndex: 1
            }
        });

        this.drawingManager.setMap(this.map);

        // Setup drawing completion listener
        google.maps.event.addListener(
            this.drawingManager, 
            'polygoncomplete', 
            (polygon) => this.handleDrawingComplete(polygon)
        );
    }

    setupEventListeners() {
        // Drawing tools
        this.querySelector('#draw-territory')?.addEventListener('click', () => {
            this.startDrawing();
        });

        this.querySelector('#edit-shape')?.addEventListener('click', () => {
            this.toggleEditing();
        });

        this.querySelector('#delete-shape')?.addEventListener('click', () => {
            this.deleteCurrentShape();
        });

        this.querySelector('#save-territory')?.addEventListener('click', () => {
            this.saveTerritory();
        });

        this.querySelector('#cancel-drawing')?.addEventListener('click', () => {
            this.cancelDrawing();
        });

        // Listen for ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.cancelDrawing();
            }
        });
    }

    startDrawing() {
        // Clear any existing shape
        if (this.currentShape) {
            this.currentShape.setMap(null);
            this.currentShape = null;
        }

        // Enable drawing mode
        this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
        this.mode = 'draw';

        // Update UI
        this.querySelector('#draw-territory').disabled = true;
        this.querySelector('.drawing-instructions').style.display = 'block';
        
        // Dispatch event
        this.dispatchEvent(new CustomEvent('drawing-started'));
    }

    toggleEditing() {
        if (!this.currentShape) return;

        const isEditing = this.currentShape.getEditable();
        this.currentShape.setEditable(!isEditing);
        this.currentShape.setDraggable(!isEditing);

        // Update button state
        this.querySelector('#edit-shape').classList.toggle('active', !isEditing);
    }

    deleteCurrentShape() {
        if (!this.currentShape) return;

        const confirmed = confirm('Are you sure you want to delete this shape?');
        if (confirmed) {
            this.currentShape.setMap(null);
            this.currentShape = null;
            this.updateToolbarState();
        }
    }

    handleDrawingComplete(polygon) {
        // Store reference to new shape
        this.currentShape = polygon;

        // Stop drawing mode
        this.drawingManager.setDrawingMode(null);
        this.mode = 'edit';

        // Setup shape listeners
        this.setupShapeListeners(polygon);

        // Update UI
        this.updateToolbarState();
        this.querySelector('.drawing-instructions').style.display = 'none';

        // Dispatch event
        this.dispatchEvent(new CustomEvent('shape-completed', {
            detail: {
                coordinates: this.getCoordinates()
            }
        }));
    }

    setupShapeListeners(polygon) {
        // Monitor shape changes
        google.maps.event.addListener(polygon.getPath(), 'set_at', () => {
            this.handleShapeChange();
        });
        
        google.maps.event.addListener(polygon.getPath(), 'insert_at', () => {
            this.handleShapeChange();
        });

        google.maps.event.addListener(polygon.getPath(), 'remove_at', () => {
            this.handleShapeChange();
        });
    }

    handleShapeChange() {
        // Validate shape has at least 3 points
        const coordinates = this.getCoordinates();
        if (coordinates.length < 3) {
            alert('Territory must have at least 3 points');
            return;
        }

        // Dispatch change event
        this.dispatchEvent(new CustomEvent('shape-changed', {
            detail: { coordinates }
        }));
    }

    getCoordinates() {
        if (!this.currentShape) return [];

        return this.currentShape.getPath().getArray().map(latLng => ({
            lat: latLng.lat(),
            lng: latLng.lng()
        }));
    }

    async saveTerritory() {
        const coordinates = this.getCoordinates();
        if (coordinates.length < 3) {
            alert('Territory must have at least 3 points');
            return;
        }

        try {
            // Dispatch save event
            this.dispatchEvent(new CustomEvent('save-territory', {
                detail: { coordinates }
            }));

            // Reset state
            this.mode = 'view';
            this.currentShape = null;
            this.updateToolbarState();

        } catch (error) {
            console.error('Error saving territory:', error);
            alert('Failed to save territory. Please try again.');
        }
    }

    cancelDrawing() {
        // Clear current shape
        if (this.currentShape) {
            this.currentShape.setMap(null);
            this.currentShape = null;
        }

        // Reset state
        this.drawingManager.setDrawingMode(null);
        this.mode = 'view';
        this.updateToolbarState();

        // Hide instructions
        this.querySelector('.drawing-instructions').style.display = 'none';

        // Dispatch event
        this.dispatchEvent(new CustomEvent('drawing-cancelled'));
    }

    updateToolbarState() {
        const hasShape = !!this.currentShape;
        
        this.querySelector('#draw-territory').disabled = this.mode !== 'view';
        this.querySelector('#edit-shape').disabled = !hasShape;
        this.querySelector('#delete-shape').disabled = !hasShape;
        this.querySelector('#save-territory').disabled = !hasShape;
    }
}

customElements.define('drawing-controls', DrawingControls);