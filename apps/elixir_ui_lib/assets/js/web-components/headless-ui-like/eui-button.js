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
exports.EuiButton = void 0;
var headless_ui_like_web_component_1 = require("./headless-ui-like-web-component");
var EuiButton = /** @class */ (function (_super) {
    __extends(EuiButton, _super);
    function EuiButton() {
        var _this = _super.call(this) || this;
        _this.button = null;
        _this.disabled = false;
        _this.active = false;
        return _this;
    }
    EuiButton.prototype.button_element = function () {
        return this.querySelector('[role="button"]');
    };
    EuiButton.prototype.setPressed = function (to) {
        if (this.active !== to) {
            this.active = to;
            if (this.button) {
                (this.active) ? this.setFlag(this.button, 'active') : this.clearFlag(this.button, 'active');
            }
        }
    };
    EuiButton.prototype.register = function () {
        var _this = this;
        var _a;
        this.button = (_a = this.button) !== null && _a !== void 0 ? _a : this.button_element();
        if (this.button) {
            this.manager.addEventListener(this.button, 'mouseenter', function () { return _this.setFlag(_this.button, 'hover'); });
            this.manager.addEventListener(this.button, 'mouseleave', function () { return _this.clearFlag(_this.button, 'hover'); });
            // Focus Tracking : crude initial version: focus should only be set by keyboard navigation not mouse clicks.
            this.manager.addEventListener(this.button, 'focus', function () { return !_this.active && _this.setFlag(_this.button, 'focus'); });
            this.manager.addEventListener(this.button, 'blur', function () { return !_this.active && _this.clearFlag(_this.button, 'focus'); });
            // Refactor into reusable method (press Active)
            var pressManager_1 = new headless_ui_like_web_component_1.EventManager();
            var pressTarget_1 = { current: null };
            var releasePress_1 = function () {
                pressTarget_1.current = null;
                _this.setPressed(false);
                pressManager_1.release();
            };
            this.manager.addEventListener(this.button, 'pointerup', releasePress_1);
            this.manager.addEventListener(this.button, 'click', releasePress_1);
            this.manager.addEventListener(this.button, 'pointerdown', function (event) {
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
    EuiButton.prototype.deregister = function () {
        this.manager.release();
    };
    EuiButton.prototype.connectedCallback = function () {
        console.log("Custom element added to page.", this);
        this.register();
    };
    EuiButton.prototype.disconnectedCallback = function () {
        console.log("Custom element removed from page.", this);
        this.deregister();
    };
    EuiButton.prototype.adoptedCallback = function () {
        console.log("Custom element moved to new page.", this);
    };
    EuiButton.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        console.log("Attribute ".concat(name, " has changed from ").concat(oldValue, " to ").concat(newValue, "."), this);
    };
    return EuiButton;
}(headless_ui_like_web_component_1.HeadlessUiLikeWebComponent));
exports.EuiButton = EuiButton;
