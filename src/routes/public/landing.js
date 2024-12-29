// src/routes/public/landing.js
import { registerComponent } from '../../core/component-registry.js';

export class LandingView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="landing-page">
                <div class="hero-section">
                    <div class="hero-content">
                        <h1>SalesBlanket</h1>
                        <p class="hero-subtitle">Smart Territory Management</p>
                        <div class="hero-actions">
                            <button class="login-button" onclick="window.location.hash='login'">
                                <span class="material-icons">login</span>
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>

                <div class="features-section">
                    <h2>Features</h2>
                    <div class="features-grid">
                        <div class="feature-card">
                            <span class="material-icons">map</span>
                            <h3>Territory Management</h3>
                            <p>Efficiently manage and track your territories</p>
                        </div>
                        <div class="feature-card">
                            <span class="material-icons">people</span>
                            <h3>Team Management</h3>
                            <p>Coordinate canvassers and inspectors</p>
                        </div>
                        <div class="feature-card">
                            <span class="material-icons">analytics</span>
                            <h3>Performance Tracking</h3>
                            <p>Track and analyze team performance</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

registerComponent('landing-view', LandingView);