import {
    areRectsOverlapping,
    EventManager,
    HeadlessUiLikeWebComponent,
    pointerRectFromPointerEvent
} from "./headless-ui-like-web-component";



export class EuiCheckbox extends HeadlessUiLikeWebComponent {
    checkbox: HTMLElement | null = null;
    input: HTMLInputElement | null = null;
    disabled: boolean = false;
    active: boolean = false;
    checked: boolean = false;

    constructor() {
        super();
    }

    checkbox_element(): HTMLElement | null {
        return this.querySelector('[role="checkbox"]');
    }
    hidden_input(): HTMLInputElement | null {
        return this.querySelector('[role="checkbox"] > input[type="hidden"]');
    }

    toggleChecked() {
        this.checked = !this.checked;
        if(this.checkbox) {
            this.checkbox.setAttribute('aria-checked', this.checked ? 'true' : 'false');
            this.checkbox.toggleAttribute('data-checked', this.checked);
            if (this.input)  {
                this.input.value = this.checked ? 'true' : 'false';
                this.input.toggleAttribute('checked', this.checked);
                this.triggerPhx(this.input);
            }
        }
    }

    setPressed(to: boolean) {
        if (this.active !== to) {
            this.active = to;
            if(this.checkbox) {
                (this.active) ? this.setFlag(this.checkbox,'active') : this.clearFlag(this.checkbox,'active');
            }
        }
    }

    register() {
        this.checkbox = this.checkbox ?? this.checkbox_element();
        this.input = this.input ?? this.hidden_input();
        if (this.checkbox) {
            this.manager.addEventListener(this.checkbox, 'mouseenter', () => this.setFlag(this.checkbox, 'hover'));
            this.manager.addEventListener(this.checkbox, 'mouseleave', () => this.clearFlag(this.checkbox, 'hover'));


            // Focus Tracking : crude initial version: focus should only be set by keyboard navigation not mouse clicks.
            this.manager.addEventListener(this.checkbox, 'focus',  () => !this.active && this.setFlag(this.checkbox, 'focus'));
            this.manager.addEventListener(this.checkbox, 'blur',  () => !this.active && this.clearFlag(this.checkbox, 'focus'));


            this.manager.addEventListener(this.checkbox, 'click', (event) => {
                this.toggleChecked();
            });
            this.manager.addEventListener(this.checkbox, 'keydown', (event) => {
                if (event.key === ' ') {
                    this.toggleChecked();
                    event.preventDefault();
                }
            });

            // Refactor into reusable method (press Active)
            let pressManager = new EventManager();
            let pressTarget: {current: HTMLElement | null} = {current: null};

            let releasePress = () => {
                pressTarget.current = null;
                this.setPressed(false)
                pressManager.release();
            }

            this.manager.addEventListener(this.checkbox, 'pointerup', releasePress);
            this.manager.addEventListener(this.checkbox, 'click', releasePress);
            this.manager.addEventListener(this.checkbox, 'pointerdown', (event) => {
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
