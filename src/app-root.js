class AppRoot extends HTMLElement {
    constructor() {
        super();
        console.log('Security system starting...');
        this.isAuthenticated = false;
        this.isLoading = true;
    }

    connectedCallback() {
        console.log('Security guard on duty...');
        firebase.auth().onAuthStateChanged(user => {
            console.log('Checking ID...', user ? 'ID found' : 'No ID');
            this.isLoading = false;
            this.isAuthenticated = !!user;
            this.updateView();
        });
    }

    updateView() {
        if (this.isLoading) {
            this.innerHTML = `<div class="loading">Loading...</div>`;
            return;
        }
    
        // All users get the route content area
        this.innerHTML = `
            ${this.isAuthenticated ? '<header1-element></header1-element>' : ''}
            <main id="route-content"></main>
        `;
    }
}

customElements.define('app-root', AppRoot);