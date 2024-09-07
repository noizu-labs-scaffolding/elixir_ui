import {HeadlessUiLikeWebComponent} from "./";
import {
    EuiButton,
    EuiCheckbox,
    EuiCombobox,
    EuiDialog,
    EuiDisclosure,
    EuiDropdownMenu,
    EuiFieldset,
    EuiInput,
    EuiListbox,
    EuiPopover,
    EuiRadioGroup,
    EuiSelect,
    EuiSwitch,
    EuiTabs,
    EuiTextarea,
    EuiTransition} from "./";

class WebComponents_HeadlessUiLikeRegisterer {
    static register() {

        customElements.define('eui-button', EuiButton);
        customElements.define('eui-checkbox', EuiCheckbox);
        customElements.define('eui-combobox', EuiCombobox);
        customElements.define('eui-fieldset', EuiFieldset);
        customElements.define('eui-input', EuiInput);
        customElements.define('eui-listbox', EuiListbox);
        customElements.define('eui-radio-group', EuiRadioGroup);
        customElements.define('eui-select', EuiSelect);
        customElements.define('eui-switch', EuiSwitch);
        customElements.define('eui-textarea', EuiTextarea);

        customElements.define('eui-dropdown-menu', EuiDropdownMenu);
        customElements.define('eui-disclosure', EuiDisclosure);
        customElements.define('eui-dialog', EuiDialog);
        customElements.define('eui-popover', EuiPopover);
        customElements.define('eui-tabs', EuiTabs);
        customElements.define('eui-transition', EuiTransition);

    }
}

export {WebComponents_HeadlessUiLikeRegisterer};
