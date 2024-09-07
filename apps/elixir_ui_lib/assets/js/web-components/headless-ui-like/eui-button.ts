import {
    areRectsOverlapping,
    EventManager,
    HeadlessUiLikeWebComponent,
    pointerRectFromPointerEvent
} from "./headless-ui-like-web-component";



export class EuiButton extends HeadlessUiLikeWebComponent {
    button: HTMLElement | null = null;
    disabled: boolean = false;
    active: boolean = false;

    constructor() {
        super();
    }

    button_element(): HTMLElement | null {
        return this.querySelector('[role="button"]');
    }

    setPressed(to: boolean) {
        if (this.active !== to) {
            this.active = to;
            if(this.button) {
                (this.active) ? this.setFlag(this.button,'active') : this.clearFlag(this.button,'active');
            }
        }
    }

    register() {
        this.button = this.button ?? this.button_element();
        if (this.button) {
            this.manager.addEventListener(this.button, 'mouseenter', () => this.setFlag(this.button, 'hover'));
            this.manager.addEventListener(this.button, 'mouseleave', () => this.clearFlag(this.button, 'hover'));




            // Focus Tracking : crude initial version: focus should only be set by keyboard navigation not mouse clicks.
            this.manager.addEventListener(this.button, 'focus',  () => !this.active && this.setFlag(this.button, 'focus'));
            this.manager.addEventListener(this.button, 'blur',  () => !this.active && this.clearFlag(this.button, 'focus'));


            // Refactor into reusable method (press Active)
            let pressManager = new EventManager();
            let pressTarget: {current: HTMLElement | null} = {current: null};

            let releasePress = () => {
                pressTarget.current = null;
                this.setPressed(false)
                pressManager.release();
            }

            this.manager.addEventListener(this.button, 'pointerup', releasePress);
            this.manager.addEventListener(this.button, 'click', releasePress);
            this.manager.addEventListener(this.button, 'pointerdown', (event) => {
                pressManager.release();

                if (pressTarget.current !== null) return;

                pressTarget.current = event.currentTarget as HTMLElement
                this.setPressed(true)

                {
                    let outerElement = (event.target instanceof Node) ? event.target.ownerDocument : document;
                    pressManager.addEventListener(outerElement, 'pointerup', releasePress, false);
                    pressManager.addEventListener(outerElement, 'pointermove', (event: PointerEvent) => {
                        if (pressTarget.current) {
                            let boundry = pointerRectFromPointerEvent(event);
                            this.setPressed(areRectsOverlapping(boundry, pressTarget.current.getBoundingClientRect()))
                        }

                    }, false);
                    pressManager.addEventListener(outerElement, 'pointercancel', releasePress, false);
                }
            });




        }
    }

    deregister() {
        this.manager.release();
    }


    override connectedCallback() {
        console.log("Custom element added to page.", this);
        this.register();
    }

    override disconnectedCallback() {
        console.log("Custom element removed from page.", this);
        this.deregister();
    }

    override adoptedCallback() {
        console.log("Custom element moved to new page.", this);
    }

    override attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed from ${oldValue} to ${newValue}.`, this);
    }

}
