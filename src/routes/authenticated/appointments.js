// file path: src/routes/authenticated/appointments.js

import { registerComponent } from '../../core/component-registry.js';

export class AppointmentsView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="appointments-page">
                <div class="page-header">
                    <h1>Appointments</h1>
                    <button class="add-button">
                        <span class="material-icons">add_task</span>
                        New Appointment
                    </button>
                </div>
                <div class="appointments-grid">
                    <!-- Appointment list will be populated here -->
                </div>
            </div>
        `;
    }
}

registerComponent('appointments-view', AppointmentsView);
