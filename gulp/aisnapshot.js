
//**End of code or start of new file** 
 
// File: auth.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\core\auth.js
// Current Code:



//**End of code or start of new file** 
 
// File: component-registry.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\core\component-registry.js
// Current Code:

export const registerComponent = (name, component) => {
    if (!customElements.get(name)) {
        customElements.define(name, component);
        console.log(`Registered component: ${name}`);
    }
};


//**End of code or start of new file** 
 
// File: init.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\core\init.js
// Current Code:

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPBrfoqBwcazXXtteV0AM9T9klwYLigfs",
    authDomain: "salesblanket.firebaseapp.com",
    projectId: "salesblanket",
    storageBucket: "salesblanket.firebasestorage.app",
    messagingSenderId: "70376660372",
    appId: "1:70376660372:web:6c4292246d100ebd118381"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };


//**End of code or start of new file** 
 
// File: router.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\core\router.js
// Current Code:

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

//**End of code or start of new file** 
 
// File: userService.css
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\services\userService.css
// Current Code:

/* src/services/userService.css */

.user-form {
    display: grid;
    gap: 1.5rem;
    max-width: 600px;
    margin: 0 auto;
}

.form-section {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.section-header {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-group label {
    font-weight: 500;
    color: #333;
}

.form-group input,
.form-group select {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.875rem;
    transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus {
    border-color: #4CAF50;
    outline: none;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
}

.required::after {
    content: " *";
    color: #f44336;
}

.settings-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 6px;
}

.setting-info {
    flex: 1;
}

.setting-info h4 {
    margin: 0;
    font-size: 0.875rem;
    color: #333;
}

.setting-info p {
    margin: 0.25rem 0 0;
    font-size: 0.75rem;
    color: #666;
}

.toggle-switch {
    position: relative;
    width: 48px;
    height: 24px;
}

.toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 24px;
}

.toggle-slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}

input:checked + .toggle-slider {
    background-color: #4CAF50;
}

input:checked + .toggle-slider:before {
    transform: translateX(24px);
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
}

.btn-secondary {
    padding: 0.75rem 1.5rem;
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #666;
    cursor: pointer;
}

.btn-primary {
    padding: 0.75rem 1.5rem;
    background: #4CAF50;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
}

.btn-primary:hover {
    background: #45a049;
}

/* Dark mode support */
[data-theme="dark"] .form-section {
    background: #2d2d2d;
}

[data-theme="dark"] .form-group label {
    color: #fff;
}

[data-theme="dark"] .form-group input,
[data-theme="dark"] .form-group select {
    background: #1a1a1a;
    border-color: #404040;
    color: #fff;
}

[data-theme="dark"] .setting-item {
    background: #1a1a1a;
}

[data-theme="dark"] .setting-info h4 {
    color: #fff;
}

@media (max-width: 768px) {
    .form-grid {
        grid-template-columns: 1fr;
    }

    .form-actions {
        flex-direction: column;
        gap: 0.5rem;
    }

    .btn-primary,
    .btn-secondary {
        width: 100%;
    }
}

//**End of code or start of new file** 
 
// File: userService.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\services\userService.js
// Current Code:

// src/services/userService.js
import { USER_SCHEMA, createNewUserDocument, validateUserDocument } from '../core/schemas/userSchema.js';
import './userService.css';

export class UserService {
    // Keep your existing createUser but use schema validation
    static async createUser(userData) {
        try {
            const userDoc = createNewUserDocument({
                uid: userData.uid,
                email: userData.email
            });

            // Validate the document
            const errors = validateUserDocument(userDoc);
            if (errors.length > 0) {
                throw new Error(`Invalid user data: ${errors.join(', ')}`);
            }

            await firebase.firestore()
                .collection('users')
                .doc(userData.uid)
                .set(userDoc);

            return userDoc;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    // Add new invite functionality
    static async createUserFromInvite(inviteData) {
        try {
            const userDoc = createNewUserDocument({
                uid: inviteData.email, // Temporary ID
                email: inviteData.email
            });

            // Add invite-specific data
            userDoc.basicInfo.firstName = inviteData.firstName;
            userDoc.basicInfo.lastName = inviteData.lastName;
            userDoc.system.role = inviteData.role;

            // Create user document
            await firebase.firestore()
                .collection('users')
                .doc(inviteData.email)
                .set(userDoc);

            // Create invite record
            await firebase.firestore()
                .collection('userInvites')
                .add({
                    email: inviteData.email,
                    role: inviteData.role,
                    status: 'pending',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });

            return { success: true, userId: inviteData.email };
        } catch (error) {
            console.error('Error creating user invite:', error);
            throw error;
        }
    }

    // Keep your existing updateUserSettings method
    static async updateUserSettings(uid, settings) {
        await firebase.firestore()
            .collection('users')
            .doc(uid)
            .update({
                systemSettings: settings.systemSettings,
                preferences: settings.preferences,
                notifications: settings.notifications,
                appearance: settings.appearance,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
    }

    // Keep your existing updateEmployeeData method
    static async updateEmployeeData(uid, employeeData) {
        await firebase.firestore()
            .collection('users')
            .doc(uid)
            .update({
                employeeData,
                completedProfile: true,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
    }

    // Keep your existing backfillExistingUsers method
    static async backfillExistingUsers() {
        const snapshot = await firebase.firestore()
            .collection('users')
            .get();

        const batch = firebase.firestore().batch();

        snapshot.docs.forEach(doc => {
            const userData = doc.data();
            const defaultSettings = {
                systemSettings: {
                    language: 'en',
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    dateFormat: 'MM/DD/YYYY',
                    autoSave: true,
                    dataSync: true
                },
                preferences: {
                    defaultView: 'dashboard',
                    startingPage: 'daily-view',
                    timeFormat: '12h',
                    showNotifications: true
                },
                notifications: {
                    emailNotifications: userData.emailNotifications || false,
                    textNotifications: userData.textNotifications || false,
                    appNotifications: true,
                    quietHours: {
                        start: '22:00',
                        end: '07:00'
                    }
                },
                appearance: {
                    theme: 'light',
                    fontSize: 'medium',
                    layout: 'grid'
                }
            };

            batch.update(doc.ref, defaultSettings);
        });

        await batch.commit();
    }

    // Add additional user management methods
    static async getPendingInvites() {
        try {
            const snapshot = await firebase.firestore()
                .collection('userInvites')
                .where('status', '==', 'pending')
                .get();

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error getting pending invites:', error);
            throw error;
        }
    }

    static async acceptInvite(inviteId, authUser) {
        try {
            const invite = await firebase.firestore()
                .collection('userInvites')
                .doc(inviteId)
                .get();

            if (!invite.exists || invite.data().status !== 'pending') {
                throw new Error('Invalid or expired invite');
            }

            // Update user document with real uid
            await firebase.firestore()
                .collection('users')
                .doc(authUser.uid)
                .set({
                    'system.uid': authUser.uid,
                    'system.status': 'active',
                    lastActive: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });

            // Update invite status
            await invite.ref.update({
                status: 'accepted',
                acceptedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            return { success: true };
        } catch (error) {
            console.error('Error accepting invite:', error);
            throw error;
        }
    }
}

//**End of code or start of new file** 
 
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
    ],
    "headers": [
      {
        "source": "**/*.js",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/javascript"
          }
        ]
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
        "firebase-debug.*.log"
      ],
      "predeploy": [
        "npm --prefix \"$RESOURCE_DIR\" run lint"
      ]
    }
  ],
  "emulators": {
    "hosting": [
      {
        "target": "app",
        "port": 5000
      },
      {
        "target": "marketing",
        "port": 5001
      }
    ],
    "firestore": {
      "port": 8080
    },
    "functions": {
      "port": 5002
    }
  }
}

//**End of code or start of new file** 
 
// File: .firebaserc
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\.firebaserc
// Current Code:

{
  "projects": {
    "default": "salesblanket"
  }
}

//**End of code or start of new file** 
 
// File: firestore.rules
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\firestore.rules
// Current Code:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check authentication
    function isAuthenticated() {
      return request.auth != null;
    }

    // Check if user is approved
    function isApprovedUser() {
      return exists(/databases/$(database)/documents/users/$(request.auth.uid)) 
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.status == "approved";
    }

    // Check if user is admin
    function isAdmin() {
      return exists(/databases/$(database)/documents/users/$(request.auth.uid)) 
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }

    // Check active assignment
    function isActivelyAssigned(data) {
      return data.assignedTo.hasAll([{
        userId: request.auth.uid,
        isActive: true
      }]);
    }

    // Users collection rules
    match /users/{userId} {
      // Allow users to create and read their own document
      allow create: if isAuthenticated() && request.auth.uid == userId;
      allow read: if isAuthenticated() && request.auth.uid == userId;
      // Allow users to update their own document
      allow update: if isAuthenticated() && request.auth.uid == userId && 
        // Only allow updating specific fields
        request.resource.data.diff(resource.data).affectedKeys()
          .hasOnly(['firstName', 'lastName', 'mobilePhone', 'textNotifications', 
                   'lastActive', 'completedProfile', 'settings']);
    }

    // Contacts collection rules
    match /contacts/{contactId} {
      allow read: if isAuthenticated() 
        && (isApprovedUser() || isAdmin())
        && (isActivelyAssigned(resource.data) || isAdmin());
      allow create: if isAuthenticated() && (isApprovedUser() || isAdmin());
      allow update: if isAuthenticated() 
        && (isApprovedUser() || isAdmin())
        && (isActivelyAssigned(resource.data) || isAdmin());
      allow delete: if isAuthenticated() 
        && (isApprovedUser() || isAdmin())
        && (isActivelyAssigned(resource.data) || isAdmin());
    }

    // Allow admins to manage system settings
    match /settings/{document=**} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }

    // Workflow management rules
    match /workflows/{workflowId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && isAdmin();
    }

    // User Invites rules
    match /userInvites/{inviteId} {
      allow read, write: if isAuthenticated() && isAdmin();
    }

    // Workflow phases rules
    match /workflows/{workflowId}/phases/{phaseId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && isAdmin();
    }

    // Workflow statuses rules
    match /workflows/{workflowId}/phases/{phaseId}/statuses/{statusId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && isAdmin();
    }
  }
}

//**End of code or start of new file** 
 
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


//**End of code or start of new file** 
 
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

//**End of code or start of new file** 
 
// File: index.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\functions\index.js
// Current Code:

const {onCall} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

// Initialize Firebase Admin
admin.initializeApp();

// Logger for debugging
const logger = require("firebase-functions/logger");

// Function to set user role
exports.setUserRole = onCall(async (request) => {
  try {
    // Log the request for debugging
    logger.info("setUserRole called", {
      caller: request.auth,
      requestData: request.data,
      structuredData: true
    });

    // Verify the caller is an admin
    const caller = request.auth;
    if (!caller) {
      throw new Error('Must be logged in to set roles');
    }
    
    const callerUid = caller.uid;
    
    // Get the caller's claims to check if they're an admin
    const callerClaims = (await admin.auth().getUser(callerUid)).customClaims;
    
    if (!callerClaims?.admin) {
      throw new Error('Unauthorized. Only admins can set roles.');
    }

    const {uid, role} = request.data;
    
    // Valid roles
    const validRoles = ['admin', 'manager', 'canvasser', 'inspector'];
    if (!validRoles.includes(role)) {
      throw new Error('Invalid role specified');
    }

    // Set the custom claims
    await admin.auth().setCustomUserClaims(uid, {
      admin: role === 'admin',
      manager: role === 'manager',
      canvasser: role === 'canvasser',
      inspector: role === 'inspector',
      role: role // store the role name directly
    });

    logger.info("Role set successfully", {
      uid: uid,
      role: role,
      structuredData: true
    });

    return {success: true, message: `Role ${role} set for user ${uid}`};
  } catch (error) {
    logger.error('Error setting user role:', {
      error: error,
      structuredData: true
    });
    throw new Error(error.message);
  }
});

// Function to get initial admin
exports.initializeAdmin = onCall(async (request) => {
  try {
    logger.info("initializeAdmin called", {
      caller: request.auth,
      structuredData: true
    });

    // Get total users count
    const usersList = await admin.auth().listUsers(1);
    
    // If this is the first user, make them an admin
    if (usersList.users.length === 1) {
      const firstUser = usersList.users[0];
      await admin.auth().setCustomUserClaims(firstUser.uid, {
        admin: true,
        role: 'admin'
      });

      logger.info("Initial admin set", {
        uid: firstUser.uid,
        structuredData: true
      });

      return {success: true, message: 'Initial admin set'};
    }
    
    return {success: false, message: 'Admin already exists'};
  } catch (error) {
    logger.error('Error initializing admin:', {
      error: error,
      structuredData: true
    });
    throw new Error(error.message);
  }
});

// Function to get user claims/role
exports.getUserRole = onCall(async (request) => {
  try {
    logger.info("getUserRole called", {
      caller: request.auth,
      structuredData: true
    });

    if (!request.auth) {
      throw new Error('Must be logged in to check roles');
    }

    const user = await admin.auth().getUser(request.auth.uid);
    return {
      success: true,
      claims: user.customClaims || {},
      role: user.customClaims?.role || null
    };
  } catch (error) {
    logger.error('Error getting user role:', {
      error: error,
      structuredData: true
    });
    throw new Error(error.message);
  }
});

//**End of code or start of new file** 
 
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


//**End of code or start of new file** 
 
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


//**End of code or start of new file** 
 
// File: index.html
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\public\index.html
// Current Code:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="SalesBlanket - Field Sales Management Platform">
    <title>SalesBlanket</title>
    
    <!-- Fonts and Styles -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Mono:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/dist/styles.css">
    <link rel="stylesheet" href="/styles.css">

    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js"></script>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA8kQcCqXqvKLn1C0pu0RWbr4Kw-gYF6jw&libraries=drawing" loading="async"></script>

    <!-- Firebase Initialization -->
    <script>
        // Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyDPBrfoqBwcazXXtteV0AM9T9klwYLigfs",
            authDomain: "salesblanket.firebaseapp.com",
            projectId: "salesblanket",
            storageBucket: "salesblanket.firebasestorage.app",
            messagingSenderId: "70376660372",
            appId: "1:70376660372:web:6c4292246d100ebd118381"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        // Get auth and firestore instances
        const auth = firebase.auth();
        const db = firebase.firestore();

        // Make services globally available
        window.firebaseAuth = auth;
        window.firebaseDB = db;
    </script>

    <!-- Application Bundle -->
    <script defer src="dist/bundle.js"></script>
</head>
<body>
    <app-root>
        <header-bar></header-bar>
        <nav-menu></nav-menu>
        <main id="route-content"></main>
        <footer-bar></footer-bar>
    </app-root>
</body>
</html>

//**End of code or start of new file** 
 
// File: styles.css
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\public\styles.css
// Current Code:

/* ======================
   1. CSS Variables
====================== */
:root {
    --primary-green: #4CAF50;
    --soft-white: #f5f5f5;
    --text-black: #333333;
    --danger-red: #f44336;
    --danger-dark: #d32f2f;
    --header-height: 60px;
    --nav-height: 50px;
    --shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
    --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
}

/* ======================
   2. Base Styles
====================== */
body {
    font-family: 'Google Sans Mono', monospace;
    background-color: var(--soft-white);
    margin: 0;
    padding: 0;
    position: relative;
    min-height: 100vh;
}

/* ======================
   3. Layout & Structure
====================== */
#route-content {
    margin-top: calc(var(--header-height) + var(--nav-height));
    margin-bottom: 4rem;
    min-height: calc(100vh - (var(--header-height) + var(--nav-height) + 4rem));
    padding: 20px;
}

/* ======================
   4. Header Component
====================== */
.main-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--header-height);
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    box-shadow: var(--shadow-sm);
    z-index: 1000;
}

.brand-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary-green);
    cursor: default;
}

.version {
    font-size: 0.75rem;
    color: #666;
    margin-top: -5px;
    cursor: text;
}

/* ======================
   5. Navigation
====================== */
.sub-header {
    position: fixed;
    top: var(--header-height);
    left: 0;
    right: 0;
    height: var(--nav-height);
    background-color: white;
    border-bottom: 1px solid #e0e0e0;
    z-index: 999;
    box-shadow: var(--shadow-sm);
}

.nav-buttons {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 1rem;
    gap: 1rem;
}

.nav-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 8px 16px;
    background-color: var(--primary-green);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    height: 36px;
}

.nav-button:hover {
    background-color: #45a049;
}

/* Dashboard Dropdown */
.nav-group {
    position: relative;
    display: inline-flex;
    align-items: center;
}

.management-dropdown {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    box-shadow: var(--shadow-sm);
    border-radius: 4px;
    min-width: 150px;
    z-index: 1000;
    margin-top: 4px;
}

.management-item {
    position: relative;
    padding: 8px 16px;
    color: var(--text-black);
    cursor: pointer;
}

.management-item:after {
    content: '›';
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
}

.sub-management {
    display: none;
    position: absolute;
    left: 100%;
    top: 0;
    background: white;
    box-shadow: var(--shadow-sm);
    border-radius: 4px;
    min-width: 200px;
}

.nav-group:hover .management-dropdown {
    display: block;
}

.management-item:hover .sub-management {
    display: block;
}

.sub-management-item {
    display: block;
    padding: 8px 16px;
    color: var(--text-black);
    cursor: pointer;
}

.sub-management-item:hover {
    background-color: var(--soft-white);
}

/* ======================
   6. Authentication Components
====================== */
.auth-section {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.user-name {
    color: #666;
}

.signout-button {
    padding: 8px 16px;
    background-color: var(--danger-red);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.signout-button:hover {
    background-color: var(--danger-dark);
}

/* ======================
   7. Map Component
====================== */
.map-page {
    display: flex;
    flex-direction: column;
    height: calc(100vh - var(--header-height) - var(--nav-height));
    position: relative;
}

.map-controls {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1000;
    background: white;
    border-radius: 4px;
    box-shadow: var(--shadow-sm);
}

.control-panel {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.control-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
}

.control-btn:hover {
    background: var(--soft-white);
    border-color: #ccc;
}

.map-container {
    flex: 1;
    width: 100%;
    position: relative;
}

map-component {
    display: block;
    width: 100%;
    height: 100%;
}

/* ======================
   8. Dashboard Styles
====================== */
.dashboard-container {
    padding: 20px;
    background: white;
}

.dashboard-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 2rem 0;
}

.stat-card {
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: var(--shadow-sm);
}

.recent-activity {
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: var(--shadow-sm);
    margin-top: 2rem;
}

/* ======================
   9. Notifications
====================== */
.notification-icon {
    position: relative;
    margin: 0 10px;
    cursor: pointer;
}

.notification-pulse {
    position: absolute;
    top: -2px;
    right: -2px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--danger-red);
}

.notification-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    width: 300px;
    background: white;
    border-radius: 8px;
    box-shadow: var(--shadow-md);
    margin-top: 10px;
    display: none;
    z-index: 1000;
}

.notification-dropdown.show {
    display: block;
}

/* ======================
   10. Footer
====================== */
.main-footer {
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 0;
    padding: 1rem;
    z-index: 9999;
}

.company-info {
    font-size: 0.75rem;
    color: #666;
    line-height: 1.2;
    text-align: right;
    white-space: nowrap;
}

/* ======================
   11. Common Components
====================== */
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 20px;
}

.add-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: var(--primary-green);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.add-button:hover {
    background: #45a049;
}

/* ======================
   12. Utility Classes
====================== */
.material-icons {
    font-size: 20px;
}

/* Flashing Shield Animation */
.notification-icon.active .material-icons {
    animation: flash-colors 1.5s infinite;
}

@keyframes flash-colors {
    0% { color: #ff0000; }
    33% { color: #ffffff; }
    66% { color: #0000ff; }
    100% { color: #ff0000; }
}

/* Notification Dropdown Styling */
.notification-wrapper {
    position: relative;
}

.notification-dropdown {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    min-width: 300px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
}

.notification-header {
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
}

.notification-header h3 {
    margin: 0;
    font-size: 16px;
    color: #333;
}

.notification-item {
    padding: 12px 16px;
    border-bottom: 1px solid #f5f5f5;
    cursor: pointer;
}

.notification-content {
    display: flex;
    align-items: flex-start;
    gap: 12px;
}

.notification-text {
    flex: 1;
}

.notification-text p {
    margin: 0 0 4px 0;
    color: #333;
}

.notification-text small {
    color: #666;
}

/* Arrow pointer at top of dropdown */
.notification-dropdown::before {
    content: '';
    position: absolute;
    top: -8px;
    right: 16px;
    width: 16px;
    height: 16px;
    background: white;
    transform: rotate(45deg);
    box-shadow: -2px -2px 2px rgba(0, 0, 0, 0.05);
}

/* Version Modal Styles */
.version-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.terminal-window {
    width: 80%;
    max-width: 800px;
    height: 80vh;
    background: #000;
    border: 2px solid #30ff30;
    border-radius: 10px;
    overflow: hidden;
    font-family: 'Courier New', monospace;
    box-shadow: 0 0 20px rgba(48, 255, 48, 0.3);
}

.terminal-header {
    background: #1a1a1a;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #30ff30;
}

.terminal-title {
    color: #30ff30;
    font-size: 14px;
}

.terminal-close {
    background: none;
    border: none;
    color: #30ff30;
    font-size: 20px;
    cursor: pointer;
    padding: 0 10px;
}

.terminal-close:hover {
    color: #ff3030;
}

.terminal-content {
    padding: 20px;
    height: calc(100% - 41px);
    overflow-y: auto;
    background: #000;
}

.terminal-text {
    color: #30ff30;
    font-size: 14px;
    line-height: 1.4;
    white-space: pre-wrap;
    font-family: 'Courier New', monospace;
    text-shadow: 0 0 5px rgba(48, 255, 48, 0.5);
}

/* Add a blinking cursor effect */
.terminal-text::after {
    content: '█';
    animation: blink 1s infinite;
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}

/* Add to your CSS file */
.daily-view {
    padding: 20px;
}

.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.dashboard-card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: var(--shadow-sm);
}

.welcome-card {
    grid-column: 1 / -1;
    background: var(--primary-green);
    color: white;
}

.welcome-card h2 {
    margin: 0;
    font-size: 24px;
}

.welcome-card .date {
    margin: 8px 0 0;
    opacity: 0.9;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 16px;
    margin-top: 16px;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.stat-label {
    font-size: 14px;
    color: #666;
}

.stat-value {
    font-size: 24px;
    font-weight: bold;
    color: var(--primary-green);
    margin-top: 4px;
}

.empty-state {
    color: #666;
    text-align: center;
    padding: 20px;
    font-style: italic;
}

/* Add to styles.css */
.landing-page {
    min-height: 100vh;
    background-color: white;
}

.hero-section {
    height: 60vh;
    background-color: var(--primary-green);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 20px;
}

.hero-content h1 {
    font-size: 4rem;
    margin: 0;
    font-weight: bold;
}

.hero-subtitle {
    font-size: 1.5rem;
    margin: 1rem 0 2rem;
    opacity: 0.9;
}

.hero-actions {
    margin-top: 2rem;
}

.login-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    font-size: 1.1rem;
    background: white;
    color: var(--primary-green);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 auto;
    transition: transform 0.2s;
}

.login-button:hover {
    transform: translateY(-2px);
}

.features-section {
    padding: 4rem 20px;
    text-align: center;
}

.features-section h2 {
    margin-bottom: 3rem;
    font-size: 2rem;
    color: var(--text-black);
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.feature-card {
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: var(--shadow-sm);
    transition: transform 0.2s;
}

.feature-card:hover {
    transform: translateY(-5px);
}

.feature-card .material-icons {
    font-size: 2.5rem;
    color: var(--primary-green);
    margin-bottom: 1rem;
}

.feature-card h3 {
    margin: 0 0 1rem;
    color: var(--text-black);
}

.feature-card p {
    color: #666;
    line-height: 1.5;
    margin: 0;
}

.main-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    z-index: 9999;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.copyright-text {
    font-size: 0.75rem;
    color: #666;
    text-align: center;
    flex: 1;
}

.company-info {
    font-size: 0.75rem;
    color: #666;
    line-height: 1.2;
    text-align: right;
}

.main-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    z-index: 9999;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.copyright-text {
    font-size: 0.75rem;
    color: #666;
    text-align: center;
    flex: 1;
}

.company-info {
    font-size: 0.75rem;
    color: #666;
    line-height: 1.2;
    text-align: right;
}

/* Login Page Styles */
.login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--soft-white);
    padding: 20px;
}

.login-container {
    width: 100%;
    max-width: 400px;
}

.login-card {
    background: white;
    border-radius: 8px;
    box-shadow: var(--shadow-md);
    padding: 2rem;
}

.login-header {
    text-align: center;
    margin-bottom: 2rem;
}

.login-header h1 {
    color: var(--primary-green);
    margin: 0;
    font-size: 2rem;
}

.login-subtitle {
    color: #666;
    margin: 0.5rem 0 0;
}

.login-body {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.google-signin-button {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 24px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    color: #333;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.2s;
}

.google-signin-button:hover {
    background-color: #f5f5f5;
    transform: translateY(-1px);
}

.google-icon {
    width: 18px;
    height: 18px;
}

.login-note {
    margin-top: 1rem;
    color: #666;
    font-size: 0.875rem;
    text-align: center;
}

.unauthorized-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - var(--header-height) - var(--nav-height));
    padding: 20px;
}

.unauthorized-container {
    text-align: center;
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: var(--shadow-sm);
}

.error-icon {
    font-size: 4rem;
    color: var(--danger-red);
    margin-bottom: 1rem;
}

.return-button {
    margin-top: 1.5rem;
    padding: 8px 16px;
    background: var(--primary-green);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

/* Add to styles.css */
.daily-view {
    padding: 20px;
}

.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.dashboard-card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: var(--shadow-sm);
}

.welcome-card {
    grid-column: 1 / -1;
    background: var(--primary-green);
    color: white;
}

.welcome-card h2 {
    margin: 0;
    font-size: 24px;
}

.welcome-card .date {
    margin: 8px 0 0;
    opacity: 0.9;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 16px;
    margin-top: 16px;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.stat-label {
    font-size: 14px;
    color: #666;
}

.stat-value {
    font-size: 24px;
    font-weight: bold;
    color: var(--primary-green);
    margin-top: 4px;
}

.empty-state {
    color: #666;
    text-align: center;
    padding: 20px;
    font-style: italic;
}

.leads-page {
    padding: 20px;
}

.leads-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
}

.leads-list {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: var(--shadow-sm);
}

.lead-card {
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.map-container {
    height: 500px;
    background: #f5f5f5;
    border-radius: 8px;
}

.version-content {
    color: #30ff30;
    font-family: 'Courier New', monospace;
    padding: 20px;
}

.version-entry {
    margin-bottom: 30px;
}

.version-entry h2 {
    color: #30ff30;
    font-size: 1.2em;
    margin-bottom: 10px;
}

.version-entry ul {
    list-style-type: none;
    padding-left: 20px;
}

.version-entry li {
    margin-bottom: 8px;
    position: relative;
}

.version-entry li:before {
    content: '>';
    position: absolute;
    left: -15px;
    color: #30ff30;
}

/* Add to your styles.css */
.role-management {
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    box-shadow: var(--shadow-sm);
}

.role-header {
    margin-bottom: 2rem;
}

.role-header h2 {
    margin: 0;
    color: var(--text-black);
}

.role-description {
    color: #666;
    margin-top: 0.5rem;
}

.users-table {
    width: 100%;
    overflow-x: auto;
}

.users-table table {
    width: 100%;
    border-collapse: collapse;
}

.users-table th,
.users-table td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
}

.users-table th {
    font-weight: 500;
    color: #666;
    background: var(--soft-white);
}

.user-info {
    display: flex;
    flex-direction: column;
}

.user-name {
    font-weight: 500;
}

.user-email {
    font-size: 0.875rem;
    color: #666;
}

.current-role {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
}

.current-role.admin {
    background: #e3f2fd;
    color: #1976d2;
}

.current-role.manager {
    background: #e8f5e9;
    color: #2e7d32;
}

.current-role.setter {
    background: #fff3e0;
    color: #e65100;
}

.current-role.closer {
    background: #f3e5f5;
    color: #7b1fa2;
}

.role-select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
}

.update-role-btn {
    padding: 0.5rem 1rem;
    background: var(--primary-green);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.update-role-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
}

.unauthorized-message {
    text-align: center;
    padding: 2rem;
    color: var(--danger-red);
}

/* Add to your styles.css */
.settings-container {
    padding: var(--spacing-md);
    max-width: 1200px;
    margin: 0 auto;
}

.settings-layout {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: var(--spacing-lg);
    margin-top: var(--spacing-lg);
}

.settings-sidebar {
    background: white;
    padding: var(--spacing-md);
    border-radius: 8px;
    box-shadow: var(--shadow-sm);
}

.sidebar-button {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-md);
    background: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: var(--text-black);
    transition: all 0.2s;
    margin-bottom: var(--spacing-sm);
}

.sidebar-button:hover {
    background: var(--soft-white);
}

.sidebar-button.active {
    background: var(--primary-green);
    color: white;
}

.settings-content {
    background: white;
    padding: var(--spacing-lg);
    border-radius: 8px;
    box-shadow: var(--shadow-sm);
    min-height: 500px;
}

.coming-soon {
    text-align: center;
    color: #666;
    padding: var(--spacing-lg);
    font-style: italic;
}

/* User Management Styles */
.user-management {
    padding: var(--spacing-md);
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
}

.section-header h2 {
    margin: 0;
}

.add-button {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: 8px 16px;
    background: var(--primary-green);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.add-button:hover {
    background-color: var(--dark-green);
}

.pending-invites {
    margin-top: var(--spacing-lg);
}

.invites-list {
    display: grid;
    gap: var(--spacing-md);
    margin-top: var(--spacing-md);
}

.invite-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md);
    background: var(--soft-white);
    border-radius: 4px;
    box-shadow: var(--shadow-sm);
}

.invite-info {
    display: flex;
    gap: var(--spacing-lg);
    align-items: center;
}

.invite-info .email {
    font-weight: 500;
}

.invite-info .role {
    color: var(--primary-green);
    font-size: 0.875rem;
    padding: 2px 8px;
    background: rgba(76, 175, 80, 0.1);
    border-radius: 4px;
}

.invite-info .date {
    color: #666;
    font-size: 0.875rem;
}

.cancel-invite-btn {
    background: none;
    border: none;
    color: var(--danger-red);
    cursor: pointer;
    padding: var(--spacing-sm);
    border-radius: 4px;
    display: flex;
    align-items: center;
}

.cancel-invite-btn:hover {
    background: rgba(244, 67, 54, 0.1);
}

.empty-state {
    text-align: center;
    color: #666;
    padding: var(--spacing-lg);
    font-style: italic;
}

/* Modal Styles */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: var(--spacing-lg);
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: var(--shadow-md);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
}

.modal-header h3 {
    margin: 0;
}

.close-modal {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
}

.close-modal:hover {
    color: var(--danger-red);
}

.form-group {
    margin-bottom: var(--spacing-md);
}

.form-group label {
    display: block;
    margin-bottom: var(--spacing-sm);
    color: var(--text-black);
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: var(--spacing-lg);
}

.primary-button {
    background: var(--primary-green);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
}

.primary-button:hover {
    background: var(--dark-green);
}

/* Add to your existing user management styles in styles.css */

/* Form Grid Layout */
.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
}

.full-width {
    grid-column: 1 / -1;
}

/* Enhanced Form Styles */
.form-group label {
    display: block;
    margin-bottom: var(--spacing-sm);
    font-weight: 500;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus {
    border-color: var(--primary-green);
    outline: none;
}

.field-hint {
    font-size: 12px;
    color: #666;
    margin-top: 4px;
}

/* Form Actions */
.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-md);
    margin-top: var(--spacing-md);
    padding-top: var(--spacing-md);
    border-top: 1px solid #eee;
}

.secondary-button {
    padding: 8px 16px;
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #666;
    cursor: pointer;
}

.secondary-button:hover {
    background: #eee;
}

/* Enhanced Invite Card */
.invite-card {
    background: white;
}

.invite-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--spacing-md);
    align-items: center;
}

.invite-info .name {
    font-weight: 500;
}

.invite-info .email {
    color: #666;
}

.invite-info .role {
    justify-self: center;
    padding: 4px 8px;
    background: rgba(76, 175, 80, 0.1);
    border-radius: 4px;
    color: var(--primary-green);
}

.invite-info .date {
    justify-self: end;
    color: #666;
    font-size: 0.875rem;
}

/* Required Field Indicator */
.form-group label::after {
    content: " *";
    color: var(--danger-red);
}

.form-group label:not([for^="optional"])::after {
    content: " *";
    color: var(--danger-red);
}

/* Modal Specific Styles - Add to your styles.css */
.invite-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.invite-modal .modal-content {
    background: white;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.invite-modal .modal-header {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.invite-modal .modal-header h3 {
    margin: 0;
    font-size: 1.25rem;
    color: var(--text-black);
}

.invite-modal .close-button {
    background: none;
    border: none;
    font-size: 20px;
    color: #666;
    cursor: pointer;
    padding: 5px;
}

.invite-modal .close-button:hover {
    color: var(--danger-red);
}

.invite-modal .modal-body {
    padding: 20px;
}

.invite-modal .form-group {
    margin-bottom: 20px;
}

.invite-modal .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.invite-modal label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--text-black);
}

.invite-modal label span.required {
    color: var(--danger-red);
    margin-left: 4px;
}

.invite-modal input,
.invite-modal select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.invite-modal input:focus,
.invite-modal select:focus {
    border-color: var(--primary-green);
    outline: none;
}

.invite-modal .field-hint {
    margin-top: 4px;
    font-size: 12px;
    color: #666;
}

.invite-modal .modal-footer {
    padding: 20px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.invite-modal .btn-cancel {
    padding: 8px 16px;
    background: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #666;
    cursor: pointer;
}

.invite-modal .btn-cancel:hover {
    background: #f5f5f5;
}

.invite-modal .btn-invite {
    padding: 8px 16px;
    background: var(--primary-green);
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
}

.invite-modal .btn-invite:hover {
    background: var(--dark-green);
}

.invite-modal input:disabled,
.invite-modal select:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
}

/* Modal Styles */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-card {
    background: white;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: var(--shadow-md);
}

.modal-header {
    padding: 16px 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    margin: 0;
    font-size: 1.25rem;
    color: var(--text-black);
}

.close-button {
    background: none;
    border: none;
    font-size: 24px;
    color: #666;
    cursor: pointer;
    padding: 4px;
    line-height: 1;
}

.close-button:hover {
    color: var(--danger-red);
}

.modal-content {
    padding: 20px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
}

.form-group {
    margin-bottom: 16px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--text-black);
}

.required {
    color: var(--danger-red);
    margin-left: 4px;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus {
    border-color: var(--primary-green);
    outline: none;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
}

.field-hint {
    margin-top: 4px;
    font-size: 12px;
    color: #666;
}

.modal-footer {
    padding: 16px 20px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

.btn-cancel {
    padding: 8px 16px;
    background: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #666;
    cursor: pointer;
    font-size: 14px;
}

.btn-cancel:hover {
    background: #f5f5f5;
}

.btn-primary {
    padding: 8px 16px;
    background: var(--primary-green);
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
}

.btn-primary:hover {
    background: var(--dark-green);
}

.btn-primary:disabled {
    background: #ccc;
    cursor: not-allowed;
}

/* Workflow Management Styles */
.workflow-management {
    padding: var(--spacing-md);
}

.workflows-list {
    display: grid;
    gap: var(--spacing-md);
    margin-top: var(--spacing-md);
}

.workflow-card {
    background: white;
    border-radius: 8px;
    padding: var(--spacing-md);
    box-shadow: var(--shadow-sm);
    border: 1px solid #eee;
}

.workflow-header {
    margin-bottom: var(--spacing-md);
}

.workflow-header h3 {
    margin: 0;
    color: var(--text-black);
}

.workflow-header p {
    margin: 4px 0 0 0;
    color: #666;
    font-size: 0.875rem;
}

.stages-list {
    display: flex;
    gap: 12px;
    padding: var(--spacing-md) 0;
    overflow-x: auto;
}

.stage-item {
    padding: 8px 12px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 150px;
}

.stage-name {
    font-size: 0.875rem;
    font-weight: 500;
}

.stage-order {
    background: rgba(0, 0, 0, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.75rem;
}

.workflow-actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-sm);
    padding-top: var(--spacing-sm);
    border-top: 1px solid #eee;
}

.workflow-actions button {
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    border-radius: 4px;
    color: #666;
}

.workflow-actions button:hover {
    background: var(--soft-white);
    color: var(--primary-green);
}

.edit-workflow-btn,
.add-stage-btn,
.deactivate-workflow-btn,
.activate-workflow-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
}

.deactivate-workflow-btn {
    color: var(--primary-green);
}

.activate-workflow-btn {
    color: #666;
}

/* Checkbox group styles */
.checkbox-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 8px;
    margin-top: 4px;
}

.checkbox-group label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: normal;
}

/* Color picker styles */
input[type="color"] {
    width: 100%;
    height: 40px;
    padding: 4px;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
}

/* Empty state */
.workflows-list .empty-state {
    text-align: center;
    padding: var(--spacing-lg);
    background: var(--soft-white);
    border-radius: 8px;
    color: #666;
    font-style: italic;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .stages-list {
        flex-wrap: nowrap;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE/Edge */
    }

    .stages-list::-webkit-scrollbar {
        display: none; /* Chrome/Safari/Opera */
    }

    .stage-item {
        min-width: 120px;
    }

    .checkbox-group {
        grid-template-columns: 1fr;
    }
}

/* Add to your styles.css */

.workflow-management {
    padding: var(--spacing-md);
}

.workflows-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}

.workflow-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: var(--shadow-sm);
}

.workflow-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.workflow-header h3 {
    margin: 0;
    color: var(--text-black);
    font-size: 1.25rem;
}

.collection-name {
    color: #666;
    font-size: 0.875rem;
}

.status-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
}

.status-badge.active {
    background: var(--primary-green);
    color: white;
}

.status-badge.inactive {
    background: #e0e0e0;
    color: #666;
}

.phase-preview {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0;
}

.phase-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
}

.card-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1rem;
}

.icon-button {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem;
    border: none;
    background: none;
    color: #666;
    cursor: pointer;
    border-radius: 4px;
}

.icon-button:hover {
    background: var(--soft-white);
    color: var(--primary-green);
}

