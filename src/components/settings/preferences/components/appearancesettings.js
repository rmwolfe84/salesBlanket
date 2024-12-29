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