"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebComponentGroup = exports.WebComponentRegisterer = void 0;
var registerer_1 = require("./headless-ui-like/registerer");
var WebComponentGroup;
(function (WebComponentGroup) {
    WebComponentGroup[WebComponentGroup["HeadlessUI"] = 1] = "HeadlessUI";
})(WebComponentGroup || (exports.WebComponentGroup = WebComponentGroup = {}));
var WebComponentRegisterer = /** @class */ (function () {
    function WebComponentRegisterer() {
    }
    WebComponentRegisterer.register = function (group) {
        switch (group) {
            case WebComponentGroup.HeadlessUI:
                registerer_1.WebComponents_HeadlessUiLikeRegisterer.register();
                break;
            default:
                throw new Error("Unknown WebComponentGroup: ".concat(group));
        }
    };
    return WebComponentRegisterer;
}());
exports.WebComponentRegisterer = WebComponentRegisterer;
