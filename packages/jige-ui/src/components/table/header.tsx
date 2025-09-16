import { createElementBounds } from "@solid-primitives/bounds";
import { TableCore } from "jige-core";
import type { ComponentProps } from "solid-js";
import { createWatch } from "solid-tiny-utils";
import { context } from "./context";

export function Header(props: ComponentProps<"thead">) {
  const [state, acts] = context.useContext();

  const bounds = createElementBounds(() => state.refHeader);

  createWatch(
    () => bounds.height,
    (h) => {
      acts.setState("headerHeight", h || 0);
    }
  );

  return (
    <div
      ref={(el) => {
        acts.setState("refHeader", el);
      }}
      style={{
        overflow: "hidden",
      }}
    >
      <TableCore.Header {...props} />
    </div>
  );
}
