import { registerComponent } from '../../core/component-registry.js';

export class LeadsView extends HTMLElement {
    constructor() {
        super();
        this.map = null;
        this.leadData = null;
    }

    connectedCallback() {
        console.log('LeadsView connected');
        this.render();
        this.loadGoogleMapsScript()
            .then(() => this.loadLeadData())
            .catch(error => console.error('Error initializing leads view:', error));
    }

    render() {
        this.innerHTML = `
            <div class="leads-page">
                <div class="page-header">
                    <h1>Leads Management</h1>
                    <button class="add-button">
                        <span class="material-icons">add_circle</span>
                        New Lead
                    </button>
                </div>
                <div class="leads-content">
                    <div class="leads-list">
                        <!-- Leads will be loaded here -->
                    </div>
                    <div id="map-container" class="map-container">
                        <!-- Map will be initialized here -->
                    </div>
                </div>
            </div>
        `;
    }

    loadGoogleMapsScript() {
        return new Promise((resolve, reject) => {
            if (window.google?.maps) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA8kQcCqXqvKLn1C0pu0RWbr4Kw-gYF6jw&libraries=places,drawing,geometry';
            script.async = true;
            script.defer = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async loadLeadData() {
        try {
            const user = firebase.auth().currentUser;
            if (!user) return;

            const leadsRef = firebase.firestore().collection('leads');
            const snapshot = await leadsRef.where('userId', '==', user.uid).get();
            
            const leads = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            this.renderLeads(leads);
        } catch (error) {
            console.error('Error loading leads:', error);
        }
    }

    renderLeads(leads) {
        const leadsList = this.querySelector('.leads-list');
        if (!leads.length) {
            leadsList.innerHTML = '<p class="no-leads">No leads available</p>';
            return;
        }

        leadsList.innerHTML = leads.map(lead => `
            <div class="lead-card" data-id="${lead.id}">
                <h3>${lead.address || 'Unnamed Lead'}</h3>
                <p>${lead.status || 'New'}</p>
                <div class="lead-actions">
                    <button class="view-lead" data-id="${lead.id}">
                        <span class="material-icons">visibility</span>
                    </button>
                </div>
            </div>
        `).join('');

        // Add event listeners to the lead cards
        this.setupLeadCardListeners();
    }

    setupLeadCardListeners() {
        const viewButtons = this.querySelectorAll('.view-lead');
        viewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const leadId = e.currentTarget.dataset.id;
                window.location.hash = `leads/${leadId}`;
            });
        });
    }
}

registerComponent('leads-view', LeadsView);
