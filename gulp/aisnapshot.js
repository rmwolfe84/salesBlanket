
//End of code or start of new file 
 
// File: index.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\functions\index.js
// Current Code:

/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


//End of code or start of new file 
 
// File: .eslintrc.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\functions\.eslintrc.js
// Current Code:

module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    "ecmaVersion": 2018,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", {"allowTemplateLiterals": true}],
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};


//End of code or start of new file 
 
// File: package.json
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\functions\package.json
// Current Code:

{
  "name": "functions",
  "description": "Cloud Functions for Firebase",
  "scripts": {
    "lint": "eslint .",
    "serve": "firebase emulators:start --only functions",
    "shell": "firebase functions:shell",
    "start": "npm run shell",
    "deploy": "firebase deploy --only functions",
    "logs": "firebase functions:log"
  },
  "engines": {
    "node": "22"
  },
  "main": "index.js",
  "dependencies": {
    "firebase-admin": "^12.6.0",
    "firebase-functions": "^6.0.1"
  },
  "devDependencies": {
    "eslint": "^8.15.0",
    "eslint-config-google": "^0.14.0",
    "firebase-functions-test": "^3.1.0"
  },
  "private": true
}


//End of code or start of new file 
 
// File: firebase.json
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\firebase.json
// Current Code:

{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "functions": [
    {
      "source": "functions",
      "codebase": "default",
      "ignore": [
        "node_modules",
        ".git",
        "firebase-debug.log",
        "firebase-debug.*.log",
        "*.local"
      ],
      "predeploy": [
        "npm --prefix \"$RESOURCE_DIR\" run lint"
      ]
    }
  ],
  "storage": {
    "rules": "storage.rules"
  }
}
 

//End of code or start of new file 
 
// File: .firebaserc
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\.firebaserc
// Current Code:

{
  "projects": {
    "default": "salesblanket"
  }
}


//End of code or start of new file 
 
// File: .gitignore
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\.gitignore
// Current Code:

.env
node_modules/
*.local

//End of code or start of new file 
 
// File: firestore.rules
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\firestore.rules
// Current Code:



//End of code or start of new file 
 
// File: package.json
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\package.json
// Current Code:

{
  "name": "salesblanket",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "esbuild src/app.js --bundle --outfile=public/dist/bundle.js",
    "bundle": "node build.js",
    "dev": "esbuild src/app.js --bundle --outfile=public/dist/bundle.js --watch"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "esbuild": "^0.20.0",
    "gulp": "^5.0.0",
    "gulp-concat": "^2.6.1",
    "gulp-insert": "^0.5.0",
    "html-webpack-plugin": "^5.6.3",
    "webpack-merge": "^6.0.1"
  },
  "dependencies": {
    "lodash": "^4.17.21",
    "vinyl-fs": "^4.0.0"
  }
}


//End of code or start of new file 
 
// File: storage.rules
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\storage.rules
// Current Code:

rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}


//End of code or start of new file 
 
// File: index.html
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\public\index.html
// Current Code:

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sales Blanket</title>

  <!-- Firebase SDKs - keeping only what we need now -->
  <script defer src="/__/firebase/11.1.0/firebase-app-compat.js"></script>
  <script defer src="/__/firebase/11.1.0/firebase-auth-compat.js"></script>
  <script defer src="/__/firebase/11.1.0/firebase-firestore-compat.js"></script>

  <!-- Initialize Firebase -->
  <script defer src="/__/firebase/init.js?useEmulator=true"></script>

  <!-- Main Stylesheet -->
  <link rel="stylesheet" href="/styles.css">
</head>

<body>
  <app-root></app-root>

  <!-- Our app script -->
  <script src="/dist/bundle.js" defer></script>
</body>

</html>

//End of code or start of new file 
 
// File: styles.css
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\public\styles.css
// Current Code:

:root {
    --primary-green: #4CAF50;
    --soft-white: #f5f5f5;
    --text-black: #333333;
}

body {
    font-family: 'Google Sans Mono', monospace;
    background-color: var(--soft-white);
    margin: 0;
    padding: 0;
}

.unauthorized-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
}

h1 {
    color: var(--primary-green);
    margin-bottom: 30px;
}

.button-group {
    display: flex;
    gap: 20px;
}

button {
    background-color: var(--primary-green);
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Google Sans Mono', monospace;
}