/* Workflow Editor Styles */
.workflow-editor {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.editor-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

.card-section {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: var(--shadow-sm);
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.phase-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    cursor: pointer;
}

.phase-item:hover {
    border-color: var(--primary-green);
}

.phase-item.selected {
    background: var(--soft-white);
    border-color: var(--primary-green);
}

.phase-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.phase-color {
    width: 1rem;
    height: 1rem;
    border-radius: 999px;
}

.phase-details h3 {
    margin: 0;
    font-size: 1rem;
}

.status-count {
    color: #666;
    font-size: 0.875rem;
    margin: 0;
}

/* Status Styles */
.status-item {
    padding: 1rem;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-bottom: 0.5rem;
}

.status-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.approval-badge {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    color: #f59e0b;
}

.allowed-roles {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.role-badge {
    padding: 0.25rem 0.5rem;
    background: var(--soft-white);
    border-radius: 999px;
    font-size: 0.75rem;
    color: #666;
}

/* Form Styles */
.card-form {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: var(--shadow-sm);
    max-width: 600px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #eee;
}

/* Empty States */
.empty-state {
    text-align: center;
    padding: 2rem;
    color: #666;
}

.empty-state .material-icons {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: #999;
}

/* Back Button */
.back-button {
    padding: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    border-radius: 4px;
}

.back-button:hover {
    background: var(--soft-white);
    color: var(--primary-green);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
    .workflows-grid {
        grid-template-columns: 1fr;
    }

    .editor-grid {
        grid-template-columns: 1fr;
    }
}

/* Dark Mode Styles */
:root {
    /* Light mode variables */
    --bg-primary: #ffffff;
    --bg-secondary: #f5f5f5;
    --text-primary: #333333;
    --text-secondary: #666666;
    --border-color: #eeeeee;
}

:root[data-theme="dark"] {
    /* Dark mode variables */
    --bg-primary: #1a1a1a;
    --bg-secondary: #2d2d2d;
    --text-primary: #ffffff;
    --text-secondary: #cccccc;
    --border-color: #404040;
}

/* Toggle Switch Styles */
.toggle-switch {
    position: relative;
    width: 60px;
    height: 34px;
    display: inline-block;
}

.toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
}

.toggle-slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}

input:checked + .toggle-slider {
    background-color: var(--primary-green);
}

input:checked + .toggle-slider:before {
    transform: translateX(26px);
}

/* Interactive States */
.sidebar-button {
    transition: all 0.2s ease;
}

.sidebar-button:hover {
    background-color: var(--bg-secondary);
    transform: translateX(4px);
}

.sidebar-button.active {
    background-color: var(--primary-green);
    color: white;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    border-color: var(--primary-green);
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
    outline: none;
}

/* Card hover effects */
.workflow-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.workflow-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Add to your workflow management styles */
:root[data-theme="dark"] .workflow-card {
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
}

:root[data-theme="dark"] .workflow-card h3 {
    color: var(--text-primary);
}

:root[data-theme="dark"] .collection-name {
    color: var(--text-secondary);
}

:root[data-theme="dark"] .phase-badge {
    border-color: var(--border-color);
}

:root[data-theme="dark"] .card-section {
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
}

:root[data-theme="dark"] .phase-item {
    border-color: var(--border-color);
    background-color: var(--bg-primary);
}

:root[data-theme="dark"] .phase-item:hover {
    border-color: var(--primary-green);
}

/* Profile styles */
.profile-view {
    display: grid;
    gap: 1.5rem;
}

.profile-field {
    display: grid;
    gap: 0.5rem;
}

.profile-field label {
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.profile-field p {
    color: var(--text-primary);
    margin: 0;
    font-size: 1rem;
}

.edit-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: var(--primary-green);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.edit-button:hover {
    background-color: var(--dark-green);
}

/* Add to your styles.css */

.toggle-switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin: 0;
}

.toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
}

.toggle-slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}

.toggle-switch input:checked + .toggle-slider {
    background-color: var(--primary-green);
}

.toggle-switch input:checked + .toggle-slider:before {
    transform: translateX(26px);
}

.preference-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    margin-bottom: 1rem;
}

.preference-info {
    flex: 1;
    margin-right: 1rem;
}

.preference-info h3 {
    margin: 0;
    font-size: 1rem;
    color: var(--text-primary);
}

.preference-info p {
    margin: 0.25rem 0 0;
    font-size: 0.875rem;
    color: var(--text-secondary);
}

/* In styles.css */
:root {
    /* Light theme variables */
    --bg-primary: #ffffff;
    --bg-secondary: #f5f5f5;
    --text-primary: #333333;
    --text-secondary: #666666;
    --border-color: #e0e0e0;
    --card-bg: #ffffff;
}

:root[data-theme="dark"] {
    /* Dark theme variables */
    --bg-primary: #1a1a1a;
    --bg-secondary: #2d2d2d;
    --text-primary: #ffffff;
    --text-secondary: #cccccc;
    --border-color: #404040;
    --card-bg: #2d2d2d;
}

/* Apply these variables to base elements */
body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
}

.card-section {
    background-color: var(--card-bg);
    border-color: var(--border-color);
}

/* Add to styles.css */
.loading-state,
.error-state {
    text-align: center;
    padding: 2rem;
    color: var(--text-secondary);
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--border-color);
    border-top-color: var(--primary-green);
    border-radius: 50%;
    margin: 0 auto 1rem;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.workflows-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}

.workflow-card {
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 1.5rem;
}

/* Add to styles.css */

/* Workflow Management Container */
.workflow-management {
    padding: var(--spacing-md);
}

/* Workflow Grid */
.workflows-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}

/* Workflow Card */
.workflow-card {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 1.5rem;
}

.workflow-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.workflow-header h3 {
    margin: 0;
    color: var(--text-primary);
    font-size: 1.25rem;
}

.collection-name {
    font-size: 0.875rem;
    color: var(--text-secondary);
}

/* Status Badge */
.status-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
}

.status-badge.active {
    background: var(--primary-green);
    color: white;
}

.status-badge.inactive {
    background: #e0e0e0;
    color: #666;
}

/* Phase Preview */
.phase-preview {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0;
}

.phase-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
}

/* Card Actions */
.card-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
}

/* Icon Buttons */
.icon-button {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem;
    border: none;
    background: none;
    color: var(--text-secondary);
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.icon-button:hover {
    background: var(--bg-secondary);
    color: var(--primary-green);
}

/* Empty State */
.empty-state {
    text-align: center;
    padding: 3rem;
    color: var(--text-secondary);
}

.empty-state .material-icons {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: var(--text-secondary);
}

/* Workflow Editor */
.workflow-editor {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.editor-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

/* Phase Section */
.phases-section,
.statuses-section {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 1.5rem;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.phase-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    margin-bottom: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.phase-item:hover {
    border-color: var(--primary-green);
}

.phase-item.selected {
    background: var(--bg-secondary);
    border-color: var(--primary-green);
}

/* Forms */
.card-form {
    max-width: 600px;
    margin: 0 auto;
    background: var(--bg-primary);
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid var(--border-color);
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background: var(--bg-primary);
    color: var(--text-primary);
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
}

/* Dark mode support */
:root[data-theme="dark"] .workflow-card,
:root[data-theme="dark"] .phases-section,
:root[data-theme="dark"] .statuses-section,
:root[data-theme="dark"] .card-form {
    background: var(--bg-secondary);
    border-color: var(--border-color);
}

:root[data-theme="dark"] .status-badge.inactive {
    background: #404040;
    color: #999;
}

:root[data-theme="dark"] .phase-item {
    background: var(--bg-primary);
}

:root[data-theme="dark"] .phase-item.selected {
    background: var(--bg-secondary);
}

/* Workflow Management Container */
.workflow-management {
    padding: 1.5rem;
}

/* Info Container */
.info-container {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.info-container h1 {
    color: #333;
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.definitions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
}

.definition-item {
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 6px;
}

.definition-item h3 {
    color: #4CAF50;
    margin-bottom: 0.5rem;
}

/* Workflows Container */
.workflows-container {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.create-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.create-button:hover {
    background: #45a049;
}

/* Workflow Grid */
.workflows-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

.workflow-card {
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1.5rem;
    transition: all 0.2s;
}

.workflow-card:hover {
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transform: translateY(-2px);
}

.workflow-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.workflow-header h3 {
    margin: 0;
    color: #333;
}

.collection-name {
    font-size: 0.875rem;
    color: #666;
}

.status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
}

.status-badge.active {
    background: #e8f5e9;
    color: #2e7d32;
}

.status-badge.inactive {
    background: #f5f5f5;
    color: #666;
}

.phase-preview {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0;
}

.phase-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
}

/* Workflow Form */
.workflow-form {
    max-width: 600px;
    margin: 0 auto;
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    border-color: #4CAF50;
    outline: none;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
}

/* Workflow Editor */
.workflow-editor {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.editor-header {
    margin-bottom: 2rem;
}

.editor-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    .workflow-management {
        padding: 1rem;
    }

    .definitions {
        grid-template-columns: 1fr;
    }

    .workflows-grid {
        grid-template-columns: 1fr;
    }

    .editor-grid {
        grid-template-columns: 1fr;
    }
}

//**End of code or start of new file** 
 
// File: app-root.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\app-root.js
// Current Code:

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

//**End of code or start of new file** 
 
// File: app.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\app.js
// Current Code:

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

//**End of code or start of new file** 
 
// File: package.json
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\package.json
// Current Code:

{
  "name": "salesblanket",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "clean": "if exist public\\app\\dist\\ rd /s /q public\\app\\dist",
    "make-dist": "if not exist public\\app\\dist mkdir public\\app\\dist",
    "build": "node build.js",
    "watch": "node build.js --watch",
    "start": "npm run build && firebase emulators:start --only hosting",
    "dev": "npm run build && firebase emulators:start --only hosting",
    "test": "jest",
    "lint": "eslint src/**/*.js",
    "serve": "firebase serve --only hosting",
    "serve-marketing": "http-server public/marketing -p 8081",
    "deploy": "npm run build && firebase deploy",
    "deploy-marketing": "firebase deploy --only hosting:marketing"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "concurrently": "^8.0.0",
    "dotenv": "^16.4.7",
    "dotenv-expand": "^12.0.1",
    "esbuild": "^0.24.2",
    "eslint": "^8.15.0",
    "gulp": "^5.0.0",
    "gulp-concat": "^2.6.1",
    "gulp-insert": "^0.5.0",
    "html-webpack-plugin": "^5.6.3",
    "jest": "^29.0.0",
    "webpack-merge": "^6.0.1"
  },
  "dependencies": {
    "lodash": "^4.17.21",
    "vinyl-fs": "^4.0.0"
  }
}


//**End of code or start of new file** 
 
// File: build.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\build.js
// Current Code:

const { context } = require('esbuild');
const fs = require('fs');
const path = require('path');

const isWatchMode = process.argv.includes('--watch');

// Function to bundle CSS
async function bundleCSS() {
  const cssDir = path.join(__dirname, 'src/components/settings/preferences/styles');
  let combinedCSS = '';
  
  try {
    const files = fs.readdirSync(cssDir);
    for (const file of files) {
      if (file.endsWith('.css')) {
        const cssContent = fs.readFileSync(path.join(cssDir, file), 'utf8');
        combinedCSS += cssContent + '\n';
      }
    }
    
    // Write combined CSS to public directory
    fs.writeFileSync(
      path.join(__dirname, 'public/dist/styles.css'),
      combinedCSS
    );
  } catch (error) {
    console.error('Error bundling CSS:', error);
  }
}

// Main build function
(async () => {
  try {
    // Bundle CSS first
    await bundleCSS();

    const ctx = await context({
      entryPoints: ['src/app.js'],
      bundle: true,
      outfile: 'public/dist/bundle.js',
      format: 'esm',
      platform: 'browser',
      sourcemap: true,
      minify: true,
      target: ['es2020'],
      loader: { 
        '.js': 'jsx',
        '.json': 'json'
      },
      define: {
        'process.env.NODE_ENV': '"development"'
      },
      plugins: [{
        name: 'watch-plugin',
        setup(build) {
          build.onEnd(result => {
            if (result.errors.length > 0) {
              console.error('Build failed:', result.errors);
            } else {
              console.log('Build completed successfully');
            }
          });
        },
      }]
    });

    if (isWatchMode) {
      console.log('Watching for changes...');
      await ctx.watch();
    } else {
      console.log('Building the project...');
      await ctx.rebuild();
      await ctx.dispose();
    }
  } catch (error) {
    console.error('Build error:', error);
    process.exit(1);
  }
})();

//**End of code or start of new file** 
 
// File: updates.txt
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\updates.txt
// Current Code:

# Updates Log

## Version 1.0.1
Date: 12/19/2024
Changes:
- Fixed authentication flow to direct to daily-view instead of settings page
- Added daily-view button to navigation menu
- Corrected routes organization and imports
- Added profile completion notification instead of forced redirect
- Implemented proper routing for authenticated/public pages

Previous version: 1.0.0

//**End of code or start of new file** 
 
// File: data\collections.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\core\data\collections.js
// Current Code:



//**End of code or start of new file** 
 
// File: data\workflows.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\core\data\workflows.js
// Current Code:

// src/core/data/workflows.js

// Main workflow schema
export const WORKFLOW_SCHEMA = {
    // Core workflow properties
    id: '',                    // Firestore document ID
    name: '',                  // Collection name this workflow applies to (e.g. 'inspections', 'contacts')
    description: '',           // Purpose/details of this workflow
    active: true,             // Whether workflow is currently active
    
    // Phases and their stages
    phases: [
        {
            id: '',           // Unique identifier for phase
            name: '',         // Display name (e.g. "Intake", "Review", "Completion")
            description: '',   // Phase description
            order: 0,         // Display/processing order
            color: '',        // Color for visual grouping
            stages: [         // Statuses within this phase
                {
                    id: '',                  // Unique identifier for stage
                    name: '',                // Display name for the stage
                    description: '',         // Stage description 
                    order: 0,               // Order within phase
                    color: '',              // Visual identifier
                    requiresApproval: false, // Whether moving to this stage needs approval
                    allowedRoles: [],       // Which roles can move items to this stage
                    nextStages: [],         // Allowed next stages (for non-linear flows)
                    fieldRequirements: [],  // Required fields to move to this stage
                    notifications: [],      // Notifications to trigger
                    automations: []         // Automations to run
                }
            ]
        }
    ],

    // Metadata
    createdBy: '',
    createdAt: null,
    updatedAt: null,
    version: 1
};

// Example of a notification configuration
export const NOTIFICATION_CONFIG = {
    type: 'EMAIL' | 'SMS' | 'IN_APP',
    template: '', // Template ID or content
    recipients: [], // Array of user IDs or roles
    conditions: {} // Optional conditions for when to send
};

// Example of an automation configuration
export const AUTOMATION_CONFIG = {
    type: 'UPDATE_FIELD' | 'CREATE_TASK' | 'TRIGGER_INTEGRATION',
    config: {},   // Configuration specific to automation type
    conditions: {} // Optional conditions for when to run
};

// Example field requirement configuration
export const FIELD_REQUIREMENT = {
    fieldId: '',
    required: true,
    validations: {} // Optional validation rules
};

// Helper class for workflow management
export class WorkflowManager {
    constructor(firestore) {
        this.db = firestore;
        this.workflowsRef = this.db.collection('workflows');
    }

    // Create new workflow
    async createWorkflow(workflowData) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        
        const workflow = {
            ...WORKFLOW_SCHEMA,
            ...workflowData,
            createdAt: timestamp,
            updatedAt: timestamp
        };

        try {
            const docRef = await this.workflowsRef.add(workflow);
            return { id: docRef.id, ...workflow };
        } catch (error) {
            console.error('Error creating workflow:', error);
            throw error;
        }
    }

    // Add phase to workflow
    async addPhase(workflowId, phaseData) {
        try {
            const workflow = await this.getWorkflow(workflowId);
            const newPhase = {
                id: crypto.randomUUID(),
                order: workflow.phases.length,
                stages: [],
                ...phaseData
            };

            await this.workflowsRef.doc(workflowId).update({
                phases: firebase.firestore.FieldValue.arrayUnion(newPhase),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            return newPhase;
        } catch (error) {
            console.error('Error adding phase:', error);
            throw error;
        }
    }

    // Add stage to phase
    async addStage(workflowId, phaseId, stageData) {
        try {
            const workflow = await this.getWorkflow(workflowId);
            const phaseIndex = workflow.phases.findIndex(p => p.id === phaseId);
            
            if (phaseIndex === -1) throw new Error('Phase not found');

            const newStage = {
                id: crypto.randomUUID(),
                order: workflow.phases[phaseIndex].stages.length,
                ...stageData
            };

            const updatedPhases = [...workflow.phases];
            updatedPhases[phaseIndex].stages.push(newStage);

            await this.workflowsRef.doc(workflowId).update({
                phases: updatedPhases,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            return newStage;
        } catch (error) {
            console.error('Error adding stage:', error);
            throw error;
        }
    }

    // Validate stage transition within workflow
    async validateStageTransition(workflowId, fromStageId, toStageId, itemData = {}) {
        const workflow = await this.getWorkflow(workflowId);
        let fromStage, toStage;

        // Find stages in any phase
        workflow.phases.forEach(phase => {
            const foundFromStage = phase.stages.find(s => s.id === fromStageId);
            const foundToStage = phase.stages.find(s => s.id === toStageId);
            if (foundFromStage) fromStage = foundFromStage;
            if (foundToStage) toStage = foundToStage;
        });

        if (!fromStage || !toStage) {
            throw new Error('Invalid stage transition');
        }

        // Check if transition is allowed
        if (!fromStage.nextStages.includes(toStageId)) {
            throw new Error('Invalid stage transition sequence');
        }

        // Check required fields
        const missingFields = toStage.fieldRequirements.filter(
            field => !itemData[field]
        );

        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        return true;
    }

    // Helper methods for workflow management
    async getWorkflow(workflowId) {
        const doc = await this.workflowsRef.doc(workflowId).get();
        if (!doc.exists) throw new Error('Workflow not found');
        return { id: doc.id, ...doc.data() };
    }

    async getWorkflows() {
        const snapshot = await this.workflowsRef.where('active', '==', true).get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }
}

//**End of code or start of new file** 
 
// File: schemas\defaultSettings.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\core\schemas\defaultSettings.js
// Current Code:

// src/core/schemas/defaultSettings.js

export const DEFAULT_SETTINGS = {
    system: {
        language: 'en',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        dateFormat: 'MM/DD/YYYY',
        autoSave: true,
        dataSync: true
    },
    notifications: {
        emailNotifications: false,
        textNotifications: false,
        appNotifications: true,
        quietHours: {
            start: '22:00',
            end: '07:00'
        }
    },
    appearance: {
        theme: 'light',
        fontSize: 'medium',
        colorScheme: 'default'
    },
    preferences: {
        defaultView: 'dashboard',
        startingPage: 'daily-view',
        timeFormat: '12h'
    }
};

// Helper to get a nested setting value
export function getDefaultSetting(path) {
    return path.split('.').reduce((obj, key) => 
        obj && obj[key] !== undefined ? obj[key] : null
    , DEFAULT_SETTINGS);
}

// Helper to check if a value matches default
export function isDefaultValue(path, value) {
    const defaultValue = getDefaultSetting(path);
    return JSON.stringify(value) === JSON.stringify(defaultValue);
}

// Helper to validate a setting path exists
export function isValidSettingPath(path) {
    return getDefaultSetting(path) !== null;
}

//**End of code or start of new file** 
 
// File: schemas\userSchema.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\core\schemas\userSchema.js
// Current Code:

// src/core/schemas/userSchema.js

export const USER_SCHEMA = {
    // System Fields
    system: {
        uid: { type: 'string', editable: false, required: true },
        email: { type: 'string', editable: false, required: true },
        role: { type: 'string', editable: false, required: true, default: 'pending' },
        status: { type: 'string', editable: false, required: true, default: 'active' },
        createdAt: { type: 'timestamp', editable: false, required: true },
        lastActive: { type: 'timestamp', editable: false, required: true }
    },
    
    // Basic Information
    basicInfo: {
        firstName: { type: 'string', editable: true, required: true },
        lastName: { type: 'string', editable: true, required: true },
        dateOfBirth: { type: 'date', editable: true, required: true },
        mobilePhone: { type: 'string', editable: true, required: true }
    },

    // Address Information
    address: {
        line1: { type: 'string', editable: true, required: true },
        line2: { type: 'string', editable: true, required: false },
        city: { type: 'string', editable: true, required: true },
        state: { type: 'string', editable: true, required: true },
        zip: { type: 'string', editable: true, required: true },
        country: { type: 'string', editable: true, required: true }
    },

    // Current Location
    location: {
        currentLocation: { type: 'geopoint', editable: true, required: false }
    },

    // User Settings & Preferences
    settings: {
        system: {
            language: { type: 'string', editable: true, required: true, default: 'en' },
            timezone: { 
                type: 'string', 
                editable: true, 
                required: true, 
                default: () => Intl.DateTimeFormat().resolvedOptions().timeZone 
            },
            dateFormat: { type: 'string', editable: true, required: true, default: 'MM/DD/YYYY' },
            autoSave: { type: 'boolean', editable: true, required: true, default: true },
            dataSync: { type: 'boolean', editable: true, required: true, default: true }
        },
        notifications: {
            emailNotifications: { type: 'boolean', editable: true, required: true, default: false },
            textNotifications: { type: 'boolean', editable: true, required: true, default: false },
            appNotifications: { type: 'boolean', editable: true, required: true, default: true },
            quietHours: {
                start: { type: 'string', editable: true, required: true, default: '22:00' },
                end: { type: 'string', editable: true, required: true, default: '07:00' }
            }
        },
        appearance: {
            theme: { type: 'string', editable: true, required: true, default: 'light' },
            fontSize: { type: 'string', editable: true, required: true, default: 'medium' },
            colorScheme: { type: 'string', editable: true, required: true, default: 'default' }
        },
        preferences: {
            defaultView: { type: 'string', editable: true, required: true, default: 'dashboard' },
            startingPage: { type: 'string', editable: true, required: true, default: 'daily-view' },
            timeFormat: { type: 'string', editable: true, required: true, default: '12h' }
        }
    },

    // Personal Information (optional)
    personal: {
        favoriteColor: { type: 'string', editable: true, required: false },
        favoriteHobby: { type: 'string', editable: true, required: false },
        favoriteFood: { type: 'string', editable: true, required: false }
    },

    // Family Information (optional)
    family: {
        children: {
            type: 'array',
            items: {
                firstName: { type: 'string' },
                birthday: { type: 'date' }
            },
            editable: true,
            required: false
        },
        pets: { type: 'array', items: { type: 'string' }, editable: true, required: false },
        partner: {
            firstName: { type: 'string', editable: true, required: false },
            lastName: { type: 'string', editable: true, required: false },
            birthday: { type: 'date', editable: true, required: false }
        }
    },

    // Goals
    goals: {
        personal: {
            oneYear: { type: 'string', editable: true, required: false },
            fiveYear: { type: 'string', editable: true, required: false },
            tenYear: { type: 'string', editable: true, required: false }
        },
        company: {
            oneYear: { type: 'string', editable: true, required: false },
            fiveYear: { type: 'string', editable: true, required: false },
            tenYear: { type: 'string', editable: true, required: false }
        }
    }
};

// Function to create a new user document with all defaults
export function createNewUserDocument(authUser) {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const doc = { createdAt: timestamp, lastActive: timestamp };
    
    // Recursively build document using schema defaults
    function buildFromSchema(schema, target = {}) {
        Object.entries(schema).forEach(([key, field]) => {
            if (field.type === 'object') {
                target[key] = buildFromSchema(field.properties);
            } else if (field.default !== undefined) {
                target[key] = typeof field.default === 'function' ? field.default() : field.default;
            }
        });
        return target;
    }

    // Build full document from schema
    const userDoc = buildFromSchema(USER_SCHEMA);

    // Override with auth user data
    return {
        ...userDoc,
        'system.uid': authUser.uid,
        'system.email': authUser.email,
        createdAt: timestamp,
        lastActive: timestamp
    };
}

// Validate user document against schema
export function validateUserDocument(data) {
    const errors = [];
    
    function validateField(fieldData, fieldSchema, path) {
        if (fieldSchema.required && !fieldData) {
            errors.push(`${path} is required`);
        }
        
        if (fieldData && fieldSchema.type === 'date') {
            const date = new Date(fieldData);
            if (isNaN(date.getTime())) {
                errors.push(`${path} must be a valid date`);
            }
        }
    }
    
    function traverseSchema(data, schema, parentPath = '') {
        Object.entries(schema).forEach(([key, value]) => {
            const currentPath = parentPath ? `${parentPath}.${key}` : key;
            
            if (value.type === 'object') {
                traverseSchema(data[key] || {}, value.properties, currentPath);
            } else {
                validateField(data[key], value, currentPath);
            }
        });
    }
    
    traverseSchema(data, USER_SCHEMA);
    return errors;
}

//**End of code or start of new file** 
 
// File: security\claims.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\core\security\claims.js
// Current Code:



//**End of code or start of new file** 
 
// File: security\rules.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\core\security\rules.js
// Current Code:

// src/core/security/roles.js
export const ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    SETTER: 'setter',
    CLOSER: 'closer'
};

export const ROLE_PERMISSIONS = {
    [ROLES.ADMIN]: {
        canManageRoles: true,
        canManageTerritories: true,
        canViewAllData: true,
        canAssignTasks: true,
        canSetAutomations: true,
        canManageSettings: true,
        canDeleteData: true
    },
    [ROLES.MANAGER]: {
        canViewTeamData: true,
        canAssignTasks: true,
        canViewReports: true,
        canManageTeamTerritories: true,
        canApproveRequests: true
    },
    [ROLES.SETTER]: {
        canCreateLeads: true,
        canUpdateLeads: true,
        canViewAssignedTerritories: true,
        canCreateTasks: true,
        canCompleteAssignedTasks: true
    },
    [ROLES.CLOSER]: {
        canViewLeads: true,
        canUpdateLeads: true,
        canScheduleAppointments: true,
        canCompleteAssignedTasks: true,
        canViewAssignedTerritories: true
    }
};

// Role validation and checking functions
export const isValidRole = (role) => Object.values(ROLES).includes(role);

export const hasPermission = (userRole, permission) => {
    if (!userRole || !ROLE_PERMISSIONS[userRole]) return false;
    return ROLE_PERMISSIONS[userRole][permission] || false;
};

export const getDefaultRoleState = (role) => ({
    [ROLES.ADMIN]: false,
    [ROLES.MANAGER]: false,
    [ROLES.SETTER]: false,
    [ROLES.CLOSER]: false,
    role: role
});

//**End of code or start of new file** 
 
// File: forms\address-form.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\forms\address-form.js
// Current Code:



//**End of code or start of new file** 
 
// File: forms\contact-form.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\forms\contact-form.js
// Current Code:



//**End of code or start of new file** 
 
// File: forms\search-form.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\forms\search-form.js
// Current Code:



//**End of code or start of new file** 
 
// File: forms\task-form.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\forms\task-form.js
// Current Code:



//**End of code or start of new file** 
 
// File: modals\alert.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\modals\alert.js
// Current Code:



//**End of code or start of new file** 
 
// File: modals\confirm.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\modals\confirm.js
// Current Code:



//**End of code or start of new file** 
 
// File: modals\kanban.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\modals\kanban.js
// Current Code:



//**End of code or start of new file** 
 
// File: modals\popup.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\modals\popup.js
// Current Code:

export class CustomModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .modal {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 90%;
                    max-width: 500px;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    z-index: 1000;
                    overflow: hidden;
                }
                .modal-content {
                    padding: 20px;
                }
                .close {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    cursor: pointer;
                    font-size: 20px;
                }
            </style>
            <div class="modal">
                <span class="close" onclick="this.parentElement.remove()">×</span>
                <div class="modal-content">
                    <slot name="content">Default Content</slot>
                </div>
            </div>
        `;
    }
}

customElements.define('custom-modal', CustomModal);


//**End of code or start of new file** 
 
// File: modals\version-modal.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\modals\version-modal.js
// Current Code:

// src/components/modals/version-modal.js
export class VersionModal extends HTMLElement {
    constructor() {
        super();
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    connectedCallback() {
        this.render();
        document.addEventListener('keydown', this.handleKeyPress);
    }

    disconnectedCallback() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    close() {
        this.remove();
    }

    getVersionHistory() {
        return `
    SalesBlanket Version History
    ===========================
    
    Version 1.0.2 (December 21, 2024)
    --------------------------------
    • Added role management system
    • Implemented user invite functionality
    • Updated phase structure to include communication systems
    • Reorganized development roadmap
    
    Phase 1: Core System Updates & Role Management
    --------------------------------------------
    1. Role System Restructuring
       • Update existing roles (setter, closer)
       • Add manager role
       • Create role assignment interface in settings
       • Update security rules
       • Add role-specific views/access
    
    2. Collection Structure Updates
       • Addresses collection stages
         - new_without_contact
         - do_not_solicit
         - damage_present
         - go_back
       • Contacts collection stages
         - new_without_address
         - do_not_solicit
         - address_added
       • Leads collection stages
         - appointment_scheduled
    
    3. Basic UI Components
       • Implement reusable kanban board
       • Update navigation for new roles
       • Add settings interfaces
    
    Phase 2: Communications & Territory Management
    -------------------------------------------
    1. Communication Systems
       • Email Integration
         - SMTP/Email service setup
         - User invite emails
         - Notification templates
         - Email verification
       • Twilio SMS Integration
         - SMS verification
         - Text notifications
         - Opt-in/out management
       • Communication Preferences
         - User notification settings
         - Frequency controls
    
    2. Territory Management
       • Create territory drawing interface
       • Territory assignment system
       • Boundary management
       • Territory sharing capabilities
       • Admin-only territory controls
    
    3. Map Component Enhancement
       • Collection-based filters
       • Status-based pin colors
       • Territory overlay visualization
       • Area selection tools
       • Filter views by collection type
    
    Phase 3: Task & Automation System
    -------------------------------
    1. Task Management
       • Basic task creation
       • Door knock tracking
       • Flyer status tracking
       • Task assignment system
       • Task completion workflows
    
    2. Automation System
       • Settings page automation builder
       • Notification rule configuration
       • Task generation rules
       • Follow-up automation
    
    Phase 4: Integration Systems
    --------------------------
    1. GHL Integration
       • API connection setup
       • Contact sync
       • Appointment sync
       • Task sync
       • Error handling & retry logic
    
    2. Notification System
       • Access request notifications
       • Territory-based alerts
       • Geographic grouping
       • Manager alerts
       • Task notifications
    
    Phase 5: Advanced Features & Reporting
    ----------------------------------
    1. Progress Tracking
       • User performance metrics
       • Territory performance tracking
       • Conversion rate tracking
       • Activity logging
    
    2. Reporting System
       • Basic reports
       • Custom report builder
       • Automated reporting
       • Export capabilities
    
    Phase 6: Optimization & Enhancement
    --------------------------------
    1. System Optimization
       • Performance improvements
       • Data caching
       • Load time optimization
       • Mobile responsiveness
    
    2. User Experience Enhancements
       • Bulk operations
       • Advanced filters
       • Quick actions
       • User preferences
    
    Dependencies & Considerations:
    ---------------------------
    1. Role system must be completed before territory management
    2. Collection structure updates needed before task system
    3. Basic UI components required for all phases
    4. Communication systems needed for notifications
    5. Territory system needed before geographic notifications
    
    Previous Versions:
    ----------------
    Version 1.0.1 (December 20, 2024)
    • Fixed authentication flow to direct to daily-view
    • Added daily-view button to navigation menu
    • Corrected routes organization and imports
    • Added profile completion notification
    • Implemented proper routing for authenticated/public pages
    
    Version 1.0.0 (December 19, 2024)
    • Initial release
    • Basic authentication system
    • User role management
    • Navigation structure
    • Core application framework`;
    }

    render() {
        this.innerHTML = `
            <div class="version-modal">
                <div class="terminal-window">
                    <div class="terminal-header">
                        <div class="terminal-title">Version History</div>
                        <button class="terminal-close">×</button>
                    </div>
                    <div class="terminal-content">
                        <pre class="terminal-text">${this.getVersionHistory()}</pre>
                    </div>
                </div>
            </div>
        `;

        this.querySelector('.terminal-close').addEventListener('click', () => this.close());
    }
}

customElements.define('version-modal', VersionModal);

//**End of code or start of new file** 
 
// File: shared\error.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\shared\error.js
// Current Code:



//**End of code or start of new file** 
 
// File: shared\footer.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\shared\footer.js
// Current Code:

// src/components/shared/footer.js
export class FooterBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <footer class="main-footer">
                <div class="footer-content">
                    <div class="copyright-text">
                        © ${new Date().getFullYear()} SalesBlanket. All Operations & Intellectual Property Rights 
                        Reserved. Patent Pending.
                    </div>
                    <div class="company-info">
                        RenewedSolutions<br>
                        est. 2024
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('footer-bar', FooterBar);

//**End of code or start of new file** 
 
// File: shared\google-login.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\shared\google-login.js
// Current Code:

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

//**End of code or start of new file** 
 
// File: shared\header.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\shared\header.js
// Current Code:

// src/components/shared/header.js
export class HeaderBar extends HTMLElement {
    constructor() {
        super();
        this.user = null;
    }

    connectedCallback() {
        this.render();
    }

    async checkProfileStatus(uid) {
        try {
            const doc = await firebase.firestore()
                .collection('users')
                .doc(uid)
                .get();
    
            if (doc.exists) {
                const data = doc.data();
                return !data.firstName || !data.lastName || !data.mobilePhone;
            }
            return true;
        } catch (error) {
            console.error('Error checking profile status:', error);
            return false;
        }
    }

    render() {
        this.innerHTML = `
            <header class="main-header">
                <div class="brand-section">
                    <div class="logo">SalesBlanket</div>
                    <div class="version">v1.0.0</div>
                </div>
                <div id="auth-section" class="auth-section"></div>
            </header>
        `;

        this.setupVersionClick();
        this.setupAuthDisplay();
    }

    setupVersionClick() {
        console.log('Setting up version click handler');
        const versionElement = this.querySelector('.version');
        console.log('Version element:', versionElement);

        if (versionElement) {
            versionElement.addEventListener('click', () => {
                console.log('Version clicked');
                try {
                    const modal = document.createElement('version-modal');
                    document.body.appendChild(modal);
                    console.log('Modal created and appended');
                } catch (error) {
                    console.error('Error creating modal:', error);
                }
            });
        } else {
            console.warn('Version element not found');
        }
    }

    async setupAuthDisplay() {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                this.querySelector('#auth-section').innerHTML = '';
                return;
            }

            this.user = user;
            this.needsProfileUpdate = await this.checkProfileStatus(user.uid);

            const authSection = this.querySelector('#auth-section');
            authSection.innerHTML = `
                <span class="user-name">${user.displayName || 'User'}</span>
                <div class="notification-wrapper">
                    <div class="notification-icon ${this.needsProfileUpdate ? 'active' : ''}">
                        <span class="material-icons">local_police</span>
                        ${this.needsProfileUpdate ? '<div class="notification-pulse"></div>' : ''}
                    </div>
                    <div class="notification-dropdown">
                        <div class="notification-header">
                            <h3>Notifications</h3>
                        </div>
                        <div class="notification-list">
                            ${this.needsProfileUpdate ? `
                                <div class="notification-item" data-action="complete-profile">
                                    <div class="notification-content">
                                        <span class="material-icons">warning</span>
                                        <div class="notification-text">
                                            <p>Complete your employee profile</p>
                                            <small>Required for full access</small>
                                        </div>
                                    </div>
                                </div>
                            ` : `
                                <div class="notification-empty">
                                    <p>No new notifications</p>
                                </div>
                            `}
                        </div>
                    </div>
                </div>
                <button id="settings-btn" class="settings-button">
                    <span id="settings-btn" class="material-icons" style="cursor: pointer; margin: 0 10px;">settings</span>
                </button>
                <button id="signout-btn" class="signout-button">Sign Out</button>
            `;

            this.setupNotifications();
            this.setupButtons();
        });
    }

    setupNotifications() {
        const notificationIcon = this.querySelector('.notification-icon');
        const notificationDropdown = this.querySelector('.notification-dropdown');
    
        if (notificationIcon && notificationDropdown) {
            notificationIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                notificationDropdown.classList.toggle('show');
            });
    
            const notificationItem = this.querySelector('.notification-item');
            if (notificationItem) {
                notificationItem.addEventListener('click', () => {
                    window.location.hash = 'settings';
                    notificationDropdown.classList.remove('show');
                });
            }
    
            document.addEventListener('click', (e) => {
                if (!notificationDropdown.contains(e.target) &&
                    !notificationIcon.contains(e.target)) {
                    notificationDropdown.classList.remove('show');
                }
            });
        }
    }

    setupButtons() {
        this.querySelector('#signout-btn')?.addEventListener('click', () => {
            firebase.auth().signOut();
        });

        this.querySelector('#settings-btn')?.addEventListener('click', () => {
            window.location.hash = 'settings';
        });
    }
}

customElements.define('header-bar', HeaderBar);

//**End of code or start of new file** 
 
// File: shared\loading.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\shared\loading.js
// Current Code:



//**End of code or start of new file** 
 
// File: shared\map-component.css
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\shared\map-component.css
// Current Code:

/* src/components/shared/map-component.css */

/* Map Container */
map-component {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 500px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Map Controls */
.map-controls {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 8px;
}

.control-panel {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.control-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    color: #333;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease;
    white-space: nowrap;
}

.control-btn:hover {
    background: #f5f5f5;
    border-color: #4CAF50;
    color: #4CAF50;
}

.control-btn .material-icons {
    font-size: 18px;
}

.control-btn.active {
    background: #4CAF50;
    border-color: #4CAF50;
    color: white;
}

/* Info Window Styles */
.info-window {
    padding: 12px;
    max-width: 300px;
}

.info-window h3 {
    margin: 0 0 8px 0;
    color: #333;
    font-size: 16px;
}

.info-window p {
    margin: 4px 0;
    color: #666;
    font-size: 14px;
}

.info-actions {
    display: flex;
    gap: 8px;
    margin-top: 12px;
}

.info-actions button {
    padding: 6px 12px;
    background: #4CAF50;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 12px;
    transition: background-color 0.2s;
}

.info-actions button:hover {
    background: #45a049;
}

/* Territory Drawing Styles */
.drawing-controls {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid #e0e0e0;
}

.territory-legend {
    position: absolute;
    bottom: 24px;
    right: 24px;
    background: white;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.territory-item {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
}

.territory-color {
    width: 16px;
    height: 16px;
    border-radius: 4px;
}

.territory-name {
    font-size: 12px;
    color: #666;
}

/* Status Indicators */
.status-badge {
    display: inline-flex;
    align-items: center;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
}

.status-badge.pending {
    background: #fff3e0;
    color: #e65100;
}

.status-badge.active {
    background: #e8f5e9;
    color: #2e7d32;
}

.status-badge.completed {
    background: #e3f2fd;
    color: #1976d2;
}

.status-badge.cancelled {
    background: #f5f5f5;
    color: #666;
}

/* Route Optimization UI */
.route-panel {
    position: absolute;
    top: 10px;
    right: 10px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 16px;
    width: 300px;
    display: none;
}

.route-panel.visible {
    display: block;
}

.route-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.route-header h3 {
    margin: 0;
    font-size: 16px;
    color: #333;
}

.route-options {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.route-option {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    cursor: pointer;
}

.route-option:hover {
    background: #f5f5f5;
}

.route-option.selected {
    border-color: #4CAF50;
    background: #e8f5e9;
}

/* Responsive Design */
@media (max-width: 768px) {
    .map-controls {
        bottom: 24px;
        top: auto;
        left: 50%;
        transform: translateX(-50%);
        width: calc(100% - 48px);
    }

    .control-panel {
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
    }

    .route-panel {
        top: auto;
        bottom: 24px;
        right: 24px;
        width: calc(100% - 48px);
        max-height: 50vh;
        overflow-y: auto;
    }

    .territory-legend {
        bottom: auto;
        top: 24px;
        right: 24px;
    }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
    .map-controls,
    .info-window,
    .route-panel,
    .territory-legend {
        background: #2d2d2d;
    }

    .control-btn {
        background: #2d2d2d;
        border-color: #404040;
        color: #fff;
    }

    .control-btn:hover {
        background: #404040;
    }

    .info-window h3 {
        color: #fff;
    }

    .info-window p {
        color: #ccc;
    }

    .territory-name {
        color: #ccc;
    }
}

//**End of code or start of new file** 
 
// File: shared\map-component.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\shared\map-component.js
// Current Code:

// src/components/shared/map-component.js
import { registerComponent } from '../../core/component-registry.js';
import './map-component.css';

export class MapComponent extends HTMLElement {
    constructor() {
        super();
        this.map = null;
        this.markers = new Map();
        this.geocoder = null;
        this.drawingManager = null;
        this.territories = new Map();
        this.currentMode = 'view';
        this.infoWindow = null;
        this.bounds = null;
        this.mapInitialized = false;
    }

    connectedCallback() {
        // Create initial layout
        this.innerHTML = `
            <div class="map-container" style="width: 100%; height: 500px;">
                <div id="map" style="width: 100%; height: 100%;"></div>
                <div class="map-controls">
                    <div class="control-panel">
                        <button id="add-address" class="control-btn">
                            <span class="material-icons">add_location</span>
                            Add Address
                        </button>
                        <button id="draw-territory" class="control-btn">
                            <span class="material-icons">draw</span>
                            Draw Territory
                        </button>
                        <button id="optimize-route" class="control-btn">
                            <span class="material-icons">route</span>
                            Optimize Route
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Initialize map
        this.initializeMap();
    }

    async initializeMap() {
        try {
            // Load Google Maps script
            await this.loadGoogleMapsScript();
            
            // Initialize map
            const mapElement = this.querySelector('#map');
            this.map = new google.maps.Map(mapElement, {
                center: { lat: 39.8283, lng: -98.5795 }, // Center of USA
                zoom: 4,
                mapTypeControl: true,
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            // Initialize map components
            this.geocoder = new google.maps.Geocoder();
            this.infoWindow = new google.maps.InfoWindow();
            this.bounds = new google.maps.LatLngBounds();

            // Initialize drawing manager
            this.drawingManager = new google.maps.drawing.DrawingManager({
                drawingMode: null,
                drawingControl: false,
                polygonOptions: {
                    fillColor: '#4CAF50',
                    fillOpacity: 0.2,
                    strokeColor: '#4CAF50',
                    strokeWeight: 2,
                    editable: false
                }
            });
            this.drawingManager.setMap(this.map);

            // Set initialization flag
            this.mapInitialized = true;

            // Setup event listeners
            this.setupEventListeners();

            // Load data
            await Promise.all([
                this.loadSavedAddresses(),
                this.loadTerritories()
            ]);

        } catch (error) {
            console.error('Map initialization error:', error);
        }
    }

    loadGoogleMapsScript() {
        return new Promise((resolve, reject) => {
            if (window.google?.maps) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA8kQcCqXqvKLn1C0pu0RWbr4Kw-gYF6jw&libraries=places,drawing,geometry';
            script.defer = true;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    setupEventListeners() {
        // Only setup listeners if map is initialized
        if (!this.mapInitialized) return;

        const addAddressBtn = this.querySelector('#add-address');
        const drawTerritoryBtn = this.querySelector('#draw-territory');
        const optimizeRouteBtn = this.querySelector('#optimize-route');

        if (addAddressBtn) {
            addAddressBtn.addEventListener('click', () => {
                if (this.mapInitialized) {
                    this.enableAddressCreation();
                }
            });
        }

        if (drawTerritoryBtn) {
            drawTerritoryBtn.addEventListener('click', () => {
                if (this.mapInitialized) {
                    this.toggleTerritoryDrawing();
                }
            });
        }

        if (optimizeRouteBtn) {
            optimizeRouteBtn.addEventListener('click', () => {
                if (this.mapInitialized) {
                    this.optimizeRoute();
                }
            });
        }

        // Map click handler for address creation
        if (this.map) {
            this.map.addListener('click', async (event) => {
                if (this.currentMode === 'add-address') {
                    await this.handleAddressCreation(event.latLng);
                }
            });
        }
    }

    async loadSavedAddresses() {
        if (!this.mapInitialized) return;

        const user = firebase.auth().currentUser;
        if (!user) return;

        try {
            const snapshot = await firebase.firestore()
                .collection('addresses')
                .where('userId', '==', user.uid)
                .get();

            snapshot.forEach(doc => {
                const data = doc.data();
                this.addMarker({
                    id: doc.id,
                    position: {
                        lat: data.latitude,
                        lng: data.longitude
                    },
                    status: data.status,
                    address: data.address,
                    data: data
                });
            });

            if (this.markers.size > 0) {
                this.fitBoundsToMarkers();
            }
        } catch (error) {
            console.error('Error loading addresses:', error);
        }
    }

    enableAddressCreation() {
        if (!this.mapInitialized) return;
        
        this.currentMode = 'add-address';
        this.map.setOptions({ draggableCursor: 'crosshair' });
    }

    optimizeRoute() {
        if (!this.mapInitialized) return;
        
        console.log('Route optimization to be implemented');
    }

    toggleTerritoryDrawing() {
        if (!this.mapInitialized) return;
        
        if (this.currentMode !== 'draw-territory') {
            this.currentMode = 'draw-territory';
            this.drawingManager.setMap(this.map);
            this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
        } else {
            this.currentMode = 'view';
            this.drawingManager.setMap(null);
        }
    }
}

registerComponent('map-component', MapComponent);

//**End of code or start of new file** 
 
// File: shared\nav-menu.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\shared\nav-menu.js
// Current Code:

// src/components/shared/nav-menu.js
export class NavMenu extends HTMLElement {
    connectedCallback() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // Fetch user data and render the menu
                this.fetchUserData(user.uid).then((userData) => {
                    this.user = userData;
                    console.log('Rendering nav menu. User role:', this.user?.role); // Debug log
                    this.render();
                });
            } else {
                this.innerHTML = ''; // Hide nav when not authenticated
            }
        });
    }

    async fetchUserData(uid) {
        const userDoc = await firebase.firestore().collection('users').doc(uid).get();
        return userDoc.exists ? userDoc.data() : null;
    }

    render() {
        const isPending = this.user?.role === 'pending';
        console.log('Rendering nav menu. User role:', this.user?.role);

        this.innerHTML = `
            <nav class="sub-header">
                <div class="nav-buttons">
                    <div class="nav-group">
                        <button class="nav-button" data-route="dashboard">
                            <span class="material-icons">dashboard</span>
                            Dashboard
                        </button>
                        <div class="management-dropdown">
                            <div class="management-item">
                                Management
                                <div class="sub-management">
                                    <div class="sub-management-item" data-route="canvasser-management">
                                        Canvasser Management
                                    </div>
                                    <div class="sub-management-item" data-route="inspector-management">
                                        Inspector Management
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="nav-button" data-route="daily-view">
                        <span class="material-icons">today</span>
                        Daily View
                    </button>
                    <button class="nav-button" data-route="leads">
                    <span class="material-icons">assignment_ind</span>
                        Leads
                    </button>
                    <button class="nav-button" data-route="contacts">
                        <span class="material-icons">people</span>
                        Contacts
                    </button>
                    <button class="nav-button" data-route="addresses">
                        <span class="material-icons">location_on</span>
                        Addresses
                    </button>
                    <button class="nav-button" data-route="map">
                        <span class="material-icons">map</span>
                        Map
                    </button>
                    <button class="nav-button" data-route="appointments">
                        <span class="material-icons">assignment</span>
                        appointments
                    </button>
                    <button class="nav-button" data-route="tasks">
                        <span class="material-icons">task</span>
                        Tasks
                    </button>
                    <button class="nav-button" data-route="calendar">
                        <span class="material-icons">calendar_today</span>
                        Calendar
                    </button>
                    <button class="nav-button" data-route="territories">
                        <span class="material-icons">map</span>
                        Territories
                    </button>
                </div>
            </nav>
        `;

        console.log('Nav menu rendered successfully'); // Debug log
        this.setupNavigationEvents();
    }

    setupNavigationEvents() {
        this.querySelectorAll('.nav-button').forEach(button => {
            button.addEventListener('click', () => {
                const route = button.dataset.route;
                window.location.hash = route;
            });
        });

        this.querySelectorAll('.sub-management-item').forEach(item => {
            item.addEventListener('click', () => {
                const route = item.dataset.route;
                window.location.hash = route;
            });
        });
    }
}

customElements.define('nav-menu', NavMenu);

//**End of code or start of new file** 
 
// File: tables\assigned-address.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\tables\assigned-address.js
// Current Code:



//**End of code or start of new file** 
 
// File: tables\assigned-contact.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\tables\assigned-contact.js
// Current Code:



//**End of code or start of new file** 
 
// File: tables\task-list.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\tables\task-list.js
// Current Code:



//**End of code or start of new file** 
 
// File: territory-management\index.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\territory-management\index.js
// Current Code:



//**End of code or start of new file** 
 
// File: authenticated\addresses.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\authenticated\addresses.js
// Current Code:

// file path: src/routes/authenticated/addresses.js

import { registerComponent } from '../../core/component-registry.js';

export class AddressesView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="addresses-page">
                <div class="page-header">
                    <h1>Addresses</h1>
                    <button class="add-button">
                        <span class="material-icons">add_location</span>
                        Add Address
                    </button>
                </div>
                <div class="addresses-grid">
                    <!-- Address cards will be populated here -->
                </div>
            </div>
        `;

        this.setupEventListeners();
        this.fetchAddresses();
    }

    setupEventListeners() {
        const addButton = this.querySelector('.add-button');
        addButton.addEventListener('click', () => {
            // Trigger address addition flow
        });
    }

    async fetchAddresses() {
        const user = firebase.auth().currentUser;
        if (!user) return;

        const addressesRef = firebase.firestore().collection('addresses');
        const snapshot = await addressesRef.where('userId', '==', user.uid).get();
        const addresses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        this.renderAddresses(addresses);
    }

    renderAddresses(addresses) {
        const addressesGrid = this.querySelector('.addresses-grid');
        addressesGrid.innerHTML = addresses.length
            ? addresses.map(address => this.createAddressCard(address)).join('')
            : '<p>No addresses available</p>';
    }

    createAddressCard(address) {
        return `
            <div class="address-card">
                <img src="${address.photoURL || '/placeholder.png'}" alt="Address Photo" class="address-photo">
                <div class="address-details">
                    <h2>${address.address}</h2>
                    <p>City: ${address.city}, State: ${address.state}, ZIP: ${address.zip}</p>
                    <p><strong>Salesman:</strong> ${address.salesman?.name || 'Not Assigned'}</p>
                    <p><strong>Setter:</strong> ${address.setter?.name || 'Not Assigned'}</p>
                </div>
                <div class="address-actions">
                    <button class="view-button" data-id="${address.id}">
                        <span class="material-icons">visibility</span>
                        View
                    </button>
                </div>
            </div>
        `;
    }
}

registerComponent('addresses-view', AddressesView);


//**End of code or start of new file** 
 
// File: authenticated\appointments.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\authenticated\appointments.js
// Current Code:

// file path: src/routes/authenticated/appointments.js

import { registerComponent } from '../../core/component-registry.js';

export class AppointmentsView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="appointments-page">
                <div class="page-header">
                    <h1>Appointments</h1>
                    <button class="add-button">
                        <span class="material-icons">add_task</span>
                        New Appointment
                    </button>
                </div>
                <div class="appointments-grid">
                    <!-- Appointment list will be populated here -->
                </div>
            </div>
        `;
    }
}

registerComponent('appointments-view', AppointmentsView);


//**End of code or start of new file** 
 
// File: authenticated\calendar.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\authenticated\calendar.js
// Current Code:

// src/routes/calendar.js
import { registerComponent } from '../../core/component-registry.js';

export class CalendarView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="calendar-page">
                <div class="page-header">
                    <h1>Calendar</h1>
                    <div class="calendar-controls">
                        <button class="view-button">
                            <span class="material-icons">view_module</span>
                            Month
                        </button>
                        <button class="view-button">
                            <span class="material-icons">view_week</span>
                            Week
                        </button>
                        <button class="view-button">
                            <span class="material-icons">view_day</span>
                            Day
                        </button>
                    </div>
                </div>
                <div class="calendar-grid">
                    <!-- Calendar will be populated here -->
                </div>
            </div>
        `;

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Calendar view buttons handler
    }
}

registerComponent('calendar-view', CalendarView);

//**End of code or start of new file** 
 
// File: authenticated\canvasser.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\authenticated\canvasser.js
// Current Code:



//**End of code or start of new file** 
 
// File: authenticated\contacts.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\authenticated\contacts.js
// Current Code:

import { registerComponent } from '../../core/component-registry.js';

export class ContactsView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="contacts-page">
                <div class="page-header">
                    <h1>Contacts</h1>
                    <button class="add-button">
                        <span class="material-icons">person_add</span>
                        Add Contact
                    </button>
                </div>
                <div class="contacts-grid">
                    <div class="contacts-table">
                        <!-- Contacts table will be populated here -->
                    </div>
                </div>
            </div>
        `;

        this.setupEventListeners();
        this.fetchContacts();
    }

    setupEventListeners() {
        const addButton = this.querySelector('.add-button');
        addButton.addEventListener('click', () => {
            this.showAddContactModal();
        });
    }

    async fetchContacts() {
        const user = firebase.auth().currentUser;

        if (!user) return;

        const contactsRef = firebase.firestore().collection('contacts');
        const isAdmin = (await user.getIdTokenResult()).claims.admin;

        let query = contactsRef.where('userId', '==', user.uid);
        if (isAdmin) {
            query = contactsRef; // Admins can view all contacts
        }

        const snapshot = await query.get();
        const contacts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        this.renderContacts(contacts);
    }

    renderContacts(contacts) {
        const contactsTable = this.querySelector('.contacts-table');
        contactsTable.innerHTML = contacts.length
            ? `
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${contacts
                            .map(contact => `
                                <tr>
                                    <td>${contact.firstName}</td>
                                    <td>${contact.lastName}</td>
                                    <td>${contact.email}</td>
                                </tr>
                            `)
                            .join('')}
                    </tbody>
                </table>
            `
            : `<p>No contacts available</p>`;
    }

    showAddContactModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Add Contact</h2>
                <form id="add-contact-form">
                    <label for="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" required>
                    
                    <label for="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" required>
                    
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                    
                    <button type="submit">Add</button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.close').addEventListener('click', () => modal.remove());
        modal.querySelector('#add-contact-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            await firebase.firestore().collection('contacts').add({
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                userId: firebase.auth().currentUser.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
            modal.remove();
            this.fetchContacts();
        });
    }
}

