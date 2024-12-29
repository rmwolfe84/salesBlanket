// src/components/settings/phases/components/phasemanagement.js
import '../styles/phasemanagement.css';

export class PhaseManagement extends HTMLElement {
    constructor() {
        super();
        this.selectedWorkflow = null;
        this.workflows = [];
        this.phases = [];
    }

    async connectedCallback() {
        // Check if workflow ID was passed (coming from workflow creation)
        const workflowId = this.getAttribute('workflow-id');
        
        await this.loadWorkflows();
        
        if (workflowId) {
            // Auto-select workflow if coming from workflow creation
            this.selectedWorkflow = this.workflows.find(w => w.id === workflowId);
            if (this.selectedWorkflow) {
                await this.loadPhases(workflowId);
            }
        }
        
        this.render();
    }

    async loadWorkflows() {
        try {
            const snapshot = await firebase.firestore()
                .collection('workflows')
                .get();

            this.workflows = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error loading workflows:', error);
        }
    }

    async loadPhases(workflowId) {
        try {
            const doc = await firebase.firestore()
                .collection('workflows')
                .doc(workflowId)
                .get();

            if (doc.exists) {
                this.phases = doc.data().phases || [];
            }
        } catch (error) {
            console.error('Error loading phases:', error);
        }
    }

    render() {
        this.innerHTML = `
            <div class="phase-management">
                ${!this.selectedWorkflow ? this.renderWorkflowSelection() : this.renderPhaseManagement()}
            </div>
        `;

        this.setupEventListeners();
    }

    renderWorkflowSelection() {
        return `
            <div class="workflow-selection">
                <div class="section-header">
                    <h2>Select Workflow</h2>
                </div>
                <div class="workflows-list">
                    ${this.workflows.map(workflow => `
                        <div class="workflow-card" data-id="${workflow.id}">
                            <div class="workflow-info">
                                <h3>${workflow.name}</h3>
                                <span class="collection-type">Collection: ${workflow.collection}</span>
                            </div>
                            <button class="select-workflow-btn">
                                <span class="material-icons">arrow_forward</span>
                                Manage Phases
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderPhaseManagement() {
        return `
            <div class="phase-section">
                <div class="section-header">
                    <div class="header-info">
                        <h2>Phases for ${this.selectedWorkflow.name}</h2>
                        <span class="collection-type">Collection: ${this.selectedWorkflow.collection}</span>
                    </div>
                    <button class="add-phase-btn">
                        <span class="material-icons">add</span>
                        Add Phase
                    </button>
                </div>

                <div class="phases-list">
                    ${this.phases.length ? this.phases.map(phase => `
                        <div class="phase-item" data-id="${phase.id}">
                            <div class="phase-color" style="background-color: ${phase.color}"></div>
                            <div class="phase-info">
                                <h3>${phase.name}</h3>
                                <p>${phase.description || ''}</p>
                            </div>
                            <div class="phase-actions">
                                <button class="edit-phase-btn">
                                    <span class="material-icons">edit</span>
                                </button>
                                <button class="manage-stages-btn">
                                    <span class="material-icons">view_list</span>
                                    Manage Stages
                                </button>
                            </div>
                        </div>
                    `).join('') : `
                        <div class="empty-state">
                            <p>No phases created yet</p>
                            <p>Click 'Add Phase' to get started</p>
                        </div>
                    `}
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Workflow selection
        this.querySelectorAll('.select-workflow-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const workflowId = e.target.closest('.workflow-card').dataset.id;
                this.selectedWorkflow = this.workflows.find(w => w.id === workflowId);
                await this.loadPhases(workflowId);
                this.render();
            });
        });

        // Add phase button
        this.querySelector('.add-phase-btn')?.addEventListener('click', () => {
            this.showPhaseModal();
        });

        // Phase actions
        this.querySelectorAll('.edit-phase-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const phaseId = e.target.closest('.phase-item').dataset.id;
                const phase = this.phases.find(p => p.id === phaseId);
                this.showPhaseModal(phase);
            });
        });

        this.querySelectorAll('.manage-stages-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const phaseId = e.target.closest('.phase-item').dataset.id;
                this.dispatchEvent(new CustomEvent('managestages', {
                    detail: {
                        workflowId: this.selectedWorkflow.id,
                        phaseId: phaseId
                    },
                    bubbles: true
                }));
            });
        });
    }

    // Modal methods would go here...
}

customElements.define('phase-management', PhaseManagement);