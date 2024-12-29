// src/app.js

// Core imports
import './core/init';
import { Router } from './core/router.js';
import './app-root.js';

// Authenticated routes
import './routes/authenticated/map.js';
import './routes/authenticated/home.js';
import './routes/authenticated/dashboard.js';
import './routes/authenticated/settings.js';
import './routes/authenticated/appointments.js';
import './routes/authenticated/tasks.js';
import './routes/authenticated/calendar.js';
import './routes/authenticated/contacts.js';
import './routes/authenticated/addresses.js';
import './routes/authenticated/daily-view.js';
import './routes/authenticated/leads.js';
import './routes/authenticated/territories.js';

// Public routes
import './routes/public/landing.js';
import './routes/public/login.js';
import './routes/public/404.js';
import './routes/public/unauthorized.js';

// Management routes
import './routes/management/canvasser.js';
import './routes/management/inspector.js';
import './routes/management/territories.js';

// Shared components
import './components/shared/footer.js';
import './components/shared/map-component.js';
import './components/shared/header.js';
import './components/shared/nav-menu.js';

// Settings - Employee
import './components/settings/employee/components/employeemanagement.js';

// Settings - Phases
import './components/settings/phases/components/phasemanagement.js';

// Settings - Preferences
import './components/settings/preferences/components/appearancesettings.js';
import './components/settings/preferences/components/notificationsettings.js';
import './components/settings/preferences/components/systemsettings.js';
import './components/settings/preferences/components/userpreferences.js';

// Settings - Roles
import './components/settings/roles/components/rolemanagement.js';

// Settings - Stages
import './components/settings/stages/components/stagemanagement.js';

// Settings - Users
import './components/settings/users/components/usermanagement.js';

// Settings - Workflows
import './components/settings/workflows/components/workflowmanagement.js';

// Modal components
import './components/modals/version-modal.js';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('App initializing...');
    
    // Initialize router
    new Router();

    // Debug checks
    const routeContent = document.getElementById('route-content');
    if (!routeContent) {
        console.error('route-content element missing');
    }

    const navMenu = document.querySelector('nav-menu');
    if (!navMenu) {
        console.error('nav-menu element missing');
    }
});

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    const debug = document.getElementById('debug');
    if (debug) {
        debug.textContent = `Error: ${event.error.message}`;
        debug.style.backgroundColor = 'red';
        debug.style.color = 'white';
    }
});