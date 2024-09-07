

// Only the necessary props from a DOMRect
export type Rect = { left: number; right: number; top: number; bottom: number }

export function pointerRectFromPointerEvent(event: PointerEvent): Rect {
    // Center of the pointer geometry
    let offsetX = event.width / 2
    let offsetY = event.height / 2

    return {
        top: event.clientY - offsetY,
        right: event.clientX + offsetX,
        bottom: event.clientY + offsetY,
        left: event.clientX - offsetX,
    }
}

export function areRectsOverlapping(a: Rect | null, b: Rect | null) {
    if (!a || !b) {
        return false
    }

    if (a.right < b.left || a.left > b.right) {
        return false
    }

    if (a.bottom < b.top || a.top > b.bottom) {
        return false
    }
    return true
}

class EventManager {
    public active: Function[] = [];

    constructor() {
    }

    addEventListener<TEventName extends keyof WindowEventMap>(
        element: HTMLElement | Window | Document,
        name: TEventName,
        listener: (event: WindowEventMap[TEventName]) => any,
        options?: boolean | AddEventListenerOptions
    ) {
        element.addEventListener(name, listener as any, options)
        return this.track(() => element.removeEventListener(name, listener as any, options))
    }

    requestAnimationFrame(...args: Parameters<typeof requestAnimationFrame>) {
        let raf = requestAnimationFrame(...args)
        return this.track(() => cancelAnimationFrame(raf))
    }


    nextFrame(...args: Parameters<typeof requestAnimationFrame>) {
        return this.requestAnimationFrame(() => {
            return this.requestAnimationFrame(...args)
        })
    }

    setTimeout(...args: Parameters<typeof setTimeout>) {
        let timer = setTimeout(...args)
        return this.track(() => clearTimeout(timer))
    }

    style(node: HTMLElement, property: string, value: string) {
        let previous = node.style.getPropertyValue(property)
        Object.assign(node.style, { [property]: value })
        return this.track(() => {
            Object.assign(node.style, { [property]: previous })
        })
    }

    group(cb: (d: typeof this) => void) {
    let g = new EventManager();
    // Run set of operations on new manager group.
    cb(g);
    return this.track(() => g.release());
    }

    track(handler: () => void) {
        if (!this.active.includes(handler)) {
            this.active.push(handler);
        }
        return this.cleanupLambda(handler);
    }

    cleanupLambda(handler: Function) {
        return () => {
            // Check if handler is still registered if so remove from list and execute.
            let index = this.active.indexOf(handler);
            if (index >= 0) {
                for (let closeHandler of this.active.splice(index, 1)) {
                    closeHandler();
                };
        }
        }
    }

    release() {
        for (let closeHandler of this.active.splice(0)) {
            closeHandler();
        }
    }


}



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
