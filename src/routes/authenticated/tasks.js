// src/routes/tasks.js
import { registerComponent } from '../../core/component-registry.js';

export class TasksView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="tasks-page">
                <div class="page-header">
                    <h1>Tasks</h1>
                    <button class="add-button">
                        <span class="material-icons">add_task</span>
                        New Task
                    </button>
                </div>
                <div class="tasks-grid">
                    <!-- Task list will be populated here -->
                </div>
            </div>
        `;

        this.setupEventListeners();
    }

    setupEventListeners() {
        // New task button handler
    }
}

registerComponent('tasks-view', TasksView);