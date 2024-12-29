// src/routes/public/version.js
export class VersionView extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="version-content">
                <h1>Version History</h1>
                ${this.getVersionHistory()}
            </div>
        `;
    }

    getVersionHistory() {
        // We can maintain version history here
        return `
            <div class="version-entry">
                <h2>Version 1.0.1 - December 20, 2024</h2>
                <ul>
                    <li>Fixed authentication flow to direct to daily-view instead of settings page</li>
                    <li>Added daily-view button to navigation menu</li>
                    <li>Corrected routes organization and imports</li>
                    <li>Added profile completion notification instead of forced redirect</li>
                    <li>Implemented proper routing for authenticated/public pages</li>
                </ul>
            </div>
            
            <div class="version-entry">
                <h2>Version 1.0.0 - Initial Release</h2>
                <ul>
                    <li>Basic authentication system</li>
                    <li>User role management</li>
                    <li>Navigation structure</li>
                    <li>Core application framework</li>
                </ul>
            </div>
        `;
    }
}

customElements.define('version-view', VersionView);