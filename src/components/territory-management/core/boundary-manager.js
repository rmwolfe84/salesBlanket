// src/components/territory-management/core/boundary-manager.js

import { BoundaryUtils } from '../utils/boundary-utils';

export class BoundaryManager {
    constructor() {
        this.boundaries = new Map();
        this.editingEnabled = false;
        this.selectedBoundary = null;
        this.drawingManager = null;
        this.map = null;
    }

    initialize(map) {
        this.map = map;
        this.setupDrawingManager();
    }

    setupDrawingManager() {
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

        // Handle polygon completion
        google.maps.event.addListener(
            this.drawingManager, 
            'polygoncomplete', 
            this.handlePolygonComplete.bind(this)
        );
    }

    startDrawing() {
        if (!this.editingEnabled) return;
        this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
    }

    stopDrawing() {
        this.drawingManager.setDrawingMode(null);
    }

    enableEditing() {
        this.editingEnabled = true;
        if (this.selectedBoundary) {
            const polygon = this.boundaries.get(this.selectedBoundary);
            if (polygon) polygon.setEditable(true);
        }
    }

    disableEditing() {
        this.editingEnabled = false;
        if (this.selectedBoundary) {
            const polygon = this.boundaries.get(this.selectedBoundary);
            if (polygon) polygon.setEditable(false);
        }
    }

    handlePolygonComplete(polygon) {
        // Get coordinates from polygon
        const coordinates = polygon.getPath().getArray().map(latLng => ({
            lat: latLng.lat(),
            lng: latLng.lng()
        }));

        // Validate boundaries
        const validation = BoundaryUtils.validateBoundaries(coordinates);
        if (!validation.valid) {
            alert(validation.error);
            polygon.setMap(null);
            return;
        }

        // Simplify boundaries
        const simplifiedCoordinates = BoundaryUtils.simplifyBoundaries(coordinates);

        // Create new polygon with simplified coordinates
        const newPolygon = new google.maps.Polygon({
            paths: simplifiedCoordinates,
            fillColor: '#4CAF50',
            fillOpacity: 0.2,
            strokeColor: '#4CAF50',
            strokeWeight: 2,
            editable: false,
            map: this.map
        });

        // Remove temporary drawing polygon
        polygon.setMap(null);

        // Generate unique ID for the boundary
        const boundaryId = crypto.randomUUID();
        this.boundaries.set(boundaryId, newPolygon);

        // Dispatch boundary created event
        const event = new CustomEvent('boundary-created', {
            detail: {
                id: boundaryId,
                coordinates: simplifiedCoordinates
            }
        });
        document.dispatchEvent(event);

        // Reset drawing mode
        this.stopDrawing();
    }

    selectBoundary(boundaryId) {
        // Reset previous selection
        if (this.selectedBoundary) {
            const prevPolygon = this.boundaries.get(this.selectedBoundary);
            if (prevPolygon) {
                prevPolygon.setOptions({
                    fillColor: '#4CAF50',
                    strokeColor: '#4CAF50',
                    editable: false
                });
            }
        }

        // Update selection
        this.selectedBoundary = boundaryId;
        const polygon = this.boundaries.get(boundaryId);
        if (polygon) {
            polygon.setOptions({
                fillColor: '#2196F3',
                strokeColor: '#2196F3',
                editable: this.editingEnabled
            });
        }
    }

    updateBoundary(boundaryId, coordinates) {
        const polygon = this.boundaries.get(boundaryId);
        if (!polygon) return;

        // Validate new boundaries
        const validation = BoundaryUtils.validateBoundaries(coordinates);
        if (!validation.valid) {
            alert(validation.error);
            return;
        }

        // Update polygon path
        const path = coordinates.map(coord => 
            new google.maps.LatLng(coord.lat, coord.lng)
        );
        polygon.setPath(path);
    }

    deleteBoundary(boundaryId) {
        const polygon = this.boundaries.get(boundaryId);
        if (polygon) {
            polygon.setMap(null);
            this.boundaries.delete(boundaryId);
            if (this.selectedBoundary === boundaryId) {
                this.selectedBoundary = null;
            }
        }
    }

    getBoundaryCoordinates(boundaryId) {
        const polygon = this.boundaries.get(boundaryId);
        if (!polygon) return null;

        return polygon.getPath().getArray().map(latLng => ({
            lat: latLng.lat(),
            lng: latLng.lng()
        }));
    }

    clear() {
        this.boundaries.forEach(polygon => polygon.setMap(null));
        this.boundaries.clear();
        this.selectedBoundary = null;
        this.stopDrawing();
    }
}

// Export singleton instance
export const boundaryManager = new BoundaryManager();