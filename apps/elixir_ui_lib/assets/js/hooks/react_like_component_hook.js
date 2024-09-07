"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactLikeComponent_Hook = void 0;
exports.ReactLikeComponent_Hook = {
    mounted: function () {
        this.trackedElements = new Set();
        this.processInitialElements();
        this.setupObserver();
    },
    destroyed: function () {
        var _this = this;
        this.observer.disconnect();
        this.trackedElements.forEach(function (el) { return _this.unregisterElement(el); });
    },
    processInitialElements: function () {
        var _this = this;
        console.log("Initial Element", this.el);
        this.el.querySelectorAll('[data-react-like]').forEach(function (el) {
            console.log("Add Initial Element", el);
            _this.registerElement(el);
        });
    },
    setupObserver: function () {
        var _this = this;
        console.log("setupObserver", this.el);
        this.observer = new MutationObserver(function (mutations) {
            console.log("Mutations!", mutations);
            mutations.forEach(function (mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function (node) { return _this.handleAddedNode(node); });
                    mutation.removedNodes.forEach(function (node) { return _this.handleRemovedNode(node); });
                }
            });
        });
        this.observer.observe(this.el, { childList: true, subtree: true });
    },
    handleAddedNode: function (node) {
        var _this = this;
        console.log("Added Node", node);
        if (node.nodeType === Node.ELEMENT_NODE) {
            this.registerElement(node);
            node.querySelectorAll('[data-react-like]').forEach(function (el) {
                return _this.registerElement(el);
            });
        }
    },
    handleRemovedNode: function (node) {
        var _this = this;
        console.log("Removed Node", node);
        if (node.nodeType === Node.ELEMENT_NODE) {
            this.unregisterElement(node);
            node.querySelectorAll('[data-react-like]').forEach(function (el) {
                return _this.unregisterElement(el);
            });
        }
    },
    registerElement: function (el) {
        console.log("Register Element", el);
        if (el.hasAttribute('data-react-like') && !this.trackedElements.has(el)) {
            this.setupElementInstrumentation(el);
            this.trackedElements.add(el);
        }
    },
    unregisterElement: function (el) {
        console.log("Unregister Element", el);
        if (this.trackedElements.has(el)) {
            this.cleanupElementInstrumentation(el);
            this.trackedElements.delete(el);
        }
    },
    setupElementInstrumentation: function (el) {
        var _this = this;
        console.log("Setup Element Instrumentation", el);
        var setAttribute = function (attr, value) {
            el.setAttribute(attr, value);
        };
        var handlers = {
            mouseenter: function () { return _this.setAttribute(el, 'hover'); },
            mouseleave: function () { return _this.clearAttribute(el, 'hover'); },
            focus: function () { return _this.setAttribute(el, 'focus'); },
            blur: function () { return _this.clearAttribute(el, 'focus'); },
            mousedown: function () { return _this.setAttribute(el, 'active'); },
            mouseup: function () { return _this.clearAttribute(el, 'active'); },
            // Add more handlers as needed
        };
        Object.entries(handlers).forEach(function (_a) {
            var event = _a[0], handler = _a[1];
            console.log("Add  Element Handler", event);
            el.addEventListener(event, handler);
        });
        el._reactLikeCleanup = function () {
            Object.entries(handlers).forEach(function (_a) {
                var event = _a[0], handler = _a[1];
                el.removeEventListener(event, handler);
            });
        };
    },
    cleanupElementInstrumentation: function (el) {
        var _a;
        console.log("Cleanup Element Instrumentation", el);
        (_a = el._reactLikeCleanup) === null || _a === void 0 ? void 0 : _a.call(el);
        delete el._reactLikeCleanup;
    },
    setAttribute: function (el, attr) {
        el.toggleAttribute("data-".concat(attr), true);
    },
    clearAttribute: function (el, attr) {
        el.toggleAttribute("data-".concat(attr), false);
    },
    updateAttribute: function (el, attr, value) {
        el.setAttribute(attr, value);
    }
};
