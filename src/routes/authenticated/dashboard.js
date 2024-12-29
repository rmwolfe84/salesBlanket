// src/routes/dashboard.js
export class DashboardView extends HTMLElement {
    constructor() {
        super();
        this.user = null;
    }

    connectedCallback() {
        console.log('DashboardView connected to the DOM.');
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.user = user;
                this.render();
            } else {
                window.location.hash = 'home';
            }
        });
    }

    render() {
        this.innerHTML = `
            <div class="dashboard-container">
                <div class="dashboard-content">
                    <h1>Welcome, ${this.user?.displayName || 'User'}!</h1>
                    
                    <div class="dashboard-stats">
                        <div class="stat-card">
                            <h3>Tasks</h3>
                            <p>0 Active</p>
                        </div>
                        <div class="stat-card">
                            <h3>Contacts</h3>
                            <p>0 Total</p>
                        </div>
                    </div>
                    
                    <div class="recent-activity">
                        <h2>Recent Activity</h2>
                        <p>No recent activity</p>
                    </div>
                </div>
            </div>
        `;
    }
}

if (!customElements.get('dashboard-view')) {
    customElements.define('dashboard-view', DashboardView);
}