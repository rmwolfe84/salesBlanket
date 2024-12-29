class AppRoot extends HTMLElement {
    constructor() {
        super();
        this.initialized = false;
    }

    connectedCallback() {
        if (!this.initialized) {
            this.initialized = true;
            this.checkAuthState();
        }
    }

    checkAuthState() {
        firebase.auth().onAuthStateChanged(async (user) => {
            const currentRoute = window.location.hash.slice(1) || 'landing';
            console.log('Current route:', currentRoute);

            const publicRoutes = ['landing', 'login', '404', 'unauthorized'];
            const protectedRoutes = ['dashboard', 'daily-view', 'contacts', 'addresses', 
                                   'map', 'appointments', 'tasks', 'calendar', 'settings', 'territories'];

            if (!user) {
                console.log("No user signed in");
                // If trying to access protected route while logged out, redirect to landing
                if (!publicRoutes.includes(currentRoute)) {
                    window.location.hash = 'landing';
                }
                return;
            }

            console.log("User signed in:", user.uid);

            try {
                const userRef = firebase.firestore().collection('users').doc(user.uid);
                const doc = await userRef.get();

                if (!doc.exists) {
                    // New user - create their document
                    await userRef.set({
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName || '',
                        photoURL: user.photoURL || '',
                        role: 'canvasser',
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        firstName: '',
                        lastName: '',
                        mobilePhone: '',
                        textNotifications: false,
                        status: 'active',
                        swagPoints: 0,
                        lastActive: firebase.firestore.FieldValue.serverTimestamp(),
                        completedProfile: false
                    });
                    window.location.hash = 'daily-view';
                } else {
                    const userData = doc.data();
                    console.log('User data:', userData);

                    // Update last active timestamp
                    await userRef.update({
                        lastActive: firebase.firestore.FieldValue.serverTimestamp()
                    });

                    // If on a public route while logged in, redirect to daily-view
                    if (publicRoutes.includes(currentRoute)) {
                        window.location.hash = 'daily-view';
                    }
                }
            } catch (error) {
                console.error('Error handling user data:', error);
                window.location.hash = 'daily-view';
            }
        });

        // Add signout handler
        firebase.auth().onIdTokenChanged((user) => {
            if (!user) {
                // User has signed out, redirect to landing
                window.location.hash = 'landing';
            }
        });
    }
}

customElements.define('app-root', AppRoot);