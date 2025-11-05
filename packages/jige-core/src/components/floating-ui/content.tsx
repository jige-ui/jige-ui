import { autoUpdate } from "@floating-ui/dom";
import { mergeRefs } from "@solid-primitives/refs";
import type { JSX } from "solid-js";
import { onCleanup, onMount, Show, splitProps } from "solid-js";
import { Portal } from "solid-js/web";
import {
  createClickOutside,
  createVisibilityObserver,
  createWatch,
  noop,
} from "solid-tiny-utils";
import { hasAnimation } from "~/common/dom";
import { runSolidEventHandler } from "~/common/solidjs";
import { context } from "./context";

function FloatingContentCore(
  props: {
    zindex?: number;
  } & JSX.HTMLAttributes<HTMLDivElement>
) {
  const [state, actions] = context.useContext();
  const [localProps, otherProps] = splitProps(props, [
    "children",
    "zindex",
    "ref",
    "onMouseEnter",
    "onMouseLeave",
    "onAnimationEnd",
  ]);

  let rootContent!: HTMLDivElement;

  createClickOutside(
    () => state.refContent,
    () => {
      if (state.trigger !== "manual") {
        actions.setOpen(false);
      }
    },
    { ignore: [() => state.refTrigger] }
  );

  const isVisible = createVisibilityObserver(() => state.refTrigger, {
    initialValue: true,
  });

  createWatch(isVisible, (v) => {
    if (!v && state.status.startsWith("open")) {
      actions.setOpen(false);
    }
  });

  let cleanup = noop;

  onMount(() => {
    createWatch(
      () => [state.refTrigger, state.refContent],
      ([refTrigger, refContent]) => {
        if (refTrigger && refContent) {
          cleanup();
          cleanup = autoUpdate(refTrigger, refContent, () => {
            actions.updatePos();
          });
        }
      }
    );

    createWatch(
      () => state.status,
      () => {
        if (state.status.endsWith("ing") && !hasAnimation(rootContent)) {
          actions.setStatus(state.status.replace("ing", "ed") as any);
        }
      }
    );

    createWatch(
      () => state.disabled,
      (d) => {
        if (d) {
          actions.setOpen(false);
        }
      }
    );
  });

  onCleanup(() => {
    cleanup();
  });

  return (
    <div
      ref={(el) => {
        actions.setState("refContent", el);
      }}
      style={{
        transform: `translate3d(${state.x}px, ${state.y}px, 0px)`,
        top: 0,
        left: 0,
        position: "fixed",
        "z-index": localProps.zindex ?? "auto",
        "min-width": "max-content",
        "pointer-events": "auto",
        opacity: state.initialized ? 1 : 0,
      }}
    >
      <div
        {...otherProps}
        data-floating-placement={state.placement}
        data-floating-status={state.status}
        onAnimationEnd={(e) => {
          if (state.status.startsWith("clos")) {
            actions.setStatus("closed");
          }
          if (state.status.startsWith("open")) {
            actions.setStatus("opened");
          }
          runSolidEventHandler(e, localProps.onAnimationEnd);
        }}
        onMouseEnter={(e) => {
          if (state.canHoverContent && state.trigger === "hover") {
            actions.setTimerOpen(true);
          }
          runSolidEventHandler(e, localProps.onMouseEnter);
        }}
        onMouseLeave={(e) => {
          if (state.canHoverContent && state.trigger === "hover") {
            actions.setTimerOpen(false);
          }
          runSolidEventHandler(e, localProps.onMouseLeave);
        }}
        ref={mergeRefs(localProps.ref, (el) => {
          rootContent = el;
        })}
      >
        {localProps.children}
      </div>
    </div>
  );
}

export function Content(
  props: {
    zindex?: number;
  } & JSX.HTMLAttributes<HTMLDivElement>
) {
  const [state] = context.useContext();

  return (
    <Portal mount={document.body}>
      <Show when={state.status !== "closed"}>
        <FloatingContentCore {...props} />
      </Show>
    </Portal>
  );
}
