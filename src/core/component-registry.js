export const registerComponent = (name, component) => {
    if (!customElements.get(name)) {
        customElements.define(name, component);
        console.log(`Registered component: ${name}`);
    }
};
