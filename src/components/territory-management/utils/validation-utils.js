// src/components/territory-management/utils/validation-utils.js

export function validatePolygon(polygon) {
    if (polygon.length < 3) {
        return { valid: false, error: 'Polygon must have at least 3 points' };
    }

    const firstPoint = polygon[0];
    const lastPoint = polygon[polygon.length - 1];
    if (firstPoint.lat !== lastPoint.lat || firstPoint.lng !== lastPoint.lng) {
        return { valid: false, error: 'Polygon must be closed' };
    }

    return { valid: true };
}

export function validateTerritoryBoundaries(boundaries, existingTerritories) {
    for (const boundary of boundaries) {
        const validation = validatePolygon(boundary);
        if (!validation.valid) {
            return validation;
        }
    }

    for (const territory of existingTerritories) {
        if (hasOverlap(boundaries, territory.boundaries)) {
            return { valid: false, error: 'Territory boundaries overlap with existing territory' };
        }
    }

    return { valid: true };
}

export function hasOverlap(boundaries1, boundaries2) {
    // Check if any point in boundaries1 is inside boundaries2 or vice versa
    // Return true if overlap exists, false otherwise
}