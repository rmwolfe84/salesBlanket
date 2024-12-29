// src/components/shared/footer.js
export class FooterBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <footer class="main-footer">
                <div class="footer-content">
                    <div class="copyright-text">
                        © ${new Date().getFullYear()} SalesBlanket. All Operations & Intellectual Property Rights 
                        Reserved. Patent Pending.
                    </div>
                    <div class="company-info">
                        RenewedSolutions<br>
                        est. 2024
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('footer-bar', FooterBar);