button:hover {
    opacity: 0.9;
}

.access-message {
    text-align: center;
    margin-bottom: 30px;
}

.access-message h2 {
    color: #ff0000;
    margin-bottom: 10px;
}

.access-message h3 {
    color: var(--text-black);
}

.login-notice {
    color: var(--text-black);
    margin: 20px 0;
    text-align: center;
}

.home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
}

.welcome-text {
    color: var(--text-black);
    margin: 20px 0;
    text-align: center;
    max-width: 600px;
}

.action-container {
    margin-top: 30px;
}

.profile-setup-container {
    max-width: 400px;
    margin: 40px auto;
    padding: 20px;
}

.complete-profile-container {
    max-width: 400px;
    margin: 40px auto;
    padding: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    background-color: var(--primary-green);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

//End of code or start of new file 
 
// File: claims.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\core\security\claims.js
// Current Code:



//End of code or start of new file 
 
// File: rules.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\core\security\rules.js
// Current Code:



//End of code or start of new file 
 
// File: auth.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\core\auth.js
// Current Code:



//End of code or start of new file 
 
// File: router.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\core\router.js
// Current Code:

export class Router {
    constructor() {
        this.routes = {
            '': false,              // root route
            'home': false,          // also allow #home
            'unauthorized': false,
            'complete-profile': false,  // Add this line
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

//End of code or start of new file 
 
// File: confirm.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\modals\confirm.js
// Current Code:



//End of code or start of new file 
 
// File: popup.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\modals\popup.js
// Current Code:



//End of code or start of new file 
 
// File: alert.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\modals\alert.js
// Current Code:



//End of code or start of new file 
 
// File: header1.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\headers\header1.js
// Current Code:



//End of code or start of new file 
 
// File: address-form.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\forms\address-form.js
// Current Code:



//End of code or start of new file 
 
// File: contact-form.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\forms\contact-form.js
// Current Code:



//End of code or start of new file 
 
// File: task-form.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\forms\task-form.js
// Current Code:



//End of code or start of new file 
 
// File: search-form.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\forms\search-form.js
// Current Code:



//End of code or start of new file 
 
// File: task-list.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\tables\task-list.js
// Current Code:



//End of code or start of new file 
 
// File: assigned-contact.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\tables\assigned-contact.js
// Current Code:



//End of code or start of new file 
 
// File: assigned-address.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\tables\assigned-address.js
// Current Code:



//End of code or start of new file 
 
// File: nav-menu.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\shared\nav-menu.js
// Current Code:



//End of code or start of new file 
 
// File: error.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\shared\error.js
// Current Code:



//End of code or start of new file 
 
// File: loading.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\shared\loading.js
// Current Code:



//End of code or start of new file 
 
// File: settings.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\settings.js
// Current Code:



//End of code or start of new file 
 
// File: home.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\home.js
// Current Code:

export class HomeView extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="home-container">
                <h1>Welcome to Sales Blanket</h1>
                <button id="login-btn">Login</button>
            </div>
        `;

        this.querySelector('#login-btn').addEventListener('click', async () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            try {
                const result = await firebase.auth().signInWithPopup(provider);
                if (result.user) {
                    window.location.hash = 'dashboard';
                }
            } catch (error) {
                console.error('Login failed:', error);
            }
        });
    }
}

customElements.define('home-view', HomeView);

//End of code or start of new file 
 
// File: canvasser.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\canvasser.js
// Current Code:



//End of code or start of new file 
 
// File: dashboard.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\dashboard.js
// Current Code:

export class DashboardView extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="dashboard-container">
                <h1>Dashboard</h1>
                <p>Welcome to Sales Blanket Dashboard</p>
            </div>
        `;
    }
}

customElements.define('dashboard-view', DashboardView);

//End of code or start of new file 
 
// File: unauthorized.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\unauthorized.js
// Current Code:

export class UnauthorizedView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="unauthorized-container">
                <div class="access-message">
                    <h2>Unauthorized Access</h2>
                    <h3>You do not have access to this application</h3>
                </div>
                <h1>Welcome to Sales Blanket</h1>
                <p class="login-notice">Please use your company Google account to login</p>
                <div class="button-group">
                    <google-login-button></google-login-button>
                    <button id="apply-button">Fill Out Job Application</button>
                </div>
            </div>
        `;

        this.querySelector('#apply-button').addEventListener('click', () => {
            alert('Job application feature coming soon!');
        });
    }
}

customElements.define('unauthorized-view', UnauthorizedView);

//End of code or start of new file 
 
// File: login.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\login.js
// Current Code:

export class LoginView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="login-container">
                <h1>Sales Blanket Login</h1>
                <p>Please sign in with your company Google account</p>
                <google-login-button></google-login-button>
            </div>
        `;
    }
}

