// Root components
import './app-root.js';
import './core/router.js';

// Route components
import './routes/unauthorized.js';
import './routes/dashboard.js';
import './routes/canvasser.js';
import './routes/inspection.js';
import './routes/login.js';
import './routes/settings.js';
import './routes/404.js';
import './routes/home.js';
import './routes/complete-profile.js';
import './components/shared/google-login.js';

console.log('App.js loaded');

// Remove the firebase.initializeApp() call since it's handled by init.js

document.addEventListener('DOMContentLoaded', () => {
    const appRoot = document.querySelector('app-root');
    if (!appRoot) {
        document.body.appendChild(document.createElement('app-root'));
    }
});

firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
        try {
            const userDoc = await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .get();

            if (!userDoc.exists) {
                window.location.hash = 'complete-profile';
            } else {
                window.location.hash = 'dashboard';
            }
        } catch (error) {
            console.error('Error during auth check:', error);
        }
    }
});
