import { registerComponent } from '../../core/component-registry.js';

export class ContactsView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="contacts-page">
                <div class="page-header">
                    <h1>Contacts</h1>
                    <button class="add-button">
                        <span class="material-icons">person_add</span>
                        Add Contact
                    </button>
                </div>
                <div class="contacts-grid">
                    <div class="contacts-table">
                        <!-- Contacts table will be populated here -->
                    </div>
                </div>
            </div>
        `;

        this.setupEventListeners();
        this.fetchContacts();
    }

    setupEventListeners() {
        const addButton = this.querySelector('.add-button');
        addButton.addEventListener('click', () => {
            this.showAddContactModal();
        });
    }

    async fetchContacts() {
        const user = firebase.auth().currentUser;

        if (!user) return;

        const contactsRef = firebase.firestore().collection('contacts');
        const isAdmin = (await user.getIdTokenResult()).claims.admin;

        let query = contactsRef.where('userId', '==', user.uid);
        if (isAdmin) {
            query = contactsRef; // Admins can view all contacts
        }

        const snapshot = await query.get();
        const contacts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        this.renderContacts(contacts);
    }

    renderContacts(contacts) {
        const contactsTable = this.querySelector('.contacts-table');
        contactsTable.innerHTML = contacts.length
            ? `
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${contacts
                            .map(contact => `
                                <tr>
                                    <td>${contact.firstName}</td>
                                    <td>${contact.lastName}</td>
                                    <td>${contact.email}</td>
                                </tr>
                            `)
                            .join('')}
                    </tbody>
                </table>
            `
            : `<p>No contacts available</p>`;
    }

    showAddContactModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Add Contact</h2>
                <form id="add-contact-form">
                    <label for="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" required>
                    
                    <label for="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" required>
                    
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                    
                    <button type="submit">Add</button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.close').addEventListener('click', () => modal.remove());
        modal.querySelector('#add-contact-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            await firebase.firestore().collection('contacts').add({
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                userId: firebase.auth().currentUser.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
            modal.remove();
            this.fetchContacts();
        });
    }
}

registerComponent('contacts-view', ContactsView);
