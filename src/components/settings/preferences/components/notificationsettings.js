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