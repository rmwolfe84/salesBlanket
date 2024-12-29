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