// src/routes/management/canvasser.js
import { registerComponent } from '../../core/component-registry.js';

export class CanvasserManagementView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="management-page">
                <div class="page-header">
                    <h1>Canvasser Management</h1>
                    <div class="header-actions">
                        <button class="add-button">
                            <span class="material-icons">person_add</span>
                            Add Canvasser
                        </button>
                    </div>
                </div>
                
                <div class="management-grid">
                    <div class="grid-section territories">
                        <h2>Territories</h2>
                        <div class="territory-list">
                            <!-- Territory assignments -->
                        </div>
                    </div>
                    
                    <div class="grid-section canvassers">
                        <h2>Active Canvassers</h2>
                        <div class="canvasser-list">
                            <!-- Active canvassers -->
                        </div>
                    </div>
                    
                    <div class="grid-section metrics">
                        <h2>Performance Metrics</h2>
                        <div class="metrics-grid">
                            <!-- Performance data -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

registerComponent('canvasser-management-view', CanvasserManagementView);