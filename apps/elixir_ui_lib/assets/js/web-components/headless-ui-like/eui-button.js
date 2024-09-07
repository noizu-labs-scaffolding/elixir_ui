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
        return _this;
    }
    //----------------------------------
    // Event Handlers
    //----------------------------------
    EuiButton.prototype.handleClick = function (event) {
        console.log("Button clicked!", event);
    };
    EuiButton.prototype.setHoverFlag = function (event) {
        console.log("Event", event);
        if (event.target instanceof Element) {
            EuiButton.setFlag(event.target, 'hover');
        }
    };
    EuiButton.prototype.clearHoverFlag = function (event) {
        if (event.target instanceof Element) {
            EuiButton.clearFlag(event.target, 'hover');
        }
    };
    EuiButton.prototype.setFocusFlag = function (event) {
        if (event.target instanceof Element) {
            EuiButton.setFlag(event.target, 'focus');
        }
    };
    EuiButton.prototype.clearFocusFlag = function (event) {
        if (event.target instanceof Element) {
            EuiButton.clearFlag(event.target, 'focus');
        }
    };
    EuiButton.prototype.setActiveFlag = function (event) {
        if (event.target instanceof Element) {
            EuiButton.setFlag(event.target, 'active');
        }
    };
    EuiButton.prototype.clearActiveFlag = function (event) {
        if (event.target instanceof Element) {
            EuiButton.clearFlag(event.target, 'active');
        }
    };
    EuiButton.prototype.register = function () {
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
    };
    EuiButton.prototype.deregister = function () {
        if (this.button) {
            this.button.removeEventListener('mouseenter', this.setHoverFlag);
            this.button.removeEventListener('mouseleave', this.clearHoverFlag);
            this.button.removeEventListener('focus', this.setFocusFlag);
            this.button.removeEventListener('blur', this.clearFocusFlag);
            this.button.removeEventListener('mousedown', this.setActiveFlag);
            this.button.removeEventListener('mouseup', this.clearActiveFlag);
            this.button = null;
        }
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
