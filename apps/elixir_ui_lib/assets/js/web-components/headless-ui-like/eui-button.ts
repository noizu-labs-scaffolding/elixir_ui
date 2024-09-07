import { HeadlessUiLikeWebComponent } from "./headless-ui-like-web-component";



export class EuiButton extends HeadlessUiLikeWebComponent {
    button: HTMLElement | null = null;

    constructor() {
        super();
    }



    //----------------------------------
    // Event Handlers
    //----------------------------------



    handleClick(event: MouseEvent) {
        console.log("Button clicked!", event);


    }


    setHoverFlag(event: MouseEvent) {
        console.log("Event", event);
        if (event.target instanceof  Element) {
            EuiButton.setFlag(event.target , 'hover');
        }
    }
    clearHoverFlag(event: MouseEvent) {
        if (event.target instanceof  Element) {
            EuiButton.clearFlag(event.target , 'hover');
        }
    }
    setFocusFlag(event: FocusEvent) {
        if (event.target instanceof  Element) {
            EuiButton.setFlag(event.target , 'focus');
        }
    }
    clearFocusFlag(event: FocusEvent) {
        if (event.target instanceof  Element) {
            EuiButton.clearFlag(event.target , 'focus');
        }
    }
    setActiveFlag(event: MouseEvent) {
        if (event.target instanceof  Element) {
            EuiButton.setFlag(event.target , 'active');
        }
    }
    clearActiveFlag(event: MouseEvent) {
        if (event.target instanceof  Element) {
            EuiButton.clearFlag(event.target , 'active');
        }
    }


    register() {
        this.button = this.querySelector('[role="button"]');
        console.log("This?", this);
        if (this.button) {
            this.button.addEventListener('mouseenter', this.setHoverFlag);
            this.button.addEventListener('mouseleave', this.clearHoverFlag);
            this.button.addEventListener('focus', this.setFocusFlag);
            this.button.addEventListener('blur', this.clearFocusFlag);
            this.button.addEventListener('mousedown', this.setActiveFlag);
            this.button.addEventListener('mouseup', this.clearActiveFlag);
        }
    }

    deregister() {

        if (this.button) {
            this.button.removeEventListener('mouseenter', this.setHoverFlag);
            this.button.removeEventListener('mouseleave', this.clearHoverFlag);
            this.button.removeEventListener('focus', this.setFocusFlag);
            this.button.removeEventListener('blur', this.clearFocusFlag);
            this.button.removeEventListener('mousedown', this.setActiveFlag);
            this.button.removeEventListener('mouseup', this.clearActiveFlag);
            this.button = null;
        }
    }


    connectedCallback() {
        console.log("Custom element added to page.", this);
        this.register();
    }

    disconnectedCallback() {
        console.log("Custom element removed from page.", this);
        this.deregister();
    }

    adoptedCallback() {
        console.log("Custom element moved to new page.", this);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed from ${oldValue} to ${newValue}.`, this);
    }

}