registerComponent('contacts-view', ContactsView);


//**End of code or start of new file** 
 
// File: authenticated\daily-view.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\authenticated\daily-view.js
// Current Code:

// src/routes/daily-view.js
import { registerComponent } from '../../core/component-registry.js'; 

export class DailyView extends HTMLElement {
    connectedCallback() {
        this.loadUserData();
    }

    async loadUserData() {
        const user = firebase.auth().currentUser;
        if (!user) return;

        try {
            const userDoc = await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .get();

            const userData = userDoc.data();
            this.render(userData);
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }

    render(userData = {}) {
        this.innerHTML = `
            <div class="daily-view">
                <div class="dashboard-grid">
                    <div class="dashboard-card welcome-card">
                        <h2>Welcome Back, ${userData.firstName || 'User'}!</h2>
                        <p class="date">${new Date().toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}</p>
                    </div>

                    <div class="dashboard-card stats-card">
                        <h3>Your Stats</h3>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <span class="stat-label">Swag Points</span>
                                <span class="stat-value">${userData.swagPoints || 0}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Active Tasks</span>
                                <span class="stat-value">${userData.activeTasks || 0}</span>
                            </div>
                        </div>
                    </div>

                    <div class="dashboard-card tasks-card">
                        <h3>Today's Tasks</h3>
                        <div class="tasks-list">
                            <!-- Will be populated with tasks -->
                            <p class="empty-state">No tasks due today</p>
                        </div>
                    </div>

                    <div class="dashboard-card messages-card">
                        <h3>Recent Messages</h3>
                        <div class="messages-list">
                            <!-- Will be populated with messages -->
                            <p class="empty-state">No new messages</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

registerComponent('daily-view', DailyView);

//**End of code or start of new file** 
 
// File: authenticated\dashboard.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\authenticated\dashboard.js
// Current Code:

// src/routes/dashboard.js
export class DashboardView extends HTMLElement {
    constructor() {
        super();
        this.user = null;
    }

    connectedCallback() {
        console.log('DashboardView connected to the DOM.');
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.user = user;
                this.render();
            } else {
                window.location.hash = 'home';
            }
        });
    }

    render() {
        this.innerHTML = `
            <div class="dashboard-container">
                <div class="dashboard-content">
                    <h1>Welcome, ${this.user?.displayName || 'User'}!</h1>
                    
                    <div class="dashboard-stats">
                        <div class="stat-card">
                            <h3>Tasks</h3>
                            <p>0 Active</p>
                        </div>
                        <div class="stat-card">
                            <h3>Contacts</h3>
                            <p>0 Total</p>
                        </div>
                    </div>
                    
                    <div class="recent-activity">
                        <h2>Recent Activity</h2>
                        <p>No recent activity</p>
                    </div>
                </div>
            </div>
        `;
    }
}

if (!customElements.get('dashboard-view')) {
    customElements.define('dashboard-view', DashboardView);
}

//**End of code or start of new file** 
 
// File: authenticated\home.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\authenticated\home.js
// Current Code:

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

//**End of code or start of new file** 
 
// File: authenticated\leads.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\authenticated\leads.js
// Current Code:

import { registerComponent } from '../../core/component-registry.js';

export class LeadsView extends HTMLElement {
    constructor() {
        super();
        this.map = null;
        this.leadData = null;
    }

    connectedCallback() {
        console.log('LeadsView connected');
        this.render();
        this.loadGoogleMapsScript()
            .then(() => this.loadLeadData())
            .catch(error => console.error('Error initializing leads view:', error));
    }

    render() {
        this.innerHTML = `
            <div class="leads-page">
                <div class="page-header">
                    <h1>Leads Management</h1>
                    <button class="add-button">
                        <span class="material-icons">add_circle</span>
                        New Lead
                    </button>
                </div>
                <div class="leads-content">
                    <div class="leads-list">
                        <!-- Leads will be loaded here -->
                    </div>
                    <div id="map-container" class="map-container">
                        <!-- Map will be initialized here -->
                    </div>
                </div>
            </div>
        `;
    }

    loadGoogleMapsScript() {
        return new Promise((resolve, reject) => {
            if (window.google?.maps) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA8kQcCqXqvKLn1C0pu0RWbr4Kw-gYF6jw&libraries=places,drawing,geometry';
            script.async = true;
            script.defer = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async loadLeadData() {
        try {
            const user = firebase.auth().currentUser;
            if (!user) return;

            const leadsRef = firebase.firestore().collection('leads');
            const snapshot = await leadsRef.where('userId', '==', user.uid).get();
            
            const leads = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            this.renderLeads(leads);
        } catch (error) {
            console.error('Error loading leads:', error);
        }
    }

    renderLeads(leads) {
        const leadsList = this.querySelector('.leads-list');
        if (!leads.length) {
            leadsList.innerHTML = '<p class="no-leads">No leads available</p>';
            return;
        }

        leadsList.innerHTML = leads.map(lead => `
            <div class="lead-card" data-id="${lead.id}">
                <h3>${lead.address || 'Unnamed Lead'}</h3>
                <p>${lead.status || 'New'}</p>
                <div class="lead-actions">
                    <button class="view-lead" data-id="${lead.id}">
                        <span class="material-icons">visibility</span>
                    </button>
                </div>
            </div>
        `).join('');

        // Add event listeners to the lead cards
        this.setupLeadCardListeners();
    }

    setupLeadCardListeners() {
        const viewButtons = this.querySelectorAll('.view-lead');
        viewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const leadId = e.currentTarget.dataset.id;
                window.location.hash = `leads/${leadId}`;
            });
        });
    }
}

registerComponent('leads-view', LeadsView);


//**End of code or start of new file** 
 
// File: authenticated\map.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\authenticated\map.js
// Current Code:

// src/routes/map.js
import { registerComponent } from '../../core/component-registry.js';
import '../../components/shared/map-component.js';

export class MapView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="map-page">
                <div class="map-controls">
                    <div class="control-panel">
                        <button id="new-address" class="control-btn">
                            <span class="material-icons">add_location</span>
                            New Address
                        </button>
                        <button id="route-planner" class="control-btn">
                            <span class="material-icons">route</span>
                            Plan Route
                        </button>
                        <button id="territory-view" class="control-btn">
                            <span class="material-icons">grid_on</span>
                            Territory
                        </button>
                    </div>
                </div>
                
                <div class="map-container">
                    <map-component id="main-map"></map-component>
                </div>
                
                <div class="address-panel">
                    <!-- Will show selected address details -->
                </div>
            </div>
        `;

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.querySelector('#new-address').addEventListener('click', () => {
            const mapComponent = this.querySelector('#main-map');
            mapComponent.enableAddressCreation();
        });

        this.querySelector('#route-planner').addEventListener('click', () => {
            const mapComponent = this.querySelector('#main-map');
            mapComponent.showRoutePlanner();
        });

        this.querySelector('#territory-view').addEventListener('click', () => {
            const mapComponent = this.querySelector('#main-map');
            mapComponent.toggleTerritoryView();
        });
    }
}

registerComponent('map-view', MapView);

//**End of code or start of new file** 
 
// File: authenticated\settings.css
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\authenticated\settings.css
// Current Code:

/* src/routes/authenticated/settings.css */

.settings-container {
    padding: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
}

.settings-header {
    margin-bottom: 2rem;
}

.settings-header h1 {
    margin: 0;
    color: #333;
    font-size: 1.75rem;
}

.settings-layout {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
    min-height: calc(100vh - 200px);
}

.settings-sidebar {
    background: white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    height: fit-content;
}

.sidebar-button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem 1rem;
    background: none;
    border: none;
    border-radius: 6px;
    color: #666;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
}

.sidebar-button:hover {
    background: #f5f5f5;
    color: #333;
}

.sidebar-button.active {
    background: #4CAF50;
    color: white;
}

.sidebar-button .material-icons {
    font-size: 20px;
}

.settings-content {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Card Styles */
.settings-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.settings-card h2 {
    margin: 0 0 1rem 0;
    color: #333;
    font-size: 1.25rem;
}

/* Form Elements */
.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.875rem;
}

/* Empty State */
.empty-state {
    text-align: center;
    padding: 2rem;
    color: #666;
}

/* Dark Mode Support */
[data-theme="dark"] {
    --bg-primary: #1a1a1a;
    --bg-secondary: #2d2d2d;
    --text-primary: #ffffff;
    --text-secondary: #cccccc;
    --border-color: #404040;
}

[data-theme="dark"] .settings-container {
    background-color: var(--bg-primary);
}

[data-theme="dark"] .settings-sidebar,
[data-theme="dark"] .settings-content,
[data-theme="dark"] .settings-card {
    background-color: var(--bg-secondary);
    border-color: var(--border-color);
}

[data-theme="dark"] .settings-header h1,
[data-theme="dark"] .settings-card h2 {
    color: var(--text-primary);
}

[data-theme="dark"] .sidebar-button {
    color: var(--text-secondary);
}

[data-theme="dark"] .sidebar-button:hover {
    background: #3d3d3d;
    color: white;
}

/* Responsive Design */
@media (max-width: 768px) {
    .settings-layout {
        grid-template-columns: 1fr;
    }

    .settings-sidebar {
        position: sticky;
        top: 1rem;
        z-index: 10;
    }

    .settings-content {
        margin-top: 1rem;
    }
}

appearance-settings,
notification-settings,
system-settings,
user-preferences {
    display: block;
    min-height: 100px;
    border: 1px solid #ccc;
    margin-bottom: 1rem;
    padding: 1rem;
}

//**End of code or start of new file** 
 
// File: authenticated\settings.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\authenticated\settings.js
// Current Code:

// src/routes/authenticated/settings.js

// CSS imports
import './settings.css';  // Base settings styles
import '../../components/settings/preferences/styles/appearancesettings.css';
import '../../components/settings/preferences/styles/notificationsettings.css';
import '../../components/settings/preferences/styles/systemsettings.css';
import '../../components/settings/preferences/styles/userpreferences.css';

import './settings.css';

// Import management components
import '../../components/settings/employee/components/employeemanagement.js';
import '../../components/settings/workflows/components/workflowmanagement.js';
import '../../components/settings/roles/components/rolemanagement.js';
import '../../components/settings/users/components/usermanagement.js';

// Import preferences components
import '../../components/settings/preferences/components/appearancesettings.js';
import '../../components/settings/preferences/components/notificationsettings.js';
import '../../components/settings/preferences/components/systemsettings.js';
import '../../components/settings/preferences/components/userpreferences.js';

export class SettingsView extends HTMLElement {
    constructor() {
        super();
        this.currentSection = 'employee';
        this.currentUserRole = null;
        this.userData = null;
        this.sections = [
            {
                id: 'employee',
                title: 'Employee Data',
                icon: 'badge',
                adminOnly: false
            },
            {
                id: 'users',
                title: 'User Management',
                icon: 'group_add',
                adminOnly: true
            },
            {
                id: 'roles',
                title: 'Role Management',
                icon: 'admin_panel_settings',
                adminOnly: true
            },
            {
                id: 'workflows',
                title: 'Workflow Management',
                icon: 'account_tree',
                adminOnly: true
            },
            {
                id: 'appearance',
                title: 'Appearance',
                icon: 'palette',
                adminOnly: false
            },
            {
                id: 'notifications',
                title: 'Notifications',
                icon: 'notifications',
                adminOnly: false
            },
            {
                id: 'system',
                title: 'System Settings',
                icon: 'settings',
                adminOnly: false
            },
            {
                id: 'preferences',
                title: 'User Preferences',
                icon: 'person_outline',
                adminOnly: false
            }
        ];
    }

    async connectedCallback() {
        console.log('SettingsView connected');
        await this.loadUserData();
        this.render();
        this.setupEventListeners();
    }

    async loadUserData() {
        const user = firebase.auth().currentUser;
        if (!user) {
            console.warn('No authenticated user found');
            return;
        }

        try {
            const doc = await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .get();

            if (doc.exists) {
                this.userData = { id: doc.id, ...doc.data() };
                this.currentUserRole = this.userData?.role;
                console.log('User data loaded:', this.userData);
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }

    render() {
        this.innerHTML = `
            <div class="settings-container">
                <div class="settings-header">
                    <h1>Settings</h1>
                </div>
                
                <div class="settings-layout">
                    <div class="settings-sidebar">
                        ${this.renderSidebar()}
                    </div>

                    <div class="settings-content" id="settings-content">
                        ${this.renderSection(this.currentSection)}
                    </div>
                </div>
            </div>
        `;
    }

    renderSidebar() {
        return this.sections
            .filter(section => !section.adminOnly || this.currentUserRole === 'admin')
            .map(section => `
                <button class="sidebar-button ${this.currentSection === section.id ? 'active' : ''}" 
                        data-section="${section.id}">
                    <span class="material-icons">${section.icon}</span>
                    ${section.title}
                </button>
            `).join('');
    }

    renderSection(section) {
        console.log('Rendering section:', section);
    
        switch (section) {
            case 'employee':
                return `
                  <employee-management 
                    data-user='${JSON.stringify(this.userData)}'>
                  </employee-management>
                `;
    
            case 'users':
                if (this.currentUserRole !== 'admin') {
                    return '<p>Access Denied</p>';
                }
                return '<user-management></user-management>';
    
            case 'roles':
                if (this.currentUserRole !== 'admin') {
                    return '<p>Access Denied</p>';
                }
                return '<role-management></role-management>';
    
            case 'workflows':
                if (this.currentUserRole !== 'admin') {
                    return '<p>Access Denied</p>';
                }
                return '<workflow-management></workflow-management>';
    
            case 'appearance':
                return `
                  <div class="settings-content-section">
                    <h2>Appearance Settings</h2>
                    <appearance-settings save-enabled="true"></appearance-settings>
                  </div>
                `;
    
            case 'notifications':
                return `
                  <div class="settings-content-section">
                    <h2>Notification Settings</h2>
                    <notification-settings></notification-settings>
                  </div>
                `;
    
            case 'system':
                if (this.currentUserRole !== 'admin') {
                    return '<p>Access Denied</p>';
                }
                return `<system-settings></system-settings>`;
    
            case 'preferences':
                return `
                  <div class="settings-content-section">
                    <h2>User Preferences</h2>
                    <user-preferences save-enabled="true"></user-preferences>
                  </div>
                `;
    
            default:
                return `
                  <div class="empty-state">
                    <p>Select an option from the sidebar</p>
                  </div>
                `;
        }
    }

    setupEventListeners() {
        // Handle sidebar navigation
        const sidebarButtons = this.querySelectorAll('.sidebar-button');
        sidebarButtons.forEach(button => {
            button.addEventListener('click', () => {
                const section = button.dataset.section;
                if (this.currentSection === section) return;

                console.log('Sidebar button clicked:', section);

                // Update active button
                sidebarButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Update current section and content
                this.currentSection = section;
                const contentArea = this.querySelector('#settings-content');
                if (contentArea) {
                    contentArea.innerHTML = this.renderSection(section);
                }
            });
        });

        // Handle user updates
        this.addEventListener('userupdate', async () => {
            console.log('User update event received');
            await this.loadUserData();
            this.render();
        });
    }
}

customElements.define('settings-view', SettingsView);

//**End of code or start of new file** 
 
// File: authenticated\tasks.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\authenticated\tasks.js
// Current Code:

// src/routes/tasks.js
import { registerComponent } from '../../core/component-registry.js';

export class TasksView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="tasks-page">
                <div class="page-header">
                    <h1>Tasks</h1>
                    <button class="add-button">
                        <span class="material-icons">add_task</span>
                        New Task
                    </button>
                </div>
                <div class="tasks-grid">
                    <!-- Task list will be populated here -->
                </div>
            </div>
        `;

        this.setupEventListeners();
    }

    setupEventListeners() {
        // New task button handler
    }
}

registerComponent('tasks-view', TasksView);

//**End of code or start of new file** 
 
// File: authenticated\territories.css
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\authenticated\territories.css
// Current Code:

/* src/routes/authenticated/territories.css */

.territories-page {
    padding: 1.5rem;
}

.territories-layout {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 1.5rem;
    height: calc(100vh - 200px);
    min-height: 500px;
}

.map-section {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    overflow: hidden;
}

.details-section {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 1.5rem;
    overflow-y: auto;
}

/* Empty State */
.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #666;
    text-align: center;
    padding: 2rem;
}

.empty-state .material-icons {
    font-size: 48px;
    color: #ccc;
    margin-bottom: 1rem;
}

/* Territory Details */
.territory-details h2 {
    margin: 0 0 1.5rem 0;
    color: #333;
    font-size: 1.25rem;
}

.details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.detail-item {
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 6px;
}

.detail-item label {
    display: block;
    color: #666;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
}

.detail-item span {
    color: #333;
    font-weight: 500;
}

.status-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
}

.status-badge.active {
    background: #e8f5e9;
    color: #2e7d32;
}

.status-badge.inactive {
    background: #f5f5f5;
    color: #666;
}

/* Territory Actions */
.territory-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #eee;
}

.action-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    color: #333;
    cursor: pointer;
    transition: all 0.2s;
}

.action-btn:hover {
    background: #f5f5f5;
    border-color: #4CAF50;
    color: #4CAF50;
}

.action-btn .material-icons {
    font-size: 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .territories-layout {
        grid-template-columns: 1fr;
    }

    .map-section {
        height: 400px;
    }
}

//**End of code or start of new file** 
 
// File: authenticated\territories.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\authenticated\territories.js
// Current Code:

import { registerComponent } from '../../core/component-registry.js';
import '../../components/territory-management/ui/map/territory-map.js';

export class TerritoriesView extends HTMLElement {
    constructor() {
        super();
        this.initialized = false;
        this.currentTerritory = null;
        this.userRole = null;
    }

    async connectedCallback() {
        if (this.initialized) return;

        await this.loadUserRole();
        this.render();
        this.setupEventListeners();

        this.initialized = true;
    }

    async loadUserRole() {
        try {
            const user = firebase.auth().currentUser;
            if (!user) throw new Error('User not authenticated');

            const doc = await firebase.firestore().collection('users').doc(user.uid).get();
            if (!doc.exists) throw new Error('User data not found');

            this.userRole = doc.data().role;
            console.log(`User role: ${this.userRole}`);
        } catch (error) {
            console.error('Error loading user role:', error);
        }
    }

    render() {
        this.innerHTML = `
            <div class="territories-page">
                <div class="page-header">
                    <h1>Territory Management</h1>
                    ${this.userRole === 'admin' ? `
                        <button id="create-territory" class="add-button">
                            <span class="material-icons">add</span>
                            Create Territory
                        </button>
                    ` : ''}
                </div>
                <div class="territories-layout">
                    <div class="map-section">
                        <territory-map id="territory-map"></territory-map>
                    </div>
                    <div class="details-section">
                        ${this.currentTerritory ? this.renderTerritoryDetails() : this.renderEmptyState()}
                    </div>
                </div>
            </div>
        `;
    }

    renderEmptyState() {
        return `
            <div class="empty-state">
                <span class="material-icons">map</span>
                ${this.userRole === 'admin' ?
                    '<p>Create a new territory or select an existing one to manage</p>' :
                    '<p>Select a territory to view details</p>'}
            </div>
        `;
    }

    renderTerritoryDetails() {
        return `
            <div class="territory-details">
                <h2>${this.currentTerritory.name}</h2>
                <p>Details and actions will go here.</p>
            </div>
        `;
    }

    setupEventListeners() {
        const mapComponent = this.querySelector('#territory-map');
        if (!mapComponent) {
            console.error('Territory map component not found');
            return;
        }

        mapComponent.addEventListener('territory-selected', (e) => {
            this.handleTerritorySelection(e.detail.territoryId);
        });

        mapComponent.addEventListener('territory-drawn', (e) => {
            this.handleTerritoryDrawn(e.detail.coordinates);
        });

        this.querySelector('#create-territory')?.addEventListener('click', () => {
            this.showTerritoryNamePrompt();
        });
    }

    async handleTerritorySelection(territoryId) {
        try {
            const doc = await firebase.firestore().collection('territories').doc(territoryId).get();
            if (!doc.exists) throw new Error('Territory not found');

            this.currentTerritory = { id: doc.id, ...doc.data() };
            this.render();
        } catch (error) {
            console.error('Error loading territory:', error);
        }
    }

    async handleTerritoryDrawn(coordinates) {
        if (!coordinates || coordinates.length === 0) {
            console.error('Invalid coordinates received:', coordinates);
            return;
        }

        const territoryData = {
            boundaries: { coordinates },
            createdAt: new Date().toISOString(),
            status: 'new',
            createdBy: firebase.auth().currentUser?.uid || 'unknown',
        };

        this.showCreateTerritoryModal(territoryData);
    }

    showTerritoryNamePrompt() {
        const territoryName = prompt('Enter the name of the new territory:');
        if (territoryName) {
            this.showLocationPrompt(territoryName);
        }
    }
    
    showLocationPrompt(territoryName) {
        const location = prompt('Enter the location (state, zip code, or full address) for the territory:');
        if (location) {
            this.geocodeLocation(location, territoryName);
        }
    }
    
    async geocodeLocation(location, territoryName) {
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=YOUR_API_KEY`);
            const data = await response.json();
    
            if (data.results.length > 0) {
                const { lat, lng } = data.results[0].geometry.location;
                this.showCreateTerritoryModal(territoryName, { lat, lng });
            } else {
                alert('Location not found. Please try again.');
            }
        } catch (error) {
            console.error('Geocoding error:', error);
            alert('An error occurred while geocoding the location. Please try again.');
        }
    }
    
    showCreateTerritoryModal(territoryName, location) {
        const modal = document.createElement('territory-create');
        modal.setAttribute('territory-name', territoryName);
        modal.setAttribute('initial-location', JSON.stringify(location));
        document.body.appendChild(modal);
    }
}

registerComponent('territories-view', TerritoriesView);



//**End of code or start of new file** 
 
// File: management\canvasser.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\management\canvasser.js
// Current Code:

// src/routes/management/canvasser.js
import { registerComponent } from '../../core/component-registry.js';

export class CanvasserManagementView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="management-page">
                <div class="page-header">
                    <h1>Canvasser Management</h1>
                    <div class="header-actions">
                        <button class="add-button">
                            <span class="material-icons">person_add</span>
                            Add Canvasser
                        </button>
                    </div>
                </div>
                
                <div class="management-grid">
                    <div class="grid-section territories">
                        <h2>Territories</h2>
                        <div class="territory-list">
                            <!-- Territory assignments -->
                        </div>
                    </div>
                    
                    <div class="grid-section canvassers">
                        <h2>Active Canvassers</h2>
                        <div class="canvasser-list">
                            <!-- Active canvassers -->
                        </div>
                    </div>
                    
                    <div class="grid-section metrics">
                        <h2>Performance Metrics</h2>
                        <div class="metrics-grid">
                            <!-- Performance data -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

