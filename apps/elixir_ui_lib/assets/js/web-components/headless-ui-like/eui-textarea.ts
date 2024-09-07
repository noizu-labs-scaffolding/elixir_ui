import {
    areRectsOverlapping,
    EventManager,
    HeadlessUiLikeWebComponent,
    pointerRectFromPointerEvent
} from "./headless-ui-like-web-component";



export class EuiTextarea extends HeadlessUiLikeWebComponent {
    element: HTMLElement | null = null;
    disabled: boolean = false;
    active: boolean = false;
    checked: boolean = false;

    constructor() {
        super();
    }

    main_element(): HTMLElement | null {
        return this.querySelector('[data-textarea-field]');
    }


    setPressed(to: boolean) {
        if (this.active !== to) {
            this.active = to;
            if(this.element) {
                (this.active) ? this.setFlag(this.element,'active') : this.clearFlag(this.element,'active');
            }
        }
    }

    register() {
        this.element = this.element ?? this.main_element();
        if (this.element) {
            this.manager.addEventListener(this.element, 'mouseenter', () => this.setFlag(this.element, 'hover'));
            this.manager.addEventListener(this.element, 'mouseleave', () => this.clearFlag(this.element, 'hover'));


            // Focus Tracking : crude initial version: focus should only be set by keyboard navigation not mouse clicks.
            this.manager.addEventListener(this.element, 'focus',  () => !this.active && this.setFlag(this.element, 'focus'));
            this.manager.addEventListener(this.element, 'blur',  () => !this.active && this.clearFlag(this.element, 'focus'));

            // Refactor into reusable method (press Active)
            let pressManager = new EventManager();
            let pressTarget: {current: HTMLElement | null} = {current: null};

            let releasePress = () => {
                pressTarget.current = null;
                this.setPressed(false)
                pressManager.release();
            }

            this.manager.addEventListener(this.element, 'pointerup', releasePress);
            this.manager.addEventListener(this.element, 'click', releasePress);
            this.manager.addEventListener(this.element, 'pointerdown', (event) => {
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
