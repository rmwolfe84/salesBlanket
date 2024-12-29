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