registerComponent('canvasser-management-view', CanvasserManagementView);

//**End of code or start of new file** 
 
// File: management\inspector.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\management\inspector.js
// Current Code:

// src/routes/management/inspector.js
import { registerComponent } from '../../core/component-registry.js';

export class InspectorManagementView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="management-page">
                <div class="page-header">
                    <h1>Inspector Management</h1>
                    <div class="header-actions">
                        <button class="add-button">
                            <span class="material-icons">person_add</span>
                            Add Inspector
                        </button>
                    </div>
                </div>
                
                <div class="management-grid">
                    <div class="grid-section assignments">
                        <h2>Current Assignments</h2>
                        <div class="assignment-list">
                            <!-- Inspector assignments -->
                        </div>
                    </div>
                    
                    <div class="grid-section inspectors">
                        <h2>Active Inspectors</h2>
                        <div class="inspector-list">
                            <!-- Active inspectors -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

registerComponent('inspector-management-view', InspectorManagementView);

//**End of code or start of new file** 
 
// File: management\territories.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\management\territories.js
// Current Code:

// test

//**End of code or start of new file** 
 
// File: public\404.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\public\404.js
// Current Code:

// file path: src/routes/public/404.js

import { registerComponent } from '../../core/component-registry.js';

export class NotFoundView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="not-found-page">
                <h1>404</h1>
                <p>The page you are looking for does not exist.</p>
            </div>
        `;
    }
}

registerComponent('not-found-view', NotFoundView);


//**End of code or start of new file** 
 
// File: public\landing.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\public\landing.js
// Current Code:

// src/routes/public/landing.js
import { registerComponent } from '../../core/component-registry.js';

export class LandingView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="landing-page">
                <div class="hero-section">
                    <div class="hero-content">
                        <h1>SalesBlanket</h1>
                        <p class="hero-subtitle">Smart Territory Management</p>
                        <div class="hero-actions">
                            <button class="login-button" onclick="window.location.hash='login'">
                                <span class="material-icons">login</span>
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>

                <div class="features-section">
                    <h2>Features</h2>
                    <div class="features-grid">
                        <div class="feature-card">
                            <span class="material-icons">map</span>
                            <h3>Territory Management</h3>
                            <p>Efficiently manage and track your territories</p>
                        </div>
                        <div class="feature-card">
                            <span class="material-icons">people</span>
                            <h3>Team Management</h3>
                            <p>Coordinate canvassers and inspectors</p>
                        </div>
                        <div class="feature-card">
                            <span class="material-icons">analytics</span>
                            <h3>Performance Tracking</h3>
                            <p>Track and analyze team performance</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

registerComponent('landing-view', LandingView);

//**End of code or start of new file** 
 
// File: public\login.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\public\login.js
// Current Code:

// src/routes/public/login.js
import { registerComponent } from '../../core/component-registry.js';

export class LoginView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="login-page">
                <div class="login-container">
                    <div class="login-card">
                        <div class="login-header">
                            <h1>SalesBlanket</h1>
                            <p class="login-subtitle">Sign in to continue</p>
                        </div>
                        
                        <div class="login-body">
                            <button id="google-signin-btn" class="google-signin-button">
                                <img src="https://www.google.com/favicon.ico" alt="Google" class="google-icon">
                                Sign in with Google
                            </button>
                            <p class="login-note">Please use your company email address</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.setupLoginHandler();
    }

    setupLoginHandler() {
        const signInBtn = this.querySelector('#google-signin-btn');
        if (signInBtn) {
            signInBtn.addEventListener('click', async () => {
                try {
                    const provider = new firebase.auth.GoogleAuthProvider();
                    await firebase.auth().signInWithPopup(provider);
                } catch (error) {
                    console.error("Google Sign-In Error:", error);
                    alert("Failed to log in. Please make sure to use your company email.");
                }
            });
        }
    }
}

registerComponent('login-view', LoginView);

//**End of code or start of new file** 
 
// File: public\unauthorized.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\public\unauthorized.js
// Current Code:

// src/routes/public/unauthorized.js
import { registerComponent } from '../../core/component-registry.js';

export class UnauthorizedView extends HTMLElement {
    connectedCallback() {
        console.log('UnauthorizedView connected'); // Debug log
        this.innerHTML = `
            <div class="unauthorized-page">
                <div class="unauthorized-container">
                    <span class="material-icons error-icon">error_outline</span>
                    <h1>Access Denied</h1>
                    <p>You don't have permission to access this page.</p>
                    <button class="return-button" onclick="window.location.hash='daily-view'">
                        Return to Dashboard
                    </button>
                </div>
            </div>
        `;
    }
}

registerComponent('unauthorized-view', UnauthorizedView);

//**End of code or start of new file** 
 
// File: public\version.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\routes\public\version.js
// Current Code:

// src/routes/public/version.js
export class VersionView extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="version-content">
                <h1>Version History</h1>
                ${this.getVersionHistory()}
            </div>
        `;
    }

    getVersionHistory() {
        // We can maintain version history here
        return `
            <div class="version-entry">
                <h2>Version 1.0.1 - December 20, 2024</h2>
                <ul>
                    <li>Fixed authentication flow to direct to daily-view instead of settings page</li>
                    <li>Added daily-view button to navigation menu</li>
                    <li>Corrected routes organization and imports</li>
                    <li>Added profile completion notification instead of forced redirect</li>
                    <li>Implemented proper routing for authenticated/public pages</li>
                </ul>
            </div>
            
            <div class="version-entry">
                <h2>Version 1.0.0 - Initial Release</h2>
                <ul>
                    <li>Basic authentication system</li>
                    <li>User role management</li>
                    <li>Navigation structure</li>
                    <li>Core application framework</li>
                </ul>
            </div>
        `;
    }
}

customElements.define('version-view', VersionView);

//**End of code or start of new file** 
 
// File: territory-management\core\boundary-manager.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\territory-management\core\boundary-manager.js
// Current Code:

// src/components/territory-management/core/boundary-manager.js

import { BoundaryUtils } from '../utils/boundary-utils';

export class BoundaryManager {
    constructor() {
        this.boundaries = new Map();
        this.editingEnabled = false;
        this.selectedBoundary = null;
        this.drawingManager = null;
        this.map = null;
    }

    initialize(map) {
        this.map = map;
        this.setupDrawingManager();
    }

    setupDrawingManager() {
        this.drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: null,
            drawingControl: false,
            polygonOptions: {
                fillColor: '#4CAF50',
                fillOpacity: 0.2,
                strokeColor: '#4CAF50',
                strokeWeight: 2,
                editable: false
            }
        });

        this.drawingManager.setMap(this.map);

        // Handle polygon completion
        google.maps.event.addListener(
            this.drawingManager, 
            'polygoncomplete', 
            this.handlePolygonComplete.bind(this)
        );
    }

    startDrawing() {
        if (!this.editingEnabled) return;
        this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
    }

    stopDrawing() {
        this.drawingManager.setDrawingMode(null);
    }

    enableEditing() {
        this.editingEnabled = true;
        if (this.selectedBoundary) {
            const polygon = this.boundaries.get(this.selectedBoundary);
            if (polygon) polygon.setEditable(true);
        }
    }

    disableEditing() {
        this.editingEnabled = false;
        if (this.selectedBoundary) {
            const polygon = this.boundaries.get(this.selectedBoundary);
            if (polygon) polygon.setEditable(false);
        }
    }

    handlePolygonComplete(polygon) {
        // Get coordinates from polygon
        const coordinates = polygon.getPath().getArray().map(latLng => ({
            lat: latLng.lat(),
            lng: latLng.lng()
        }));

        // Validate boundaries
        const validation = BoundaryUtils.validateBoundaries(coordinates);
        if (!validation.valid) {
            alert(validation.error);
            polygon.setMap(null);
            return;
        }

        // Simplify boundaries
        const simplifiedCoordinates = BoundaryUtils.simplifyBoundaries(coordinates);

        // Create new polygon with simplified coordinates
        const newPolygon = new google.maps.Polygon({
            paths: simplifiedCoordinates,
            fillColor: '#4CAF50',
            fillOpacity: 0.2,
            strokeColor: '#4CAF50',
            strokeWeight: 2,
            editable: false,
            map: this.map
        });

        // Remove temporary drawing polygon
        polygon.setMap(null);

        // Generate unique ID for the boundary
        const boundaryId = crypto.randomUUID();
        this.boundaries.set(boundaryId, newPolygon);

        // Dispatch boundary created event
        const event = new CustomEvent('boundary-created', {
            detail: {
                id: boundaryId,
                coordinates: simplifiedCoordinates
            }
        });
        document.dispatchEvent(event);

        // Reset drawing mode
        this.stopDrawing();
    }

    selectBoundary(boundaryId) {
        // Reset previous selection
        if (this.selectedBoundary) {
            const prevPolygon = this.boundaries.get(this.selectedBoundary);
            if (prevPolygon) {
                prevPolygon.setOptions({
                    fillColor: '#4CAF50',
                    strokeColor: '#4CAF50',
                    editable: false
                });
            }
        }

        // Update selection
        this.selectedBoundary = boundaryId;
        const polygon = this.boundaries.get(boundaryId);
        if (polygon) {
            polygon.setOptions({
                fillColor: '#2196F3',
                strokeColor: '#2196F3',
                editable: this.editingEnabled
            });
        }
    }

    updateBoundary(boundaryId, coordinates) {
        const polygon = this.boundaries.get(boundaryId);
        if (!polygon) return;

        // Validate new boundaries
        const validation = BoundaryUtils.validateBoundaries(coordinates);
        if (!validation.valid) {
            alert(validation.error);
            return;
        }

        // Update polygon path
        const path = coordinates.map(coord => 
            new google.maps.LatLng(coord.lat, coord.lng)
        );
        polygon.setPath(path);
    }

    deleteBoundary(boundaryId) {
        const polygon = this.boundaries.get(boundaryId);
        if (polygon) {
            polygon.setMap(null);
            this.boundaries.delete(boundaryId);
            if (this.selectedBoundary === boundaryId) {
                this.selectedBoundary = null;
            }
        }
    }

    getBoundaryCoordinates(boundaryId) {
        const polygon = this.boundaries.get(boundaryId);
        if (!polygon) return null;

        return polygon.getPath().getArray().map(latLng => ({
            lat: latLng.lat(),
            lng: latLng.lng()
        }));
    }

    clear() {
        this.boundaries.forEach(polygon => polygon.setMap(null));
        this.boundaries.clear();
        this.selectedBoundary = null;
        this.stopDrawing();
    }
}

// Export singleton instance
export const boundaryManager = new BoundaryManager();

//**End of code or start of new file** 
 
// File: territory-management\core\notification-manager.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\territory-management\core\notification-manager.js
// Current Code:

// src/components/territory-management/core/notification-manager.js

import { roleManager } from './role-manager';

export class NotificationManager {
    constructor() {
        this.db = firebase.firestore();
        this.notificationsRef = this.db.collection('notifications');
        this.handlers = new Map();
        this.unsubscribe = null;
    }

    // Initialize notifications listener for current user
    async initialize() {
        const user = firebase.auth().currentUser;
        if (!user) return;

        // Setup real-time listener for user's notifications
        this.unsubscribe = this.notificationsRef
            .where('recipientId', '==', user.uid)
            .where('read', '==', false)
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        this.handleNewNotification(change.doc.data());
                    }
                });
            });
    }

    // Stop listening for notifications
    cleanup() {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
    }

    // Create a new notification
    async createNotification({
        recipientId,
        recipientRoles,
        type,
        title,
        message,
        context,
        priority = 'normal'
    }) {
        try {
            const notification = {
                recipientId,
                recipientRoles,
                type,
                title,
                message,
                context,
                priority,
                read: false,
                delivered: false,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                actionId: crypto.randomUUID()
            };

            await this.notificationsRef.add(notification);
            return notification;
        } catch (error) {
            console.error('Error creating notification:', error);
            throw error;
        }
    }

    // Create access request notification
    async createAccessRequest(territoryId, requesterId, requestedRole) {
        const requester = await this.db.collection('users').doc(requesterId).get();
        const territory = await this.db.collection('territories').doc(territoryId).get();

        if (!requester.exists || !territory.exists) {
            throw new Error('Invalid request data');
        }

        // Find managers who can approve this role
        const managerRoles = roleManager.getManagerRoles(requestedRole);
        const territoryData = territory.data();
        const assignments = territoryData.assignments || [];

        // Get all users with manager roles in this territory
        const managers = assignments.filter(assignment => 
            managerRoles.includes(assignment.role)
        );

        // Create notifications for each manager
        const notifications = managers.map(manager => 
            this.createNotification({
                recipientId: manager.userId,
                recipientRoles: [manager.role],
                type: 'ACCESS_REQUEST',
                title: 'New Access Request',
                message: `${requester.data().firstName} ${requester.data().lastName} has requested ${requestedRole} access to ${territoryData.name}`,
                context: {
                    territoryId,
                    requesterId,
                    requestedRole,
                    actionType: 'ACCESS_REQUEST'
                },
                priority: 'high'
            })
        );

        await Promise.all(notifications);
    }

    // Create territory change notification
    async createTerritoryChangeNotification(territoryId, changeType, changes, affectedUserIds = []) {
        const territory = await this.db.collection('territories').doc(territoryId).get();
        if (!territory.exists) return;

        const territoryData = territory.data();
        
        // Get all affected users (including managers)
        const assignments = territoryData.assignments || [];
        const notifyUserIds = new Set([
            ...affectedUserIds,
            ...assignments.map(a => a.userId)
        ]);

        // Create notifications for each affected user
        const notifications = Array.from(notifyUserIds).map(userId =>
            this.createNotification({
                recipientId: userId,
                type: 'TERRITORY_CHANGE',
                title: 'Territory Update',
                message: `${territoryData.name} has been updated: ${changeType}`,
                context: {
                    territoryId,
                    changeType,
                    changes,
                    actionType: 'TERRITORY_CHANGE'
                }
            })
        );

        await Promise.all(notifications);
    }

    // Create boundary change notification
    async createBoundaryChangeNotification(territoryId, level, entityId) {
        const territory = await this.db.collection('territories').doc(territoryId).get();
        if (!territory.exists) return;

        const territoryData = territory.data();
        const assignments = territoryData.assignments || [];

        // Create notifications for territory managers
        const notifications = assignments
            .filter(assignment => 
                roleManager.hasPermission(assignment.role, 'canApproveChanges')
            )
            .map(manager =>
                this.createNotification({
                    recipientId: manager.userId,
                    recipientRoles: [manager.role],
                    type: 'BOUNDARY_CHANGE',
                    title: 'Boundary Change Request',
                    message: `A boundary change has been requested for ${level} in ${territoryData.name}`,
                    context: {
                        territoryId,
                        level,
                        entityId,
                        actionType: 'BOUNDARY_CHANGE'
                    },
                    priority: 'high'
                })
            );

        await Promise.all(notifications);
    }

    // Register notification handler
    registerHandler(type, handler) {
        this.handlers.set(type, handler);
    }

    // Handle incoming notification
    handleNewNotification(notification) {
        const handler = this.handlers.get(notification.type);
        if (handler) {
            handler(notification);
        }

        // Dispatch event for UI updates
        const event = new CustomEvent('new-notification', {
            detail: notification
        });
        document.dispatchEvent(event);
    }

    // Mark notification as read
    async markAsRead(notificationId) {
        try {
            await this.notificationsRef.doc(notificationId).update({
                read: true,
                readAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (error) {
            console.error('Error marking notification as read:', error);
            throw error;
        }
    }

    // Get user's unread notifications
    async getUnreadNotifications(userId) {
        try {
            const snapshot = await this.notificationsRef
                .where('recipientId', '==', userId)
                .where('read', '==', false)
                .orderBy('createdAt', 'desc')
                .get();

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error getting unread notifications:', error);
            throw error;
        }
    }
}

// Export singleton instance
export const notificationManager = new NotificationManager();

//**End of code or start of new file** 
 
// File: territory-management\core\role-manager.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\territory-management\core\role-manager.js
// Current Code:

// src/components/territory-management/core/role-manager.js

export class RoleManager {
    constructor() {
        this.roleHierarchy = {
            admin: ['admin'],
            territoryManager: ['admin', 'territoryManager'],
            regionManager: ['admin', 'territoryManager', 'regionManager'],
            districtManager: ['admin', 'territoryManager', 'regionManager', 'districtManager'],
            teamLeader: ['admin', 'territoryManager', 'regionManager', 'districtManager', 'teamLeader'],
            setter: ['admin', 'territoryManager', 'regionManager', 'districtManager', 'teamLeader', 'setter'],
            closer: ['admin', 'territoryManager', 'regionManager', 'districtManager', 'teamLeader', 'closer']
        };

        this.permissions = {
            admin: {
                canManageRoles: true,
                canManageTerritories: true,
                canManageRegions: true,
                canManageDistricts: true,
                canAssignUsers: true,
                canViewAllData: true,
                canEditBoundaries: true,
                canApproveChanges: true
            },
            territoryManager: {
                canManageRegions: true,
                canManageDistricts: true,
                canAssignUsers: true,
                canViewTerritoryData: true,
                canEditBoundaries: true,
                canApproveChanges: true
            },
            regionManager: {
                canManageDistricts: true,
                canAssignTeamLeaders: true,
                canViewRegionData: true,
                canRequestChanges: true
            },
            districtManager: {
                canAssignTeamMembers: true,
                canViewDistrictData: true,
                canRequestChanges: true
            },
            teamLeader: {
                canViewTeamData: true,
                canAssignTasks: true,
                canRequestChanges: true
            },
            setter: {
                canViewAssignedAreas: true,
                canCreateLeads: true,
                canUpdateLeads: true
            },
            closer: {
                canViewAssignedAreas: true,
                canUpdateLeads: true,
                canCloseDeals: true
            }
        };
    }

    // Get all roles that can manage a given role
    getManagerRoles(role) {
        return Object.entries(this.roleHierarchy)
            .filter(([_, managedRoles]) => managedRoles.includes(role))
            .map(([managerRole]) => managerRole);
    }

    // Check if one role can manage another
    canManage(managerRole, subordinateRole) {
        return this.roleHierarchy[managerRole]?.includes(subordinateRole) || false;
    }

    // Get all roles that a given role can manage
    getManagedRoles(role) {
        const hierarchyLevel = this.roleHierarchy[role];
        if (!hierarchyLevel) return [];

        const roleIndex = hierarchyLevel.indexOf(role);
        return hierarchyLevel.slice(roleIndex + 1);
    }

    // Check if user has specific permission
    hasPermission(role, permission) {
        return this.permissions[role]?.[permission] || false;
    }

    // Get all permissions for a role
    getRolePermissions(role) {
        return { ...this.permissions[role] };
    }

    // Check role inheritance for territory/region/district
    async checkRoleInheritance(userId, territoryId, options = {}) {
        try {
            const territory = await firebase.firestore()
                .collection('territories')
                .doc(territoryId)
                .get();

            if (!territory.exists) return false;

            const territoryData = territory.data();
            const assignments = territoryData.assignments || [];

            // Check direct assignments
            const directAssignment = assignments.find(
                assignment => assignment.userId === userId
            );

            if (directAssignment) {
                return this.hasPermission(
                    directAssignment.role, 
                    options.permission || 'canViewAssignedAreas'
                );
            }

            // Check inherited permissions
            if (options.regionId) {
                const region = territoryData.regions?.find(
                    r => r.id === options.regionId
                );
                if (!region) return false;

                const regionAssignment = region.assignments?.find(
                    assignment => assignment.userId === userId
                );
                if (regionAssignment) {
                    return this.hasPermission(
                        regionAssignment.role,
                        options.permission || 'canViewAssignedAreas'
                    );
                }

                // Check district if specified
                if (options.districtId) {
                    const district = region.districts?.find(
                        d => d.id === options.districtId
                    );
                    if (!district) return false;

                    const districtAssignment = district.assignments?.find(
                        assignment => assignment.userId === userId
                    );
                    if (districtAssignment) {
                        return this.hasPermission(
                            districtAssignment.role,
                            options.permission || 'canViewAssignedAreas'
                        );
                    }
                }
            }

            // Check if user is admin
            const userDoc = await firebase.firestore()
                .collection('users')
                .doc(userId)
                .get();

            return userDoc.exists && userDoc.data().role === 'admin';
        } catch (error) {
            console.error('Error checking role inheritance:', error);
            return false;
        }
    }

    // Get effective role for user in territory/region/district
    async getEffectiveRole(userId, territoryId, options = {}) {
        try {
            const territory = await firebase.firestore()
                .collection('territories')
                .doc(territoryId)
                .get();

            if (!territory.exists) return null;

            const territoryData = territory.data();
            const assignments = territoryData.assignments || [];

            // Check territory level
            const territoryAssignment = assignments.find(
                assignment => assignment.userId === userId
            );
            if (territoryAssignment) return territoryAssignment.role;

            // Check region level
            if (options.regionId) {
                const region = territoryData.regions?.find(
                    r => r.id === options.regionId
                );
                if (region) {
                    const regionAssignment = region.assignments?.find(
                        assignment => assignment.userId === userId
                    );
                    if (regionAssignment) return regionAssignment.role;

                    // Check district level
                    if (options.districtId) {
                        const district = region.districts?.find(
                            d => d.id === options.districtId
                        );
                        if (district) {
                            const districtAssignment = district.assignments?.find(
                                assignment => assignment.userId === userId
                            );
                            if (districtAssignment) return districtAssignment.role;
                        }
                    }
                }
            }

            // Check if user is admin
            const userDoc = await firebase.firestore()
                .collection('users')
                .doc(userId)
                .get();

            return userDoc.exists && userDoc.data().role === 'admin' ? 'admin' : null;
        } catch (error) {
            console.error('Error getting effective role:', error);
            return null;
        }
    }
}

// Export singleton instance
export const roleManager = new RoleManager();

//**End of code or start of new file** 
 
// File: territory-management\core\validation-manager.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\territory-management\core\validation-manager.js
// Current Code:

// src/components/territory-management/core/validation-manager.js

import { BoundaryUtils } from '../utils/boundary-utils';
import { roleManager } from './role-manager';

export class ValidationManager {
    constructor() {
        this.db = firebase.firestore();
        this.validators = new Map();
        this.setupDefaultValidators();
    }

    setupDefaultValidators() {
        // Territory validators
        this.validators.set('territory', {
            validateCreation: async (data) => {
                const errors = [];
                
                // Check required fields
                if (!data.name?.trim()) {
                    errors.push('Territory name is required');
                }
                if (!data.boundaries || !Array.isArray(data.boundaries)) {
                    errors.push('Valid territory boundaries are required');
                }

                // Validate boundaries
                const boundaryValidation = BoundaryUtils.validateBoundaries(data.boundaries);
                if (!boundaryValidation.valid) {
                    errors.push(boundaryValidation.error);
                }

                // Check for overlaps with existing territories
                const snapshot = await this.db.collection('territories').get();
                for (const doc of snapshot.docs) {
                    const territory = doc.data();
                    if (BoundaryUtils.checkOverlap(data.boundaries, territory.boundaries)) {
                        errors.push(`Territory boundaries overlap with existing territory: ${territory.name}`);
                    }
                }

                return {
                    valid: errors.length === 0,
                    errors
                };
            },

            validateUpdate: async (territoryId, updates) => {
                const errors = [];
                
                const doc = await this.db.collection('territories').doc(territoryId).get();
                if (!doc.exists) {
                    errors.push('Territory not found');
                    return { valid: false, errors };
                }

                // Check boundary updates
                if (updates.boundaries) {
                    const boundaryValidation = BoundaryUtils.validateBoundaries(updates.boundaries);
                    if (!boundaryValidation.valid) {
                        errors.push(boundaryValidation.error);
                    }

                    // Check if new boundaries contain all existing regions
                    const territory = doc.data();
                    territory.regions?.forEach(region => {
                        if (!BoundaryUtils.containsTerritory(updates.boundaries, region.boundaries)) {
                            errors.push(`New boundaries would exclude region: ${region.name}`);
                        }
                    });
                }

                return {
                    valid: errors.length === 0,
                    errors
                };
            }
        });

        // Region validators
        this.validators.set('region', {
            validateCreation: async (territoryId, data) => {
                const errors = [];

                // Check required fields
                if (!data.name?.trim()) {
                    errors.push('Region name is required');
                }
                if (!data.boundaries || !Array.isArray(data.boundaries)) {
                    errors.push('Valid region boundaries are required');
                }

                const territory = await this.db.collection('territories').doc(territoryId).get();
                if (!territory.exists) {
                    errors.push('Territory not found');
                    return { valid: false, errors };
                }

                const territoryData = territory.data();

                // Check if region is within territory
                if (!BoundaryUtils.containsTerritory(territoryData.boundaries, data.boundaries)) {
                    errors.push('Region must be within territory boundaries');
                }

                // Check for overlaps with existing regions
                territoryData.regions?.forEach(region => {
                    if (BoundaryUtils.checkOverlap(data.boundaries, region.boundaries)) {
                        errors.push(`Region boundaries overlap with existing region: ${region.name}`);
                    }
                });

                return {
                    valid: errors.length === 0,
                    errors
                };
            }
        });

        // District validators
        this.validators.set('district', {
            validateCreation: async (territoryId, regionId, data) => {
                const errors = [];

                if (!data.name?.trim()) {
                    errors.push('District name is required');
                }
                if (!data.boundaries || !Array.isArray(data.boundaries)) {
                    errors.push('Valid district boundaries are required');
                }

                const territory = await this.db.collection('territories').doc(territoryId).get();
                if (!territory.exists) {
                    errors.push('Territory not found');
                    return { valid: false, errors };
                }

                const territoryData = territory.data();
                const region = territoryData.regions?.find(r => r.id === regionId);
                
                if (!region) {
                    errors.push('Region not found');
                    return { valid: false, errors };
                }

                // Check if district is within region
                if (!BoundaryUtils.containsTerritory(region.boundaries, data.boundaries)) {
                    errors.push('District must be within region boundaries');
                }

                // Check for overlaps with existing districts
                region.districts?.forEach(district => {
                    if (BoundaryUtils.checkOverlap(data.boundaries, district.boundaries)) {
                        errors.push(`District boundaries overlap with existing district: ${district.name}`);
                    }
                });

                return {
                    valid: errors.length === 0,
                    errors
                };
            }
        });

        // Assignment validators
        this.validators.set('assignment', {
            validateAssignment: async (territoryId, assignment) => {
                const errors = [];

                const { userId, role, level, regionId, districtId } = assignment;

                // Check user exists
                const userDoc = await this.db.collection('users').doc(userId).get();
                if (!userDoc.exists) {
                    errors.push('User not found');
                    return { valid: false, errors };
                }

                // Validate role assignment
                const assignerRole = await roleManager.getEffectiveRole(
                    firebase.auth().currentUser.uid,
                    territoryId,
                    { regionId, districtId }
                );

                if (!roleManager.canManage(assignerRole, role)) {
                    errors.push('You do not have permission to assign this role');
                }

                // Validate assignment level
                const territory = await this.db.collection('territories').doc(territoryId).get();
                if (!territory.exists) {
                    errors.push('Territory not found');
                    return { valid: false, errors };
                }

                const territoryData = territory.data();

                if (level === 'region') {
                    const region = territoryData.regions?.find(r => r.id === regionId);
                    if (!region) {
                        errors.push('Region not found');
                    }
                } else if (level === 'district') {
                    const region = territoryData.regions?.find(r => r.id === regionId);
                    if (!region) {
                        errors.push('Region not found');
                        return { valid: false, errors };
                    }

                    const district = region.districts?.find(d => d.id === districtId);
                    if (!district) {
                        errors.push('District not found');
                    }
                }

                return {
                    valid: errors.length === 0,
                    errors
                };
            }
        });
    }

    // Register custom validator
    registerValidator(type, validator) {
        this.validators.set(type, validator);
    }

    // Generic validation method
    async validate(type, action, ...args) {
        const validator = this.validators.get(type);
        if (!validator) {
            throw new Error(`No validator found for type: ${type}`);
        }

        const validationMethod = validator[`validate${action}`];
        if (!validationMethod) {
            throw new Error(`No validation method found for action: ${action}`);
        }

        return validationMethod(...args);
    }

    // Validate entire territory hierarchy
    async validateHierarchy(territoryId) {
        const errors = [];

        try {
            const territory = await this.db.collection('territories').doc(territoryId).get();
            if (!territory.exists) {
                return { valid: false, errors: ['Territory not found'] };
            }

            const territoryData = territory.data();

            // Validate territory boundaries
            const boundaryValidation = BoundaryUtils.validateBoundaries(territoryData.boundaries);
            if (!boundaryValidation.valid) {
                errors.push(`Territory boundary error: ${boundaryValidation.error}`);
            }

            // Validate regions
            territoryData.regions?.forEach(region => {
                // Check region boundaries
                const regionValidation = BoundaryUtils.validateBoundaries(region.boundaries);
                if (!regionValidation.valid) {
                    errors.push(`Region ${region.name} boundary error: ${regionValidation.error}`);
                }

                // Check if region is within territory
                if (!BoundaryUtils.containsTerritory(territoryData.boundaries, region.boundaries)) {
                    errors.push(`Region ${region.name} is not within territory boundaries`);
                }

                // Validate districts
                region.districts?.forEach(district => {
                    // Check district boundaries
                    const districtValidation = BoundaryUtils.validateBoundaries(district.boundaries);
                    if (!districtValidation.valid) {
                        errors.push(`District ${district.name} boundary error: ${districtValidation.error}`);
                    }

                    // Check if district is within region
                    if (!BoundaryUtils.containsTerritory(region.boundaries, district.boundaries)) {
                        errors.push(`District ${district.name} is not within region ${region.name} boundaries`);
                    }
                });
            });

            return {
                valid: errors.length === 0,
                errors
            };

        } catch (error) {
            console.error('Error validating hierarchy:', error);
            return {
                valid: false,
                errors: ['Internal validation error']
            };
        }
    }
}

// Export singleton instance
export const validationManager = new ValidationManager();

//**End of code or start of new file** 
 
// File: territory-management\services\inheritance-service.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\territory-management\services\inheritance-service.js
// Current Code:

// src/components/territory-management/services/inheritance-service.js

export class InheritanceService {
    constructor(roleManager) {
        this.roleManager = roleManager;
    }

    async getInheritedManagerId(territoryId, regionId, districtId) {
        // Check for district manager
        if (districtId) {
            const districtManager = await this.getDistrictManager(territoryId, regionId, districtId);
            if (districtManager) return districtManager;
        }

        // Check for region manager
        if (regionId) {
            const regionManager = await this.getRegionManager(territoryId, regionId);
            if (regionManager) return regionManager;
        }

        // Fallback to territory manager
        return this.getTerritoryManager(territoryId);
    }

    async getTerritoryManager(territoryId) {
        // Get territory manager ID from territory document
    }

    async getRegionManager(territoryId, regionId) {
        // Get region manager ID from territory document
        // If not found, return null
    }

    async getDistrictManager(territoryId, regionId, districtId) {
        // Get district manager ID from territory document
        // If not found, return null
    }
}

export const inheritanceService = new InheritanceService(roleManager);

//**End of code or start of new file** 
 
// File: territory-management\services\notification-service.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\territory-management\services\notification-service.js
// Current Code:

// src/components/territory-management/services/notification-service.js

export class NotificationService {
    constructor() {
        this.db = firebase.firestore();
        this.quietHoursEnabled = true;
    }

    // Check if notification should be sent based on user preferences
    async shouldNotify(userId, notificationType) {
        try {
            const userDoc = await this.db.collection('users').doc(userId).get();
            if (!userDoc.exists) return false;

            const userData = userDoc.data();
            const notificationSettings = userData.notifications || {};

            // Check if notification type is enabled
            if (!notificationSettings[notificationType]) return false;

            // Check quiet hours if enabled
            if (this.quietHoursEnabled && notificationSettings.quietHours) {
                const { start, end } = notificationSettings.quietHours;
                if (this.isInQuietHours(start, end)) return false;
            }

            return true;
        } catch (error) {
            console.error('Error checking notification preferences:', error);
            return false;
        }
    }

    // Check if current time is within quiet hours
    isInQuietHours(start, end) {
        const now = new Date();
        const [startHour, startMinute] = start.split(':').map(Number);
        const [endHour, endMinute] = end.split(':').map(Number);
        
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        // Convert times to minutes for easier comparison
        const currentTime = currentHour * 60 + currentMinute;
        const quietStart = startHour * 60 + startMinute;
        const quietEnd = endHour * 60 + endMinute;

        // Handle overnight quiet hours
        if (quietStart > quietEnd) {
            return currentTime >= quietStart || currentTime <= quietEnd;
        }

        return currentTime >= quietStart && currentTime <= quietEnd;
    }

    // Send email notification
    async sendEmailNotification(userId, notification) {
        if (!await this.shouldNotify(userId, 'emailNotifications')) return;

        // This would typically call your email service (e.g., SendGrid, Mailgun)
        // For now, we'll just log it
        console.log('Sending email notification:', {
            userId,
            subject: notification.title,
            message: notification.message
        });
    }

    // Send SMS notification
    async sendSMSNotification(userId, notification) {
        if (!await this.shouldNotify(userId, 'textNotifications')) return;

        // This would typically call your SMS service (e.g., Twilio)
        // For now, we'll just log it
        console.log('Sending SMS notification:', {
            userId,
            message: notification.message
        });
    }

    // Send in-app notification
    async sendInAppNotification(notification) {
        try {
            // Update notification status
            const notificationRef = this.db.collection('notifications')
                .doc(notification.id);

            await notificationRef.update({
                delivered: true,
                deliveredAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Dispatch event for UI update
            const event = new CustomEvent('notification-delivered', {
                detail: notification
            });
            document.dispatchEvent(event);

        } catch (error) {
            console.error('Error sending in-app notification:', error);
            throw error;
        }
    }

    // Send notification through all enabled channels
    async sendNotification(notification) {
        const { recipientId, priority } = notification;

        try {
            // Always send in-app notification
            await this.sendInAppNotification(notification);

            // For high priority notifications, attempt all channels
            if (priority === 'high') {
                await Promise.all([
                    this.sendEmailNotification(recipientId, notification),
                    this.sendSMSNotification(recipientId, notification)
                ]);
                return;
            }

            // For normal priority, check user preferences
            const userDoc = await this.db.collection('users')
                .doc(recipientId)
                .get();

            if (!userDoc.exists) return;

            const userData = userDoc.data();
            const { emailNotifications, textNotifications } = userData.notifications || {};

            // Send through enabled channels
            const notifications = [];
            if (emailNotifications) {
                notifications.push(this.sendEmailNotification(recipientId, notification));
            }
            if (textNotifications) {
                notifications.push(this.sendSMSNotification(recipientId, notification));
            }

            await Promise.all(notifications);

        } catch (error) {
            console.error('Error sending notification:', error);
            throw error;
        }
    }

    // Get notification history for user
    async getNotificationHistory(userId, options = {}) {
        try {
            let query = this.db.collection('notifications')
                .where('recipientId', '==', userId)
                .orderBy('createdAt', 'desc');

            if (options.limit) {
                query = query.limit(options.limit);
            }

            if (options.startAfter) {
                query = query.startAfter(options.startAfter);
            }

            const snapshot = await query.get();

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

        } catch (error) {
            console.error('Error getting notification history:', error);
            throw error;
        }
    }

    // Clear notification history
    async clearNotificationHistory(userId, options = {}) {
        try {
            const batch = this.db.batch();
            let query = this.db.collection('notifications')
                .where('recipientId', '==', userId);

            if (options.olderThan) {
                query = query.where('createdAt', '<', options.olderThan);
            }

            const snapshot = await query.get();

            snapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });

            await batch.commit();

        } catch (error) {
            console.error('Error clearing notification history:', error);
            throw error;
        }
    }
}

// Export singleton instance
export const notificationService = new NotificationService();

//**End of code or start of new file** 
 
// File: territory-management\services\territory-service.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\territory-management\services\territory-service.js
// Current Code:

// src/components/territory-management/services/territory-service.js

import { BoundaryUtils } from '../utils/boundary-utils.js';

export class TerritoryService {
    constructor(firestore) {
        this.db = firestore;
        this.territories = this.db.collection('territories');
    }

    // Create new territory
    async createTerritory(territoryData) {
        try {
            // Validate boundaries
            const validation = BoundaryUtils.validateBoundaries(territoryData.boundaries);
            if (!validation.valid) {
                throw new Error(validation.error);
            }

            // Check for overlaps with existing territories
            const existingTerritories = await this.territories.get();
            for (const doc of existingTerritories.docs) {
                const territory = doc.data();
                if (BoundaryUtils.checkOverlap(territoryData.boundaries, territory.boundaries)) {
                    throw new Error('Territory boundaries overlap with existing territory');
                }
            }

            // Create territory document
            const territory = {
                ...territoryData,
                boundaries: BoundaryUtils.simplifyBoundaries(territoryData.boundaries),
                active: true,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                regions: [],
                districts: []
            };

            const docRef = await this.territories.add(territory);
            return { id: docRef.id, ...territory };
        } catch (error) {
            console.error('Error creating territory:', error);
            throw error;
        }
    }

    // Add region to territory
    async addRegion(territoryId, regionData) {
        try {
            const territory = await this.getTerritory(territoryId);

            // Validate region boundaries
            const validation = BoundaryUtils.validateBoundaries(regionData.boundaries);
            if (!validation.valid) {
                throw new Error(validation.error);
            }

            // Check if region is within territory
            if (!BoundaryUtils.containsTerritory(territory.boundaries, regionData.boundaries)) {
                throw new Error('Region must be within territory boundaries');
            }

            // Check for overlap with existing regions
            const overlappingRegion = territory.regions.find(region =>
                BoundaryUtils.checkOverlap(regionData.boundaries, region.boundaries)
            );
            if (overlappingRegion) {
                throw new Error('Region boundaries overlap with existing region');
            }

            // Add region
            const region = {
                id: crypto.randomUUID(),
                ...regionData,
                boundaries: BoundaryUtils.simplifyBoundaries(regionData.boundaries),
                districts: [],
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            await this.territories.doc(territoryId).update({
                regions: firebase.firestore.FieldValue.arrayUnion(region),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            return region;
        } catch (error) {
            console.error('Error adding region:', error);
            throw error;
        }
    }

    // Add district to region
    async addDistrict(territoryId, regionId, districtData) {
        try {
            const territory = await this.getTerritory(territoryId);
            const region = territory.regions.find(r => r.id === regionId);
            
            if (!region) {
                throw new Error('Region not found');
            }

            // Validate district boundaries
            const validation = BoundaryUtils.validateBoundaries(districtData.boundaries);
            if (!validation.valid) {
                throw new Error(validation.error);
            }

            // Check if district is within region
            if (!BoundaryUtils.containsTerritory(region.boundaries, districtData.boundaries)) {
                throw new Error('District must be within region boundaries');
            }

            // Check for overlap with existing districts
            const overlappingDistrict = region.districts.find(district =>
                BoundaryUtils.checkOverlap(districtData.boundaries, district.boundaries)
            );
            if (overlappingDistrict) {
                throw new Error('District boundaries overlap with existing district');
            }

            // Add district
            const district = {
                id: crypto.randomUUID(),
                ...districtData,
                boundaries: BoundaryUtils.simplifyBoundaries(districtData.boundaries),
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            const updatedRegions = territory.regions.map(r =>
                r.id === regionId
                    ? { ...r, districts: [...r.districts, district] }
                    : r
            );

            await this.territories.doc(territoryId).update({
                regions: updatedRegions,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            return district;
        } catch (error) {
            console.error('Error adding district:', error);
            throw error;
        }
    }

    // Assign user to territory/region/district
    async assignUser(territoryId, userId, role, options = {}) {
        try {
            const assignment = {
                userId,
                role,
                level: options.level || 'territory',
                regionId: options.regionId,
                districtId: options.districtId,
                assignedAt: firebase.firestore.FieldValue.serverTimestamp(),
                assignedBy: firebase.auth().currentUser.uid
            };

            await this.territories.doc(territoryId).update({
                assignments: firebase.firestore.FieldValue.arrayUnion(assignment),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            return assignment;
        } catch (error) {
            console.error('Error assigning user:', error);
            throw error;
        }
    }

    // Get territory by ID
    async getTerritory(territoryId) {
        const doc = await this.territories.doc(territoryId).get();
        if (!doc.exists) {
            throw new Error('Territory not found');
        }
        return { id: doc.id, ...doc.data() };
    }

    // Get territories in area
    async getTerritoriesInArea(bounds) {
        const snapshot = await this.territories.get();
        return snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(territory => {
                const territoryBounds = new google.maps.LatLngBounds();
                territory.boundaries.forEach(point => 
                    territoryBounds.extend(new google.maps.LatLng(point.lat, point.lng))
                );
                return bounds.intersects(territoryBounds);
            });
    }

    // Get user's territories
    async getUserTerritories(userId) {
        const snapshot = await this.territories
            .where('assignments', 'array-contains', { userId })
            .get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }
}

// Export singleton instance
export const territoryService = new TerritoryService(firebase.firestore());

//**End of code or start of new file** 
 
// File: territory-management\styles\components.css
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\territory-management\styles\components.css
// Current Code:



//**End of code or start of new file** 
 
// File: territory-management\styles\modals.css
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\territory-management\styles\modals.css
// Current Code:

/* src/components/territory-management/styles/modals.css */

/* Base Modal Structure */
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    animation: fadeIn 0.2s ease-out;
}

.territory-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 8px;
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    z-index: 1001;
    animation: modalSlideIn 0.3s ease-out;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

/* Modal Header */
.modal-header {
    padding: 16px 24px;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h2 {
    margin: 0;
    font-size: 1.25rem;
    color: #333;
    font-weight: 500;
}

.close-button {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s;
}

.close-button:hover {
    background: #f5f5f5;
    color: #333;
}

/* Modal Content */
.modal-content {
    padding: 24px;
    overflow-y: auto;
    flex: 1;
}

/* Modal Footer */
.modal-footer {
    padding: 16px 24px;
    border-top: 1px solid #e0e0e0;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

/* Drawing Container */
.drawing-container {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    margin: -24px;
    background: #f5f5f5;
}

.map-container {
    width: 100%;
    height: 500px;
}

/* Territory Form */
.territory-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.form-group.full-width {
    grid-column: 1 / -1;
}

/* Form Elements */
.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-group label {
    font-weight: 500;
    color: #333;
    font-size: 0.875rem;
}

.required {
    color: #f44336;
    margin-left: 4px;
}

.form-group input,
.form-group select,
.form-group textarea {
    padding: 8px 12px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 0.875rem;
    transition: all 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    border-color: #4CAF50;
    outline: none;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
}

.form-group textarea {
    min-height: 100px;
    resize: vertical;
}

/* Territory Stats */
.territory-stats {
    display: flex;
    gap: 20px;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 4px;
}

.stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.stat-value {
    font-size: 1.25rem;
    font-weight: 500;
    color: #4CAF50;
}

.stat-label {
    font-size: 0.75rem;
    color: #666;
    margin-top: 4px;
}

/* Checkbox Group */
.checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    user-select: none;
}

.checkbox input[type="checkbox"] {
    width: 16px;
    height: 16px;
    margin: 0;
}

/* Button Styles */
.secondary-button {
    padding: 8px 16px;
    background: #f5f5f5;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    color: #666;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s;
}

.secondary-button:hover {
    background: #e0e0e0;
}

.primary-button {
    padding: 8px 16px;
    background: #4CAF50;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.2s;
}

.primary-button:hover {
    background: #45a049;
}

.primary-button:disabled {
    background: #ccc;
    cursor: not-allowed;
}

/* Animations */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: translate(-50%, -48%) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
    .territory-modal {
        background: #1a1a1a;
    }

    .modal-header {
        border-color: #333;
    }

    .modal-header h2 {
        color: #fff;
    }

    .close-button:hover {
        background: #333;
        color: #fff;
    }

    .modal-footer {
        border-color: #333;
    }

    .form-group label {
        color: #fff;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
        background: #333;
        border-color: #444;
        color: #fff;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        border-color: #4CAF50;
        box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
    }

    .territory-stats {
        background: #333;
    }

    .stat-label {
        color: #999;
    }

    .secondary-button {
        background: #333;
        border-color: #444;
        color: #fff;
    }

    .secondary-button:hover {
        background: #444;
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .territory-modal {
        width: 100%;
        height: 100%;
        max-height: none;
        border-radius: 0;
        transform: none;
        top: 0;
        left: 0;
    }

    .form-grid {
        grid-template-columns: 1fr;
    }

    .map-container {
        height: 400px;
    }

    .territory-stats {
        flex-direction: column;
        gap: 16px;
    }

    .modal-footer {
        padding: 16px;
    }

    .secondary-button,
    .primary-button {
        flex: 1;
        text-align: center;
    }
}

//**End of code or start of new file** 
 
// File: territory-management\styles\panels.css
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\territory-management\styles\panels.css
// Current Code:

/* src/components/territory-management/styles/panels.css */

/* Base Panel Styles */
.territory-panel {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 1.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
}

/* Common Panel Elements */
.panel-header {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
}

.panel-header h3 {
    margin: 0;
    color: #333;
    font-size: 1.25rem;
    font-weight: 500;
}

.panel-header p {
    margin: 0.5rem 0 0;
    color: #666;
    font-size: 0.875rem;
}

/* Status Badge */
.status-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
}

.status-badge.active {
    background: #e8f5e9;
    color: #2e7d32;
}

.status-badge.inactive {
    background: #ffebee;
    color: #c62828;
}

/* Assignment Panel Specific Styles */
.assignment-panel {
    composes: territory-panel;
}

.assignments-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.assignment-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f8f9fa;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    transition: all 0.2s ease;
}

.assignment-item:hover {
    border-color: #4CAF50;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.user-name {
    font-weight: 500;
    color: #333;
}

/* Role Badges */
.role-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
}

.role-badge.territoryManager { background: #e3f2fd; color: #1976d2; }
.role-badge.regionManager { background: #e8f5e9; color: #2e7d32; }
.role-badge.districtManager { background: #fff3e0; color: #e65100; }
.role-badge.teamLeader { background: #f3e5f5; color: #7b1fa2; }
.role-badge.setter { background: #e0f2f1; color: #00796b; }
.role-badge.closer { background: #fce4ec; color: #c2185b; }

/* Management Panel Specific Styles */
.management-panel {
    composes: territory-panel;
}

.management-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.status-section,
.actions-section,
.regions-section,
.settings-section {
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
}

.status-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 0.5rem;
}

.action-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 0.5rem;
}

.regions-summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
}

.settings-controls {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
}

/* Territory Info Panel Specific Styles */
.info-panel {
    composes: territory-panel;
}

.territory-overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 6px;
    margin-bottom: 1.5rem;
}

.overview-item {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.overview-item .material-icons {
    color: #4CAF50;
    font-size: 24px;
}

.overview-details {
    display: flex;
    flex-direction: column;
}

.overview-label {
    font-size: 0.875rem;
    color: #666;
}

.overview-value {
    font-weight: 500;
    color: #333;
}

/* Statistics Grid */
.territory-statistics,
.recent-activity {
    margin-bottom: 1.5rem;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    margin-top: 0.5rem;
}

.stat-item {
    padding: 1rem;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    text-align: center;
}

.stat-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 500;
    color: #4CAF50;
    margin-bottom: 0.25rem;
}

.stat-label {
    font-size: 0.875rem;
    color: #666;
}

/* Activity List */
.activity-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 0.5rem;
}

.activity-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 0.75rem;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
}

.activity-item .material-icons {
    color: #4CAF50;
    font-size: 20px;
}

.activity-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.activity-description {
    color: #333;
    font-size: 0.875rem;
}

.activity-time {
    color: #666;
    font-size: 0.75rem;
}

/* Performance Metrics */
.metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 0.5rem;
}

.metric-item {
    padding: 1rem;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
}

.metric-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
}

.metric-title {
    font-size: 0.875rem;
    color: #666;
}

.metric-value {
    font-weight: 500;
    color: #333;
}

.metric-progress {
    width: 100%;
    height: 6px;
    background: #f5f5f5;
    border-radius: 999px;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    background: #4CAF50;
    border-radius: 999px;
    transition: width 0.3s ease;
}

/* Common Action Elements */
.action-buttons {
    display: flex;
    gap: 0.5rem;
}

.action-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s;
}

.primary-action {
    background: #4CAF50;
    color: white;
}

.primary-action:hover {
    background: #45a049;
}

.secondary-action {
    background: #f5f5f5;
    color: #666;
    border: 1px solid #e0e0e0;
}

.secondary-action:hover {
    background: #e0e0e0;
}

.danger {
    color: #f44336;
}

/* Modal Styles */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal.show {
    display: flex;
}

.modal-content {
    background: white;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #eee;
}

.modal-header h3 {
    margin: 0;
    color: #333;
    font-size: 1.25rem;
}

/* Form Elements */
.form-group {
    margin-bottom: 1.5rem;
    padding: 0 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
}

.form-group select,
.form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    background: white;
    color: #333;
    font-size: 0.875rem;
}

.form-group select:focus,
.form-group input:focus {
    border-color: #4CAF50;
    outline: none;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
    .territory-panel {
        padding: 1rem;
    }

    .assignment-item,
    .activity-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }

    .action-buttons,
    .settings-controls {
        width: 100%;
        flex-direction: column;
    }

    .modal-content {
        width: 95%;
        margin: 1rem;
    }

    .form-group {
        padding: 0 1rem;
    }

    .modal-header,
    .modal-footer {
        padding: 1rem;
    }

    .stats-grid,
    .metrics-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
    .territory-panel,
    .modal-content {
        background: #1a1a1a;
    }

    .panel-header {
        border-color: #333;
    }

    .panel-header h3,
    .modal-header h3 {
        color: #fff;
    }

    .panel-header p {
        color: #999;
    }

    .assignment-item,
    .activity-item,
    .metric-item,
    .stat-item {
        background: #2d2d2d;
        border-color: #404040;
    }

    .status-section,
    .actions-section,
    .regions-section,
    .settings-section {
        background: #2d2d2d;
        border-color: #404040;
    }

    .user-name,
    .metric-value,
    .overview-value {
        color: #fff;
    }

    .activity-description {
        color: #fff;
    }

    .form-group label {
        color: #fff;
    }

    .form-group select,
    .form-group input {
        background: #2d2d2d;
        border-color: #404040;
        color: #fff;
    }

    .secondary-action {
        background: #2d2d2d;
        border-color: #404040;
        color: #fff;
    }

    .secondary-action:hover {
        background: #404040;
    }

    .metric-progress {
        background: #404040;
    }
}

//**End of code or start of new file** 
 
// File: territory-management\utils\boundary-utils.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\territory-management\utils\boundary-utils.js
// Current Code:

// src/components/territory-management/utils/boundary-utils.js

export class BoundaryUtils {
    // Check if two territories overlap
    static checkOverlap(boundary1, boundary2) {
        const poly1 = new google.maps.Polygon({ paths: boundary1 });
        const poly2 = new google.maps.Polygon({ paths: boundary2 });
        
        // Use Google Maps API to check intersection
        return google.maps.geometry.poly.containsLocation(
            poly1.getPath().getAt(0),
            poly2
        );
    }

    // Check if a point is within territory boundaries
    static isPointInTerritory(point, boundaries) {
        const poly = new google.maps.Polygon({ paths: boundaries });
        return google.maps.geometry.poly.containsLocation(
            new google.maps.LatLng(point.lat, point.lng),
            poly
        );
    }

    // Calculate territory area in square kilometers
    static calculateArea(boundaries) {
        const poly = new google.maps.Polygon({ paths: boundaries });
        return google.maps.geometry.spherical.computeArea(poly.getPath()) / 1000000;
    }

    // Check if a territory contains another territory
    static containsTerritory(parentBoundaries, childBoundaries) {
        const parent = new google.maps.Polygon({ paths: parentBoundaries });
        const child = new google.maps.Polygon({ paths: childBoundaries });
        
        // Check if all points of child are within parent
        return child.getPath().getArray().every(point => 
            google.maps.geometry.poly.containsLocation(point, parent)
        );
    }

    // Validate territory boundaries
    static validateBoundaries(boundaries) {
        if (!boundaries || !Array.isArray(boundaries) || boundaries.length < 3) {
            return { valid: false, error: 'Territory must have at least 3 points' };
        }

        // Check for valid coordinates
        const invalidPoint = boundaries.find(point => 
            !point.lat || !point.lng ||
            point.lat < -90 || point.lat > 90 ||
            point.lng < -180 || point.lng > 180
        );

        if (invalidPoint) {
            return { valid: false, error: 'Invalid coordinates found' };
        }

        // Check if polygon is closed
        const firstPoint = boundaries[0];
        const lastPoint = boundaries[boundaries.length - 1];
        if (firstPoint.lat !== lastPoint.lat || firstPoint.lng !== lastPoint.lng) {
            return { valid: false, error: 'Territory boundaries must form a closed polygon' };
        }

        return { valid: true };
    }

    // Simplify territory boundaries to reduce points while maintaining shape
    static simplifyBoundaries(boundaries, tolerance = 0.0001) {
        const simplifiedPoints = [];
        let prevPoint = null;

        boundaries.forEach(point => {
            if (!prevPoint || 
                Math.abs(point.lat - prevPoint.lat) > tolerance ||
                Math.abs(point.lng - prevPoint.lng) > tolerance) {
                simplifiedPoints.push(point);
                prevPoint = point;
            }
        });

        // Ensure polygon remains closed
        if (simplifiedPoints.length > 0 && 
            (simplifiedPoints[0].lat !== simplifiedPoints[simplifiedPoints.length - 1].lat ||
             simplifiedPoints[0].lng !== simplifiedPoints[simplifiedPoints.length - 1].lng)) {
            simplifiedPoints.push(simplifiedPoints[0]);
        }

        return simplifiedPoints;
    }

    // Generate GeoJSON representation of territory
    static toGeoJSON(boundaries) {
        return {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [boundaries.map(point => [point.lng, point.lat])]
            },
            properties: {}
        };
    }

    // Convert GeoJSON to boundary coordinates
    static fromGeoJSON(geoJSON) {
        if (geoJSON.geometry?.type !== 'Polygon') {
            throw new Error('Invalid GeoJSON: must be Polygon type');
        }

        return geoJSON.geometry.coordinates[0].map(coord => ({
            lat: coord[1],
            lng: coord[0]
        }));
    }
}

//**End of code or start of new file** 
 
// File: territory-management\utils\notification-utils.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\territory-management\utils\notification-utils.js
// Current Code:

// src/components/territory-management/utils/notification-utils.js

export function deduplicate(notifications) {
    const deduplicatedNotifications = [];
    const groupedNotifications = groupBy(notifications, 'context.actionId');

    for (const [actionId, group] of Object.entries(groupedNotifications)) {
        const combinedRoles = new Set();
        const territoryIds = new Set();
        const regionIds = new Set();
        const districtIds = new Set();

        group.forEach(notification => {
            notification.recipientRoles.roles.forEach(role => combinedRoles.add(role));
            if (notification.recipientRoles.territoryId) territoryIds.add(notification.recipientRoles.territoryId);
            if (notification.recipientRoles.regionId) regionIds.add(notification.recipientRoles.regionId);
            if (notification.recipientRoles.districtId) districtIds.add(notification.recipientRoles.districtId);
        });

        deduplicatedNotifications.push({
            ...group[0],
            recipientRoles: {
                roles: Array.from(combinedRoles),
                territoryIds: Array.from(territoryIds),
                regionIds: Array.from(regionIds),
                districtIds: Array.from(districtIds)
            }
        });
    }

    return deduplicatedNotifications;
}

function groupBy(array, key) {
    return array.reduce((result, item) => {
        const value = getNestedProperty(item, key);
        if (value) {
            (result[value] || (result[value] = [])).push(item);
        }
        return result;
    }, {});
}

function getNestedProperty(obj, key) {
    return key.split('.').reduce((o, x) => (o && o[x]), obj);
}

//**End of code or start of new file** 
 
// File: territory-management\utils\validation-utils.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\territory-management\utils\validation-utils.js
// Current Code:

// src/components/territory-management/utils/validation-utils.js

export function validatePolygon(polygon) {
    if (polygon.length < 3) {
        return { valid: false, error: 'Polygon must have at least 3 points' };
    }

    const firstPoint = polygon[0];
    const lastPoint = polygon[polygon.length - 1];
    if (firstPoint.lat !== lastPoint.lat || firstPoint.lng !== lastPoint.lng) {
        return { valid: false, error: 'Polygon must be closed' };
    }

    return { valid: true };
}

export function validateTerritoryBoundaries(boundaries, existingTerritories) {
    for (const boundary of boundaries) {
        const validation = validatePolygon(boundary);
        if (!validation.valid) {
            return validation;
        }
    }

    for (const territory of existingTerritories) {
        if (hasOverlap(boundaries, territory.boundaries)) {
            return { valid: false, error: 'Territory boundaries overlap with existing territory' };
        }
    }

    return { valid: true };
}

export function hasOverlap(boundaries1, boundaries2) {
    // Check if any point in boundaries1 is inside boundaries2 or vice versa
    // Return true if overlap exists, false otherwise
}

//**End of code or start of new file** 
 
// File: settings\employee\components\employeemanagement.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\settings\employee\components\employeemanagement.js
// Current Code:

// src/components/settings/employee/components/employeemanagement.js
import '../styles/employeemanagement.css';

export class EmployeeManagement extends HTMLElement {
    constructor() {
        super();
        this.userData = {};
        this.initialized = false;
    }

    async connectedCallback() {
        if (this.initialized) return;
        this.initialized = true;

        await this.loadEmployeeData();
        this.render();
        this.setupEventListeners();
    }

    async loadEmployeeData() {
        const user = firebase.auth().currentUser;
        if (!user) return;

        try {
            const doc = await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .get();

            if (doc.exists) {
                this.userData = doc.data();
            }
        } catch (error) {
            console.error('Error loading employee data:', error);
        }
    }

    render() {
        this.innerHTML = `
            <div class="employee-data">
                <div class="section-header">
                    <h2>Employee Information</h2>
                </div>
                
                <form id="employee-form" class="employee-form">
                    <!-- Personal Information -->
                    <div class="form-section">
                        <h3 class="section-header">Personal Information</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="firstName">First Name</label>
                                <input type="text" id="firstName" name="firstName" 
                                       value="${this.userData.firstName || ''}" required>
                            </div>
                            <div class="form-group">
                                <label for="lastName">Last Name</label>
                                <input type="text" id="lastName" name="lastName" 
                                       value="${this.userData.lastName || ''}" required>
                            </div>
                            <div class="form-group">
                                <label for="dob">Date of Birth</label>
                                <input type="date" id="dob" name="dob" 
                                       value="${this.userData.dob || ''}">
                            </div>
                        </div>
                    </div>

                    <!-- Contact Information -->
                    <div class="form-section">
                        <h3 class="section-header">Contact Information</h3>
                        <div class="form-grid">
                            <div class="form-group full-width">
                                <label for="address1">Address Line 1</label>
                                <input type="text" id="address1" name="address1" 
                                       value="${this.userData.address1 || ''}">
                            </div>
                            <div class="form-group full-width">
                                <label for="address2">Address Line 2</label>
                                <input type="text" id="address2" name="address2" 
                                       value="${this.userData.address2 || ''}">
                            </div>
                            <div class="form-group">
                                <label for="city">City</label>
                                <input type="text" id="city" name="city" 
                                       value="${this.userData.city || ''}">
                            </div>
                            <div class="form-group">
                                <label for="state">State</label>
                                <input type="text" id="state" name="state" 
                                       value="${this.userData.state || ''}">
                            </div>
                            <div class="form-group">
                                <label for="zip">ZIP Code</label>
                                <input type="text" id="zip" name="zip" 
                                       value="${this.userData.zip || ''}">
                            </div>
                            <div class="form-group">
                                <label for="mobilePhone">Mobile Phone</label>
                                <input type="tel" id="mobilePhone" name="mobilePhone" 
                                       value="${this.userData.mobilePhone || ''}">
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" 
                                       value="${this.userData.email || ''}" readonly>
                            </div>
                        </div>
                    </div>

                    <!-- Personal Preferences -->
                    <div class="form-section">
                        <h3 class="section-header">Personal Preferences</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="favoriteColor">Favorite Color</label>
                                <input type="text" id="favoriteColor" name="favoriteColor" 
                                       value="${this.userData.favoriteColor || ''}">
                            </div>
                            <div class="form-group">
                                <label for="favoriteHobby">Favorite Hobby</label>
                                <input type="text" id="favoriteHobby" name="favoriteHobby" 
                                       value="${this.userData.favoriteHobby || ''}">
                            </div>
                            <div class="form-group">
                                <label for="favoriteFood">Favorite Food</label>
                                <input type="text" id="favoriteFood" name="favoriteFood" 
                                       value="${this.userData.favoriteFood || ''}">
                            </div>
                        </div>
                    </div>

                    <!-- Family Information -->
<div class="form-section">
    <h3 class="section-header">Family Information</h3>
    <div class="form-grid">
        <!-- Children Information -->
        <div class="form-group full-width">
            <h4>Children</h4>
            <div class="form-grid">
                <div class="form-group">
                    <label for="childFirstName">Child First Name</label>
                    <input type="text" id="childFirstName" name="childFirstName" 
                           value="${this.userData.childFirstName || ''}">
                </div>
                <div class="form-group">
                    <label for="childBirthday">Child Birthday</label>
                    <input type="date" id="childBirthday" name="childBirthday" 
                           value="${this.userData.childBirthday || ''}">
                </div>
            </div>
        </div>

        <div class="form-group full-width">
            <label for="pets">Pets</label>
            <input type="text" id="pets" name="pets" 
                   value="${this.userData.pets || ''}">
        </div>

        <!-- Partner Information -->
        <div class="form-group full-width">
            <h4>Partner Information</h4>
            <div class="form-grid">
                <div class="form-group">
                    <label for="partnerFirstName">Partner First Name</label>
                    <input type="text" id="partnerFirstName" name="partnerFirstName" 
                           value="${this.userData.partnerFirstName || ''}">
                </div>
                <div class="form-group">
                    <label for="partnerLastName">Partner Last Name</label>
                    <input type="text" id="partnerLastName" name="partnerLastName" 
                           value="${this.userData.partnerLastName || ''}">
                </div>
                <div class="form-group">
                    <label for="partnerBirthday">Partner Birthday</label>
                    <input type="date" id="partnerBirthday" name="partnerBirthday" 
                           value="${this.userData.partnerBirthday || ''}">
                </div>
            </div>
        </div>
    </div>
</div>

                    <!-- Goals -->
                    <div class="form-section">
                        <h3 class="section-header">Goals</h3>
                        <div class="form-grid">
                            <div class="form-group full-width">
                                <label>Personal Goals</label>
                                <div class="nested-form-group">
                                    <input type="text" name="personalGoal1Year" placeholder="1 Year Goal" 
                                           value="${this.userData.personalGoal1Year || ''}">
                                    <input type="text" name="personalGoal5Year" placeholder="5 Year Goal" 
                                           value="${this.userData.personalGoal5Year || ''}">
                                    <input type="text" name="personalGoal10Year" placeholder="10 Year Goal" 
                                           value="${this.userData.personalGoal10Year || ''}">
                                </div>
                            </div>
                            <div class="form-group full-width">
                                <label>Company Goals</label>
                                <div class="nested-form-group">
                                    <input type="text" name="companyGoal1Year" placeholder="1 Year Goal" 
                                           value="${this.userData.companyGoal1Year || ''}">
                                    <input type="text" name="companyGoal5Year" placeholder="5 Year Goal" 
                                           value="${this.userData.companyGoal5Year || ''}">
                                    <input type="text" name="companyGoal10Year" placeholder="10 Year Goal" 
                                           value="${this.userData.companyGoal10Year || ''}">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="secondary-button" id="cancelChanges">Cancel</button>
                        <button type="submit" class="primary-button">Save Changes</button>
                    </div>
                </form>
            </div>
        `;
    }

    setupEventListeners() {
        const form = this.querySelector('#employee-form');
        const cancelBtn = this.querySelector('#cancelChanges');

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.saveEmployeeData(new FormData(form));
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                this.loadEmployeeData().then(() => this.render());
            });
        }
    }

    async saveEmployeeData(formData) {
        const user = firebase.auth().currentUser;
        if (!user) return;

        try {
            const employeeData = {};
            for (const [key, value] of formData.entries()) {
                employeeData[key] = value;
            }

            await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .update({
                    ...employeeData,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });

            this.showMessage('Employee data saved successfully', 'success');
        } catch (error) {
            console.error('Error saving employee data:', error);
            this.showMessage('Failed to save employee data', 'error');
        }
    }

    showMessage(message, type) {
        const messageEl = document.createElement('div');
        messageEl.className = `settings-message ${type}`;
        messageEl.textContent = message;
        this.appendChild(messageEl);
        setTimeout(() => messageEl.remove(), 3000);
    }
}

