// src/routes/daily-view.js
import { registerComponent } from '../../core/component-registry.js'; 

export class DailyView extends HTMLElement {
    connectedCallback() {
        this.loadUserData();
    }

    async loadUserData() {
        const user = firebase.auth().currentUser;
        if (!user) return;

        try {
            const userDoc = await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .get();

            const userData = userDoc.data();
            this.render(userData);
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }

    render(userData = {}) {
        this.innerHTML = `
            <div class="daily-view">
                <div class="dashboard-grid">
                    <div class="dashboard-card welcome-card">
                        <h2>Welcome Back, ${userData.firstName || 'User'}!</h2>
                        <p class="date">${new Date().toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}</p>
                    </div>

                    <div class="dashboard-card stats-card">
                        <h3>Your Stats</h3>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <span class="stat-label">Swag Points</span>
                                <span class="stat-value">${userData.swagPoints || 0}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Active Tasks</span>
                                <span class="stat-value">${userData.activeTasks || 0}</span>
                            </div>
                        </div>
                    </div>

                    <div class="dashboard-card tasks-card">
                        <h3>Today's Tasks</h3>
                        <div class="tasks-list">
                            <!-- Will be populated with tasks -->
                            <p class="empty-state">No tasks due today</p>
                        </div>
                    </div>

                    <div class="dashboard-card messages-card">
                        <h3>Recent Messages</h3>
                        <div class="messages-list">
                            <!-- Will be populated with messages -->
                            <p class="empty-state">No new messages</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

registerComponent('daily-view', DailyView);