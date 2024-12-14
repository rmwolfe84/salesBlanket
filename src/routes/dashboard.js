export class DashboardView extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="dashboard-container">
                <h1>Dashboard</h1>
                <p>Welcome to Sales Blanket Dashboard</p>
            </div>
        `;
    }
}

customElements.define('dashboard-view', DashboardView);