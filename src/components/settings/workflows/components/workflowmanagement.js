// src/components/settings/workflows/components/workflowmanagement.js

export class WorkflowManagement extends HTMLElement {
    constructor() {
        super();
        this.workflows = [];
    }

    connectedCallback() {
        this.loadWorkflows();
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

    render() {
        this.innerHTML = `
            <div class="workflow-management">
                <div class="info-container">
                    <h1>Create a new workflow</h1>
                    <p>
                        A workflow is a collection of leads, contacts or addresses. You can create a custom 
                        workflow and blend types of data in the system. Within each workflow you can create 
                        phases and stages.
                    </p>

                    <div class="definitions">
                        <div class="definition-item">
                            <h3>Phases</h3>
                            <p>
                                A phase contains stages. Generally phases are used for management to 
                                have a condensed view of data to manage. Phases work well when designed 
                                to identify a "bucket" of work for a specific role in the company.
                            </p>
                        </div>

                        <div class="definition-item">
                            <h3>Stages</h3>
                            <p>
                                The best way to describe a stage would be to think of it as a stop on 
                                a trip, in which we have tasks to complete.
                            </p>
                        </div>

                        <div class="definition-item">
                            <h3>Tasks</h3>
                            <p>Items that need to be completed within the stage.</p>
                        </div>
                    </div>
                </div>

                <div class="workflows-container">
                    <div class="section-header">
                        <h2>Current Workflows</h2>
                        <button id="create-workflow" class="create-button">
                            <span class="material-icons">add</span>
                            Create Workflow
                        </button>
                    </div>

                    <div class="workflows-grid">
                        ${this.workflows.length ? this.renderWorkflows() : this.renderEmptyState()}
                    </div>
                </div>
            </div>
        `;

        this.setupEventListeners();
    }

    renderWorkflows() {
        return this.workflows.map(workflow => `
            <div class="workflow-card" data-id="${workflow.id}">
                <div class="workflow-header">
                    <div>
                        <h3>${workflow.name}</h3>
                        <span class="collection-name">Collection: ${workflow.collection}</span>
                    </div>
                    <span class="status-badge ${workflow.active ? 'active' : 'inactive'}">
                        ${workflow.active ? 'Active' : 'Inactive'}
                    </span>
                </div>
                <div class="phase-preview">
                    ${workflow.phases?.map(phase => `
                        <span class="phase-badge" style="background-color: ${phase.color}20; 
                            color: ${phase.color}; border: 1px solid ${phase.color}">
                            ${phase.name}
                        </span>
                    `).join('') || 'No phases defined'}
                </div>
                <div class="workflow-actions">
                    <button class="edit-workflow" data-id="${workflow.id}">
                        <span class="material-icons">edit</span>
                        Edit
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderEmptyState() {
        return `
            <div class="empty-state">
                <div class="empty-state-icon">
                    <span class="material-icons">account_tree</span>
                </div>
                <p>No workflows created</p>
                <p>Click 'Create Workflow' to get started</p>
            </div>
        `;
    }

    setupEventListeners() {
        // Create workflow button
        this.querySelector('#create-workflow')?.addEventListener('click', () => {
            this.showWorkflowModal();
        });

        // Edit workflow buttons
        this.querySelectorAll('.edit-workflow').forEach(button => {
            button.addEventListener('click', (e) => {
                const workflowId = e.target.closest('button').dataset.id;
                this.showWorkflowModal(workflowId);
            });
        });
    }

    showWorkflowModal(workflowId = null) {
        const workflow = workflowId ? 
            this.workflows.find(w => w.id === workflowId) : null;

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${workflow ? 'Edit' : 'Create'} Workflow</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <form id="workflow-form">
                    <div class="form-group">
                        <label>Collection Type</label>
                        <select name="collection" required>
                            <option value="">Select Collection</option>
                            <option value="contacts">Contacts</option>
                            <option value="addresses">Addresses</option>
                            <option value="leads">Leads</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Workflow Name</label>
                        <input type="text" name="name" required 
                               value="${workflow?.name || ''}">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea name="description" rows="3">${workflow?.description || ''}</textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="secondary-button">Cancel</button>
                        <button type="submit" class="primary-button">
                            ${workflow ? 'Update' : 'Create'} Workflow
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);
        this.setupModalEventListeners(modal, workflow);
    }

    setupModalEventListeners(modal, workflow) {
        const form = modal.querySelector('#workflow-form');
        const closeBtn = modal.querySelector('.close-modal');
        const cancelBtn = modal.querySelector('.secondary-button');

        const closeModal = () => modal.remove();

        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            
            const workflowData = {
                collection: formData.get('collection'),
                name: formData.get('name'),
                description: formData.get('description'),
                active: true,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            try {
                if (workflow) {
                    await firebase.firestore()
                        .collection('workflows')
                        .doc(workflow.id)
                        .update(workflowData);
                } else {
                    workflowData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
                    await firebase.firestore()
                        .collection('workflows')
                        .add(workflowData);
                }

                await this.loadWorkflows();
                this.render();
                closeModal();
            } catch (error) {
                console.error('Error saving workflow:', error);
                alert('Failed to save workflow. Please try again.');
            }
        });
    }
}

customElements.define('workflow-management', WorkflowManagement);