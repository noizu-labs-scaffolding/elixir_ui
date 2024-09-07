
interface ReactLikeElement extends HTMLElement {
    _reactLikeCleanup?: () => void;
}



export const ReactLikeComponent_Hook = {
    mounted() {
        this.trackedElements = new Set<ReactLikeElement>();
        this.processInitialElements();
        this.setupObserver();
    },

    destroyed() {
        this.observer.disconnect();
        this.trackedElements.forEach(el => this.unregisterElement(el));
    },


    processInitialElements() {
        console.log("Initial Element", this.el);
        this.el.querySelectorAll('[data-react-like]').forEach(el => {
            console.log("Add Initial Element", el);
                this.registerElement(el as ReactLikeElement)
            }
        );
    },

    setupObserver() {
        console.log("setupObserver", this.el);
        this.observer = new MutationObserver((mutations: MutationRecord[]) => {
            console.log("Mutations!", mutations);
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => this.handleAddedNode(node));
                    mutation.removedNodes.forEach(node => this.handleRemovedNode(node));
                }
            });
        });

        this.observer.observe(this.el, { childList: true, subtree: true });
    },

    handleAddedNode(node: Node) {
        console.log("Added Node", node);
        if (node.nodeType === Node.ELEMENT_NODE) {
            this.registerElement(node as ReactLikeElement);
            (node as Element).querySelectorAll('[data-react-like]').forEach(el =>
                this.registerElement(el as ReactLikeElement)
            );
        }
    },

    handleRemovedNode(node: Node) {
        console.log("Removed Node", node);
        if (node.nodeType === Node.ELEMENT_NODE) {
            this.unregisterElement(node as ReactLikeElement);
            (node as Element).querySelectorAll('[data-react-like]').forEach(el =>
                this.unregisterElement(el as ReactLikeElement)
            );
        }
    },

    registerElement(el: ReactLikeElement) {
        console.log("Register Element", el);
        if (el.hasAttribute('data-react-like') && !this.trackedElements.has(el)) {
            this.setupElementInstrumentation(el);
            this.trackedElements.add(el);
        }
    },

    unregisterElement(el: ReactLikeElement) {
        console.log("Unregister Element", el);
        if (this.trackedElements.has(el)) {
            this.cleanupElementInstrumentation(el);
            this.trackedElements.delete(el);
        }
    },

    setupElementInstrumentation(el: ReactLikeElement) {
        console.log("Setup Element Instrumentation", el);
        const setAttribute = (attr: string, value: string) => {
            el.setAttribute(attr, value);
        };

        const handlers = {
            mouseenter: () => this.setAttribute(el, 'hover'),
            mouseleave: () => this.clearAttribute(el,'hover'),
            focus: () => this.setAttribute(el,'focus'),
            blur: () => this.clearAttribute(el,'focus'),
            mousedown: () => this.setAttribute(el, 'active'),
            mouseup: () => this.clearAttribute(el,'active'),
            // Add more handlers as needed
        };

        Object.entries(handlers).forEach(([event, handler]) => {
            console.log("Add  Element Handler", event);
            el.addEventListener(event, handler);
        });

        el._reactLikeCleanup = () => {
            Object.entries(handlers).forEach(([event, handler]) => {
                el.removeEventListener(event, handler);
            });
        };
    },

    cleanupElementInstrumentation(el: ReactLikeElement) {
        console.log("Cleanup Element Instrumentation", el);
        el._reactLikeCleanup?.();
        delete el._reactLikeCleanup;
    },

    setAttribute(el: ReactLikeElement, attr: string) {
        el.toggleAttribute(`data-${attr}`, true);
    },

    clearAttribute(el: ReactLikeElement, attr: string) {
        el.toggleAttribute(`data-${attr}`, false);
    },

    updateAttribute(el: ReactLikeElement, attr: string, value: string) {
        el.setAttribute(attr, value);
    }
} as const;
