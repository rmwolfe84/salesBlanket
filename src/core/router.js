export class Router {
    constructor() {
        this.routes = {
            '': false,             
            'home': false,          
            'unauthorized': false,
            'complete-profile': false, 
            'pending-approval': false,
            'dashboard': true,
            'canvasser': true,
            'inspection': true,
            'settings': true
        };

        this.handleRoute = this.handleRoute.bind(this);
        window.addEventListener('hashchange', this.handleRoute);
        this.handleRoute(); // Handle initial route
    }

    async handleRoute() {
        const path = window.location.hash.slice(1);
        const isAuthenticated = !!firebase.auth().currentUser;
        const routeContent = document.getElementById('route-content');

        console.log('Router debug:', {
            path,
            isAuthenticated,
            routeContent: !!routeContent,
            routes: this.routes
        });

        // Home page for root or #home
        if (!path || path === 'home') {
            routeContent.innerHTML = `<home-view></home-view>`;
            return;
        }

        // Check if route exists
        if (!this.routes.hasOwnProperty(path)) {
            console.log('Route not found:', path);
            window.location.hash = '404';
            return;
        }

        // Check for protected routes
        if (this.routes[path] === true && !isAuthenticated) {
            window.location.hash = 'unauthorized';
            return;
        }

        console.log('Attempting to mount:', `<${path}-view></${path}-view>`);
        routeContent.innerHTML = `<${path}-view></${path}-view>`;
    }
}