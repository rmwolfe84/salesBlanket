// Root component
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

console.log('App.js loaded');

document.addEventListener('DOMContentLoaded', () => {
    const appRoot = document.querySelector('app-root');
    if (!appRoot) {
        document.body.appendChild(document.createElement('app-root'));
    }
});