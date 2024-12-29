// src/core/data/workflows.js

// Main workflow schema
export const WORKFLOW_SCHEMA = {
    // Core workflow properties
    id: '',                    // Firestore document ID
    name: '',                  // Collection name this workflow applies to (e.g. 'inspections', 'contacts')
    description: '',           // Purpose/details of this workflow
    active: true,             // Whether workflow is currently active
    
    // Phases and their stages
    phases: [
        {
            id: '',           // Unique identifier for phase
            name: '',         // Display name (e.g. "Intake", "Review", "Completion")
            description: '',   // Phase description
            order: 0,         // Display/processing order
            color: '',        // Color for visual grouping
            stages: [         // Statuses within this phase
                {
                    id: '',                  // Unique identifier for stage
                    name: '',                // Display name for the stage
                    description: '',         // Stage description 
                    order: 0,               // Order within phase
                    color: '',              // Visual identifier
                    requiresApproval: false, // Whether moving to this stage needs approval
                    allowedRoles: [],       // Which roles can move items to this stage
                    nextStages: [],         // Allowed next stages (for non-linear flows)
                    fieldRequirements: [],  // Required fields to move to this stage
                    notifications: [],      // Notifications to trigger
                    automations: []         // Automations to run
                }
            ]
        }
    ],

    // Metadata
    createdBy: '',
    createdAt: null,
    updatedAt: null,
    version: 1
};

// Example of a notification configuration
export const NOTIFICATION_CONFIG = {
    type: 'EMAIL' | 'SMS' | 'IN_APP',
    template: '', // Template ID or content
    recipients: [], // Array of user IDs or roles
    conditions: {} // Optional conditions for when to send
};

// Example of an automation configuration
export const AUTOMATION_CONFIG = {
    type: 'UPDATE_FIELD' | 'CREATE_TASK' | 'TRIGGER_INTEGRATION',
    config: {},   // Configuration specific to automation type
    conditions: {} // Optional conditions for when to run
};

// Example field requirement configuration
export const FIELD_REQUIREMENT = {
    fieldId: '',
    required: true,
    validations: {} // Optional validation rules
};

// Helper class for workflow management
export class WorkflowManager {
    constructor(firestore) {
        this.db = firestore;
        this.workflowsRef = this.db.collection('workflows');
    }

    // Create new workflow
    async createWorkflow(workflowData) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        
        const workflow = {
            ...WORKFLOW_SCHEMA,
            ...workflowData,
            createdAt: timestamp,
            updatedAt: timestamp
        };

        try {
            const docRef = await this.workflowsRef.add(workflow);
            return { id: docRef.id, ...workflow };
        } catch (error) {
            console.error('Error creating workflow:', error);
            throw error;
        }
    }

    // Add phase to workflow
    async addPhase(workflowId, phaseData) {
        try {
            const workflow = await this.getWorkflow(workflowId);
            const newPhase = {
                id: crypto.randomUUID(),
                order: workflow.phases.length,
                stages: [],
                ...phaseData
            };

            await this.workflowsRef.doc(workflowId).update({
                phases: firebase.firestore.FieldValue.arrayUnion(newPhase),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            return newPhase;
        } catch (error) {
            console.error('Error adding phase:', error);
            throw error;
        }
    }

    // Add stage to phase
    async addStage(workflowId, phaseId, stageData) {
        try {
            const workflow = await this.getWorkflow(workflowId);
            const phaseIndex = workflow.phases.findIndex(p => p.id === phaseId);
            
            if (phaseIndex === -1) throw new Error('Phase not found');

            const newStage = {
                id: crypto.randomUUID(),
                order: workflow.phases[phaseIndex].stages.length,
                ...stageData
            };

            const updatedPhases = [...workflow.phases];
            updatedPhases[phaseIndex].stages.push(newStage);

            await this.workflowsRef.doc(workflowId).update({
                phases: updatedPhases,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            return newStage;
        } catch (error) {
            console.error('Error adding stage:', error);
            throw error;
        }
    }

    // Validate stage transition within workflow
    async validateStageTransition(workflowId, fromStageId, toStageId, itemData = {}) {
        const workflow = await this.getWorkflow(workflowId);
        let fromStage, toStage;

        // Find stages in any phase
        workflow.phases.forEach(phase => {
            const foundFromStage = phase.stages.find(s => s.id === fromStageId);
            const foundToStage = phase.stages.find(s => s.id === toStageId);
            if (foundFromStage) fromStage = foundFromStage;
            if (foundToStage) toStage = foundToStage;
        });

        if (!fromStage || !toStage) {
            throw new Error('Invalid stage transition');
        }

        // Check if transition is allowed
        if (!fromStage.nextStages.includes(toStageId)) {
            throw new Error('Invalid stage transition sequence');
        }

        // Check required fields
        const missingFields = toStage.fieldRequirements.filter(
            field => !itemData[field]
        );

        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        return true;
    }

    // Helper methods for workflow management
    async getWorkflow(workflowId) {
        const doc = await this.workflowsRef.doc(workflowId).get();
        if (!doc.exists) throw new Error('Workflow not found');
        return { id: doc.id, ...doc.data() };
    }

    async getWorkflows() {
        const snapshot = await this.workflowsRef.where('active', '==', true).get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }
}