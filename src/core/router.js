export class Router {
    constructor() {
        this.routes = {
            '': false,              // root route
            'home': false,          // also allow #home
            'unauthorized': false,   
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
        const path = window.location.hash.slice(1); // remove the # if it exists
        const isAuthenticated = !!firebase.auth().currentUser;
        const routeContent = document.getElementById('route-content');

        // Home page for root or #home
        if (!path || path === 'home') {
            routeContent.innerHTML = `<home-view></home-view>`;
            return;
        }

        // Check for protected routes
        if (this.routes[path] === true && !isAuthenticated) {
            window.location.hash = 'unauthorized';
            return;
        }

        routeContent.innerHTML = `<${path}-view></${path}-view>`;
    }
}