// src/components/modals/version-modal.js
export class VersionModal extends HTMLElement {
    constructor() {
        super();
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    connectedCallback() {
        this.render();
        document.addEventListener('keydown', this.handleKeyPress);
    }

    disconnectedCallback() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    close() {
        this.remove();
    }

    getVersionHistory() {
        return `
    SalesBlanket Version History
    ===========================
    
    Version 1.0.2 (December 21, 2024)
    --------------------------------
    • Added role management system
    • Implemented user invite functionality
    • Updated phase structure to include communication systems
    • Reorganized development roadmap
    
    Phase 1: Core System Updates & Role Management
    --------------------------------------------
    1. Role System Restructuring
       • Update existing roles (setter, closer)
       • Add manager role
       • Create role assignment interface in settings
       • Update security rules
       • Add role-specific views/access
    
    2. Collection Structure Updates
       • Addresses collection stages
         - new_without_contact
         - do_not_solicit
         - damage_present
         - go_back
       • Contacts collection stages
         - new_without_address
         - do_not_solicit
         - address_added
       • Leads collection stages
         - appointment_scheduled
    
    3. Basic UI Components
       • Implement reusable kanban board
       • Update navigation for new roles
       • Add settings interfaces
    
    Phase 2: Communications & Territory Management
    -------------------------------------------
    1. Communication Systems
       • Email Integration
         - SMTP/Email service setup
         - User invite emails
         - Notification templates
         - Email verification
       • Twilio SMS Integration
         - SMS verification
         - Text notifications
         - Opt-in/out management
       • Communication Preferences
         - User notification settings
         - Frequency controls
    
    2. Territory Management
       • Create territory drawing interface
       • Territory assignment system
       • Boundary management
       • Territory sharing capabilities
       • Admin-only territory controls
    
    3. Map Component Enhancement
       • Collection-based filters
       • Status-based pin colors
       • Territory overlay visualization
       • Area selection tools
       • Filter views by collection type
    
    Phase 3: Task & Automation System
    -------------------------------
    1. Task Management
       • Basic task creation
       • Door knock tracking
       • Flyer status tracking
       • Task assignment system
       • Task completion workflows
    
    2. Automation System
       • Settings page automation builder
       • Notification rule configuration
       • Task generation rules
       • Follow-up automation
    
    Phase 4: Integration Systems
    --------------------------
    1. GHL Integration
       • API connection setup
       • Contact sync
       • Appointment sync
       • Task sync
       • Error handling & retry logic
    
    2. Notification System
       • Access request notifications
       • Territory-based alerts
       • Geographic grouping
       • Manager alerts
       • Task notifications
    
    Phase 5: Advanced Features & Reporting
    ----------------------------------
    1. Progress Tracking
       • User performance metrics
       • Territory performance tracking
       • Conversion rate tracking
       • Activity logging
    
    2. Reporting System
       • Basic reports
       • Custom report builder
       • Automated reporting
       • Export capabilities
    
    Phase 6: Optimization & Enhancement
    --------------------------------
    1. System Optimization
       • Performance improvements
       • Data caching
       • Load time optimization
       • Mobile responsiveness
    
    2. User Experience Enhancements
       • Bulk operations
       • Advanced filters
       • Quick actions
       • User preferences
    
    Dependencies & Considerations:
    ---------------------------
    1. Role system must be completed before territory management
    2. Collection structure updates needed before task system
    3. Basic UI components required for all phases
    4. Communication systems needed for notifications
    5. Territory system needed before geographic notifications
    
    Previous Versions:
    ----------------
    Version 1.0.1 (December 20, 2024)
    • Fixed authentication flow to direct to daily-view
    • Added daily-view button to navigation menu
    • Corrected routes organization and imports
    • Added profile completion notification
    • Implemented proper routing for authenticated/public pages
    
    Version 1.0.0 (December 19, 2024)
    • Initial release
    • Basic authentication system
    • User role management
    • Navigation structure
    • Core application framework`;
    }

    render() {
        this.innerHTML = `
            <div class="version-modal">
                <div class="terminal-window">
                    <div class="terminal-header">
                        <div class="terminal-title">Version History</div>
                        <button class="terminal-close">×</button>
                    </div>
                    <div class="terminal-content">
                        <pre class="terminal-text">${this.getVersionHistory()}</pre>
                    </div>
                </div>
            </div>
        `;

        this.querySelector('.terminal-close').addEventListener('click', () => this.close());
    }
}

customElements.define('version-modal', VersionModal);