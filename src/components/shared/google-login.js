export class GoogleLoginButton extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `<button class="google-login-btn">Login with Google</button>`;
        this.setupLoginHandler();
    }

    setupLoginHandler() {
        this.querySelector('button').addEventListener('click', async () => {
            try {
                const provider = new firebase.auth.GoogleAuthProvider();
                const result = await firebase.auth().signInWithPopup(provider);
                
                if (result.user) {
                    const userDoc = await firebase.firestore()
                        .collection('users')
                        .doc(result.user.uid)
                        .get();

                    if (!userDoc.exists) {
                        window.location.hash = 'complete-profile';
                    } else {
                        window.location.hash = 'dashboard';
                    }
                }
            } catch (error) {
                console.error('Login failed:', error);
                alert('Login failed. Please make sure to use your company email.');
            }
        });
    }
}

customElements.define('google-login-button', GoogleLoginButton);