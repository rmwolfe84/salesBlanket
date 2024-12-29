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