import { createComponentState } from "solid-tiny-context";

export const context = createComponentState({
  state: () => ({
    checked: false,
    nativeEl: null as HTMLInputElement | null,
    disabled: false,
  }),
});
