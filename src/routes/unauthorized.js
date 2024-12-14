export class UnauthorizedView extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="unauthorized-container">
                <div class="access-message">
                    <h2>Unauthorized Access</h2>
                    <h3>You do not have access to this application</h3>
                </div>
                <h1>Welcome to Sales Blanket</h1>
                <p class="login-notice">Please use your company Google account to login</p>
                <div class="button-group">
                    <button id="login-button">Login with Google</button>
                    <button id="apply-button">Fill Out Job Application</button>
                </div>
            </div>
        `;

        this.setupButtons();
    }

    setupButtons() {
        // Google Sign-in
        this.querySelector('#login-button').addEventListener('click', async () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            try {
                await firebase.auth().signInWithPopup(provider);
            } catch (error) {
                console.error('Login failed:', error);
                alert('Login failed. Please make sure to use your company email.');
            }
        });

        // Job Application (placeholder)
        this.querySelector('#apply-button').addEventListener('click', () => {
            alert('Job application feature coming soon!');
        });
    }
}

customElements.define('unauthorized-view', UnauthorizedView);