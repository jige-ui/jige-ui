import { ModalCore } from "jige-core";
import type { JSX } from "solid-js/jsx-runtime";

export function Trigger(props: { children: JSX.Element }) {
  return <ModalCore.Trigger>{props.children}</ModalCore.Trigger>;
}
