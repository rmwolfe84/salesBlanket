// src/routes/complete-profile.js
export class CompleteProfileView extends HTMLElement {
    constructor() {
        super();
        console.log('CompleteProfileView constructed');
    }

    connectedCallback() {
        console.log('CompleteProfileView connected');
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
        const form = this.querySelector('#profile-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const firstName = this.querySelector('#firstName').value.trim();
            const lastName = this.querySelector('#lastName').value.trim();

            try {
                const user = firebase.auth().currentUser;
                
                await firebase.firestore()
                    .collection('users')
                    .doc(user.uid)
                    .set({
                        email: user.email,
                        status: 'pending',
                        role: null,
                        firstName: firstName,
                        lastName: lastName,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    });

                window.location.hash = 'pending-approval';
            } catch (error) {
                console.error('Error saving profile:', error);
                alert('There was an error saving your profile. Please try again.');
            }
        });
    }
}

customElements.define('complete-profile-view', CompleteProfileView);