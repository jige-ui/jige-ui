import type { JSX } from "solid-js";

export function Root(props: { children: JSX.Element }) {
  return (
    <div class="b b-t-border m-1 flex rounded-md p-1">{props.children}</div>
  );
}