customElements.define('employee-management', EmployeeManagement);

//**End of code or start of new file** 
 
// File: settings\employee\styles\employeemanagement.css
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\settings\employee\styles\employeemanagement.css
// Current Code:

/* src/components/settings/employee/styles/employeemanagement.css */

.employee-data {
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.employee-form {
    display: grid;
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
}

.form-section {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.section-header {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
}

.section-header h2 {
    margin: 0;
    color: #333;
    font-size: 1.5rem;
}

.section-header h3 {
    margin: 0;
    color: #666;
    font-size: 1.25rem;
    font-weight: 500;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-group.full-width {
    grid-column: 1 / -1;
}

.form-group label {
    font-weight: 500;
    color: #333;
    font-size: 0.875rem;
}

.form-group input,
.form-group select,
.form-group textarea {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    background: white;
    color: #333;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    border-color: #4CAF50;
    outline: none;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
}

.form-group input[readonly] {
    background: #f5f5f5;
    cursor: default;
}

.nested-form-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.75rem;
    background: #f8f9fa;
    border-radius: 4px;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
}

.secondary-button {
    padding: 0.75rem 1.5rem;
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #666;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s ease;
}

.secondary-button:hover {
    background: #e0e0e0;
}

.primary-button {
    padding: 0.75rem 1.5rem;
    background: #4CAF50;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 0.875rem;
}

.primary-button:hover {
    background: #45a049;
}

.settings-message {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 1rem;
    border-radius: 4px;
    color: white;
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
}

.settings-message.success {
    background: #4CAF50;
}

.settings-message.error {
    background: #f44336;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@media (max-width: 768px) {
    .employee-data {
        padding: 1rem;
    }

    .form-section {
        padding: 1rem;
    }

    .form-grid {
        grid-template-columns: 1fr;
    }

    .form-actions {
        flex-direction: column-reverse;
    }

    .primary-button,
    .secondary-button {
        width: 100%;
    }
}

//**End of code or start of new file** 
 
// File: settings\phases\components\phasemanagement.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\settings\phases\components\phasemanagement.js
// Current Code:

// src/components/settings/phases/components/phasemanagement.js
import '../styles/phasemanagement.css';

export class PhaseManagement extends HTMLElement {
    constructor() {
        super();
        this.selectedWorkflow = null;
        this.workflows = [];
        this.phases = [];
    }

    async connectedCallback() {
        // Check if workflow ID was passed (coming from workflow creation)
        const workflowId = this.getAttribute('workflow-id');
        
        await this.loadWorkflows();
        
        if (workflowId) {
            // Auto-select workflow if coming from workflow creation
            this.selectedWorkflow = this.workflows.find(w => w.id === workflowId);
            if (this.selectedWorkflow) {
                await this.loadPhases(workflowId);
            }
        }
        
        this.render();
    }

    async loadWorkflows() {
        try {
            const snapshot = await firebase.firestore()
                .collection('workflows')
                .get();

            this.workflows = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error loading workflows:', error);
        }
    }

    async loadPhases(workflowId) {
        try {
            const doc = await firebase.firestore()
                .collection('workflows')
                .doc(workflowId)
                .get();

            if (doc.exists) {
                this.phases = doc.data().phases || [];
            }
        } catch (error) {
            console.error('Error loading phases:', error);
        }
    }

    render() {
        this.innerHTML = `
            <div class="phase-management">
                ${!this.selectedWorkflow ? this.renderWorkflowSelection() : this.renderPhaseManagement()}
            </div>
        `;

        this.setupEventListeners();
    }

    renderWorkflowSelection() {
        return `
            <div class="workflow-selection">
                <div class="section-header">
                    <h2>Select Workflow</h2>
                </div>
                <div class="workflows-list">
                    ${this.workflows.map(workflow => `
                        <div class="workflow-card" data-id="${workflow.id}">
                            <div class="workflow-info">
                                <h3>${workflow.name}</h3>
                                <span class="collection-type">Collection: ${workflow.collection}</span>
                            </div>
                            <button class="select-workflow-btn">
                                <span class="material-icons">arrow_forward</span>
                                Manage Phases
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderPhaseManagement() {
        return `
            <div class="phase-section">
                <div class="section-header">
                    <div class="header-info">
                        <h2>Phases for ${this.selectedWorkflow.name}</h2>
                        <span class="collection-type">Collection: ${this.selectedWorkflow.collection}</span>
                    </div>
                    <button class="add-phase-btn">
                        <span class="material-icons">add</span>
                        Add Phase
                    </button>
                </div>

                <div class="phases-list">
                    ${this.phases.length ? this.phases.map(phase => `
                        <div class="phase-item" data-id="${phase.id}">
                            <div class="phase-color" style="background-color: ${phase.color}"></div>
                            <div class="phase-info">
                                <h3>${phase.name}</h3>
                                <p>${phase.description || ''}</p>
                            </div>
                            <div class="phase-actions">
                                <button class="edit-phase-btn">
                                    <span class="material-icons">edit</span>
                                </button>
                                <button class="manage-stages-btn">
                                    <span class="material-icons">view_list</span>
                                    Manage Stages
                                </button>
                            </div>
                        </div>
                    `).join('') : `
                        <div class="empty-state">
                            <p>No phases created yet</p>
                            <p>Click 'Add Phase' to get started</p>
                        </div>
                    `}
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Workflow selection
        this.querySelectorAll('.select-workflow-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const workflowId = e.target.closest('.workflow-card').dataset.id;
                this.selectedWorkflow = this.workflows.find(w => w.id === workflowId);
                await this.loadPhases(workflowId);
                this.render();
            });
        });

        // Add phase button
        this.querySelector('.add-phase-btn')?.addEventListener('click', () => {
            this.showPhaseModal();
        });

        // Phase actions
        this.querySelectorAll('.edit-phase-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const phaseId = e.target.closest('.phase-item').dataset.id;
                const phase = this.phases.find(p => p.id === phaseId);
                this.showPhaseModal(phase);
            });
        });

        this.querySelectorAll('.manage-stages-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const phaseId = e.target.closest('.phase-item').dataset.id;
                this.dispatchEvent(new CustomEvent('managestages', {
                    detail: {
                        workflowId: this.selectedWorkflow.id,
                        phaseId: phaseId
                    },
                    bubbles: true
                }));
            });
        });
    }

    // Modal methods would go here...
}

customElements.define('phase-management', PhaseManagement);

//**End of code or start of new file** 
 
// File: settings\phases\styles\phasemanagement.css
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\settings\phases\styles\phasemanagement.css
// Current Code:

/* src/components/settings/phases/styles/phasemanagement.css */

.phase-management {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Workflow Selection Styles */
.workflow-selection {
    padding: 1rem 0;
}

.workflows-list {
    display: grid;
    gap: 1rem;
    margin-top: 1rem;
}

.workflow-card {
    background: #f8f9fa;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s;
}

.workflow-card:hover {
    border-color: #4CAF50;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    transform: translateY(-1px);
}

.workflow-info h3 {
    margin: 0;
    color: #333;
    font-size: 1.125rem;
}

.collection-type {
    display: block;
    color: #666;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

.select-workflow-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.2s;
}

.select-workflow-btn:hover {
    background: #45a049;
}

/* Phase Management Styles */
.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.header-info h2 {
    margin: 0;
    color: #333;
    font-size: 1.25rem;
}

.add-phase-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
}

.add-phase-btn:hover {
    background: #45a049;
}

/* Phase List Styles */
.phases-list {
    display: grid;
    gap: 1rem;
}

.phase-item {
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1.25rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 0.2s;
}

.phase-item:hover {
    border-color: #4CAF50;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.phase-color {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: 2px solid rgba(0,0,0,0.1);
    flex-shrink: 0;
}

.phase-info {
    flex: 1;
}

.phase-info h3 {
    margin: 0;
    color: #333;
    font-size: 1rem;
}

.phase-info p {
    margin: 0.25rem 0 0;
    color: #666;
    font-size: 0.875rem;
}

.phase-actions {
    display: flex;
    gap: 0.5rem;
}

.edit-phase-btn,
.manage-stages-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background: none;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    color: #666;
    cursor: pointer;
    transition: all 0.2s;
}

.manage-stages-btn {
    padding: 0.5rem 1rem;
}

.edit-phase-btn:hover,
.manage-stages-btn:hover {
    background: #f5f5f5;
    color: #4CAF50;
    border-color: #4CAF50;
}

/* Empty State */
.empty-state {
    text-align: center;
    padding: 3rem;
    color: #666;
}

.empty-state p {
    margin: 0.5rem 0;
    font-size: 0.875rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    .phase-management {
        padding: 1rem;
    }

    .phase-item {
        flex-direction: column;
        align-items: flex-start;
    }

    .phase-actions {
        width: 100%;
        margin-top: 1rem;
    }

    .manage-stages-btn {
        flex: 1;
        justify-content: center;
    }
}

//**End of code or start of new file** 
 
// File: settings\preferences\components\appearancesettings.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\settings\preferences\components\appearancesettings.js
// Current Code:

// src/components/settings/preferences/components/appearancesettings.js
export class AppearanceSettings extends HTMLElement {
    constructor() {
        super();
        this.settings = {
            theme: 'light',
            fontSize: 'medium',
            colorScheme: 'default'
        };
    }

    async connectedCallback() {
        console.log('AppearanceSettings connected');
        await this.loadAppearanceSettings();
        this.render();
        this.setupEventListeners();
    }

    async loadAppearanceSettings() {
        const user = firebase.auth().currentUser;
        if (!user) return;

        try {
            const doc = await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .get();

            if (doc.exists) {
                const data = doc.data();
                this.settings = {
                    ...this.settings,
                    ...data.appearanceSettings
                };
            }
        } catch (error) {
            console.error('Error loading appearance settings:', error);
        }
    }

    render() {
        this.innerHTML = `
            <div class="appearance-settings preference-card">
                <h3>Appearance Settings</h3>
                <div class="settings-group">
                    <div class="setting-item">
                        <label>Theme</label>
                        <select id="theme">
                            <option value="light" ${this.settings.theme === 'light' ? 'selected' : ''}>Light</option>
                            <option value="dark" ${this.settings.theme === 'dark' ? 'selected' : ''}>Dark</option>
                        </select>
                    </div>
                    <div class="setting-item">
                        <label>Font Size</label>
                        <select id="fontSize">
                            <option value="small" ${this.settings.fontSize === 'small' ? 'selected' : ''}>Small</option>
                            <option value="medium" ${this.settings.fontSize === 'medium' ? 'selected' : ''}>Medium</option>
                            <option value="large" ${this.settings.fontSize === 'large' ? 'selected' : ''}>Large</option>
                        </select>
                    </div>
                    <div class="setting-item">
                        <label>Color Scheme</label>
                        <select id="colorScheme">
                            <option value="default" ${this.settings.colorScheme === 'default' ? 'selected' : ''}>Default</option>
                            <option value="high-contrast" ${this.settings.colorScheme === 'high-contrast' ? 'selected' : ''}>High Contrast</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        ['theme', 'fontSize', 'colorScheme'].forEach(setting => {
            this.querySelector(`#${setting}`)?.addEventListener('change', async (e) => {
                this.settings[setting] = e.target.value;
                await this.saveSettings();
            });
        });
    }

    async saveSettings() {
        const user = firebase.auth().currentUser;
        if (!user) return;

        try {
            await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .update({
                    appearanceSettings: this.settings,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
        } catch (error) {
            console.error('Error saving appearance settings:', error);
        }
    }
}

customElements.define('appearance-settings', AppearanceSettings);

//**End of code or start of new file** 
 
// File: settings\preferences\components\notificationsettings.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\settings\preferences\components\notificationsettings.js
// Current Code:

// First, let's define our default settings
const DEFAULT_SETTINGS = {
    notifications: {
        emailNotifications: false,
        textNotifications: false,
        appNotifications: true,
        quietHours: {
            start: '22:00',
            end: '07:00'
        }
    }
};

export class NotificationSettings extends HTMLElement {
    constructor() {
        super();
        console.log('NotificationSettings constructor called');
        // Initialize with default settings
        this.settings = DEFAULT_SETTINGS.notifications;
        this.initialized = false;
    }

    async connectedCallback() {
        if (this.initialized) return;
        this.initialized = true;
        
        console.log('NotificationSettings connected');
        await this.loadSettings();
        this.render();
        this.setupEventListeners();
    }

    async loadSettings() {
        const user = firebase.auth().currentUser;
        if (!user) return;

        try {
            const doc = await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .get();

            if (doc.exists) {
                const data = doc.data();
                this.settings = {
                    ...DEFAULT_SETTINGS.notifications,
                    ...(data.notificationSettings || {})
                };
            }
        } catch (error) {
            console.error('Error loading notification settings:', error);
            // Fallback to default settings on error
            this.settings = DEFAULT_SETTINGS.notifications;
        }
    }

    render() {
        console.log('Rendering notification settings with:', this.settings);
        this.innerHTML = `
            <div class="notification-settings">
                <div class="settings-group">
                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>Email Notifications</h4>
                            <p>Receive updates via email</p>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="emailToggle" 
                                   ${this.settings.emailNotifications ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>

                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>Text Notifications</h4>
                            <p>Receive updates via SMS</p>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="textToggle" 
                                   ${this.settings.textNotifications ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>

                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>App Notifications</h4>
                            <p>Receive in-app notifications</p>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="appToggle" 
                                   ${this.settings.appNotifications ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>

                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>Quiet Hours</h4>
                            <p>Don't send notifications during these hours</p>
                        </div>
                        <div class="time-range">
                            <div class="time-input">
                                <label>Start</label>
                                <input type="time" id="quietHoursStart" 
                                       value="${this.settings.quietHours.start}">
                            </div>
                            <div class="time-input">
                                <label>End</label>
                                <input type="time" id="quietHoursEnd" 
                                       value="${this.settings.quietHours.end}">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings-actions">
                    <button class="secondary-button" id="cancelChanges">Cancel</button>
                    <button class="primary-button" id="saveChanges">Save Changes</button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        ['email', 'text', 'app'].forEach(type => {
            const toggle = this.querySelector(`#${type}Toggle`);
            if (toggle) {
                toggle.addEventListener('change', (e) => {
                    this.settings[`${type}Notifications`] = e.target.checked;
                });
            }
        });

        ['Start', 'End'].forEach(period => {
            const input = this.querySelector(`#quietHours${period}`);
            if (input) {
                input.addEventListener('change', (e) => {
                    this.settings.quietHours[period.toLowerCase()] = e.target.value;
                });
            }
        });

        this.querySelector('#saveChanges')?.addEventListener('click', () => {
            this.saveSettings();
        });

        this.querySelector('#cancelChanges')?.addEventListener('click', () => {
            this.loadSettings().then(() => this.render());
        });
    }

    async saveSettings() {
        const user = firebase.auth().currentUser;
        if (!user) return;

        try {
            await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .update({
                    notificationSettings: this.settings,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });

            this.showMessage('Settings saved successfully', 'success');
        } catch (error) {
            console.error('Error saving settings:', error);
            this.showMessage('Failed to save settings', 'error');
        }
    }

    showMessage(message, type) {
        const messageEl = document.createElement('div');
        messageEl.className = `settings-message ${type}`;
        messageEl.textContent = message;
        this.appendChild(messageEl);
        setTimeout(() => messageEl.remove(), 3000);
    }
}

// Register the component
customElements.define('notification-settings', NotificationSettings);

//**End of code or start of new file** 
 
// File: settings\preferences\components\systemsettings.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\settings\preferences\components\systemsettings.js
// Current Code:

export class SystemSettings extends HTMLElement {
    constructor() {
        super();
        this.settings = {
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            dateFormat: 'MM/DD/YYYY',
            dataSync: true
        };
    }

    async connectedCallback() {
        // Check if user is admin
        const user = firebase.auth().currentUser;
        if (!user) return;

        try {
            const userDoc = await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .get();

            if (!userDoc.exists || userDoc.data()?.role !== 'admin') {
                this.innerHTML = `
                    <div class="unauthorized-message">
                        <p>System settings are only available to administrators.</p>
                    </div>
                `;
                return;
            }

            await this.loadSystemSettings();
            this.render();
            this.setupEventListeners();
        } catch (error) {
            console.error('Error loading user role:', error);
        }
    }

    async loadSystemSettings() {
        const user = firebase.auth().currentUser;
        if (!user) return;

        try {
            const doc = await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .get();

            if (doc.exists) {
                const data = doc.data();
                this.settings = {
                    ...this.settings,
                    ...data.systemSettings
                };
            }
        } catch (error) {
            console.error('Error loading system settings:', error);
        }
    }

    render() {
        this.innerHTML = `
            <div class="system-settings preference-card">
                <h3>System Settings</h3>
                <div class="settings-group">
                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>Timezone</h4>
                            <p>Set system timezone</p>
                        </div>
                        <select id="timezone">
                            ${this.getTimezoneOptions()}
                        </select>
                    </div>

                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>Date Format</h4>
                            <p>Choose how dates are displayed</p>
                        </div>
                        <select id="dateFormat">
                            <option value="MM/DD/YYYY" ${this.settings.dateFormat === 'MM/DD/YYYY' ? 'selected' : ''}>MM/DD/YYYY</option>
                            <option value="DD/MM/YYYY" ${this.settings.dateFormat === 'DD/MM/YYYY' ? 'selected' : ''}>DD/MM/YYYY</option>
                            <option value="YYYY-MM-DD" ${this.settings.dateFormat === 'YYYY-MM-DD' ? 'selected' : ''}>YYYY-MM-DD</option>
                        </select>
                    </div>

                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>Data Synchronization</h4>
                            <p>Keep data synced across devices</p>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="dataSyncToggle"
                                   ${this.settings.dataSync ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                <div class="settings-actions">
                    <button class="secondary-button" id="cancelChanges">Cancel</button>
                    <button class="primary-button" id="saveChanges">Save Changes</button>
                </div>
            </div>
        `;
    }

    getTimezoneOptions() {
        const timezones = Intl.supportedValuesOf
            ? Intl.supportedValuesOf('timeZone')
            : ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo'];
        
        return timezones.map(tz => `
            <option value="${tz}" ${this.settings.timezone === tz ? 'selected' : ''}>
                ${tz.replace(/_/g, ' ')}
            </option>
        `).join('');
    }

    setupEventListeners() {
        // Setup change tracking
        const inputs = this.querySelectorAll('select, input');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                this.querySelector('#saveChanges').removeAttribute('disabled');
            });
        });

        // Save button handler
        this.querySelector('#saveChanges')?.addEventListener('click', () => {
            this.saveSettings();
        });

        // Cancel button handler
        this.querySelector('#cancelChanges')?.addEventListener('click', () => {
            this.loadSettings().then(() => this.render());
        });
    }

    async saveSettings() {
        const user = firebase.auth().currentUser;
        if (!user) return;

        try {
            await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .update({
                    systemSettings: this.settings,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });

            this.showMessage('Settings saved successfully', 'success');
            this.querySelector('#saveChanges').setAttribute('disabled', 'true');
        } catch (error) {
            console.error('Error saving settings:', error);
            this.showMessage('Failed to save settings', 'error');
        }
    }

    showMessage(message, type) {
        const messageEl = document.createElement('div');
        messageEl.className = `settings-message ${type}`;
        messageEl.textContent = message;
        this.appendChild(messageEl);
        setTimeout(() => messageEl.remove(), 3000);
    }
}

