// src/components/shared/nav-menu.js
export class NavMenu extends HTMLElement {
    connectedCallback() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // Fetch user data and render the menu
                this.fetchUserData(user.uid).then((userData) => {
                    this.user = userData;
                    console.log('Rendering nav menu. User role:', this.user?.role); // Debug log
                    this.render();
                });
            } else {
                this.innerHTML = ''; // Hide nav when not authenticated
            }
        });
    }

    async fetchUserData(uid) {
        const userDoc = await firebase.firestore().collection('users').doc(uid).get();
        return userDoc.exists ? userDoc.data() : null;
    }

    render() {
        const isPending = this.user?.role === 'pending';
        console.log('Rendering nav menu. User role:', this.user?.role);

        this.innerHTML = `
            <nav class="sub-header">
                <div class="nav-buttons">
                    <div class="nav-group">
                        <button class="nav-button" data-route="dashboard">
                            <span class="material-icons">dashboard</span>
                            Dashboard
                        </button>
                        <div class="management-dropdown">
                            <div class="management-item">
                                Management
                                <div class="sub-management">
                                    <div class="sub-management-item" data-route="canvasser-management">
                                        Canvasser Management
                                    </div>
                                    <div class="sub-management-item" data-route="inspector-management">
                                        Inspector Management
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="nav-button" data-route="daily-view">
                        <span class="material-icons">today</span>
                        Daily View
                    </button>
                    <button class="nav-button" data-route="leads">
                    <span class="material-icons">assignment_ind</span>
                        Leads
                    </button>
                    <button class="nav-button" data-route="contacts">
                        <span class="material-icons">people</span>
                        Contacts
                    </button>
                    <button class="nav-button" data-route="addresses">
                        <span class="material-icons">location_on</span>
                        Addresses
                    </button>
                    <button class="nav-button" data-route="map">
                        <span class="material-icons">map</span>
                        Map
                    </button>
                    <button class="nav-button" data-route="appointments">
                        <span class="material-icons">assignment</span>
                        appointments
                    </button>
                    <button class="nav-button" data-route="tasks">
                        <span class="material-icons">task</span>
                        Tasks
                    </button>
                    <button class="nav-button" data-route="calendar">
                        <span class="material-icons">calendar_today</span>
                        Calendar
                    </button>
                    <button class="nav-button" data-route="territories">
                        <span class="material-icons">map</span>
                        Territories
                    </button>
                </div>
            </nav>
        `;

        console.log('Nav menu rendered successfully'); // Debug log
        this.setupNavigationEvents();
    }

    setupNavigationEvents() {
        this.querySelectorAll('.nav-button').forEach(button => {
            button.addEventListener('click', () => {
                const route = button.dataset.route;
                window.location.hash = route;
            });
        });

        this.querySelectorAll('.sub-management-item').forEach(item => {
            item.addEventListener('click', () => {
                const route = item.dataset.route;
                window.location.hash = route;
            });
        });
    }
}

customElements.define('nav-menu', NavMenu);