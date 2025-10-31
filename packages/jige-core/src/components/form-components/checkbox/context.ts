import { createComponentState } from "solid-tiny-context";

export const context = createComponentState({
  state: () => ({
    checked: false,
    disabled: false,
    focused: false,
    active: false,
    $nativeEl: null as HTMLInputElement | null,
  }),
});
