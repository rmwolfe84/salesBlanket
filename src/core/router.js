export class Router {
    constructor() {
        this.routes = {
            '': 'landing',
            'landing': false,
            'login': false,
            '404': false,
            'unauthorized': false,
            'dashboard': true,
            'daily-view': true,
            'contacts': true,
            'addresses': true,
            'map': true,
            'appointments': true,
            'tasks': true,
            'calendar': true,
            'settings': true,
            'leads': true,
            'canvasser-management': true,
            'territories': true,
            'inspector-management': true
        };

        this.currentPath = '';
        this.handleRoute = this.handleRoute.bind(this);
        window.addEventListener('hashchange', this.handleRoute);
        this.handleRoute();
    }

    async handleRoute() {
        const path = window.location.hash.slice(1) || 'landing';
    
        if (path === this.currentPath) {
            console.log(`Already on route: ${path}, skipping render`);
            return;
        }
    
        console.log(`Navigating to route: ${path}`);
    
        const routeContent = document.getElementById('route-content');
        if (!routeContent) {
            console.error("Error: 'route-content' container not found.");
            return;
        }
    
        // Check if route exists
        if (!this.routes.hasOwnProperty(path)) {
            console.error("Route not found:", path);
            window.location.hash = 'landing';
            return;
        }

        // Check auth state for protected routes
        const isProtectedRoute = this.routes[path] === true;
        const user = firebase.auth().currentUser;

        if (isProtectedRoute && !user) {
            console.log('Protected route accessed without auth, redirecting to landing');
            window.location.hash = 'landing';
            return;
        }
    
        this.currentPath = path;
    
        while (routeContent.firstChild) {
            routeContent.removeChild(routeContent.firstChild);
        }
    
        const tagName = path === '404' ? 'not-found-view' : `${path}-view`;
        console.log(`Attempting to create component: ${tagName}`);
    
        try {
            const element = document.createElement(tagName);
            routeContent.appendChild(element);
        } catch (error) {
            console.error(`Failed to create element for route: ${path}`, error);
            window.location.hash = 'landing';
        }
    }
}