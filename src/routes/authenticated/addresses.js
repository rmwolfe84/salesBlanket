// file path: src/routes/authenticated/addresses.js

import { registerComponent } from '../../core/component-registry.js';

export class AddressesView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="addresses-page">
                <div class="page-header">
                    <h1>Addresses</h1>
                    <button class="add-button">
                        <span class="material-icons">add_location</span>
                        Add Address
                    </button>
                </div>
                <div class="addresses-grid">
                    <!-- Address cards will be populated here -->
                </div>
            </div>
        `;

        this.setupEventListeners();
        this.fetchAddresses();
    }

    setupEventListeners() {
        const addButton = this.querySelector('.add-button');
        addButton.addEventListener('click', () => {
            // Trigger address addition flow
        });
    }

    async fetchAddresses() {
        const user = firebase.auth().currentUser;
        if (!user) return;

        const addressesRef = firebase.firestore().collection('addresses');
        const snapshot = await addressesRef.where('userId', '==', user.uid).get();
        const addresses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        this.renderAddresses(addresses);
    }

    renderAddresses(addresses) {
        const addressesGrid = this.querySelector('.addresses-grid');
        addressesGrid.innerHTML = addresses.length
            ? addresses.map(address => this.createAddressCard(address)).join('')
            : '<p>No addresses available</p>';
    }

    createAddressCard(address) {
        return `
            <div class="address-card">
                <img src="${address.photoURL || '/placeholder.png'}" alt="Address Photo" class="address-photo">
                <div class="address-details">
                    <h2>${address.address}</h2>
                    <p>City: ${address.city}, State: ${address.state}, ZIP: ${address.zip}</p>
                    <p><strong>Salesman:</strong> ${address.salesman?.name || 'Not Assigned'}</p>
                    <p><strong>Setter:</strong> ${address.setter?.name || 'Not Assigned'}</p>
                </div>
                <div class="address-actions">
                    <button class="view-button" data-id="${address.id}">
                        <span class="material-icons">visibility</span>
                        View
                    </button>
                </div>
            </div>
        `;
    }
}

registerComponent('addresses-view', AddressesView);
