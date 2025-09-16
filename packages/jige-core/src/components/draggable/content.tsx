import { mergeRefs } from "@solid-primitives/refs";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { combineStyle } from "@/common/dom";
import { context } from "./context";

export function Content(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [state, actions] = context.useContext();
  const [localProps, otherProps] = splitProps(props, ["style", "ref"]);

  return (
    <div
      {...otherProps}
      ref={mergeRefs(localProps.ref, (el) =>
        actions.setState("targetElement", el)
      )}
      style={combineStyle(
        {
          transform: `translate(${state.deltaX}px, ${state.deltaY}px)`,
        },
        localProps.style
      )}
    />
  );
}
