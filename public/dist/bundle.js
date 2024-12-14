(() => {
  // src/app-root.js
  var AppRoot = class extends HTMLElement {
    constructor() {
      super();
      console.log("Security system starting...");
      this.isAuthenticated = false;
      this.isLoading = true;
    }
    connectedCallback() {
      console.log("Security guard on duty...");
      firebase.auth().onAuthStateChanged((user) => {
        console.log("Checking ID...", user ? "ID found" : "No ID");
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
            ${this.isAuthenticated ? "<header1-element></header1-element>" : ""}
            <main id="route-content"></main>
        `;
    }
  };
  customElements.define("app-root", AppRoot);

  // src/routes/unauthorized.js
  var UnauthorizedView = class extends HTMLElement {
    constructor() {
      super();
    }
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
                    <button id="login-button">Login with Google</button>
                    <button id="apply-button">Fill Out Job Application</button>
                </div>
            </div>
        `;
      this.setupButtons();
    }
    setupButtons() {
      this.querySelector("#login-button").addEventListener("click", async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
          await firebase.auth().signInWithPopup(provider);
        } catch (error) {
          console.error("Login failed:", error);
          alert("Login failed. Please make sure to use your company email.");
        }
      });
      this.querySelector("#apply-button").addEventListener("click", () => {
        alert("Job application feature coming soon!");
      });
    }
  };
  customElements.define("unauthorized-view", UnauthorizedView);

  // src/routes/dashboard.js
  var DashboardView = class extends HTMLElement {
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
  };
  customElements.define("dashboard-view", DashboardView);

  // src/routes/login.js
  var LoginView = class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.innerHTML = `
            <div class="login-container">
                <h1 class="app-name">Sales Blanket</h1>
                <button id="google-signin" class="button">
                    Sign in with Google
                </button>
            </div>
        `;
      this.setupLoginButton();
    }
    setupLoginButton() {
      const button = this.querySelector("#google-signin");
      button.addEventListener("click", async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
          await firebase.auth().signInWithPopup(provider);
        } catch (error) {
          console.error("Login failed:", error);
        }
      });
    }
  };
  customElements.define("login-view", LoginView);

  // src/routes/home.js
  var HomeView = class extends HTMLElement {
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
      this.querySelector("#login-btn").addEventListener("click", async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
          const result = await firebase.auth().signInWithPopup(provider);
          if (result.user) {
            window.location.hash = "dashboard";
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      });
    }
  };
  customElements.define("home-view", HomeView);

  // src/app.js
  console.log("App.js loaded");
  document.addEventListener("DOMContentLoaded", () => {
    const appRoot = document.querySelector("app-root");
    if (!appRoot) {
      document.body.appendChild(document.createElement("app-root"));
    }
  });
})();
