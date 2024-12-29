// src/routes/management/inspector.js
import { registerComponent } from '../../core/component-registry.js';

export class InspectorManagementView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="management-page">
                <div class="page-header">
                    <h1>Inspector Management</h1>
                    <div class="header-actions">
                        <button class="add-button">
                            <span class="material-icons">person_add</span>
                            Add Inspector
                        </button>
                    </div>
                </div>
                
                <div class="management-grid">
                    <div class="grid-section assignments">
                        <h2>Current Assignments</h2>
                        <div class="assignment-list">
                            <!-- Inspector assignments -->
                        </div>
                    </div>
                    
                    <div class="grid-section inspectors">
                        <h2>Active Inspectors</h2>
                        <div class="inspector-list">
                            <!-- Active inspectors -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

registerComponent('inspector-management-view', InspectorManagementView);