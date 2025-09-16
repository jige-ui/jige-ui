import { createComponentState } from "solid-tiny-context";

export const context = createComponentState({
  state: () => ({
    contentRef: null as HTMLElement | null,
    triggerRef: null as HTMLElement | null,
  }),
});

export const useModalContext = context.useContext;