customElements.define('system-settings', SystemSettings);

//**End of code or start of new file** 
 
// File: settings\preferences\components\userpreferences.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\settings\preferences\components\userpreferences.js
// Current Code:

// UserPreferences.js
export class UserPreferences extends HTMLElement {
    constructor() {
        super();
        this.preferences = {
            startingPage: 'daily-view',
            timeFormat: '12h',
            showNotifications: true
        };
    }

    async connectedCallback() {
        console.log('UserPreferences connected');
        await this.loadUserPreferences();
        this.render();
        this.setupEventListeners();
    }

    async loadUserPreferences() {
        const user = firebase.auth().currentUser;
        if (!user) return;

        try {
            const doc = await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .get();

            if (doc.exists) {
                const data = doc.data();
                this.preferences = {
                    ...this.preferences,
                    ...data.preferences
                };
            }
        } catch (error) {
            console.error('Error loading user preferences:', error);
        }
    }

    render() {
        this.innerHTML = `
            <div class="user-preferences preference-card">
                <h3>User Preferences</h3>
                <div class="settings-group">
                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>Starting Page</h4>
                            <p>Select which page to show after login</p>
                        </div>
                        <select id="startingPage">
                            <option value="dashboard" ${this.preferences.startingPage === 'dashboard' ? 'selected' : ''}>Dashboard</option>
                            <option value="daily-view" ${this.preferences.startingPage === 'daily-view' ? 'selected' : ''}>Daily View</option>
                            <option value="tasks" ${this.preferences.startingPage === 'tasks' ? 'selected' : ''}>Tasks</option>
                        </select>
                    </div>
    
                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>Time Format</h4>
                            <p>Choose 12 or 24 hour time format</p>
                        </div>
                        <select id="timeFormat">
                            <option value="12h" ${this.preferences.timeFormat === '12h' ? 'selected' : ''}>12 Hour</option>
                            <option value="24h" ${this.preferences.timeFormat === '24h' ? 'selected' : ''}>24 Hour</option>
                        </select>
                    </div>
    
                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>Show Notifications</h4>
                            <p>Display notifications on your desktop</p>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="showNotifications"
                                   ${this.preferences.showNotifications ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        `;
    }

    async updatePreference(key, value) {
        const user = firebase.auth().currentUser;
        if (!user) return;

        try {
            await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .update({
                    preferences: {
                        ...this.preferences,
                        [key]: value
                    }
                });

            this.preferences[key] = value;
        } catch (error) {
            console.error('Error updating preference:', error);
            alert('Failed to update preference. Please try again.');
        }
    }

    setupEventListeners() {
        // Handle select inputs
        ['defaultView', 'startingPage', 'timeFormat'].forEach(id => {
            this.querySelector(`#${id}`)?.addEventListener('change', (e) => {
                this.updatePreference(id, e.target.value);
            });
        });

        // Handle notification toggle
        this.querySelector('#showNotifications')?.addEventListener('change', (e) => {
            this.updatePreference('showNotifications', e.target.checked);
        });

        // Handle reset button
        this.querySelector('#resetPreferences')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all preferences to defaults?')) {
                this.resetToDefaults();
            }
        });

        // Handle save button
        this.querySelector('#savePreferences')?.addEventListener('click', () => {
            this.saveAllPreferences();
        });
    }

    async resetToDefaults() {
        const defaultPreferences = {
            defaultView: 'dashboard',
            startingPage: 'daily-view',
            timeFormat: '12h',
            showNotifications: true
        };

        const user = firebase.auth().currentUser;
        if (!user) return;

        try {
            await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .update({
                    preferences: defaultPreferences
                });

            this.preferences = defaultPreferences;
            this.render();
            alert('Preferences have been reset to defaults');
        } catch (error) {
            console.error('Error resetting preferences:', error);
            alert('Failed to reset preferences. Please try again.');
        }
    }

    async saveAllPreferences() {
        const user = firebase.auth().currentUser;
        if (!user) return;

        try {
            await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .update({
                    preferences: this.preferences,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });

            alert('All preferences have been saved');
        } catch (error) {
            console.error('Error saving preferences:', error);
            alert('Failed to save preferences. Please try again.');
        }
    }
}

customElements.define('user-preferences', UserPreferences);

//**End of code or start of new file** 
 
// File: settings\preferences\styles\appearancesettings.css
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\settings\preferences\styles\appearancesettings.css
// Current Code:

/* src/components/settings/preferences/styles/appearancesettings.css */
.appearance-settings {
    padding: 1.5rem;
}

.section-header {
    margin-bottom: 2rem;
}

.section-header h2 {
    margin: 0;
    color: #333;
    font-size: 1.25rem;
}

.section-header p {
    margin: 0.5rem 0 0;
    color: #666;
    font-size: 0.875rem;
}

.settings-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
}

.setting-info {
    flex: 1;
}

.setting-info h3 {
    margin: 0;
    color: #333;
    font-size: 1rem;
}

.setting-info p {
    margin: 0.25rem 0 0;
    color: #666;
    font-size: 0.875rem;
}

.font-size-select {
    padding: 0.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    background: white;
    color: #333;
}

/* src/components/settings/preferences/styles/appearancesettings.css */
.appearance-settings {
    padding: 1.5rem;
}

.settings-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
}

.setting-info {
    flex: 1;
    margin-right: 1rem;
}

.setting-info h4 {
    margin: 0;
    color: #333;
    font-size: 1rem;
}

.setting-info p {
    margin: 0.25rem 0 0;
    color: #666;
    font-size: 0.875rem;
}

/* Dark mode support */
[data-theme="dark"] .setting-item {
    background: #2d2d2d;
    border-color: #404040;
}

[data-theme="dark"] .setting-info h4 {
    color: #fff;
}

[data-theme="dark"] .setting-info p {
    color: #ccc;
}

//**End of code or start of new file** 
 
// File: settings\preferences\styles\notificationsettings.css
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\settings\preferences\styles\notificationsettings.css
// Current Code:

/* src/components/settings/preferences/styles/notificationsettings.css */
.notification-settings {
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    /* Remove the red border */
    border: 1px solid #e0e0e0; /* Replace with a subtle gray border */
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.settings-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
    transition: background-color 0.2s;
}

.setting-item:hover {
    background: #f0f0f0;
}

.notification-schedules {
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 8px;
    margin-top: 1rem;
}

.notification-schedules h3 {
    margin: 0 0 1rem 0;
    color: #333;
    font-size: 1rem;
}

.time-range {
    display: flex;
    gap: 2rem;
    align-items: center;
}

.time-input {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.time-input label {
    color: #666;
    font-size: 0.875rem;
}

.time-input input {
    padding: 0.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    color: #333;
}

@media (max-width: 768px) {
    .time-range {
        flex-direction: column;
        gap: 1rem;
    }
}

/* Dark Mode Support */
[data-theme="dark"] .setting-item,
[data-theme="dark"] .notification-schedules {
    background: #2d2d2d;
}

[data-theme="dark"] .time-input input {
    background: #1a1a1a;
    border-color: #404040;
    color: #fff;
}

.toggle-switch {
    position: relative;
    width: 48px;
    height: 24px;
    display: inline-block;
}

.toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.toggle-slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 24px;
}

.toggle-slider:before {
    position: absolute;
    content: '';
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
}

input:checked + .toggle-slider {
    background-color: #4CAF50;
}

input:checked + .toggle-slider:before {
    transform: translateX(24px);
}

.settings-actions {
    display: none;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
}

.settings-actions.show {
    display: flex;
}

.settings-message {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 1rem;
    border-radius: 4px;
    color: white;
    animation: slideIn 0.3s ease-out;
}

.settings-message.success {
    background: #4CAF50;
}

.settings-message.error {
    background: #f44336;
}

.settings-message.info {
    background: #2196F3;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

//**End of code or start of new file** 
 
// File: settings\preferences\styles\systemsettings.css
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\settings\preferences\styles\systemsettings.css
// Current Code:

/* src/components/settings/preferences/styles/systemsettings.css */
.system-settings {
    padding: 1.5rem;
}

.section-header {
    margin-bottom: 2rem;
}

.section-header h2 {
    margin: 0;
    color: #333;
    font-size: 1.25rem;
}

.section-header p {
    margin: 0.5rem 0 0;
    color: #666;
    font-size: 0.875rem;
}

.settings-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem;
    background: #f8f9fa;
    border-radius: 8px;
    transition: background-color 0.2s;
}

.setting-item:hover {
    background: #f0f0f0;
}

.setting-info {
    flex: 1;
    margin-right: 1rem;
}

.setting-info h3 {
    margin: 0;
    color: #333;
    font-size: 1rem;
    font-weight: 500;
}

.setting-info p {
    margin: 0.25rem 0 0;
    color: #666;
    font-size: 0.875rem;
}

.settings-select {
    min-width: 200px;
    padding: 0.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    background: white;
    color: #333;
    font-size: 0.875rem;
}

.settings-select:focus {
    border-color: #4CAF50;
    outline: none;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
}

.settings-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding-top: 1.5rem;
    border-top: 1px solid #eee;
}

.secondary-button {
    padding: 0.5rem 1rem;
    background: #f5f5f5;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    color: #666;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s;
}

.secondary-button:hover {
    background: #e0e0e0;
}

.primary-button {
    padding: 0.5rem 1rem;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.2s;
}

.primary-button:hover {
    background: #45a049;
}

/* Toggle Switch Styles (if not globally defined) */
.toggle-switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;
}

.toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 24px;
}

.toggle-slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}

input:checked + .toggle-slider {
    background-color: #4CAF50;
}

input:checked + .toggle-slider:before {
    transform: translateX(24px);
}

/* Responsive Design */
@media (max-width: 768px) {
    .system-settings {
        padding: 1rem;
    }

    .setting-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }

    .settings-select {
        width: 100%;
        min-width: unset;
    }

    .settings-actions {
        flex-direction: column-reverse;
        gap: 0.5rem;
    }

    .primary-button,
    .secondary-button {
        width: 100%;
        text-align: center;
    }
}

//**End of code or start of new file** 
 
// File: settings\preferences\styles\userpreferences.css
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\settings\preferences\styles\userpreferences.css
// Current Code:

/* src/components/settings/preferences/styles/userpreferences.css */
.user-preferences {
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.section-header {
    margin-bottom: 2rem;
}

.section-header h2 {
    margin: 0;
    color: #333;
    font-size: 1.25rem;
}

.section-header p {
    margin: 0.5rem 0 0;
    color: #666;
    font-size: 0.875rem;
}

.preferences-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.preference-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
}

.preference-info {
    flex: 1;
    margin-right: 1rem;
}

.preference-info h3 {
    margin: 0;
    color: #333;
    font-size: 1rem;
    font-weight: 500;
}

.preference-info p {
    margin: 0.25rem 0 0;
    color: #666;
    font-size: 0.875rem;
}

.preference-select {
    min-width: 200px;
    padding: 0.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    background: white;
    color: #333;
    font-size: 0.875rem;
}

.preference-select:focus {
    border-color: #4CAF50;
    outline: none;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
}

/* Toggle Switch */
.toggle-switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;
}

.toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 24px;
}

.toggle-slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}

input:checked + .toggle-slider {
    background-color: #4CAF50;
}

input:checked + .toggle-slider:before {
    transform: translateX(24px);
}

.preferences-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
}

.save-preferences {
    padding: 0.75rem 1.5rem;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.2s;
}

.save-preferences:hover {
    background: #45a049;
}

/* Responsive Design */
@media (max-width: 768px) {
    .user-preferences {
        padding: 1rem;
    }

    .preference-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }

    .preference-info {
        margin-right: 0;
    }

    .preference-select {
        width: 100%;
        min-width: unset;
    }
}

/* Dark Mode Support */
[data-theme="dark"] .user-preferences {
    background: #2d2d2d;
}

[data-theme="dark"] .section-header h2 {
    color: #fff;
}

[data-theme="dark"] .section-header p {
    color: #ccc;
}

[data-theme="dark"] .preference-item {
    background: #1a1a1a;
    border-color: #404040;
}

[data-theme="dark"] .preference-info h3 {
    color: #fff;
}

[data-theme="dark"] .preference-info p {
    color: #ccc;
}

[data-theme="dark"] .preference-select {
    background: #1a1a1a;
    border-color: #404040;
    color: #fff;
}

[data-theme="dark"] .preference-select option {
    background: #1a1a1a;
    color: #fff;
}

//**End of code or start of new file** 
 
// File: settings\roles\components\rolemanagement.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\settings\roles\components\rolemanagement.js
// Current Code:

// src/components/settings/RoleManagement.js
import '../styles/rolemanagement.css';

export class RoleManagement extends HTMLElement {
    constructor() {
        super();
        this.users = [];
        this.currentUserRole = null;
    }

    async connectedCallback() {
        // Check if user has admin rights
        const user = firebase.auth().currentUser;
        if (!user) return;

        const userDoc = await firebase.firestore()
            .collection('users')
            .doc(user.uid)
            .get();

        this.currentUserRole = userDoc.data()?.role;

        if (this.currentUserRole !== 'admin') {
            this.innerHTML = `
                <div class="unauthorized-message">
                    <p>You don't have permission to manage roles.</p>
                </div>
            `;
            return;
        }

        await this.loadUsers();
        this.render();
        this.setupEventListeners();
    }

    async loadUsers() {
        try {
            const snapshot = await firebase.firestore()
                .collection('users')
                .get();

            this.users = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error loading users:', error);
        }
    }

    render() {
        this.innerHTML = `
            <div class="role-management">
                <div class="role-header">
                    <h2>Role Management</h2>
                    <p class="role-description">Manage user roles and permissions.</p>
                </div>

                <div class="users-table">
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Current Role</th>
                                <th>New Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.users.map(user => `
                                <tr data-user-id="${user.id}">
                                    <td>
                                        <div class="user-info">
                                            <span class="user-name">${user.firstName} ${user.lastName}</span>
                                            <span class="user-email">${user.email}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="current-role ${user.role}">${user.role || 'No role'}</span>
                                    </td>
                                    <td>
                                        <select class="role-select" ${user.role === 'admin' ? 'disabled' : ''}>
                                            <option value="">Select Role</option>
                                            <option value="setter" ${user.role === 'setter' ? 'selected' : ''}>Setter</option>
                                            <option value="closer" ${user.role === 'closer' ? 'selected' : ''}>Closer</option>
                                            <option value="manager" ${user.role === 'manager' ? 'selected' : ''}>Manager</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button class="update-role-btn" ${user.role === 'admin' ? 'disabled' : ''}>
                                            Update Role
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        this.querySelectorAll('.update-role-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const row = e.target.closest('tr');
                const userId = row.dataset.userId;
                const newRole = row.querySelector('.role-select').value;

                if (!newRole) {
                    alert('Please select a role');
                    return;
                }

                try {
                    await this.updateUserRole(userId, newRole);
                    await this.loadUsers();
                    this.render();
                } catch (error) {
                    console.error('Error updating role:', error);
                    alert('Failed to update role. Please try again.');
                }
            });
        });
    }

    async updateUserRole(userId, newRole) {
        // Update in Firestore
        await firebase.firestore()
            .collection('users')
            .doc(userId)
            .update({
                role: newRole,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

        // Call cloud function to update custom claims
        const updateRole = firebase.functions().httpsCallable('setUserRole');
        await updateRole({ uid: userId, role: newRole });
    }
}

customElements.define('role-management', RoleManagement);

//**End of code or start of new file** 
 
// File: settings\roles\styles\rolemanagement.css
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\settings\roles\styles\rolemanagement.css
// Current Code:

/* src/components/settings/rolemanagement.css */

.role-management {
    padding: 1.5rem;
}

/* Header Section */
.role-header {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.role-header h2 {
    color: #333;
    margin: 0 0 0.5rem 0;
}

.role-description {
    color: #666;
    font-size: 0.875rem;
}

/* Users Table */
.users-table {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    overflow-x: auto;
}

.users-table table {
    width: 100%;
    border-collapse: collapse;
}

.users-table th,
.users-table td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
}

.users-table th {
    font-weight: 500;
    color: #666;
    background: #f8f9fa;
}

/* User Info Styles */
.user-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.user-name {
    font-weight: 500;
    color: #333;
}

.user-email {
    font-size: 0.875rem;
    color: #666;
}

/* Role Badges */
.current-role {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
}

.current-role.admin {
    background: #e3f2fd;
    color: #1976d2;
}

.current-role.manager {
    background: #e8f5e9;
    color: #2e7d32;
}

.current-role.setter {
    background: #fff3e0;
    color: #e65100;
}

.current-role.closer {
    background: #f3e5f5;
    color: #7b1fa2;
}

/* Role Select */
.role-select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    font-size: 0.875rem;
}

.role-select:focus {
    border-color: #4CAF50;
    outline: none;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
}

/* Update Button */
.update-role-btn {
    padding: 0.5rem 1rem;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.update-role-btn:hover {
    background: #45a049;
}

.update-role-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
}

/* Unauthorized Message */
.unauthorized-message {
    text-align: center;
    padding: 2rem;
    color: #f44336;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.unauthorized-message p {
    margin: 0;
    font-size: 1rem;
}

/* Loading State */
.loading-state {
    text-align: center;
    padding: 2rem;
    color: #666;
}

.loading-spinner {
    border: 3px solid #f3f3f3;
    border-top: 3px solid #4CAF50;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
    .role-management {
        padding: 1rem;
    }

    .users-table {
        padding: 1rem;
    }

    .users-table th,
    .users-table td {
        padding: 0.75rem;
    }

    /* Stack table on mobile */
    .users-table table {
        display: block;
    }

    .users-table thead {
        display: none;
    }

    .users-table tbody {
        display: block;
    }

    .users-table tr {
        display: block;
        margin-bottom: 1rem;
        border: 1px solid #eee;
        border-radius: 4px;
    }

    .users-table td {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        border: none;
        border-bottom: 1px solid #eee;
    }

    .users-table td:last-child {
        border-bottom: none;
    }

    .users-table td:before {
        content: attr(data-label);
        font-weight: 500;
        color: #666;
    }
}

//**End of code or start of new file** 
 
// File: settings\stages\components\stagemanagement.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\settings\stages\components\stagemanagement.js
// Current Code:

import '../styles/stagemanagement.css';

//**End of code or start of new file** 
 
// File: settings\stages\styles\stagemanagement.css
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\settings\stages\styles\stagemanagement.css
// Current Code:

/* src/components/settings/stagemanagement.css */

.stage-management {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Header Section */
.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.section-header h3 {
    font-size: 1.25rem;
    color: #333;
    margin: 0;
}

.add-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.add-button:hover {
    background: #45a049;
}

/* Stages List */
.stages-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.stage-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem;
    background: #f8f9fa;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    transition: all 0.2s ease;
}

.stage-item:hover {
    border-color: #4CAF50;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

/* Stage Info */
.stage-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.stage-info h4 {
    margin: 0;
    color: #333;
    font-size: 1rem;
    font-weight: 500;
}

.stage-details {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem;
}

/* Badges */
.approval-badge {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.75rem;
    background: #fff3e0;
    color: #e65100;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
}

.roles-badge {
    padding: 0.25rem 0.75rem;
    background: #e8f5e9;
    color: #2e7d32;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
}

/* Stage Actions */
.stage-actions {
    display: flex;
    gap: 0.5rem;
}

.icon-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    background: none;
    border-radius: 4px;
    cursor: pointer;
    color: #666;
    transition: all 0.2s;
}

.icon-button:hover {
    background: #e0e0e0;
    color: #333;
}

/* Stage Form Modal */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
}

.modal-header h3 {
    margin: 0;
    color: #333;
}

.close-modal {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    padding: 0.25rem;
}

.close-modal:hover {
    color: #333;
}

/* Form Elements */
.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.875rem;
    transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
    border-color: #4CAF50;
    outline: none;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
}

/* Roles Grid */
.roles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.75rem;
    margin-top: 0.5rem;
}

.role-checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: #f8f9fa;
    border: 1px solid #eee;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
}

.role-checkbox:hover {
    background: #e8f5e9;
    border-color: #4CAF50;
}

.role-checkbox input[type="checkbox"] {
    width: 16px;
    height: 16px;
}

/* Form Actions */
.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
}

.secondary-button {
    padding: 0.75rem 1.5rem;
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #666;
    cursor: pointer;
    transition: all 0.2s;
}

.secondary-button:hover {
    background: #e0e0e0;
}

.primary-button {
    padding: 0.75rem 1.5rem;
    background: #4CAF50;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;
}

.primary-button:hover {
    background: #45a049;
}

/* Empty State */
.stages-list:empty::after {
    content: 'Select a phase to manage its stages';
    display: block;
    text-align: center;
    padding: 2rem;
    color: #666;
    font-style: italic;
    background: #f8f9fa;
    border-radius: 4px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .stage-management {
        padding: 1rem;
    }

    .roles-grid {
        grid-template-columns: 1fr;
    }

    .stage-details {
        flex-direction: column;
        align-items: flex-start;
    }

    .modal-content {
        width: 95%;
        margin: 1rem;
    }
}

//**End of code or start of new file** 
 
// File: settings\users\components\usermanagement.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\settings\users\components\usermanagement.js
// Current Code:

// src/components/settings/users/components/usermanagement.js
import '../styles/usermanagement.css';

const DEFAULT_USER_SETTINGS = {
    systemSettings: {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        dateFormat: 'MM/DD/YYYY',
        dataSync: true
    },
    preferences: {
        defaultView: 'dashboard',
        startingPage: 'daily-view',
        timeFormat: '12h',
        showNotifications: true
    },
    notifications: {
        emailNotifications: false,
        textNotifications: false,
        appNotifications: true,
        quietHours: {
            start: '22:00',
            end: '07:00'
        }
    },
    appearance: {
        theme: 'light',
        fontSize: 'medium',
        layout: 'grid'
    }
};

export class UserManagement extends HTMLElement {
    constructor() {
        super();
        this.users = [];
        this.pendingInvites = [];
        this.initialized = false;
    }

    async connectedCallback() {
        if (this.initialized) return;
        this.initialized = true;

        const user = firebase.auth().currentUser;
        if (!user) return;

        try {
            const userDoc = await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .get();

            if (userDoc.data()?.role !== 'admin') {
                this.innerHTML = `
                    <div class="unauthorized-message">
                        <p>You don't have permission to manage users.</p>
                    </div>
                `;
                return;
            }

            await Promise.all([
                this.loadUsers(),
                this.loadPendingInvites()
            ]);

            this.render();
            this.setupEventListeners();
        } catch (error) {
            console.error('Error in UserManagement:', error);
            this.innerHTML = `
                <div class="error-message">
                    <p>An error occurred while loading user management.</p>
                </div>
            `;
        }
    }

    async loadUsers() {
        try {
            const snapshot = await firebase.firestore()
                .collection('users')
                .get();

            this.users = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error loading users:', error);
        }
    }

    async loadPendingInvites() {
        try {
            const snapshot = await firebase.firestore()
                .collection('userInvites')
                .where('status', '==', 'pending')
                .get();

            this.pendingInvites = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error loading invites:', error);
        }
    }

    render() {
        this.innerHTML = `
            <div class="user-management">
                <div class="section-header">
                    <h2>User Management</h2>
                    <button id="invite-user-btn" class="add-button">
                        <span class="material-icons">person_add</span>
                        Invite User
                    </button>
                </div>

                <!-- Active Users Section -->
                <div class="users-section">
                    <h3>Active Users</h3>
                    <div class="users-table">
                        ${this.renderUsersTable()}
                    </div>
                </div>

                <!-- Pending Invites Section -->
                <div class="pending-invites">
                    <h3>Pending Invites</h3>
                    <div class="invites-list">
                        ${this.renderPendingInvites()}
                    </div>
                </div>

                <!-- Invite Modal -->
                <div id="invite-modal" class="modal" style="display: none;">
                    <div class="modal-card">
                        <div class="modal-header">
                            <h3>Invite New User</h3>
                            <button class="close-button">&times;</button>
                        </div>
                        <form id="invite-form">
                            <div class="modal-content">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label>First Name<span class="required">*</span></label>
                                        <input type="text" name="firstName" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Last Name<span class="required">*</span></label>
                                        <input type="text" name="lastName" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Email<span class="required">*</span></label>
                                    <input type="email" name="email" required>
                                    <span class="field-hint">Company email required</span>
                                </div>
                                <div class="form-group">
                                    <label>Role<span class="required">*</span></label>
                                    <select name="role" required>
                                        <option value="">Select Role</option>
                                        <option value="setter">Setter</option>
                                        <option value="closer">Closer</option>
                                        <option value="manager">Manager</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn-cancel secondary-button">Cancel</button>
                                <button type="submit" class="btn-primary">Send Invite</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }

    renderUsersTable() {
        if (!this.users.length) {
            return '<div class="empty-state">No users found</div>';
        }

        return `
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.users.map(user => `
                        <tr data-user-id="${user.id}">
                            <td>${user.firstName} ${user.lastName}</td>
                            <td>${user.email}</td>
                            <td>${user.role}</td>
                            <td>
                                <span class="status-badge ${user.status || 'active'}">
                                    ${user.status || 'Active'}
                                </span>
                            </td>
                            <td>
                                <button class="icon-button edit-user" title="Edit User">
                                    <span class="material-icons">edit</span>
                                </button>
                                ${user.role !== 'admin' ? `
                                    <button class="icon-button deactivate-user" title="Deactivate User">
                                        <span class="material-icons">block</span>
                                    </button>
                                ` : ''}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    renderPendingInvites() {
        if (!this.pendingInvites.length) {
            return '<div class="empty-state">No pending invites</div>';
        }

        return this.pendingInvites.map(invite => `
            <div class="invite-card" data-id="${invite.id}">
                <div class="invite-info">
                    <span class="name">${invite.firstName} ${invite.lastName}</span>
                    <span class="email">${invite.email}</span>
                    <span class="role">${invite.role}</span>
                    <span class="date">${this.formatDate(invite.createdAt)}</span>
                </div>
                <button class="cancel-invite-btn" data-id="${invite.id}">
                    <span class="material-icons">close</span>
                </button>
            </div>
        `).join('');
    }

    formatDate(timestamp) {
        if (!timestamp) return '';
        const date = timestamp.toDate();
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).format(date);
    }

    setupEventListeners() {
        // Invite modal handlers
        const inviteBtn = this.querySelector('#invite-user-btn');
        const modal = this.querySelector('#invite-modal');
        const closeBtn = this.querySelector('.close-button');
        const cancelBtn = this.querySelector('.btn-cancel');
        const form = this.querySelector('#invite-form');

        if (inviteBtn && modal) {
            inviteBtn.addEventListener('click', () => {
                modal.style.display = 'flex';
            });
        }

        const closeModal = () => {
            if (modal) {
                modal.style.display = 'none';
                form?.reset();
            }
        };

        closeBtn?.addEventListener('click', closeModal);
        cancelBtn?.addEventListener('click', closeModal);

        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Form submission handler
        form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('.btn-primary');
            if (!submitBtn) return;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            try {
                const formData = new FormData(form);
                const userData = {
                    firstName: formData.get('firstName').trim(),
                    lastName: formData.get('lastName').trim(),
                    email: formData.get('email').toLowerCase().trim(),
                    role: formData.get('role')
                };

                await this.createUserInvite(userData);
                closeModal();
                await this.loadPendingInvites();
                this.render();
                this.showMessage('Invite sent successfully', 'success');
            } catch (error) {
                console.error('Error creating invite:', error);
                this.showMessage('Failed to send invite', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Invite';
            }
        });

        // Cancel invite handlers
        this.querySelectorAll('.cancel-invite-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const inviteId = e.currentTarget.dataset.id;
                if (confirm('Are you sure you want to cancel this invite?')) {
                    try {
                        await firebase.firestore()
                            .collection('userInvites')
                            .doc(inviteId)
                            .update({
                                status: 'cancelled',
                                cancelledAt: firebase.firestore.FieldValue.serverTimestamp()
                            });

                        await this.loadPendingInvites();
                        this.render();
                        this.showMessage('Invite cancelled successfully', 'success');
                    } catch (error) {
                        console.error('Error cancelling invite:', error);
                        this.showMessage('Failed to cancel invite', 'error');
                    }
                }
            });
        });

        // User action handlers
        this.querySelectorAll('.edit-user').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = e.currentTarget.closest('tr').dataset.userId;
                const user = this.users.find(u => u.id === userId);
                if (user) {
                    this.showEditUserModal(user);
                }
            });
        });

        this.querySelectorAll('.deactivate-user').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const userId = e.currentTarget.closest('tr').dataset.userId;
                if (confirm('Are you sure you want to deactivate this user?')) {
                    await this.deactivateUser(userId);
                }
            });
        });
    }

    async createUserInvite(userData) {
        try {
            // Create user document with default settings
            await firebase.firestore()
                .collection('users')
                .doc(userData.email)
                .set({
                    ...DEFAULT_USER_SETTINGS,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    role: userData.role,
                    status: 'invited',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });

            // Create invite record
            await firebase.firestore()
                .collection('userInvites')
                .add({
                    ...userData,
                    status: 'pending',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
        } catch (error) {
            console.error('Error creating user invite:', error);
            throw error;
        }
    }

    async deactivateUser(userId) {
        try {
            await firebase.firestore()
                .collection('users')
                .doc(userId)
                .update({
                    status: 'inactive',
                    deactivatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });

            await this.loadUsers();
            this.render();
            this.showMessage('User deactivated successfully', 'success');
        } catch (error) {
            console.error('Error deactivating user:', error);
            this.showMessage('Failed to deactivate user', 'error');
        }
    }

    showMessage(message, type) {
        const messageEl = document.createElement('div');
        messageEl.className = `settings-message ${type}`;
        messageEl.textContent = message;
        this.appendChild(messageEl);
        setTimeout(() => messageEl.remove(), 3000);
    }
}

customElements.define('user-management', UserManagement);

//**End of code or start of new file** 
 
// File: settings\users\styles\usermanagement.css
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\settings\users\styles\usermanagement.css
// Current Code:

/* src/components/settings/usermanagement.css */

.user-management {
    padding: 1.5rem;
}

/* Header Section */
.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.section-header h2 {
    margin: 0;
    color: #333;
}

.add-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.add-button:hover {
    background: #45a049;
}

/* Pending Invites Section */
.pending-invites {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.pending-invites h3 {
    color: #333;
    margin-bottom: 1rem;
}

.invites-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.invite-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f8f9fa;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    transition: all 0.2s;
}

.invite-card:hover {
    border-color: #4CAF50;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.invite-info {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.name {
    font-weight: 500;
    color: #333;
}

.email {
    color: #666;
}

.role {
    padding: 0.25rem 0.75rem;
    background: #e8f5e9;
    color: #2e7d32;
    border-radius: 999px;
    font-size: 0.75rem;
}

.date {
    color: #666;
    font-size: 0.875rem;
}

.cancel-invite-btn {
    background: none;
    border: none;
    color: #f44336;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: all 0.2s;
}

.cancel-invite-btn:hover {
    background: rgba(244, 67, 54, 0.1);
}

/* Invite Modal */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-card {
    background: white;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    margin: 0;
    color: #333;
}

.close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #666;
    cursor: pointer;
}

.modal-content {
    padding: 1.5rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.form-group label {
    font-weight: 500;
    color: #333;
}

.required {
    color: #f44336;
    margin-left: 0.25rem;
}

.form-group input,
.form-group select {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.875rem;
}

.field-hint {
    font-size: 0.75rem;
    color: #666;
}

.modal-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
}

/* Empty States */
.empty-state {
    text-align: center;
    padding: 2rem;
    color: #666;
    font-style: italic;
}

/* Responsive Design */
@media (max-width: 768px) {
    .user-management {
        padding: 1rem;
    }

    .invite-info {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }

    .form-row {
        grid-template-columns: 1fr;
    }
}

//**End of code or start of new file** 
 
// File: settings\workflows\components\workflowmanagement.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\settings\workflows\components\workflowmanagement.js
// Current Code:

// src/components/settings/workflows/components/workflowmanagement.js

export class WorkflowManagement extends HTMLElement {
    constructor() {
        super();
        this.workflows = [];
    }

    connectedCallback() {
        this.loadWorkflows();
        this.render();
    }

    async loadWorkflows() {
        try {
            const snapshot = await firebase.firestore()
                .collection('workflows')
                .get();

            this.workflows = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error loading workflows:', error);
        }
    }

    render() {
        this.innerHTML = `
            <div class="workflow-management">
                <div class="info-container">
                    <h1>Create a new workflow</h1>
                    <p>
                        A workflow is a collection of leads, contacts or addresses. You can create a custom 
                        workflow and blend types of data in the system. Within each workflow you can create 
                        phases and stages.
                    </p>

                    <div class="definitions">
                        <div class="definition-item">
                            <h3>Phases</h3>
                            <p>
                                A phase contains stages. Generally phases are used for management to 
                                have a condensed view of data to manage. Phases work well when designed 
                                to identify a "bucket" of work for a specific role in the company.
                            </p>
                        </div>

                        <div class="definition-item">
                            <h3>Stages</h3>
                            <p>
                                The best way to describe a stage would be to think of it as a stop on 
                                a trip, in which we have tasks to complete.
                            </p>
                        </div>

                        <div class="definition-item">
                            <h3>Tasks</h3>
                            <p>Items that need to be completed within the stage.</p>
                        </div>
                    </div>
                </div>

                <div class="workflows-container">
                    <div class="section-header">
                        <h2>Current Workflows</h2>
                        <button id="create-workflow" class="create-button">
                            <span class="material-icons">add</span>
                            Create Workflow
                        </button>
                    </div>

                    <div class="workflows-grid">
                        ${this.workflows.length ? this.renderWorkflows() : this.renderEmptyState()}
                    </div>
                </div>
            </div>
        `;

        this.setupEventListeners();
    }

    renderWorkflows() {
        return this.workflows.map(workflow => `
            <div class="workflow-card" data-id="${workflow.id}">
                <div class="workflow-header">
                    <div>
                        <h3>${workflow.name}</h3>
                        <span class="collection-name">Collection: ${workflow.collection}</span>
                    </div>
                    <span class="status-badge ${workflow.active ? 'active' : 'inactive'}">
                        ${workflow.active ? 'Active' : 'Inactive'}
                    </span>
                </div>
                <div class="phase-preview">
                    ${workflow.phases?.map(phase => `
                        <span class="phase-badge" style="background-color: ${phase.color}20; 
                            color: ${phase.color}; border: 1px solid ${phase.color}">
                            ${phase.name}
                        </span>
                    `).join('') || 'No phases defined'}
                </div>
                <div class="workflow-actions">
                    <button class="edit-workflow" data-id="${workflow.id}">
                        <span class="material-icons">edit</span>
                        Edit
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderEmptyState() {
        return `
            <div class="empty-state">
                <div class="empty-state-icon">
                    <span class="material-icons">account_tree</span>
                </div>
                <p>No workflows created</p>
                <p>Click 'Create Workflow' to get started</p>
            </div>
        `;
    }

    setupEventListeners() {
        // Create workflow button
        this.querySelector('#create-workflow')?.addEventListener('click', () => {
            this.showWorkflowModal();
        });

        // Edit workflow buttons
        this.querySelectorAll('.edit-workflow').forEach(button => {
            button.addEventListener('click', (e) => {
                const workflowId = e.target.closest('button').dataset.id;
                this.showWorkflowModal(workflowId);
            });
        });
    }

    showWorkflowModal(workflowId = null) {
        const workflow = workflowId ? 
            this.workflows.find(w => w.id === workflowId) : null;

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${workflow ? 'Edit' : 'Create'} Workflow</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <form id="workflow-form">
                    <div class="form-group">
                        <label>Collection Type</label>
                        <select name="collection" required>
                            <option value="">Select Collection</option>
                            <option value="contacts">Contacts</option>
                            <option value="addresses">Addresses</option>
                            <option value="leads">Leads</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Workflow Name</label>
                        <input type="text" name="name" required 
                               value="${workflow?.name || ''}">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea name="description" rows="3">${workflow?.description || ''}</textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="secondary-button">Cancel</button>
                        <button type="submit" class="primary-button">
                            ${workflow ? 'Update' : 'Create'} Workflow
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);
        this.setupModalEventListeners(modal, workflow);
    }

    setupModalEventListeners(modal, workflow) {
        const form = modal.querySelector('#workflow-form');
        const closeBtn = modal.querySelector('.close-modal');
        const cancelBtn = modal.querySelector('.secondary-button');

        const closeModal = () => modal.remove();

        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            
            const workflowData = {
                collection: formData.get('collection'),
                name: formData.get('name'),
                description: formData.get('description'),
                active: true,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            try {
                if (workflow) {
                    await firebase.firestore()
                        .collection('workflows')
                        .doc(workflow.id)
                        .update(workflowData);
                } else {
                    workflowData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
                    await firebase.firestore()
                        .collection('workflows')
                        .add(workflowData);
                }

                await this.loadWorkflows();
                this.render();
                closeModal();
            } catch (error) {
                console.error('Error saving workflow:', error);
                alert('Failed to save workflow. Please try again.');
            }
        });
    }
}

