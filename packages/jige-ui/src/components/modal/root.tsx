import css from "sass:./modal.scss";
import { ModalCore } from "jige-core";
import type { JSX } from "solid-js/jsx-runtime";
import { mountStyle } from "solid-tiny-utils";
import { context } from "./context";

export function Root(props: {
  children: JSX.Element;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  preventScroll?: boolean;
  closeOnClickMask?: boolean;
  closeOnEsc?: boolean;
}) {
  mountStyle(css, "jige-ui-modal");
  const Context = context.initial();
  return (
    <Context.Provider>
      <ModalCore {...props} />
    </Context.Provider>
  );
}
