// src/routes/public/unauthorized.js
import { registerComponent } from '../../core/component-registry.js';

export class UnauthorizedView extends HTMLElement {
    connectedCallback() {
        console.log('UnauthorizedView connected'); // Debug log
        this.innerHTML = `
            <div class="unauthorized-page">
                <div class="unauthorized-container">
                    <span class="material-icons error-icon">error_outline</span>
                    <h1>Access Denied</h1>
                    <p>You don't have permission to access this page.</p>
                    <button class="return-button" onclick="window.location.hash='daily-view'">
                        Return to Dashboard
                    </button>
                </div>
            </div>
        `;
    }
}

registerComponent('unauthorized-view', UnauthorizedView);