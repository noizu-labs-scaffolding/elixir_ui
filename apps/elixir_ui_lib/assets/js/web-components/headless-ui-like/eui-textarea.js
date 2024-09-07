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
exports.EuiTextarea = void 0;
var headless_ui_like_web_component_1 = require("./headless-ui-like-web-component");
var EuiTextarea = /** @class */ (function (_super) {
    __extends(EuiTextarea, _super);
    function EuiTextarea() {
        var _this = _super.call(this) || this;
        _this.element = null;
        _this.disabled = false;
        _this.active = false;
        _this.checked = false;
        return _this;
    }
    EuiTextarea.prototype.main_element = function () {
        return this.querySelector('[data-textarea-field]');
    };
    EuiTextarea.prototype.setPressed = function (to) {
        if (this.active !== to) {
            this.active = to;
            if (this.element) {
                (this.active) ? this.setFlag(this.element, 'active') : this.clearFlag(this.element, 'active');
            }
        }
    };
    EuiTextarea.prototype.register = function () {
        var _this = this;
        var _a;
        this.element = (_a = this.element) !== null && _a !== void 0 ? _a : this.main_element();
        if (this.element) {
            this.manager.addEventListener(this.element, 'mouseenter', function () { return _this.setFlag(_this.element, 'hover'); });
            this.manager.addEventListener(this.element, 'mouseleave', function () { return _this.clearFlag(_this.element, 'hover'); });
            // Focus Tracking : crude initial version: focus should only be set by keyboard navigation not mouse clicks.
            this.manager.addEventListener(this.element, 'focus', function () { return !_this.active && _this.setFlag(_this.element, 'focus'); });
            this.manager.addEventListener(this.element, 'blur', function () { return !_this.active && _this.clearFlag(_this.element, 'focus'); });
            // Refactor into reusable method (press Active)
            var pressManager_1 = new headless_ui_like_web_component_1.EventManager();
            var pressTarget_1 = { current: null };
            var releasePress_1 = function () {
                pressTarget_1.current = null;
                _this.setPressed(false);
                pressManager_1.release();
            };
            this.manager.addEventListener(this.element, 'pointerup', releasePress_1);
            this.manager.addEventListener(this.element, 'click', releasePress_1);
            this.manager.addEventListener(this.element, 'pointerdown', function (event) {
                pressManager_1.release();
                if (pressTarget_1.current !== null)
                    return;
                pressTarget_1.current = event.currentTarget;
                _this.setPressed(true);
                {
                    var outerElement = (event.target instanceof Node) ? event.target.ownerDocument : document;
                    pressManager_1.addEventListener(outerElement, 'pointerup', releasePress_1, false);
                    pressManager_1.addEventListener(outerElement, 'pointermove', function (event) {
                        if (pressTarget_1.current) {
                            var boundry = (0, headless_ui_like_web_component_1.pointerRectFromPointerEvent)(event);
                            _this.setPressed((0, headless_ui_like_web_component_1.areRectsOverlapping)(boundry, pressTarget_1.current.getBoundingClientRect()));
                        }
                    }, false);
                    pressManager_1.addEventListener(outerElement, 'pointercancel', releasePress_1, false);
                }
            });
        }
    };
    EuiTextarea.prototype.deregister = function () {
        this.manager.release();
    };
    EuiTextarea.prototype.connectedCallback = function () {
        console.log("Custom element added to page.", this);
        this.register();
    };
    EuiTextarea.prototype.disconnectedCallback = function () {
        console.log("Custom element removed from page.", this);
        this.deregister();
    };
    EuiTextarea.prototype.adoptedCallback = function () {
        console.log("Custom element moved to new page.", this);
    };
    EuiTextarea.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        console.log("Attribute ".concat(name, " has changed from ").concat(oldValue, " to ").concat(newValue, "."), this);
    };
    return EuiTextarea;
}(headless_ui_like_web_component_1.HeadlessUiLikeWebComponent));
exports.EuiTextarea = EuiTextarea;
