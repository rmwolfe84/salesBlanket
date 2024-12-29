export class CustomModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .modal {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 90%;
                    max-width: 500px;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    z-index: 1000;
                    overflow: hidden;
                }
                .modal-content {
                    padding: 20px;
                }
                .close {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    cursor: pointer;
                    font-size: 20px;
                }
            </style>
            <div class="modal">
                <span class="close" onclick="this.parentElement.remove()">×</span>
                <div class="modal-content">
                    <slot name="content">Default Content</slot>
                </div>
            </div>
        `;
    }
}

customElements.define('custom-modal', CustomModal);