customElements.define('workflow-management', WorkflowManagement);

//**End of code or start of new file** 
 
// File: settings\workflows\styles\workflowmanagement.css
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\settings\workflows\styles\workflowmanagement.css
// Current Code:

/* src/components/settings/workflows/styles/workflowmanagement.css */

.workflow-management {
    padding: 1.5rem;
}

/* Info Container Styles */
.info-container {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.info-container h1 {
    color: #333;
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.info-container p {
    color: #666;
    line-height: 1.5;
    margin-bottom: 1.5rem;
}

/* Definitions Grid */
.definitions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
}

.definition-item {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
}

.definition-item h3 {
    color: #4CAF50;
    font-size: 1.125rem;
    margin-bottom: 0.75rem;
}

.definition-item p {
    color: #666;
    font-size: 0.875rem;
    line-height: 1.5;
    margin: 0;
}

/* Workflows Container */
.workflows-container {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.section-header h2 {
    color: #333;
    font-size: 1.25rem;
    margin: 0;
}

.create-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.2s;
}

.create-button:hover {
    background: #45a049;
}

.create-button .material-icons {
    font-size: 20px;
}

/* Workflows Grid */
.workflows-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

/* Workflow Card */
.workflow-card {
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1.5rem;
    transition: all 0.2s;
}

.workflow-card:hover {
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transform: translateY(-2px);
}

.workflow-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.workflow-header h3 {
    color: #333;
    font-size: 1.125rem;
    margin: 0 0 0.25rem 0;
}

.collection-name {
    color: #666;
    font-size: 0.875rem;
}

.status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
}

.status-badge.active {
    background: #e8f5e9;
    color: #2e7d32;
}

.status-badge.inactive {
    background: #f5f5f5;
    color: #666;
}

/* Phase Preview */
.phase-preview {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0;
}

.phase-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
}

/* Empty State */
.empty-state {
    text-align: center;
    padding: 3rem;
    color: #666;
}

.empty-state-icon {
    margin-bottom: 1rem;
}

.empty-state-icon .material-icons {
    font-size: 48px;
    color: #ccc;
}

.empty-state p {
    margin: 0.5rem 0;
    font-size: 0.875rem;
}

/* Modal Styles */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    z-index: 1000;
}

.modal-content {
    background: white;
    border-radius: 8px;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #e0e0e0;
}

.modal-header h3 {
    margin: 0;
    color: #333;
    font-size: 1.25rem;
}

.close-modal {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #666;
    cursor: pointer;
    padding: 0.25rem;
    line-height: 1;
}

/* Form Styles */
.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    color: #333;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 0.875rem;
    transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    border-color: #4CAF50;
    outline: none;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1.5rem;
    border-top: 1px solid #e0e0e0;
}

.secondary-button {
    padding: 0.5rem 1rem;
    background: #f5f5f5;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    color: #666;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s;
}

.secondary-button:hover {
    background: #e0e0e0;
}

.primary-button {
    padding: 0.5rem 1rem;
    background: #4CAF50;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.2s;
}

.primary-button:hover {
    background: #45a049;
}

/* Responsive Design */
@media (max-width: 768px) {
    .workflow-management {
        padding: 1rem;
    }

    .definitions {
        grid-template-columns: 1fr;
    }

    .workflows-grid {
        grid-template-columns: 1fr;
    }

    .modal {
        padding: 0.5rem;
    }

    .modal-content {
        max-height: 95vh;
    }
}

//**End of code or start of new file** 
 
// File: territory-management\ui\map\boundary-overlay.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\territory-management\ui\map\boundary-overlay.js
// Current Code:

// src/components/territory-management/ui/map/boundary-overlay.js

export class BoundaryOverlay extends HTMLElement {
    constructor() {
        super();
        this.map = null;
        this.territories = new Map(); // Map of territoryId -> polygon
        this.selectedTerritory = null;
        this.highlightedTerritory = null;
        this.initialized = false;

        // Default styles
        this.defaultStyle = {
            fillColor: '#4CAF50',
            fillOpacity: 0.2,
            strokeColor: '#4CAF50',
            strokeWeight: 2,
            zIndex: 1
        };

        this.selectedStyle = {
            fillColor: '#2196F3',
            fillOpacity: 0.3,
            strokeColor: '#2196F3',
            strokeWeight: 3,
            zIndex: 2
        };

        this.highlightedStyle = {
            fillColor: '#FFC107',
            fillOpacity: 0.3,
            strokeColor: '#FFC107',
            strokeWeight: 2,
            zIndex: 3
        };
    }

    async connectedCallback() {
        if (this.initialized) return;

        // Get map instance from parent
        this.map = this.closest('territory-map')?.map;
        if (!this.map) {
            console.error('Map not found');
            return;
        }

        await this.loadTerritories();
        this.setupEventListeners();
        
        this.initialized = true;
    }

    async loadTerritories() {
        try {
            const snapshot = await firebase.firestore()
                .collection('territories')
                .get();

            // Clear existing territories
            this.territories.forEach(polygon => polygon.setMap(null));
            this.territories.clear();

            // Add territories to map
            snapshot.docs.forEach(doc => {
                const territory = doc.data();
                this.addTerritory(doc.id, territory);
            });

            // Fit bounds to show all territories
            if (snapshot.size > 0) {
                const bounds = new google.maps.LatLngBounds();
                this.territories.forEach(polygon => {
                    polygon.getPath().forEach(latLng => bounds.extend(latLng));
                });
                this.map.fitBounds(bounds);
            }

        } catch (error) {
            console.error('Error loading territories:', error);
        }
    }

    addTerritory(id, territory) {
        if (!territory.boundaries || !Array.isArray(territory.boundaries)) {
            console.error('Invalid territory boundaries:', id);
            return;
        }

        // Create polygon for territory
        const path = territory.boundaries.map(coord => 
            new google.maps.LatLng(coord.lat, coord.lng)
        );

        const polygon = new google.maps.Polygon({
            paths: path,
            ...this.defaultStyle,
            map: this.map
        });

        // Store reference
        this.territories.set(id, polygon);

        // Setup polygon listeners
        this.setupPolygonListeners(id, polygon);

        return polygon;
    }

    setupPolygonListeners(id, polygon) {
        // Click handler
        polygon.addListener('click', () => {
            this.selectTerritory(id);
        });

        // Hover handlers
        polygon.addListener('mouseover', () => {
            if (id !== this.selectedTerritory) {
                this.highlightTerritory(id);
            }
        });

        polygon.addListener('mouseout', () => {
            if (id === this.highlightedTerritory) {
                this.unhighlightTerritory();
            }
        });

        // Right click handler for context menu
        polygon.addListener('rightclick', (e) => {
            this.showContextMenu(id, e);
        });
    }

    selectTerritory(id) {
        // Reset previous selection
        if (this.selectedTerritory) {
            const prevPolygon = this.territories.get(this.selectedTerritory);
            if (prevPolygon) {
                prevPolygon.setOptions(this.defaultStyle);
            }
        }

        // Update selection
        this.selectedTerritory = id;
        const polygon = this.territories.get(id);
        if (polygon) {
            polygon.setOptions(this.selectedStyle);
        }

        // Dispatch selection event
        this.dispatchEvent(new CustomEvent('territory-selected', {
            detail: { territoryId: id }
        }));
    }

    highlightTerritory(id) {
        if (id === this.selectedTerritory) return;

        this.unhighlightTerritory();
        
        const polygon = this.territories.get(id);
        if (polygon) {
            polygon.setOptions(this.highlightedStyle);
            this.highlightedTerritory = id;
        }
    }

    unhighlightTerritory() {
        if (!this.highlightedTerritory) return;

        const polygon = this.territories.get(this.highlightedTerritory);
        if (polygon) {
            polygon.setOptions(
                this.highlightedTerritory === this.selectedTerritory ? 
                this.selectedStyle : 
                this.defaultStyle
            );
        }

        this.highlightedTerritory = null;
    }

    showContextMenu(id, event) {
        // Create context menu
        const menu = document.createElement('div');
        menu.className = 'territory-context-menu';
        menu.style.left = `${event.domEvent.pageX}px`;
        menu.style.top = `${event.domEvent.pageY}px`;

        menu.innerHTML = `
            <div class="menu-item" data-action="edit">
                <span class="material-icons">edit</span>
                Edit Territory
            </div>
            <div class="menu-item" data-action="assignments">
                <span class="material-icons">people</span>
                Manage Assignments
            </div>
            <div class="menu-item" data-action="regions">
                <span class="material-icons">account_tree</span>
                Manage Regions
            </div>
            <div class="menu-separator"></div>
            <div class="menu-item danger" data-action="delete">
                <span class="material-icons">delete</span>
                Delete Territory
            </div>
        `;

        // Setup menu item handlers
        menu.addEventListener('click', (e) => {
            const action = e.target.closest('.menu-item')?.dataset.action;
            if (action) {
                this.handleContextMenuAction(action, id);
            }
            menu.remove();
        });

        // Close menu on outside click
        document.addEventListener('click', () => menu.remove(), { once: true });

        // Add to DOM
        document.body.appendChild(menu);
    }

    handleContextMenuAction(action, territoryId) {
        switch (action) {
            case 'edit':
                this.dispatchEvent(new CustomEvent('edit-territory', {
                    detail: { territoryId }
                }));
                break;

            case 'assignments':
                this.dispatchEvent(new CustomEvent('manage-assignments', {
                    detail: { territoryId }
                }));
                break;

            case 'regions':
                this.dispatchEvent(new CustomEvent('manage-regions', {
                    detail: { territoryId }
                }));
                break;

            case 'delete':
                if (confirm('Are you sure you want to delete this territory?')) {
                    this.dispatchEvent(new CustomEvent('delete-territory', {
                        detail: { territoryId }
                    }));
                }
                break;
        }
    }

    // Public methods
    updateTerritory(id, boundaries) {
        const polygon = this.territories.get(id);
        if (!polygon) return;

        const path = boundaries.map(coord => 
            new google.maps.LatLng(coord.lat, coord.lng)
        );
        polygon.setPath(path);
    }

    deleteTerritory(id) {
        const polygon = this.territories.get(id);
        if (polygon) {
            polygon.setMap(null);
            this.territories.delete(id);

            if (this.selectedTerritory === id) {
                this.selectedTerritory = null;
            }
            if (this.highlightedTerritory === id) {
                this.highlightedTerritory = null;
            }
        }
    }

    getVisibleTerritories() {
        const bounds = this.map.getBounds();
        if (!bounds) return [];

        return Array.from(this.territories.entries())
            .filter(([_, polygon]) => {
                const territoryBounds = new google.maps.LatLngBounds();
                polygon.getPath().forEach(latLng => 
                    territoryBounds.extend(latLng)
                );
                return bounds.intersects(territoryBounds);
            })
            .map(([id]) => id);
    }
}

customElements.define('boundary-overlay', BoundaryOverlay);

//**End of code or start of new file** 
 
// File: territory-management\ui\map\drawing-controls.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\territory-management\ui\map\drawing-controls.js
// Current Code:

// src/components/territory-management/ui/map/drawing-controls.js

export class DrawingControls extends HTMLElement {
    constructor() {
        super();
        this.map = null;
        this.drawingManager = null;
        this.currentShape = null;
        this.mode = 'view'; // 'view', 'draw', 'edit'
        this.initialized = false;
    }

    async connectedCallback() {
        if (this.initialized) return;
        
        this.render();
        await this.initializeDrawingManager();
        this.setupEventListeners();
        
        this.initialized = true;
    }

    render() {
        this.innerHTML = `
            <div class="drawing-toolbar">
                <button class="tool-btn" id="draw-territory" title="Draw Territory">
                    <span class="material-icons">draw</span>
                </button>
                <button class="tool-btn" id="edit-shape" title="Edit Shape" disabled>
                    <span class="material-icons">edit</span>
                </button>
                <button class="tool-btn" id="delete-shape" title="Delete Shape" disabled>
                    <span class="material-icons">delete</span>
                </button>
                <div class="divider"></div>
                <button class="tool-btn" id="save-territory" title="Save Territory" disabled>
                    <span class="material-icons">save</span>
                </button>
                <button class="tool-btn" id="cancel-drawing" title="Cancel">
                    <span class="material-icons">close</span>
                </button>
            </div>
            <div class="drawing-instructions" style="display: none;">
                <p>Click on the map to start drawing territory boundaries</p>
                <ul>
                    <li>Click to place points</li>
                    <li>Double-click or click first point to complete</li>
                    <li>Press ESC to cancel</li>
                </ul>
            </div>
        `;
    }

    async initializeDrawingManager() {
        // Get map instance from parent
        this.map = this.closest('territory-map')?.map;
        if (!this.map) {
            console.error('Map not found');
            return;
        }

        // Initialize drawing manager
        this.drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: null,
            drawingControl: false,
            polygonOptions: {
                fillColor: '#4CAF50',
                fillOpacity: 0.2,
                strokeColor: '#4CAF50',
                strokeWeight: 2,
                editable: false,
                draggable: false,
                zIndex: 1
            }
        });

        this.drawingManager.setMap(this.map);

        // Setup drawing completion listener
        google.maps.event.addListener(
            this.drawingManager, 
            'polygoncomplete', 
            (polygon) => this.handleDrawingComplete(polygon)
        );
    }

    setupEventListeners() {
        // Drawing tools
        this.querySelector('#draw-territory')?.addEventListener('click', () => {
            this.startDrawing();
        });

        this.querySelector('#edit-shape')?.addEventListener('click', () => {
            this.toggleEditing();
        });

        this.querySelector('#delete-shape')?.addEventListener('click', () => {
            this.deleteCurrentShape();
        });

        this.querySelector('#save-territory')?.addEventListener('click', () => {
            this.saveTerritory();
        });

        this.querySelector('#cancel-drawing')?.addEventListener('click', () => {
            this.cancelDrawing();
        });

        // Listen for ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.cancelDrawing();
            }
        });
    }

    startDrawing() {
        // Clear any existing shape
        if (this.currentShape) {
            this.currentShape.setMap(null);
            this.currentShape = null;
        }

        // Enable drawing mode
        this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
        this.mode = 'draw';

        // Update UI
        this.querySelector('#draw-territory').disabled = true;
        this.querySelector('.drawing-instructions').style.display = 'block';
        
        // Dispatch event
        this.dispatchEvent(new CustomEvent('drawing-started'));
    }

    toggleEditing() {
        if (!this.currentShape) return;

        const isEditing = this.currentShape.getEditable();
        this.currentShape.setEditable(!isEditing);
        this.currentShape.setDraggable(!isEditing);

        // Update button state
        this.querySelector('#edit-shape').classList.toggle('active', !isEditing);
    }

    deleteCurrentShape() {
        if (!this.currentShape) return;

        const confirmed = confirm('Are you sure you want to delete this shape?');
        if (confirmed) {
            this.currentShape.setMap(null);
            this.currentShape = null;
            this.updateToolbarState();
        }
    }

    handleDrawingComplete(polygon) {
        // Store reference to new shape
        this.currentShape = polygon;

        // Stop drawing mode
        this.drawingManager.setDrawingMode(null);
        this.mode = 'edit';

        // Setup shape listeners
        this.setupShapeListeners(polygon);

        // Update UI
        this.updateToolbarState();
        this.querySelector('.drawing-instructions').style.display = 'none';

        // Dispatch event
        this.dispatchEvent(new CustomEvent('shape-completed', {
            detail: {
                coordinates: this.getCoordinates()
            }
        }));
    }

    setupShapeListeners(polygon) {
        // Monitor shape changes
        google.maps.event.addListener(polygon.getPath(), 'set_at', () => {
            this.handleShapeChange();
        });
        
        google.maps.event.addListener(polygon.getPath(), 'insert_at', () => {
            this.handleShapeChange();
        });

        google.maps.event.addListener(polygon.getPath(), 'remove_at', () => {
            this.handleShapeChange();
        });
    }

    handleShapeChange() {
        // Validate shape has at least 3 points
        const coordinates = this.getCoordinates();
        if (coordinates.length < 3) {
            alert('Territory must have at least 3 points');
            return;
        }

        // Dispatch change event
        this.dispatchEvent(new CustomEvent('shape-changed', {
            detail: { coordinates }
        }));
    }

    getCoordinates() {
        if (!this.currentShape) return [];

        return this.currentShape.getPath().getArray().map(latLng => ({
            lat: latLng.lat(),
            lng: latLng.lng()
        }));
    }

    async saveTerritory() {
        const coordinates = this.getCoordinates();
        if (coordinates.length < 3) {
            alert('Territory must have at least 3 points');
            return;
        }

        try {
            // Dispatch save event
            this.dispatchEvent(new CustomEvent('save-territory', {
                detail: { coordinates }
            }));

            // Reset state
            this.mode = 'view';
            this.currentShape = null;
            this.updateToolbarState();

        } catch (error) {
            console.error('Error saving territory:', error);
            alert('Failed to save territory. Please try again.');
        }
    }

    cancelDrawing() {
        // Clear current shape
        if (this.currentShape) {
            this.currentShape.setMap(null);
            this.currentShape = null;
        }

        // Reset state
        this.drawingManager.setDrawingMode(null);
        this.mode = 'view';
        this.updateToolbarState();

        // Hide instructions
        this.querySelector('.drawing-instructions').style.display = 'none';

        // Dispatch event
        this.dispatchEvent(new CustomEvent('drawing-cancelled'));
    }

    updateToolbarState() {
        const hasShape = !!this.currentShape;
        
        this.querySelector('#draw-territory').disabled = this.mode !== 'view';
        this.querySelector('#edit-shape').disabled = !hasShape;
        this.querySelector('#delete-shape').disabled = !hasShape;
        this.querySelector('#save-territory').disabled = !hasShape;
    }
}

customElements.define('drawing-controls', DrawingControls);

//**End of code or start of new file** 
 
// File: territory-management\ui\map\territory-map.css
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\territory-management\ui\map\territory-map.css
// Current Code:

/* src/components/territory-management/ui/map/territory-map.css */

.territory-map-container {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 500px;
}

.map-controls {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.control-panel {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.control-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    color: #333;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease;
}

.control-btn:hover:not(:disabled) {
    background: #f5f5f5;
    border-color: #4CAF50;
    color: #4CAF50;
}

.control-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #f5f5f5;
}

.control-btn.active {
    background: #4CAF50;
    border-color: #4CAF50;
    color: white;
}

.control-btn .material-icons {
    font-size: 18px;
}

#map {
    border-radius: 8px;
    overflow: hidden;
}

/* Map Control Override Styles */
.territory-map-container .gm-style .gm-style-iw-c {
    padding: 12px;
    border-radius: 8px;
}

.territory-map-container .gm-style-iw-d {
    overflow: hidden !important;
}

.territory-map-container .gm-ui-hover-effect {
    top: 0 !important;
    right: 0 !important;
}

/* src/components/territory-management/ui/map/territory-map.css */

.drawing-toolbar {
    position: absolute;
    top: 10px;
    left: 10px;
    background: white;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 8px;
    z-index: 1000;
    display: flex;
    gap: 4px;
}

.tool-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.tool-btn:hover:not(:disabled) {
    background: #f5f5f5;
}

.tool-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.tool-btn.active {
    background: #4CAF50;
    color: white;
}

.tool-btn .material-icons {
    font-size: 20px;
}

.divider {
    width: 1px;
    background: #e0e0e0;
    margin: 0 4px;
}

.drawing-instructions {
    position: absolute;
    top: 60px;
    left: 10px;
    background: white;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 12px 16px;
    z-index: 1000;
    max-width: 300px;
}

.drawing-instructions p {
    margin: 0 0 8px 0;
    font-size: 14px;
    font-weight: 500;
    color: #333;
}

.drawing-instructions ul {
    margin: 0;
    padding: 0 0 0 20px;
    list-style-type: none;
}

.drawing-instructions li {
    position: relative;
    margin: 4px 0;
    font-size: 13px;
    color: #666;
}

.drawing-instructions li:before {
    content: "•";
    position: absolute;
    left: -12px;
    color: #4CAF50;
}

/* Animation for instructions */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

.drawing-instructions {
    animation: fadeIn 0.3s ease-out;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .drawing-toolbar {
        top: auto;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 4px;
    }

    .tool-btn {
        width: 32px;
        height: 32px;
    }

    .drawing-instructions {
        top: auto;
        bottom: 80px;
        left: 10px;
        right: 10px;
        max-width: none;
    }
}

/* Add to territory-map.css */

.territory-context-menu {
    position: fixed;
    background: white;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 4px 0;
    min-width: 180px;
    z-index: 1000;
    animation: menuFadeIn 0.15s ease-out;
}

.menu-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    color: #333;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
}

.menu-item:hover {
    background: #f5f5f5;
}

.menu-item .material-icons {
    font-size: 18px;
    opacity: 0.7;
}

.menu-item.danger {
    color: #f44336;
}

.menu-item.danger:hover {
    background: #ffebee;
}

.menu-separator {
    height: 1px;
    background: #e0e0e0;
    margin: 4px 0;
}

@keyframes menuFadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* Handle dark mode */
@media (prefers-color-scheme: dark) {
    .territory-context-menu {
        background: #333;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    .menu-item {
        color: #fff;
    }

    .menu-item:hover {
        background: #444;
    }

    .menu-separator {
        background: #444;
    }

    .menu-item.danger:hover {
        background: #b71c1c;
    }
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .territory-context-menu {
        position: fixed;
        left: 16px !important;
        right: 16px;
        bottom: 16px;
        top: auto !important;
        width: auto;
        border-radius: 8px;
    }

    .menu-item {
        padding: 12px 16px;
    }
}

//**End of code or start of new file** 
 
// File: territory-management\ui\map\territory-map.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\territory-management\ui\map\territory-map.js
// Current Code:

// src/components/territory-management/ui/map/territory-map.js

import { registerComponent } from '../../../../core/component-registry.js';

export class TerritoryMap extends HTMLElement {
    constructor() {
        super();
        this.map = null;
        this.drawingManager = null;
        this.territories = new Map(); // Store territory polygons
        this.currentTerritory = null;
        this.initialized = false;
    }

    async connectedCallback() {
        if (this.initialized) return;

        await this.loadGoogleMapsScript();
        this.render();
        await this.initializeMap();
        await this.loadTerritories();
        this.setupEventListeners();
        
        this.initialized = true;
    }

