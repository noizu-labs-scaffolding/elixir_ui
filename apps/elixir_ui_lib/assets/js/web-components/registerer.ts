import { WebComponents_HeadlessUiLikeRegisterer } from "./headless-ui-like/registerer";

enum WebComponentGroup {
    HeadlessUI = 1
}

class WebComponentRegisterer {
    static register(group: WebComponentGroup) {
        switch (group) {
            case WebComponentGroup.HeadlessUI:
                WebComponents_HeadlessUiLikeRegisterer.register();
                break;
            default:
                throw new Error(`Unknown WebComponentGroup: ${group}`);
        }
    }
}

export { WebComponentRegisterer, WebComponentGroup };
