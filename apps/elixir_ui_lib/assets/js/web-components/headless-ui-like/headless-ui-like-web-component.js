"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadlessUiLikeWebComponent = exports.areRectsOverlapping = exports.pointerRectFromPointerEvent = void 0;
function pointerRectFromPointerEvent(event) {
    // Center of the pointer geometry
    var offsetX = event.width / 2;
    var offsetY = event.height / 2;
    return {
        top: event.clientY - offsetY,
        right: event.clientX + offsetX,
        bottom: event.clientY + offsetY,
        left: event.clientX - offsetX,
    };
}
exports.pointerRectFromPointerEvent = pointerRectFromPointerEvent;
function areRectsOverlapping(a, b) {
    if (!a || !b) {
        return false;
    }
    if (a.right < b.left || a.left > b.right) {
        return false;
    }
    if (a.bottom < b.top || a.top > b.bottom) {
        return false;
    }
    return true;
}
exports.areRectsOverlapping = areRectsOverlapping;
var EventManager = /** @class */ (function () {
    function EventManager() {
        this.active = [];
    }
    EventManager.prototype.addEventListener = function (element, name, listener, options) {
        element.addEventListener(name, listener, options);
        return this.track(function () { return element.removeEventListener(name, listener, options); });
    };
    EventManager.prototype.requestAnimationFrame = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var raf = requestAnimationFrame.apply(void 0, args);
        return this.track(function () { return cancelAnimationFrame(raf); });
    };
    EventManager.prototype.nextFrame = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.requestAnimationFrame(function () {
            return _this.requestAnimationFrame.apply(_this, args);
        });
    };
    EventManager.prototype.setTimeout = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var timer = setTimeout.apply(void 0, args);
        return this.track(function () { return clearTimeout(timer); });
    };
    EventManager.prototype.style = function (node, property, value) {
        var _a;
        var previous = node.style.getPropertyValue(property);
        Object.assign(node.style, (_a = {}, _a[property] = value, _a));
        return this.track(function () {
            var _a;
            Object.assign(node.style, (_a = {}, _a[property] = previous, _a));
        });
    };
    EventManager.prototype.group = function (cb) {
        var g = new EventManager();
        // Run set of operations on new manager group.
        cb(g);
        return this.track(function () { return g.release(); });
    };
    EventManager.prototype.track = function (handler) {
        if (!this.active.includes(handler)) {
            this.active.push(handler);
        }
        return this.cleanupLambda(handler);
    };
    EventManager.prototype.cleanupLambda = function (handler) {
        var _this = this;
        return function () {
            // Check if handler is still registered if so remove from list and execute.
            var index = _this.active.indexOf(handler);
            if (index >= 0) {
                for (var _i = 0, _a = _this.active.splice(index, 1); _i < _a.length; _i++) {
                    var closeHandler = _a[_i];
                    closeHandler();
                }
                ;
            }
        };
    };
    EventManager.prototype.release = function () {
        for (var _i = 0, _a = this.active.splice(0); _i < _a.length; _i++) {
            var closeHandler = _a[_i];
            closeHandler();
        }
    };
    return EventManager;
}());
var HeadlessUiLikeWebComponent = /** @class */ (function (_super) {
    __extends(HeadlessUiLikeWebComponent, _super);
    function HeadlessUiLikeWebComponent() {
        return _super.call(this) || this;
    }
    HeadlessUiLikeWebComponent.prototype.connectedCallback = function () {
        console.log("Custom element added to page.", this);
    };
    HeadlessUiLikeWebComponent.prototype.disconnectedCallback = function () {
        console.log("Custom element removed from page.", this);
    };
    HeadlessUiLikeWebComponent.prototype.adoptedCallback = function () {
        console.log("Custom element moved to new page.", this);
    };
    HeadlessUiLikeWebComponent.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        console.log("Attribute ".concat(name, " has changed from ").concat(oldValue, " to ").concat(newValue, "."), this);
    };
    HeadlessUiLikeWebComponent.setFlag = function (target, flag) {
        target.toggleAttribute("data-".concat(flag), true);
    };
    HeadlessUiLikeWebComponent.clearFlag = function (target, flag) {
        target.toggleAttribute("data-".concat(flag), false);
    };
    HeadlessUiLikeWebComponent.setStatus = function (target, status, value) {
        target.setAttribute("data-".concat(status), value);
    };
    HeadlessUiLikeWebComponent.clearStatus = function (target, status, value) {
        target.toggleAttribute("data-".concat(status), false);
    };
    return HeadlessUiLikeWebComponent;
}(HTMLElement));
exports.HeadlessUiLikeWebComponent = HeadlessUiLikeWebComponent;
