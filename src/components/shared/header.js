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