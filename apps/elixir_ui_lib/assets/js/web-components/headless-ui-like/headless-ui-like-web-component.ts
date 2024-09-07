
export class HeadlessUiLikeWebComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        console.log("Custom element added to page.", this);
    }

    disconnectedCallback() {
        console.log("Custom element removed from page.", this);
    }

    adoptedCallback() {
        console.log("Custom element moved to new page.", this);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed from ${oldValue} to ${newValue}.`, this);
    }



    static setFlag(target: Element, flag: string) {
        target.toggleAttribute(`data-${flag}`, true);
    }
    static clearFlag(target: Element, flag: string) {
        target.toggleAttribute(`data-${flag}`, false);
    }
    static setStatus(target: Element, status: string, value: string) {
        target.setAttribute(`data-${status}`, value);
    }
    static clearStatus(target: Element, status: string, value: string) {
        target.toggleAttribute(`data-${status}`, false);
    }
}
