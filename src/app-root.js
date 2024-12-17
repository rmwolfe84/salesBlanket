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
        
        console.log('Setting up main structure');
        // Just set up the structure and let router handle content
        this.innerHTML = `
            ${this.isAuthenticated ? '<header1-element></header1-element>' : ''}
            <main id="route-content"></main>
        `;
    
        // Trigger the router to handle the current route
        const routeEvent = new Event('hashchange');
        window.dispatchEvent(routeEvent);
    }
}

customElements.define('app-root', AppRoot);

export default AppRoot;