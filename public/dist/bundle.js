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
      console.log("Setting up main structure");
      this.innerHTML = `
            ${this.isAuthenticated ? "<header1-element></header1-element>" : ""}
            <main id="route-content"></main>
        `;
      const routeEvent = new Event("hashchange");
      window.dispatchEvent(routeEvent);
    }
  };
  customElements.define("app-root", AppRoot);

  // src/routes/unauthorized.js
  var UnauthorizedView = class extends HTMLElement {
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
    connectedCallback() {
      this.innerHTML = `
            <div class="login-container">
                <h1>Sales Blanket Login</h1>
                <p>Please sign in with your company Google account</p>
                <google-login-button></google-login-button>
            </div>
        `;
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

  // src/routes/complete-profile.js
  var CompleteProfileView = class extends HTMLElement {
    constructor() {
      super();
      console.log("CompleteProfileView constructed");
    }
    connectedCallback() {
      console.log("CompleteProfileView connected");
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
      const form = this.querySelector("#profile-form");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const firstName = this.querySelector("#firstName").value.trim();
        const lastName = this.querySelector("#lastName").value.trim();
        try {
          const user = firebase.auth().currentUser;
          await firebase.firestore().collection("users").doc(user.uid).set({
            email: user.email,
            status: "pending",
            role: null,
            firstName,
            lastName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          });
          window.location.hash = "pending-approval";
        } catch (error) {
          console.error("Error saving profile:", error);
          alert("There was an error saving your profile. Please try again.");
        }
      });
    }
  };
  customElements.define("complete-profile-view", CompleteProfileView);

  // src/components/shared/google-login.js
  var GoogleLoginButton = class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.innerHTML = `<button class="google-login-btn">Login with Google</button>`;
      this.setupLoginHandler();
    }
    setupLoginHandler() {
      this.querySelector("button").addEventListener("click", async () => {
        try {
          const provider = new firebase.auth.GoogleAuthProvider();
          const result = await firebase.auth().signInWithPopup(provider);
          if (result.user) {
            const userDoc = await firebase.firestore().collection("users").doc(result.user.uid).get();
            if (!userDoc.exists) {
              window.location.hash = "complete-profile";
            } else {
              window.location.hash = "dashboard";
            }
          }
        } catch (error) {
          console.error("Login failed:", error);
          alert("Login failed. Please make sure to use your company email.");
        }
      });
    }
  };
  customElements.define("google-login-button", GoogleLoginButton);

  // src/app.js
  console.log("App.js loaded");
  document.addEventListener("DOMContentLoaded", () => {
    const appRoot = document.querySelector("app-root");
    if (!appRoot) {
      document.body.appendChild(document.createElement("app-root"));
    }
  });
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const userDoc = await firebase.firestore().collection("users").doc(user.uid).get();
        if (!userDoc.exists) {
          window.location.hash = "complete-profile";
        } else {
          window.location.hash = "dashboard";
        }
      } catch (error) {
        console.error("Error during auth check:", error);
      }
    }
  });
})();
