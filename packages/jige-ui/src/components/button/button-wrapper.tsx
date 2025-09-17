import { combineStyle } from "jige-core";
import { createMemo, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { dataIf } from "~/common/dataset";

import { context } from "./context";
import type { ButtonElement, ButtonSize } from "./types";

export function ButtonWrapper<T = string | undefined>(
  props: {
    href: T;
    onClick?: (e: MouseEvent) => void | Promise<void>;
    size: ButtonSize;
  } & ButtonElement<T>
) {
  const [local, others] = splitProps(props, [
    "onClick",
    "size",
    "style",
    "class",
  ]);
  const [state, actions] = context.useContext();
  const isAnchor = createMemo(() => {
    return !!props.href;
  });

  const finalClasses = createMemo(() => {
    const classes = ["jg-btn", `jg-btn-${state.variant}`];

    if (state.iconOnly) {
      classes.push("jg-btn-icon-only");
    }
    if (props.class) {
      classes.push(props.class);
    }

    return classes.join(" ");
  });

  const fontSize = createMemo(() => {
    const size = props.size;

    if (typeof size === "number") {
      return `${size / 4 + 6}px`;
    }

    switch (size) {
      case "small":
        return "13px";
      case "large":
        return "16px";
      case "medium":
        return "14px";
      default:
        return "14px";
    }
  });

  const thisHeight = createMemo(() => {
    const size = props.size;
    if (state.variant === "solid" || state.variant === "text") {
      if (size === "small") {
        return "24px";
      }
      if (size === "large") {
        return "40px";
      }
      if (typeof size === "number") {
        return `${size}px`;
      }
      return "32px";
    }

    return "initial";
  });

  return (
    <Dynamic
      {...others}
      class={[finalClasses(), local.class].join(" ")}
      // biome-ignore lint/suspicious/noExplicitAny: dynamic component type
      component={(isAnchor() ? "a" : "button") as any}
      data-disabled={dataIf(state.disabled)}
      data-loading={dataIf(state.loading)}
      disabled={state.disabled}
      onClick={(e: MouseEvent) => {
        if (state.loading || isAnchor() || state.disabled) {
          return;
        }
        if (local.onClick) {
          const doClick = async () => {
            actions.setState("loading", true);
            try {
              if (local.onClick) {
                await local.onClick(e);
              }
            } finally {
              actions.setState("loading", false);
            }
          };
          doClick();
        }
      }}
      style={combineStyle(
        {
          "--jg-btn-fg": state.color ? "white" : "var(--jg-fg2)",
          "--jg-btn-bg": state.color || "var(--jg-t-bg1)",
          "--jg-btn-link-fg": state.color || "var(--jg-fg-link)",
          "--jg-btn-text-fg": state.color || "var(--jg-fg2)",
          "--jg-height": thisHeight(),
          "--jg-font-size": fontSize(),
        },
        local.style
      )}
    />
  );
}
