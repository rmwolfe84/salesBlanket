// src/routes/calendar.js
import { registerComponent } from '../../core/component-registry.js';

export class CalendarView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="calendar-page">
                <div class="page-header">
                    <h1>Calendar</h1>
                    <div class="calendar-controls">
                        <button class="view-button">
                            <span class="material-icons">view_module</span>
                            Month
                        </button>
                        <button class="view-button">
                            <span class="material-icons">view_week</span>
                            Week
                        </button>
                        <button class="view-button">
                            <span class="material-icons">view_day</span>
                            Day
                        </button>
                    </div>
                </div>
                <div class="calendar-grid">
                    <!-- Calendar will be populated here -->
                </div>
            </div>
        `;

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Calendar view buttons handler
    }
}

registerComponent('calendar-view', CalendarView);