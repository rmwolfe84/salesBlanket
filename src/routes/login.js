export class LoginView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="login-container">
                <h1>Sales Blanket Login</h1>
                <p>Please sign in with your company Google account</p>
                <google-login-button></google-login-button>
            </div>
        `;
    }
}

customElements.define('login-view', LoginView);