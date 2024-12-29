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