customElements.define('login-view', LoginView);

//End of code or start of new file 
 
// File: 404.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\404.js
// Current Code:



//End of code or start of new file 
 
// File: inspection.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\inspection.js
// Current Code:



//End of code or start of new file 
 
// File: complete-profile.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\complete-profile.js
// Current Code:

export class CompleteProfileView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="complete-profile-container">
                <h1>Complete Your Profile</h1>
                <p>Please provide your information to complete setup.</p>
                
                <form id="profile-form">
                    <div class="form-group">
                        <label for="firstName">First Name</label>
                        <input type="text" id="firstName" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="lastName">Last Name</label>
                        <input type="text" id="lastName" required>
                    </div>
                    
                    <button type="submit">Complete Setup</button>
                </form>
            </div>
        `;

        this.setupFormHandler();
    }

    setupFormHandler() {
        const form = this.querySelector('#profile-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const firstName = this.querySelector('#firstName').value.trim();
            const lastName = this.querySelector('#lastName').value.trim();

            try {
                const user = firebase.auth().currentUser;
                
                await firebase.firestore()
                    .collection('users')
                    .doc(user.uid)
                    .set({
                        email: user.email,
                        status: 'pending',
                        role: null,
                        firstName: firstName,
                        lastName: lastName,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    });

                window.location.hash = 'pending-approval';
            } catch (error) {
                console.error('Error saving profile:', error);
                alert('There was an error saving your profile. Please try again.');
            }
        });
    }
}

console.log('Loading complete profile component'); // Add this debug log

export class CompleteProfileView extends HTMLElement {
    connectedCallback() {
        console.log('Complete profile view connected'); // Add this debug log
        // ... rest of your component code
    }
}

customElements.define('complete-profile-view', CompleteProfileView);

//End of code or start of new file 
 
// File: app-root.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\app-root.js
// Current Code:

class AppRoot extends HTMLElement {
    constructor() {
        super();
        console.log('Security system starting...');
        this.isAuthenticated = false;
        this.isLoading = true;
    }

    connectedCallback() {
        console.log('Security guard on duty...');
        firebase.auth().onAuthStateChanged(user => {
            console.log('Checking ID...', user ? 'ID found' : 'No ID');
            this.isLoading = false;
            this.isAuthenticated = !!user;
            this.updateView();
        });
    }

    updateView() {
        if (this.isLoading) {
            this.innerHTML = `<div class="loading">Loading...</div>`;
            return;
        }
    
        this.innerHTML = `
            ${this.isAuthenticated ? '<header1-element></header1-element>' : ''}
            <main id="route-content">
                ${!this.isAuthenticated ? '<unauthorized-view></unauthorized-view>' : ''}
            </main>
        `;

        console.log('View updated:', this.isAuthenticated ? 'authenticated' : 'not authenticated');
    }
}

customElements.define('app-root', AppRoot);

export default AppRoot;

//End of code or start of new file 
 
// File: .env
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\.env
// Current Code:

# Firebase Config
FIREBASE_API_KEY="AIzaSyDPBrfoqBwcazXXtteV0AM9T9klwYLigfs"
FIREBASE_AUTH_DOMAIN="salesblanket.firebaseapp.com"
FIREBASE_PROJECT_ID="salesblanket"
FIREBASE_STORAGE_BUCKET="salesblanket.firebasestorage.app"
FIREBASE_MESSAGING_SENDER_ID="70376660372"
FIREBASE_APP_ID="1:70376660372:web:6c4292246d100ebd118381"

#Google Maps
GOOGLE_MAPS_API_KEY="AIzaSyA8kQcCqXqvKLn1C0pu0RWbr4Kw-gYF6jw"

//End of code or start of new file 
 
// File: app.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\app.js
// Current Code:

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

// End of aisnapshot.js (C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\aisnapshot.js) code

