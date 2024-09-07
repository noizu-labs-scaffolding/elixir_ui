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
exports.EuiCheckbox = void 0;
var headless_ui_like_web_component_1 = require("./headless-ui-like-web-component");
var EuiCheckbox = /** @class */ (function (_super) {
    __extends(EuiCheckbox, _super);
    function EuiCheckbox() {
        var _this = _super.call(this) || this;
        _this.checkbox = null;
        _this.input = null;
        _this.disabled = false;
        _this.active = false;
        _this.checked = false;
        return _this;
    }
    EuiCheckbox.prototype.checkbox_element = function () {
        return this.querySelector('[role="checkbox"]');
    };
    EuiCheckbox.prototype.hidden_input = function () {
        return this.querySelector('[role="checkbox"] > input[type="hidden"]');
    };
    EuiCheckbox.prototype.toggleChecked = function () {
        this.checked = !this.checked;
        if (this.checkbox) {
            this.checkbox.setAttribute('aria-checked', this.checked ? 'true' : 'false');
            this.checkbox.toggleAttribute('data-checked', this.checked);
            if (this.input) {
                this.input.value = this.checked ? 'true' : 'false';
                this.input.toggleAttribute('checked', this.checked);
                this.triggerPhx(this.input);
            }
        }
    };
    EuiCheckbox.prototype.setPressed = function (to) {
        if (this.active !== to) {
            this.active = to;
            if (this.checkbox) {
                (this.active) ? this.setFlag(this.checkbox, 'active') : this.clearFlag(this.checkbox, 'active');
            }
        }
    };
    EuiCheckbox.prototype.register = function () {
        var _this = this;
        var _a, _b;
        this.checkbox = (_a = this.checkbox) !== null && _a !== void 0 ? _a : this.checkbox_element();
        this.input = (_b = this.input) !== null && _b !== void 0 ? _b : this.hidden_input();
        if (this.checkbox) {
            this.manager.addEventListener(this.checkbox, 'mouseenter', function () { return _this.setFlag(_this.checkbox, 'hover'); });
            this.manager.addEventListener(this.checkbox, 'mouseleave', function () { return _this.clearFlag(_this.checkbox, 'hover'); });
            // Focus Tracking : crude initial version: focus should only be set by keyboard navigation not mouse clicks.
            this.manager.addEventListener(this.checkbox, 'focus', function () { return !_this.active && _this.setFlag(_this.checkbox, 'focus'); });
            this.manager.addEventListener(this.checkbox, 'blur', function () { return !_this.active && _this.clearFlag(_this.checkbox, 'focus'); });
            this.manager.addEventListener(this.checkbox, 'click', function (event) {
                _this.toggleChecked();
            });
            this.manager.addEventListener(this.checkbox, 'keydown', function (event) {
                if (event.key === ' ') {
                    _this.toggleChecked();
                    event.preventDefault();
                }
            });
            // Refactor into reusable method (press Active)
            var pressManager_1 = new headless_ui_like_web_component_1.EventManager();
            var pressTarget_1 = { current: null };
            var releasePress_1 = function () {
                pressTarget_1.current = null;
                _this.setPressed(false);
                pressManager_1.release();
            };
            this.manager.addEventListener(this.checkbox, 'pointerup', releasePress_1);
            this.manager.addEventListener(this.checkbox, 'click', releasePress_1);
            this.manager.addEventListener(this.checkbox, 'pointerdown', function (event) {
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
    EuiCheckbox.prototype.deregister = function () {
        this.manager.release();
    };
    EuiCheckbox.prototype.connectedCallback = function () {
        console.log("Custom element added to page.", this);
        this.register();
    };
    EuiCheckbox.prototype.disconnectedCallback = function () {
        console.log("Custom element removed from page.", this);
        this.deregister();
    };
    EuiCheckbox.prototype.adoptedCallback = function () {
        console.log("Custom element moved to new page.", this);
    };
    EuiCheckbox.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        console.log("Attribute ".concat(name, " has changed from ").concat(oldValue, " to ").concat(newValue, "."), this);
    };
    return EuiCheckbox;
}(headless_ui_like_web_component_1.HeadlessUiLikeWebComponent));
exports.EuiCheckbox = EuiCheckbox;
