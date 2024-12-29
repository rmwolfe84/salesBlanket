// file path: src/routes/public/404.js

import { registerComponent } from '../../core/component-registry.js';

export class NotFoundView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="not-found-page">
                <h1>404</h1>
                <p>The page you are looking for does not exist.</p>
            </div>
        `;
    }
}

registerComponent('not-found-view', NotFoundView);
