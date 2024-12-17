export class HomeView extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="home-container">
                <h1>Welcome to Sales Blanket</h1>
                <button id="login-btn">Login</button>
            </div>
        `;

        this.querySelector('#login-btn').addEventListener('click', async () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            try {
                const result = await firebase.auth().signInWithPopup(provider);
                if (result.user) {
                    window.location.hash = 'dashboard';
                }
            } catch (error) {
                console.error('Login failed:', error);
            }
        });
    }
}

customElements.define('home-view', HomeView);