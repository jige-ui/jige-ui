import type { JSX } from "solid-js/jsx-runtime";
import { Popover } from "../../popover";

export function Wrapper(props: { children: JSX.Element }) {
  return (
    <Popover.Content
      onMouseDown={(e) => {
        e.preventDefault();
      }}
      style={{
        padding: 0,
        border: "1px solid var(--jg-t-border)",
      }}
    >
      {props.children}
    </Popover.Content>
  );
}
