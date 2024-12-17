export class UnauthorizedView extends HTMLElement {
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
                    <google-login-button></google-login-button>
                    <button id="apply-button">Fill Out Job Application</button>
                </div>
            </div>
        `;

        this.querySelector('#apply-button').addEventListener('click', () => {
            alert('Job application feature coming soon!');
        });
    }
}

customElements.define('unauthorized-view', UnauthorizedView);