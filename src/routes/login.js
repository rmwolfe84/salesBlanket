class LoginView extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="login-container">
                <h1 class="app-name">Sales Blanket</h1>
                <button id="google-signin" class="button">
                    Sign in with Google
                </button>
            </div>
        `;

        this.setupLoginButton();
    }

    setupLoginButton() {
        const button = this.querySelector('#google-signin');
        button.addEventListener('click', async () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            try {
                await firebase.auth().signInWithPopup(provider);
            } catch (error) {
                console.error('Login failed:', error);
            }
        });
    }
}

customElements.define('login-view', LoginView);