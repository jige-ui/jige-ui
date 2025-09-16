import { createComponentState } from "solid-tiny-context";

const itemContext = createComponentState({
  state: () => ({
    value: "",
    nativeEl: null as HTMLInputElement | null,
    disabled: false,
  }),
});

export default itemContext;