    loadGoogleMapsScript() {
        return new Promise((resolve, reject) => {
            if (window.google?.maps) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=drawing,geometry`;
            script.defer = true;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    render() {
        this.innerHTML = `
            <div class="territory-map-container">
                <div class="map-controls">
                    <div class="control-panel">
                        <button id="draw-territory" class="control-btn" disabled>
                            <span class="material-icons">draw</span>
                            Draw Territory
                        </button>
                        <button id="edit-boundary" class="control-btn" disabled>
                            <span class="material-icons">edit</span>
                            Edit Boundary
                        </button>
                    </div>
                </div>
                <div id="map" style="width: 100%; height: 100%;"></div>
            </div>
        `;
    }

    async initializeMap() {
        const mapElement = this.querySelector('#map');
        if (!mapElement) return;

        // Initialize the map
        this.map = new google.maps.Map(mapElement, {
            center: { lat: 39.8283, lng: -98.5795 }, // Center of USA
            zoom: 4,
            mapTypeControl: true,
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        // Initialize drawing manager
        this.drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: null,
            drawingControl: false,
            polygonOptions: {
                fillColor: '#4CAF50',
                fillOpacity: 0.2,
                strokeColor: '#4CAF50',
                strokeWeight: 2,
                editable: false
            }
        });

        this.drawingManager.setMap(this.map);

        // Enable controls for admin users
        const user = firebase.auth().currentUser;
        if (user) {
            const userDoc = await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .get();

            if (userDoc.exists && userDoc.data().role === 'admin') {
                this.querySelector('#draw-territory').disabled = false;
                this.querySelector('#edit-boundary').disabled = false;
            }
        }
    }

    async loadTerritories() {
        try {
            const snapshot = await firebase.firestore()
                .collection('territories')
                .get();

            snapshot.forEach(doc => {
                const territory = doc.data();
                this.addTerritoryToMap(doc.id, territory);
            });

            // Fit map bounds to show all territories
            if (snapshot.size > 0) {
                const bounds = new google.maps.LatLngBounds();
                this.territories.forEach(polygon => {
                    polygon.getPath().forEach(latLng => bounds.extend(latLng));
                });
                this.map.fitBounds(bounds);
            }
        } catch (error) {
            console.error('Error loading territories:', error);
        }
    }

    addTerritoryToMap(id, territory) {
        if (!territory.boundaries || !territory.boundaries.coordinates) return;

        const path = territory.boundaries.coordinates.map(coord => 
            new google.maps.LatLng(coord.lat, coord.lng)
        );

        const polygon = new google.maps.Polygon({
            paths: path,
            fillColor: '#4CAF50',
            fillOpacity: 0.2,
            strokeColor: '#4CAF50',
            strokeWeight: 2,
            editable: false,
            map: this.map
        });

        // Store reference
        this.territories.set(id, polygon);

        // Add click listener
        polygon.addListener('click', () => {
            this.selectTerritory(id, polygon);
        });
    }

    selectTerritory(id, polygon) {
        // Reset previous selection
        if (this.currentTerritory) {
            this.territories.get(this.currentTerritory).setOptions({
                fillColor: '#4CAF50',
                strokeColor: '#4CAF50'
            });
        }

        // Update selection
        this.currentTerritory = id;
        polygon.setOptions({
            fillColor: '#2196F3',
            strokeColor: '#2196F3'
        });

        // Dispatch selection event
        this.dispatchEvent(new CustomEvent('territory-selected', {
            detail: { territoryId: id },
            bubbles: true
        }));
    }

    setupEventListeners() {
        // Drawing controls
        this.querySelector('#draw-territory')?.addEventListener('click', () => {
            this.startDrawing();
        });

        this.querySelector('#edit-boundary')?.addEventListener('click', () => {
            this.toggleBoundaryEditing();
        });

        // Drawing completion handler
        google.maps.event.addListener(this.drawingManager, 'polygoncomplete', (polygon) => {
            this.handlePolygonComplete(polygon);
        });
    }

    startDrawing() {
        this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
        this.querySelector('#draw-territory').disabled = true;
    }

    toggleBoundaryEditing() {
        if (!this.currentTerritory) return;

        const polygon = this.territories.get(this.currentTerritory);
        const isEditable = !polygon.getEditable();
        
        polygon.setEditable(isEditable);
        this.querySelector('#edit-boundary').classList.toggle('active', isEditable);
    }

    handlePolygonComplete(polygon) {
        // Reset drawing mode
        this.drawingManager.setDrawingMode(null);
        this.querySelector('#draw-territory').disabled = false;

        // Get coordinates from polygon
        const coordinates = polygon.getPath().getArray().map(latLng => ({
            lat: latLng.lat(),
            lng: latLng.lng()
        }));

        // Dispatch event for territory creation
        this.dispatchEvent(new CustomEvent('territory-drawn', {
            detail: { coordinates },
            bubbles: true
        }));

        // Remove temporary polygon
        polygon.setMap(null);
    }

    // Public methods for external control
    enableDrawing() {
        this.startDrawing();
    }

    panToTerritory(territoryId) {
        const polygon = this.territories.get(territoryId);
        if (polygon) {
            const bounds = new google.maps.LatLngBounds();
            polygon.getPath().forEach(latLng => bounds.extend(latLng));
            this.map.fitBounds(bounds);
            this.selectTerritory(territoryId, polygon);
        }
    }
}

registerComponent('territory-map', TerritoryMap);


//**End of code or start of new file** 
 
// File: territory-management\ui\modals\assignment-modal.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\territory-management\ui\modals\assignment-modal.js
// Current Code:

// src/components/territory-management/ui/modals/assignment-modal.js

import '../../styles/modals.css';

export class AssignmentModal extends HTMLElement {
    constructor() {
        super();
        this.territoryId = null;
        this.regionId = null;
        this.districtId = null;
        this.assignmentType = null;
        this.availableUsers = [];
    }

    connectedCallback() {
        this.territoryId = this.getAttribute('territory-id');
        this.regionId = this.getAttribute('region-id');
        this.districtId = this.getAttribute('district-id');
        this.assignmentType = this.getAttribute('assignment-type');

        this.render();
        this.loadAvailableUsers();
    }

    render() {
        this.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Assign ${this.assignmentType}</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="assignment-form">
                        <div class="form-group">
                            <label>User</label>
                            <select name="userId" required>
                                <option value="">Select User</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Role</label>
                            <select name="role" required>
                                <option value="">Select Role</option>
                                ${this.getRoleOptions()}
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-cancel">Cancel</button>
                    <button type="submit" form="assignment-form" class="btn-assign">Assign</button>
                </div>
            </div>
        `;

        this.setupEventListeners();
    }

    getRoleOptions() {
        const roles = ['Territory Manager', 'Regional Manager', 'District Manager'];
        return roles.map(role => `<option value="${role}">${role}</option>`).join('');
    }

    async loadAvailableUsers() {
        // Load available users based on assignment type and entity
        // Update the user select options
    }

    setupEventListeners() {
        this.querySelector('.close-modal').addEventListener('click', () => this.close());
        this.querySelector('.btn-cancel').addEventListener('click', () => this.close());
        this.querySelector('.btn-assign').addEventListener('click', () => this.handleAssignment());
    }

    async handleAssignment() {
        // Get form data and create assignment
        // Close modal on success
    }

    close() {
        this.remove();
    }
}

customElements.define('assignment-modal', AssignmentModal);

//**End of code or start of new file** 
 
// File: territory-management\ui\modals\territory-create.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\territory-management\ui\modals\territory-create.js
// Current Code:

// src/components/territory-management/ui/modals/territory-create.js

import { validationManager } from '../../core/validation-manager';
import { boundaryManager } from '../../core/boundary-manager';
import { notificationManager } from '../../core/notification-manager';

export class TerritoryCreateModal extends HTMLElement {
    constructor() {
        super();
        this.boundaries = null;
        this.drawingMode = true; // Start in drawing mode
        this.initialized = false;
    }

    connectedCallback() {
        if (!this.initialized) {
            this.territoryName = this.getAttribute('territory-name');
            this.initialLocation = JSON.parse(this.getAttribute('initial-location'));
            this.render();
            this.setupEventListeners();
            this.initializeMap();
            this.initialized = true;
        }
    }

    render() {
        this.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="territory-modal">
                <div class="modal-header">
                    <h2>${this.drawingMode ? 'Draw Territory Boundaries' : 'Territory Details'}</h2>
                    <button class="close-button">
                        <span class="material-icons">close</span>
                    </button>
                </div>

                <div class="modal-content">
                    ${this.drawingMode ? this.renderDrawingView() : this.renderDetailsForm()}
                </div>

                <div class="modal-footer">
                    ${this.drawingMode ? `
                        <button class="secondary-button" id="cancel-drawing">Cancel</button>
                        <button class="primary-button" id="continue-details" disabled>
                            Continue to Details
                        </button>
                    ` : `
                        <button class="secondary-button" id="back-to-drawing">
                            Back to Drawing
                        </button>
                        <button class="primary-button" id="create-territory">
                            Create Territory
                        </button>
                    `}
                </div>
            </div>
        `;
    }

    renderDrawingView() {
        return `
            <div class="drawing-container">
                <drawing-controls id="territory-drawing"></drawing-controls>
                <div class="map-container">
                    <div id="territory-map" style="width: 100%; height: 400px;"></div>
                </div>
            </div>
        `;
    }

    renderDetailsForm() {
        return `
            <form id="territory-form" class="territory-form">
                <div class="form-grid">
                    <div class="form-group full-width">
                        <label for="name">Territory Name<span class="required">*</span></label>
                        <input type="text" id="name" name="name" required 
                               placeholder="Enter territory name">
                    </div>

                    <div class="form-group">
                        <label for="manager">Territory Manager</label>
                        <select id="manager" name="manager">
                            <option value="">Select Manager</option>
                            <!-- Managers loaded dynamically -->
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="type">Territory Type</label>
                        <select id="type" name="type">
                            <option value="sales">Sales Territory</option>
                            <option value="service">Service Territory</option>
                            <option value="mixed">Mixed Use</option>
                        </select>
                    </div>

                    <div class="form-group full-width">
                        <label for="description">Description</label>
                        <textarea id="description" name="description" rows="3"
                                placeholder="Enter territory description"></textarea>
                    </div>

                    <div class="form-group">
                        <label>Territory Size</label>
                        <div class="territory-stats">
                            <div class="stat">
                                <span class="stat-value" id="territory-area">0</span>
                                <span class="stat-label">Square Miles</span>
                            </div>
                            <div class="stat">
                                <span class="stat-value" id="territory-perimeter">0</span>
                                <span class="stat-label">Miles Perimeter</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Initial Setup</label>
                        <div class="checkbox-group">
                            <label class="checkbox">
                                <input type="checkbox" name="createRegions">
                                Auto-create regions
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" name="assignTeams">
                                Assign teams
                            </label>
                        </div>
                    </div>
                </div>
            </form>
        `;
    }

    async setupEventListeners() {
        // Close modal
        this.querySelector('.close-button')?.addEventListener('click', () => {
            this.closeModal();
        });

        this.querySelector('.modal-backdrop')?.addEventListener('click', () => {
            this.closeModal();
        });

        // Mode switching buttons
        this.querySelector('#continue-details')?.addEventListener('click', () => {
            this.switchToDetails();
        });

        this.querySelector('#back-to-drawing')?.addEventListener('click', () => {
            this.switchToDrawing();
        });

        // Drawing controls events
        const drawingControls = this.querySelector('drawing-controls');
        if (drawingControls) {
            drawingControls.addEventListener('shape-completed', (e) => {
                this.boundaries = e.detail.coordinates;
                this.querySelector('#continue-details').disabled = false;
                this.updateTerritorySizeStats();
            });

            drawingControls.addEventListener('shape-changed', (e) => {
                this.boundaries = e.detail.coordinates;
                this.updateTerritorySizeStats();
            });
        }

        // Form submission
        const form = this.querySelector('#territory-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.createTerritory();
            });
        }

        // Load managers list
        await this.loadManagers();
    }

    async loadManagers() {
        try {
            const snapshot = await firebase.firestore()
                .collection('users')
                .where('role', '==', 'territoryManager')
                .get();

            const select = this.querySelector('#manager');
            if (!select) return;

            snapshot.docs.forEach(doc => {
                const manager = doc.data();
                const option = document.createElement('option');
                option.value = doc.id;
                option.textContent = `${manager.firstName} ${manager.lastName}`;
                select.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading managers:', error);
        }
    }

    updateTerritorySizeStats() {
        if (!this.boundaries) return;

        // Calculate area in square miles
        const area = google.maps.geometry.spherical.computeArea(
            this.boundaries.map(coord => new google.maps.LatLng(coord.lat, coord.lng))
        );
        const areaInSqMiles = (area / 2589988.11).toFixed(2); // Convert from sq meters to sq miles

        // Calculate perimeter in miles
        const perimeter = google.maps.geometry.spherical.computeLength(
            this.boundaries.map(coord => new google.maps.LatLng(coord.lat, coord.lng))
        );
        const perimeterInMiles = (perimeter / 1609.34).toFixed(2); // Convert from meters to miles

        // Update display
        this.querySelector('#territory-area').textContent = areaInSqMiles;
        this.querySelector('#territory-perimeter').textContent = perimeterInMiles;
    }

    switchToDetails() {
        this.drawingMode = false;
        this.render();
        this.setupEventListeners();
        this.updateTerritorySizeStats();
    }

    switchToDrawing() {
        this.drawingMode = true;
        this.render();
        this.setupEventListeners();
    }

    async createTerritory() {
        try {
            const form = this.querySelector('#territory-form');
            const formData = new FormData(form);

            const territoryData = {
                name: formData.get('name'),
                type: formData.get('type'),
                description: formData.get('description'),
                managerId: formData.get('manager'),
                boundaries: this.boundaries,
                createRegions: formData.get('createRegions') === 'on',
                assignTeams: formData.get('assignTeams') === 'on',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                createdBy: firebase.auth().currentUser.uid,
                active: true
            };

            // Validate territory data
            const validation = await validationManager.validate('territory', 'Creation', territoryData);
            if (!validation.valid) {
                alert(validation.errors.join('\n'));
                return;
            }

            // Create territory in Firestore
            const docRef = await firebase.firestore()
                .collection('territories')
                .add(territoryData);

            // Handle initial setup options
            if (territoryData.createRegions) {
                await this.createInitialRegions(docRef.id, territoryData);
            }

            if (territoryData.assignTeams) {
                await this.assignInitialTeams(docRef.id, territoryData);
            }

            // Notify territory manager
            if (territoryData.managerId) {
                await notificationManager.createNotification({
                    recipientId: territoryData.managerId,
                    type: 'TERRITORY_ASSIGNMENT',
                    title: 'New Territory Assignment',
                    message: `You have been assigned as manager of ${territoryData.name}`,
                    context: {
                        territoryId: docRef.id,
                        actionType: 'TERRITORY_ASSIGNMENT'
                    }
                });
            }

            // Dispatch success event
            this.dispatchEvent(new CustomEvent('territory-created', {
                detail: {
                    territoryId: docRef.id,
                    territory: territoryData
                }
            }));

            // Close modal
            this.closeModal();

        } catch (error) {
            console.error('Error creating territory:', error);
            alert('Failed to create territory. Please try again.');
        }
    }

    async createInitialRegions(territoryId, territoryData) {
        // Auto-divide territory into regions based on size
        const area = google.maps.geometry.spherical.computeArea(
            territoryData.boundaries.map(coord => new google.maps.LatLng(coord.lat, coord.lng))
        );
        
        // Determine number of regions based on area
        const numRegions = Math.ceil(area / (10 * 2589988.11)); // 10 square miles per region
        
        // Create regions (implementation would depend on your requirements)
        // This is a placeholder for the actual region creation logic
        for (let i = 0; i < numRegions; i++) {
            await firebase.firestore()
                .collection('territories')
                .doc(territoryId)
                .update({
                    regions: firebase.firestore.FieldValue.arrayUnion({
                        id: crypto.randomUUID(),
                        name: `Region ${i + 1}`,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    })
                });
        }
    }

    async assignInitialTeams(territoryId, territoryData) {
        // Implementation would depend on your team assignment logic
        // This is a placeholder for the actual team assignment logic
        console.log('Assigning teams to territory:', territoryId);
    }

    closeModal() {
        this.dispatchEvent(new CustomEvent('modal-closed'));
        this.remove();
    }
}

customElements.define('territory-create-modal', TerritoryCreateModal);

//**End of code or start of new file** 
 
// File: territory-management\ui\modals\territory-edit.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\territory-management\ui\modals\territory-edit.js
// Current Code:

// src/components/territory-management/ui/modals/territory-edit.js

import '../../styles/panels.css';
import { boundaryManager } from '../../core/boundary-manager';
import { validationManager } from '../../core/validation-manager';

export class TerritoryEdit extends HTMLElement {
    constructor() {
        super();
        this.territoryId = null;
        this.territoryData = null;
        this.mapComponent = null;
        this.drawingEnabled = false;
        this.initialized = false;
    }

    async connectedCallback() {
        if (this.initialized) return;

        this.territoryId = this.getAttribute('territory-id');
        if (!this.territoryId) {
            console.error('Territory ID is required');
            return;
        }

        await this.loadTerritoryData();
        this.render();
        this.setupEventListeners();
        this.initialized = true;
    }

    async loadTerritoryData() {
        try {
            const doc = await firebase.firestore()
                .collection('territories')
                .doc(this.territoryId)
                .get();

            if (!doc.exists) {
                console.error('Territory not found');
                return;
            }

            this.territoryData = { id: doc.id, ...doc.data() };
        } catch (error) {
            console.error('Error loading territory data:', error);
        }
    }

    render() {
        this.innerHTML = `
            <div class="territory-edit-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Edit Territory</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        ${this.renderTabs()}
                        ${this.renderTabContent()}
                    </div>
                    <div class="modal-footer">
                        <button class="secondary-action" id="cancel-edit">Cancel</button>
                        <button class="primary-action" id="save-territory">Save Changes</button>
                    </div>
                </div>
            </div>
        `;
        this.initializeMap();
    }

    renderTabs() {
        return `
            <div class="edit-tabs">
                <button class="tab-button active" data-tab="details">Details</button>
                <button class="tab-button" data-tab="boundaries">Boundaries</button>
                <button class="tab-button" data-tab="settings">Settings</button>
            </div>
        `;
    }

    renderTabContent() {
        return `
            <div class="tab-content">
                ${this.renderDetailsTab()}
                ${this.renderBoundariesTab()}
                ${this.renderSettingsTab()}
            </div>
        `;
    }

    renderDetailsTab() {
        return `
            <div class="tab-pane active" id="details-tab">
                <form id="territory-details-form">
                    <div class="form-group">
                        <label>Territory Name</label>
                        <input type="text" name="name" value="${this.territoryData?.name || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea name="description" rows="3">${this.territoryData?.description || ''}</textarea>
                    </div>
                </form>
            </div>
        `;
    }

    renderBoundariesTab() {
        return `
            <div class="tab-pane" id="boundaries-tab">
                <div id="territory-map" style="height: 400px;"></div>
                <div class="boundary-info">
                    <div class="info-item">
                        <span class="info-label">Area:</span>
                        <span class="info-value" id="territory-area">Calculating...</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Perimeter:</span>
                        <span class="info-value" id="territory-perimeter">Calculating...</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderSettingsTab() {
        return `
            <div class="tab-pane" id="settings-tab">
                <form id="territory-settings-form">
                    <div class="form-group">
                        <label>Status</label>
                        <select name="status" required>
                            <option value="active" ${this.territoryData?.status === 'active' ? 'selected' : ''}>
                                Active
                            </option>
                            <option value="inactive" ${this.territoryData?.status === 'inactive' ? 'selected' : ''}>
                                Inactive
                            </option>
                        </select>
                    </div>
                </form>
            </div>
        `;
    }

    initializeMap() {
        const mapElement = this.querySelector('#territory-map');
        if (!mapElement || !this.territoryData?.boundaries) return;

        this.mapComponent = new google.maps.Map(mapElement, {
            center: this.initialLocation, // Example center
            zoom: 12,
            mapTypeControl: false,
            streetViewControl: false,
        });

        // Initialize boundary manager
        boundaryManager.initialize(this.mapComponent);

        // Add existing boundaries
        if (this.territoryData.boundaries) {
            boundaryManager.addBoundary(this.territoryId, this.territoryData.boundaries);
        }

        this.updateBoundaryInfo();
    }

    updateBoundaryInfo() {
        const boundaries = boundaryManager.getBoundary(this.territoryId);
        if (!boundaries) return;

        const area = google.maps.geometry.spherical.computeArea(boundaries) / 2589988.11; // sq miles
        const perimeter = google.maps.geometry.spherical.computeLength(boundaries) / 1609.34; // miles

        this.querySelector('#territory-area').textContent = `${area.toFixed(2)} sq mi`;
        this.querySelector('#territory-perimeter').textContent = `${perimeter.toFixed(2)} mi`;
    }

    setupEventListeners() {
        this.querySelector('.close-modal').addEventListener('click', () => this.close());
        this.querySelector('#cancel-edit').addEventListener('click', () => this.close());
        this.querySelector('#save-territory').addEventListener('click', () => this.saveChanges());

        this.querySelectorAll('.tab-button').forEach((button) => {
            button.addEventListener('click', () => this.switchTab(button.dataset.tab));
        });
    }

    switchTab(tabId) {
        this.querySelectorAll('.tab-button').forEach((btn) => btn.classList.toggle('active', btn.dataset.tab === tabId));
        this.querySelectorAll('.tab-pane').forEach((pane) => pane.classList.toggle('active', pane.id === `${tabId}-tab`));
    }

    async saveChanges() {
        try {
            const detailsForm = new FormData(this.querySelector('#territory-details-form'));
            const settingsForm = new FormData(this.querySelector('#territory-settings-form'));

            const updatedData = {
                name: detailsForm.get('name'),
                description: detailsForm.get('description'),
                status: settingsForm.get('status'),
            };

            await firebase.firestore()
                .collection('territories')
                .doc(this.territoryId)
                .update(updatedData);

            this.dispatchEvent(new CustomEvent('territory-updated', { detail: { territoryId: this.territoryId } }));
            this.close();
        } catch (error) {
            console.error('Error saving changes:', error);
            alert('Failed to save changes.');
        }
    }

    close() {
        if (this.mapComponent) {
            this.mapComponent = null;
        }
        this.remove();
    }
}

customElements.define('territory-edit', TerritoryEdit);


//**End of code or start of new file** 
 
// File: territory-management\ui\panels\assignment-panel.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\territory-management\ui\panels\assignment-panel.js
// Current Code:

// src/components/territory-management/ui/panels/assignment-panel.js
import '../../styles/panels.css';

export class AssignmentPanel extends HTMLElement {
    constructor() {
        super();
        this.territoryId = null;
        this.regionId = null;
        this.districtId = null;
        this.assignments = new Map();
        this.availableUsers = [];
        this.currentUser = null;
        this.initialized = false;
    }

    async connectedCallback() {
        if (this.initialized) return;

        // Get entity IDs from attributes
        this.territoryId = this.getAttribute('territory-id');
        this.regionId = this.getAttribute('region-id');
        this.districtId = this.getAttribute('district-id');

        // Set current user
        this.currentUser = firebase.auth().currentUser;
        if (!this.currentUser) return;

        await this.loadData();
        this.render();
        this.setupEventListeners();
        
        this.initialized = true;
    }

    async loadData() {
        try {
            // Load current assignments
            const entityRef = this.getEntityRef();
            const doc = await entityRef.get();
            
            if (!doc.exists) {
                console.error('Entity not found');
                return;
            }

            const data = doc.data();
            this.assignments = new Map(
                (data.assignments || []).map(assignment => [
                    assignment.userId,
                    assignment
                ])
            );

            // Load available users based on roles
            const usersSnapshot = await firebase.firestore()
                .collection('users')
                .where('status', '==', 'active')
                .get();

            this.availableUsers = usersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error loading assignment data:', error);
        }
    }

    getEntityRef() {
        const db = firebase.firestore();
        
        if (this.districtId) {
            return db.collection('territories')
                .doc(this.territoryId)
                .collection('regions')
                .doc(this.regionId)
                .collection('districts')
                .doc(this.districtId);
        }
        
        if (this.regionId) {
            return db.collection('territories')
                .doc(this.territoryId)
                .collection('regions')
                .doc(this.regionId);
        }
        
        return db.collection('territories').doc(this.territoryId);
    }

    getEntityType() {
        if (this.districtId) return 'district';
        if (this.regionId) return 'region';
        return 'territory';
    }

    render() {
        this.innerHTML = `
            <div class="assignment-panel">
                <div class="panel-header">
                    <h3>Manage Assignments</h3>
                    <p>${this.getEntityTypeDisplay()} Assignments</p>
                </div>

                <div class="current-assignments">
                    <h4>Current Assignments</h4>
                    ${this.renderCurrentAssignments()}
                </div>

                <div class="add-assignment">
                    <button class="add-button" id="add-assignment">
                        <span class="material-icons">person_add</span>
                        Add Assignment
                    </button>
                </div>

                <!-- Assignment Modal (hidden by default) -->
                <div id="assignment-modal" class="modal" style="display: none;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>Add Assignment</h3>
                            <button class="close-modal">&times;</button>
                        </div>
                        <form id="assignment-form">
                            <div class="form-group">
                                <label>User</label>
                                <select name="userId" required>
                                    <option value="">Select User</option>
                                    ${this.renderUserOptions()}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Role</label>
                                <select name="role" required>
                                    <option value="">Select Role</option>
                                    ${this.renderRoleOptions()}
                                </select>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="secondary-button cancel-modal">
                                    Cancel
                                </button>
                                <button type="submit" class="primary-button">
                                    Add Assignment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }

    renderCurrentAssignments() {
        if (this.assignments.size === 0) {
            return '<p class="empty-state">No current assignments</p>';
        }

        return `
            <div class="assignments-list">
                ${Array.from(this.assignments.values()).map(assignment => `
                    <div class="assignment-item" data-user-id="${assignment.userId}">
                        <div class="user-info">
                            <span class="user-name">
                                ${this.getUserName(assignment.userId)}
                            </span>
                            <span class="role-badge ${assignment.role}">
                                ${assignment.role}
                            </span>
                        </div>
                        <div class="assignment-actions">
                            <button class="icon-button edit-assignment">
                                <span class="material-icons">edit</span>
                            </button>
                            <button class="icon-button remove-assignment">
                                <span class="material-icons">delete</span>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderUserOptions() {
        return this.availableUsers
            .filter(user => !this.assignments.has(user.id))
            .map(user => `
                <option value="${user.id}">
                    ${user.firstName} ${user.lastName}
                </option>
            `).join('');
    }

    renderRoleOptions() {
        const entityType = this.getEntityType();
        const roles = this.getAvailableRoles(entityType);

        return roles.map(role => `
            <option value="${role.value}">${role.label}</option>
        `).join('');
    }

    getAvailableRoles(entityType) {
        switch (entityType) {
            case 'territory':
                return [
                    { value: 'territoryManager', label: 'Territory Manager' },
                    { value: 'supervisor', label: 'Supervisor' }
                ];
            case 'region':
                return [
                    { value: 'regionManager', label: 'Region Manager' },
                    { value: 'teamLeader', label: 'Team Leader' }
                ];
            case 'district':
                return [
                    { value: 'districtManager', label: 'District Manager' },
                    { value: 'setter', label: 'Setter' },
                    { value: 'closer', label: 'Closer' }
                ];
            default:
                return [];
        }
    }

    getEntityTypeDisplay() {
        const type = this.getEntityType();
        return type.charAt(0).toUpperCase() + type.slice(1);
    }

    getUserName(userId) {
        const user = this.availableUsers.find(u => u.id === userId);
        return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
    }

    setupEventListeners() {
        // Add assignment button
        this.querySelector('#add-assignment')?.addEventListener('click', () => {
            this.showAssignmentModal();
        });

        // Modal close buttons
        this.querySelectorAll('.close-modal, .cancel-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                this.hideAssignmentModal();
            });
        });

        // Assignment form submission
        this.querySelector('#assignment-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleAssignment(new FormData(e.target));
        });

        // Edit and remove buttons for existing assignments
        this.querySelectorAll('.edit-assignment').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = e.target.closest('.assignment-item').dataset.userId;
                this.editAssignment(userId);
            });
        });

        this.querySelectorAll('.remove-assignment').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = e.target.closest('.assignment-item').dataset.userId;
                this.removeAssignment(userId);
            });
        });
    }

    showAssignmentModal() {
        const modal = this.querySelector('#assignment-modal');
        if (modal) {
            modal.style.display = 'block';
        }
    }

    hideAssignmentModal() {
        const modal = this.querySelector('#assignment-modal');
        if (modal) {
            modal.style.display = 'none';
            modal.querySelector('form')?.reset();
        }
    }

    async handleAssignment(formData) {
        try {
            const userId = formData.get('userId');
            const role = formData.get('role');

            if (!userId || !role) {
                alert('Please fill in all required fields');
                return;
            }

            const assignment = {
                userId,
                role,
                assignedBy: this.currentUser.uid,
                assignedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            // Add assignment to entity
            await this.getEntityRef().update({
                assignments: firebase.firestore.FieldValue.arrayUnion(assignment)
            });

            // Create notification for assigned user
            await this.createAssignmentNotification(userId, role);

            // Refresh data and UI
            await this.loadData();
            this.render();
            this.setupEventListeners();
            this.hideAssignmentModal();

        } catch (error) {
            console.error('Error handling assignment:', error);
            alert('Failed to create assignment. Please try again.');
        }
    }

    async createAssignmentNotification(userId, role) {
        try {
            const entityType = this.getEntityType();
            const entityRef = this.getEntityRef();
            const entityDoc = await entityRef.get();
            const entityName = entityDoc.data().name;

            await firebase.firestore().collection('notifications').add({
                userId,
                type: 'ASSIGNMENT',
                title: `New ${entityType} Assignment`,
                message: `You have been assigned as ${role} to ${entityName}`,
                entityType,
                entityId: entityRef.id,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                read: false
            });
        } catch (error) {
            console.error('Error creating notification:', error);
        }
    }

    async editAssignment(userId) {
        const assignment = this.assignments.get(userId);
        if (!assignment) return;

        // Populate and show modal
        const form = this.querySelector('#assignment-form');
        if (form) {
            form.elements.userId.value = userId;
            form.elements.role.value = assignment.role;
            this.showAssignmentModal();
        }
    }

    async removeAssignment(userId) {
        const assignment = this.assignments.get(userId);
        if (!assignment) return;

        if (!confirm('Are you sure you want to remove this assignment?')) {
            return;
        }

        try {
            await this.getEntityRef().update({
                assignments: firebase.firestore.FieldValue.arrayRemove(assignment)
            });

            // Create removal notification
            await this.createAssignmentNotification(userId, 'removed');

            // Refresh data and UI
            await this.loadData();
            this.render();
            this.setupEventListeners();

        } catch (error) {
            console.error('Error removing assignment:', error);
            alert('Failed to remove assignment. Please try again.');
        }
    }
}

customElements.define('assignment-panel', AssignmentPanel);

//**End of code or start of new file** 
 
// File: territory-management\ui\panels\management-panel.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\territory-management\ui\panels\management-panel.js
// Current Code:

// src/components/territory-management/ui/panels/management-panel.js

import '../../styles/panels.css';

export class ManagementPanel extends HTMLElement {
    constructor() {
        super();
        this.territoryId = null;
        this.territoryData = null;
        this.userRole = null;
        this.initialized = false;
    }

    async connectedCallback() {
        if (this.initialized) return;

        this.territoryId = this.getAttribute('territory-id');
        if (!this.territoryId) {
            console.error('Territory ID is required');
            return;
        }

        await this.loadData();
        this.render();
        this.setupEventListeners();
        
        this.initialized = true;
    }

    async loadData() {
        try {
            // Load territory data
            const doc = await firebase.firestore()
                .collection('territories')
                .doc(this.territoryId)
                .get();

            if (!doc.exists) {
                console.error('Territory not found');
                return;
            }

            this.territoryData = { id: doc.id, ...doc.data() };

            // Get user role
            const user = firebase.auth().currentUser;
            if (user) {
                const userDoc = await firebase.firestore()
                    .collection('users')
                    .doc(user.uid)
                    .get();
                
                this.userRole = userDoc.data()?.role;
            }

        } catch (error) {
            console.error('Error loading management data:', error);
        }
    }

    render() {
        this.innerHTML = `
            <div class="management-panel">
                <div class="panel-header">
                    <h3>Territory Management</h3>
                    <p>${this.territoryData?.name || 'Loading...'}</p>
                </div>

                <div class="management-content">
                    <!-- Territory Status -->
                    <div class="status-section">
                        <h4>Status</h4>
                        <div class="status-controls">
                            <div class="status-indicator ${this.territoryData?.active ? 'active' : 'inactive'}">
                                ${this.territoryData?.active ? 'Active' : 'Inactive'}
                            </div>
                            ${this.canManageTerritory() ? `
                                <button class="action-button" id="toggle-status">
                                    ${this.territoryData?.active ? 'Deactivate' : 'Activate'} Territory
                                </button>
                            ` : ''}
                        </div>
                    </div>

                    <!-- Quick Actions -->
                    <div class="actions-section">
                        <h4>Quick Actions</h4>
                        <div class="action-grid">
                            ${this.renderActionButtons()}
                        </div>
                    </div>

                    <!-- Region Management -->
                    ${this.canManageRegions() ? `
                        <div class="regions-section">
                            <h4>Region Management</h4>
                            <div class="regions-summary">
                                <div class="summary-stat">
                                    <span class="stat-value">${this.territoryData?.regions?.length || 0}</span>
                                    <span class="stat-label">Total Regions</span>
                                </div>
                                <button class="action-button primary-action" id="manage-regions">
                                    <span class="material-icons">account_tree</span>
                                    Manage Regions
                                </button>
                            </div>
                        </div>
                    ` : ''}

                    <!-- Territory Settings -->
                    ${this.canManageTerritory() ? `
                        <div class="settings-section">
                            <h4>Territory Settings</h4>
                            <div class="settings-controls">
                                <button class="action-button" id="edit-boundaries">
                                    <span class="material-icons">edit</span>
                                    Edit Boundaries
                                </button>
                                <button class="action-button" id="territory-settings">
                                    <span class="material-icons">settings</span>
                                    Settings
                                </button>
                                <button class="action-button danger" id="delete-territory">
                                    <span class="material-icons">delete</span>
                                    Delete Territory
                                </button>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    renderActionButtons() {
        const actions = [];

        // View Actions - Available to all
        actions.push(`
            <button class="action-button" id="view-assignments">
                <span class="material-icons">people</span>
                View Assignments
            </button>
        `);

        actions.push(`
            <button class="action-button" id="view-analytics">
                <span class="material-icons">analytics</span>
                View Analytics
            </button>
        `);

        // Management Actions - Based on permissions
        if (this.canManageAssignments()) {
            actions.push(`
                <button class="action-button" id="manage-assignments">
                    <span class="material-icons">group_add</span>
                    Manage Assignments
                </button>
            `);
        }

        if (this.canExportData()) {
            actions.push(`
                <button class="action-button" id="export-data">
                    <span class="material-icons">download</span>
                    Export Data
                </button>
            `);
        }

        return actions.join('');
    }

    setupEventListeners() {
        // Status toggle
        this.querySelector('#toggle-status')?.addEventListener('click', () => {
            this.toggleTerritoryStatus();
        });

        // Quick actions
        this.querySelector('#view-assignments')?.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('view-assignments'));
        });

        this.querySelector('#view-analytics')?.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('view-analytics'));
        });

        this.querySelector('#manage-assignments')?.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('manage-assignments'));
        });

        this.querySelector('#export-data')?.addEventListener('click', () => {
            this.exportTerritoryData();
        });

        // Region management
        this.querySelector('#manage-regions')?.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('manage-regions'));
        });

        // Territory settings
        this.querySelector('#edit-boundaries')?.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('edit-boundaries'));
        });

        this.querySelector('#territory-settings')?.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('edit-settings'));
        });

        this.querySelector('#delete-territory')?.addEventListener('click', () => {
            this.confirmDeleteTerritory();
        });
    }

    async toggleTerritoryStatus() {
        if (!this.canManageTerritory()) return;

        const newStatus = !this.territoryData.active;
        const confirmed = await this.confirmStatusChange(newStatus);
        
        if (confirmed) {
            try {
                await firebase.firestore()
                    .collection('territories')
                    .doc(this.territoryId)
                    .update({
                        active: newStatus,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    });

                // Reload data and refresh UI
                await this.loadData();
                this.render();
                this.setupEventListeners();

                // Create notification for territory members
                this.notifyStatusChange(newStatus);

            } catch (error) {
                console.error('Error updating territory status:', error);
                alert('Failed to update territory status');
            }
        }
    }

    async confirmStatusChange(newStatus) {
        const action = newStatus ? 'activate' : 'deactivate';
        return confirm(`Are you sure you want to ${action} this territory? This will affect all users and operations within the territory.`);
    }

    async notifyStatusChange(newStatus) {
        const notificationData = {
            type: 'TERRITORY_STATUS',
            title: 'Territory Status Change',
            message: `Territory "${this.territoryData.name}" has been ${newStatus ? 'activated' : 'deactivated'}`,
            territoryId: this.territoryId,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };

        // Notify all users assigned to this territory
        const assignments = this.territoryData.assignments || [];
        for (const assignment of assignments) {
            await firebase.firestore()
                .collection('notifications')
                .add({
                    ...notificationData,
                    userId: assignment.userId
                });
        }
    }

    async exportTerritoryData() {
        if (!this.canExportData()) return;

        try {
            // Get territory data with related collections
            const territoryData = { ...this.territoryData };
            delete territoryData.id;

            // Get regions
            const regionsSnapshot = await firebase.firestore()
                .collection('territories')
                .doc(this.territoryId)
                .collection('regions')
                .get();

            territoryData.regions = regionsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Create export file
            const exportData = JSON.stringify(territoryData, null, 2);
            const blob = new Blob([exportData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            // Trigger download
            const a = document.createElement('a');
            a.href = url;
            a.download = `territory_${this.territoryId}_${Date.now()}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error exporting territory data:', error);
            alert('Failed to export territory data');
        }
    }

    async confirmDeleteTerritory() {
        if (!this.canManageTerritory()) return;

        const confirmed = await this.showDeleteConfirmation();
        if (confirmed) {
            try {
                await firebase.firestore()
                    .collection('territories')
                    .doc(this.territoryId)
                    .delete();

                this.dispatchEvent(new CustomEvent('territory-deleted'));

            } catch (error) {
                console.error('Error deleting territory:', error);
                alert('Failed to delete territory');
            }
        }
    }

    showDeleteConfirmation() {
        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.className = 'modal show';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Delete Territory</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure you want to delete this territory? This action cannot be undone.</p>
                        <p>All associated data will be permanently deleted, including:</p>
                        <ul>
                            <li>Region assignments</li>
                            <li>User assignments</li>
                            <li>Territory boundaries</li>
                            <li>Historical data</li>
                        </ul>
                        <div class="confirmation-input">
                            <label>Type "DELETE" to confirm:</label>
                            <input type="text" id="delete-confirmation" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="secondary-action">Cancel</button>
                        <button class="primary-action danger" id="confirm-delete" disabled>
                            Delete Territory
                        </button>
                    </div>
                </div>
            `;

            const closeModal = () => {
                modal.remove();
                resolve(false);
            };

            modal.querySelector('.close-modal').addEventListener('click', closeModal);
            modal.querySelector('.secondary-action').addEventListener('click', closeModal);

            const confirmInput = modal.querySelector('#delete-confirmation');
            const confirmButton = modal.querySelector('#confirm-delete');

            confirmInput.addEventListener('input', (e) => {
                confirmButton.disabled = e.target.value !== 'DELETE';
            });

            confirmButton.addEventListener('click', () => {
                modal.remove();
                resolve(true);
            });

            document.body.appendChild(modal);
        });
    }

    // Permission checks
    canManageTerritory() {
        return ['admin', 'territoryManager'].includes(this.userRole);
    }

    canManageRegions() {
        return ['admin', 'territoryManager', 'regionManager'].includes(this.userRole);
    }

    canManageAssignments() {
        return ['admin', 'territoryManager', 'regionManager'].includes(this.userRole);
    }

    canExportData() {
        return ['admin', 'territoryManager'].includes(this.userRole);
    }
}

customElements.define('management-panel', ManagementPanel);

//**End of code or start of new file** 
 
// File: territory-management\ui\panels\territory-info.js
// Path: C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\territory-management\ui\panels\territory-info.js
// Current Code:

// src/components/territory-management/ui/panels/territory-info.js

import '../../styles/panels.css';

export class TerritoryInfo extends HTMLElement {
    constructor() {
        super();
        this.territoryId = null;
        this.territoryData = null;
        this.statistics = null;
        this.recentActivity = [];
        this.initialized = false;
    }

    async connectedCallback() {
        if (this.initialized) return;

        this.territoryId = this.getAttribute('territory-id');
        if (!this.territoryId) {
            console.error('Territory ID is required');
            return;
        }

        await this.loadData();
        this.render();
        this.setupEventListeners();
        
        this.initialized = true;
    }

    async loadData() {
        try {
            // Load territory data
            const doc = await firebase.firestore()
                .collection('territories')
                .doc(this.territoryId)
                .get();

            if (!doc.exists) {
                console.error('Territory not found');
                return;
            }

            this.territoryData = { id: doc.id, ...doc.data() };

            // Calculate statistics
            await this.calculateStatistics();

            // Load recent activity
            await this.loadRecentActivity();

        } catch (error) {
            console.error('Error loading territory info:', error);
        }
    }

    async calculateStatistics() {
        const { assignments = [], regions = [] } = this.territoryData;

        // Calculate active assignments
        const activeAssignments = assignments.filter(a => !a.endDate);

        // Calculate region and district stats
        let totalDistricts = 0;
        let activeDistricts = 0;

        for (const region of regions) {
            if (region.districts) {
                totalDistricts += region.districts.length;
                activeDistricts += region.districts.filter(d => d.active).length;
            }
        }

        // Calculate area coverage
        const areaCoverage = await this.calculateAreaCoverage();

        this.statistics = {
            totalAssignments: assignments.length,
            activeAssignments: activeAssignments.length,
            totalRegions: regions.length,
            activeRegions: regions.filter(r => r.active).length,
            totalDistricts,
            activeDistricts,
            areaCoverage
        };
    }

    async calculateAreaCoverage() {
        if (!this.territoryData.boundaries?.length) return 0;

        // Create polygon from boundaries
        const polygon = new google.maps.Polygon({
            paths: this.territoryData.boundaries.map(coord => ({
                lat: coord.lat,
                lng: coord.lng
            }))
        });

        // Calculate area in square miles
        const areaInSquareMeters = google.maps.geometry.spherical.computeArea(
            polygon.getPath()
        );

        return Math.round(areaInSquareMeters / 2589988.11); // Convert to square miles
    }

    async loadRecentActivity() {
        try {
            const snapshot = await firebase.firestore()
                .collection('territoryActivity')
                .where('territoryId', '==', this.territoryId)
                .orderBy('timestamp', 'desc')
                .limit(5)
                .get();

            this.recentActivity = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error loading recent activity:', error);
        }
    }

    render() {
        this.innerHTML = `
            <div class="info-panel">
                <div class="panel-header">
                    <h3>${this.territoryData?.name || 'Loading...'}</h3>
                    <span class="status-badge ${this.territoryData?.active ? 'active' : 'inactive'}">
                        ${this.territoryData?.active ? 'Active' : 'Inactive'}
                    </span>
                </div>

                <!-- Territory Overview -->
                <div class="territory-overview">
                    <div class="overview-item">
                        <span class="material-icons">location_on</span>
                        <div class="overview-details">
                            <span class="overview-label">Location</span>
                            <span class="overview-value">
                                ${this.formatLocation()}
                            </span>
                        </div>
                    </div>
                    <div class="overview-item">
                        <span class="material-icons">straighten</span>
                        <div class="overview-details">
                            <span class="overview-label">Area Coverage</span>
                            <span class="overview-value">
                                ${this.statistics?.areaCoverage || 0} sq miles
                            </span>
                        </div>
                    </div>
                    <div class="overview-item">
                        <span class="material-icons">group</span>
                        <div class="overview-details">
                            <span class="overview-label">Active Members</span>
                            <span class="overview-value">
                                ${this.statistics?.activeAssignments || 0} members
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Territory Statistics -->
                <div class="territory-statistics">
                    <h4>Territory Statistics</h4>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-value">${this.statistics?.totalRegions || 0}</span>
                            <span class="stat-label">Total Regions</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${this.statistics?.activeRegions || 0}</span>
                            <span class="stat-label">Active Regions</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${this.statistics?.totalDistricts || 0}</span>
                            <span class="stat-label">Total Districts</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${this.statistics?.activeDistricts || 0}</span>
                            <span class="stat-label">Active Districts</span>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="recent-activity">
                    <h4>Recent Activity</h4>
                    ${this.renderRecentActivity()}
                </div>

                <!-- Performance Metrics -->
                <div class="performance-metrics">
                    <h4>Performance Metrics</h4>
                    ${this.renderPerformanceMetrics()}
                </div>
            </div>
        `;
    }

    formatLocation() {
        if (!this.territoryData?.location) return 'Not specified';
        
        const { city, state, region } = this.territoryData.location;
        const parts = [city, state, region].filter(Boolean);
        return parts.join(', ');
    }

    renderRecentActivity() {
        if (!this.recentActivity.length) {
            return '<p class="empty-state">No recent activity</p>';
        }

        return `
            <div class="activity-list">
                ${this.recentActivity.map(activity => `
                    <div class="activity-item">
                        <span class="material-icons">${this.getActivityIcon(activity.type)}</span>
                        <div class="activity-details">
                            <span class="activity-description">
                                ${this.formatActivityDescription(activity)}
                            </span>
                            <span class="activity-time">
                                ${this.formatTimestamp(activity.timestamp)}
                            </span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    getActivityIcon(type) {
        const icons = {
            ASSIGNMENT: 'person_add',
            STATUS_CHANGE: 'loop',
            BOUNDARY_UPDATE: 'edit_location',
            REGION_ADDED: 'add_business',
            DISTRICT_ADDED: 'grid_on',
            DEFAULT: 'info'
        };
        return icons[type] || icons.DEFAULT;
    }

    formatActivityDescription(activity) {
        const descriptions = {
            ASSIGNMENT: () => `${activity.userName} was assigned as ${activity.role}`,
            STATUS_CHANGE: () => `Territory status changed to ${activity.newStatus}`,
            BOUNDARY_UPDATE: () => 'Territory boundaries were updated',
            REGION_ADDED: () => `New region "${activity.regionName}" was added`,
            DISTRICT_ADDED: () => `New district added to region "${activity.regionName}"`,
            DEFAULT: () => 'Activity recorded'
        };

        return (descriptions[activity.type] || descriptions.DEFAULT)();
    }

    formatTimestamp(timestamp) {
        if (!timestamp) return '';
        
        const date = timestamp.toDate();
        const now = new Date();
        const diff = now - date;
        
        // Less than 24 hours
        if (diff < 86400000) {
            return this.formatTimeAgo(diff);
        }
        
        // Regular date format
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: now.getFullYear() !== date.getFullYear() ? 'numeric' : undefined
        });
    }

    formatTimeAgo(diff) {
        const hours = Math.floor(diff / 3600000);
        if (hours > 0) return `${hours}h ago`;
        
        const minutes = Math.floor(diff / 60000);
        if (minutes > 0) return `${minutes}m ago`;
        
        return 'Just now';
    }

    renderPerformanceMetrics() {
        // This could be expanded with actual metrics calculations
        return `
            <div class="metrics-grid">
                <div class="metric-item">
                    <div class="metric-header">
                        <span class="metric-title">Coverage Rate</span>
                        <span class="metric-value">75%</span>
                    </div>
                    <div class="metric-progress">
                        <div class="progress-bar" style="width: 75%"></div>
                    </div>
                </div>
                
                <div class="metric-item">
                    <div class="metric-header">
                        <span class="metric-title">Activity Level</span>
                        <span class="metric-value">High</span>
                    </div>
                    <div class="metric-progress">
                        <div class="progress-bar" style="width: 90%"></div>
                    </div>
                </div>
                
                <div class="metric-item">
                    <div class="metric-header">
                        <span class="metric-title">Resource Utilization</span>
                        <span class="metric-value">65%</span>
                    </div>
                    <div class="metric-progress">
                        <div class="progress-bar" style="width: 65%"></div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Could add click handlers for interactive elements if needed
    }
}

customElements.define('territory-info', TerritoryInfo);
// End of aisnapshot.js (C:\Users\Robert Wolfe\Desktop\Projects\salesblanket\src\components\aisnapshot.js) code

