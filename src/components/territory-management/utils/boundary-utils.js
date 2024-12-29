// src/components/territory-management/utils/boundary-utils.js

export class BoundaryUtils {
    // Check if two territories overlap
    static checkOverlap(boundary1, boundary2) {
        const poly1 = new google.maps.Polygon({ paths: boundary1 });
        const poly2 = new google.maps.Polygon({ paths: boundary2 });
        
        // Use Google Maps API to check intersection
        return google.maps.geometry.poly.containsLocation(
            poly1.getPath().getAt(0),
            poly2
        );
    }

    // Check if a point is within territory boundaries
    static isPointInTerritory(point, boundaries) {
        const poly = new google.maps.Polygon({ paths: boundaries });
        return google.maps.geometry.poly.containsLocation(
            new google.maps.LatLng(point.lat, point.lng),
            poly
        );
    }

    // Calculate territory area in square kilometers
    static calculateArea(boundaries) {
        const poly = new google.maps.Polygon({ paths: boundaries });
        return google.maps.geometry.spherical.computeArea(poly.getPath()) / 1000000;
    }

    // Check if a territory contains another territory
    static containsTerritory(parentBoundaries, childBoundaries) {
        const parent = new google.maps.Polygon({ paths: parentBoundaries });
        const child = new google.maps.Polygon({ paths: childBoundaries });
        
        // Check if all points of child are within parent
        return child.getPath().getArray().every(point => 
            google.maps.geometry.poly.containsLocation(point, parent)
        );
    }

    // Validate territory boundaries
    static validateBoundaries(boundaries) {
        if (!boundaries || !Array.isArray(boundaries) || boundaries.length < 3) {
            return { valid: false, error: 'Territory must have at least 3 points' };
        }

        // Check for valid coordinates
        const invalidPoint = boundaries.find(point => 
            !point.lat || !point.lng ||
            point.lat < -90 || point.lat > 90 ||
            point.lng < -180 || point.lng > 180
        );

        if (invalidPoint) {
            return { valid: false, error: 'Invalid coordinates found' };
        }

        // Check if polygon is closed
        const firstPoint = boundaries[0];
        const lastPoint = boundaries[boundaries.length - 1];
        if (firstPoint.lat !== lastPoint.lat || firstPoint.lng !== lastPoint.lng) {
            return { valid: false, error: 'Territory boundaries must form a closed polygon' };
        }

        return { valid: true };
    }

    // Simplify territory boundaries to reduce points while maintaining shape
    static simplifyBoundaries(boundaries, tolerance = 0.0001) {
        const simplifiedPoints = [];
        let prevPoint = null;

        boundaries.forEach(point => {
            if (!prevPoint || 
                Math.abs(point.lat - prevPoint.lat) > tolerance ||
                Math.abs(point.lng - prevPoint.lng) > tolerance) {
                simplifiedPoints.push(point);
                prevPoint = point;
            }
        });

        // Ensure polygon remains closed
        if (simplifiedPoints.length > 0 && 
            (simplifiedPoints[0].lat !== simplifiedPoints[simplifiedPoints.length - 1].lat ||
             simplifiedPoints[0].lng !== simplifiedPoints[simplifiedPoints.length - 1].lng)) {
            simplifiedPoints.push(simplifiedPoints[0]);
        }

        return simplifiedPoints;
    }

    // Generate GeoJSON representation of territory
    static toGeoJSON(boundaries) {
        return {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [boundaries.map(point => [point.lng, point.lat])]
            },
            properties: {}
        };
    }

    // Convert GeoJSON to boundary coordinates
    static fromGeoJSON(geoJSON) {
        if (geoJSON.geometry?.type !== 'Polygon') {
            throw new Error('Invalid GeoJSON: must be Polygon type');
        }

        return geoJSON.geometry.coordinates[0].map(coord => ({
            lat: coord[1],
            lng: coord[0]
        }));
    }
}