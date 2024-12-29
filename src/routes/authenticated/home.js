// src/routes/home.js
export class HomeView extends HTMLElement {
    constructor() {
        super();
        console.log('HomeView constructor called');
    }

    connectedCallback() {
        console.log("HomeView connected to the DOM");
        // Remove debug element when component loads
        const debug = document.getElementById('debug');
        if (debug) {
            debug.textContent = 'HomeView loaded';
        }

        this.innerHTML = `
            <div class="home-container" style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                padding: 20px;
                background-color: #f5f5f5;
            ">
                <h1 style="
                    color: #4CAF50;
                    margin-bottom: 30px;
                    font-size: 2em;
                ">Welcome to Sales Blanket</h1>
                <button id="google-signin-btn" style="
                    background-color: #4CAF50;
                    color: white;
                    padding: 12px 24px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                ">Sign in with Google</button>
            </div>
        `;

        this.addEventListeners();
    }

    addEventListeners() {
        const signInBtn = this.querySelector('#google-signin-btn');
        if (signInBtn) {
            signInBtn.addEventListener('click', async () => {
                try {
                    const provider = new firebase.auth.GoogleAuthProvider();
                    await firebase.auth().signInWithPopup(provider);
                } catch (error) {
                    console.error("Google Sign-In Error:", error);
                    alert("Failed to log in. Please try again.");
                }
            });
        }
    }
}

if (!customElements.get('home-view')) {
    customElements.define('home-view', HomeView);
    console.log('home-view component registered');
}