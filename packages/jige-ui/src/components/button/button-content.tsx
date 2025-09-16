import { children, Show } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { createWatch } from "solid-tiny-utils";
import { context } from "./context";

export function ButtonContent(props: {
  children?: JSX.Element;
  icon?: JSX.Element;
  label?: string;
}) {
  const [state, actions] = context.useContext();
  const child = children(() => props.children);
  const icon = children(() => props.icon);

  createWatch([() => props.label, () => child()], ([label, childElement]) => {
    actions.setState("iconOnly", !(label || childElement));
  });

  return (
    <div
      class="jg-btn-content"
      style={{
        opacity: state.loading ? 0 : 1,
      }}
    >
      <Show
        fallback={
          <>
            <Show when={icon()}>
              <div
                class="jg-btn-icon"
                style={{
                  "margin-right": props.label ? "0.375em" : "0",
                }}
              >
                {icon()}
              </div>
            </Show>
            <Show when={props.label}>
              <span>{props.label}</span>
            </Show>
          </>
        }
        when={child()}
      >
        {child()}
      </Show>
    </div>
  );
}
