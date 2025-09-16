import type { JSX } from "solid-js/jsx-runtime";
import { createWatch } from "solid-tiny-utils";
import { isUndefined } from "@/common/types";
import { context, GlobalModalStore } from "./context";

export function Root(props: {
  children: JSX.Element;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  preventScroll?: boolean;
  closeOnClickMask?: boolean;
  closeOnEsc?: boolean;
}) {
  const Context = context.initial({
    preventScroll: () => props.preventScroll,
    closeOnClickMask: () => props.closeOnClickMask,
    closeOnEsc: () => props.closeOnEsc,
  });
  const [state, actions] = Context.value;

  const [globalState] = GlobalModalStore;

  createWatch(
    () => props.open,
    (open) => {
      if (isUndefined(open)) {
        return;
      }
      actions.setOpen(open);
    }
  );

  createWatch(
    () => state.status,
    (status) => {
      if (status === "closed") {
        props.onOpenChange?.(false);
      }
      if (status === "opened") {
        props.onOpenChange?.(true);
      }
    }
  );

  createWatch([() => state.preventScroll, () => state.status], ([p, s]) => {
    const shouldPrevent = p && s.startsWith("open");

    actions.preventBodyScroll(shouldPrevent);
  });

  createWatch(
    () => globalState.closeAll,
    (closeAll) => {
      if (closeAll) {
        actions.setOpen(false);
      }
    }
  );

  return <Context.Provider>{props.children}</Context.Provider>;
}
