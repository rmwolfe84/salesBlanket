// src/components/territory-management/ui/panels/territory-info.js

import '../../styles/panels.css';

export class TerritoryInfo extends HTMLElement {
    constructor() {
        super();
        this.territoryId = null;
        this.territoryData = null;
        this.statistics = null;
        this.recentActivity = [];
        this.initialized = false;
    }

    async connectedCallback() {
        if (this.initialized) return;

        this.territoryId = this.getAttribute('territory-id');
        if (!this.territoryId) {
            console.error('Territory ID is required');
            return;
        }

        await this.loadData();
        this.render();
        this.setupEventListeners();
        
        this.initialized = true;
    }

    async loadData() {
        try {
            // Load territory data
            const doc = await firebase.firestore()
                .collection('territories')
                .doc(this.territoryId)
                .get();

            if (!doc.exists) {
                console.error('Territory not found');
                return;
            }

            this.territoryData = { id: doc.id, ...doc.data() };

            // Calculate statistics
            await this.calculateStatistics();

            // Load recent activity
            await this.loadRecentActivity();

        } catch (error) {
            console.error('Error loading territory info:', error);
        }
    }

    async calculateStatistics() {
        const { assignments = [], regions = [] } = this.territoryData;

        // Calculate active assignments
        const activeAssignments = assignments.filter(a => !a.endDate);

        // Calculate region and district stats
        let totalDistricts = 0;
        let activeDistricts = 0;

        for (const region of regions) {
            if (region.districts) {
                totalDistricts += region.districts.length;
                activeDistricts += region.districts.filter(d => d.active).length;
            }
        }

        // Calculate area coverage
        const areaCoverage = await this.calculateAreaCoverage();

        this.statistics = {
            totalAssignments: assignments.length,
            activeAssignments: activeAssignments.length,
            totalRegions: regions.length,
            activeRegions: regions.filter(r => r.active).length,
            totalDistricts,
            activeDistricts,
            areaCoverage
        };
    }

    async calculateAreaCoverage() {
        if (!this.territoryData.boundaries?.length) return 0;

        // Create polygon from boundaries
        const polygon = new google.maps.Polygon({
            paths: this.territoryData.boundaries.map(coord => ({
                lat: coord.lat,
                lng: coord.lng
            }))
        });

        // Calculate area in square miles
        const areaInSquareMeters = google.maps.geometry.spherical.computeArea(
            polygon.getPath()
        );

        return Math.round(areaInSquareMeters / 2589988.11); // Convert to square miles
    }

    async loadRecentActivity() {
        try {
            const snapshot = await firebase.firestore()
                .collection('territoryActivity')
                .where('territoryId', '==', this.territoryId)
                .orderBy('timestamp', 'desc')
                .limit(5)
                .get();

            this.recentActivity = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error loading recent activity:', error);
        }
    }

    render() {
        this.innerHTML = `
            <div class="info-panel">
                <div class="panel-header">
                    <h3>${this.territoryData?.name || 'Loading...'}</h3>
                    <span class="status-badge ${this.territoryData?.active ? 'active' : 'inactive'}">
                        ${this.territoryData?.active ? 'Active' : 'Inactive'}
                    </span>
                </div>

                <!-- Territory Overview -->
                <div class="territory-overview">
                    <div class="overview-item">
                        <span class="material-icons">location_on</span>
                        <div class="overview-details">
                            <span class="overview-label">Location</span>
                            <span class="overview-value">
                                ${this.formatLocation()}
                            </span>
                        </div>
                    </div>
                    <div class="overview-item">
                        <span class="material-icons">straighten</span>
                        <div class="overview-details">
                            <span class="overview-label">Area Coverage</span>
                            <span class="overview-value">
                                ${this.statistics?.areaCoverage || 0} sq miles
                            </span>
                        </div>
                    </div>
                    <div class="overview-item">
                        <span class="material-icons">group</span>
                        <div class="overview-details">
                            <span class="overview-label">Active Members</span>
                            <span class="overview-value">
                                ${this.statistics?.activeAssignments || 0} members
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Territory Statistics -->
                <div class="territory-statistics">
                    <h4>Territory Statistics</h4>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-value">${this.statistics?.totalRegions || 0}</span>
                            <span class="stat-label">Total Regions</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${this.statistics?.activeRegions || 0}</span>
                            <span class="stat-label">Active Regions</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${this.statistics?.totalDistricts || 0}</span>
                            <span class="stat-label">Total Districts</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${this.statistics?.activeDistricts || 0}</span>
                            <span class="stat-label">Active Districts</span>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="recent-activity">
                    <h4>Recent Activity</h4>
                    ${this.renderRecentActivity()}
                </div>

                <!-- Performance Metrics -->
                <div class="performance-metrics">
                    <h4>Performance Metrics</h4>
                    ${this.renderPerformanceMetrics()}
                </div>
            </div>
        `;
    }

