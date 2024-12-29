// src/routes/public/login.js
import { registerComponent } from '../../core/component-registry.js';

export class LoginView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="login-page">
                <div class="login-container">
                    <div class="login-card">
                        <div class="login-header">
                            <h1>SalesBlanket</h1>
                            <p class="login-subtitle">Sign in to continue</p>
                        </div>
                        
                        <div class="login-body">
                            <button id="google-signin-btn" class="google-signin-button">
                                <img src="https://www.google.com/favicon.ico" alt="Google" class="google-icon">
                                Sign in with Google
                            </button>
                            <p class="login-note">Please use your company email address</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.setupLoginHandler();
    }

    setupLoginHandler() {
        const signInBtn = this.querySelector('#google-signin-btn');
        if (signInBtn) {
            signInBtn.addEventListener('click', async () => {
                try {
                    const provider = new firebase.auth.GoogleAuthProvider();
                    await firebase.auth().signInWithPopup(provider);
                } catch (error) {
                    console.error("Google Sign-In Error:", error);
                    alert("Failed to log in. Please make sure to use your company email.");
                }
            });
        }
    }
}

registerComponent('login-view', LoginView);