    formatLocation() {
        if (!this.territoryData?.location) return 'Not specified';
        
        const { city, state, region } = this.territoryData.location;
        const parts = [city, state, region].filter(Boolean);
        return parts.join(', ');
    }

    renderRecentActivity() {
        if (!this.recentActivity.length) {
            return '<p class="empty-state">No recent activity</p>';
        }

        return `
            <div class="activity-list">
                ${this.recentActivity.map(activity => `
                    <div class="activity-item">
                        <span class="material-icons">${this.getActivityIcon(activity.type)}</span>
                        <div class="activity-details">
                            <span class="activity-description">
                                ${this.formatActivityDescription(activity)}
                            </span>
                            <span class="activity-time">
                                ${this.formatTimestamp(activity.timestamp)}
                            </span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    getActivityIcon(type) {
        const icons = {
            ASSIGNMENT: 'person_add',
            STATUS_CHANGE: 'loop',
            BOUNDARY_UPDATE: 'edit_location',
            REGION_ADDED: 'add_business',
            DISTRICT_ADDED: 'grid_on',
            DEFAULT: 'info'
        };
        return icons[type] || icons.DEFAULT;
    }

    formatActivityDescription(activity) {
        const descriptions = {
            ASSIGNMENT: () => `${activity.userName} was assigned as ${activity.role}`,
            STATUS_CHANGE: () => `Territory status changed to ${activity.newStatus}`,
            BOUNDARY_UPDATE: () => 'Territory boundaries were updated',
            REGION_ADDED: () => `New region "${activity.regionName}" was added`,
            DISTRICT_ADDED: () => `New district added to region "${activity.regionName}"`,
            DEFAULT: () => 'Activity recorded'
        };

        return (descriptions[activity.type] || descriptions.DEFAULT)();
    }

    formatTimestamp(timestamp) {
        if (!timestamp) return '';
        
        const date = timestamp.toDate();
        const now = new Date();
        const diff = now - date;
        
        // Less than 24 hours
        if (diff < 86400000) {
            return this.formatTimeAgo(diff);
        }
        
        // Regular date format
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: now.getFullYear() !== date.getFullYear() ? 'numeric' : undefined
        });
    }

    formatTimeAgo(diff) {
        const hours = Math.floor(diff / 3600000);
        if (hours > 0) return `${hours}h ago`;
        
        const minutes = Math.floor(diff / 60000);
        if (minutes > 0) return `${minutes}m ago`;
        
        return 'Just now';
    }

    renderPerformanceMetrics() {
        // This could be expanded with actual metrics calculations
        return `
            <div class="metrics-grid">
                <div class="metric-item">
                    <div class="metric-header">
                        <span class="metric-title">Coverage Rate</span>
                        <span class="metric-value">75%</span>
                    </div>
                    <div class="metric-progress">
                        <div class="progress-bar" style="width: 75%"></div>
                    </div>
                </div>
                
                <div class="metric-item">
                    <div class="metric-header">
                        <span class="metric-title">Activity Level</span>
                        <span class="metric-value">High</span>
                    </div>
                    <div class="metric-progress">
                        <div class="progress-bar" style="width: 90%"></div>
                    </div>
                </div>
                
                <div class="metric-item">
                    <div class="metric-header">
                        <span class="metric-title">Resource Utilization</span>
                        <span class="metric-value">65%</span>
                    </div>
                    <div class="metric-progress">
                        <div class="progress-bar" style="width: 65%"></div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Could add click handlers for interactive elements if needed
    }
}

customElements.define('territory-info', TerritoryInfo);