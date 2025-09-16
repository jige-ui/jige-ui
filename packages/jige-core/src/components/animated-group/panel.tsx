import { mergeRefs } from "@solid-primitives/refs";
import { createSignal, onCleanup, onMount, Show, splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { createWatch, makeEventListener } from "solid-tiny-utils";
import { getElementHeight, hasAnimation, uiRefreshDo } from "@/common/dom";
import type { CloseableStatus } from "@/common/types";
import context from "./context";

type ContentProps = { key: string } & JSX.HTMLAttributes<HTMLDivElement>;

function ContentCore(props: ContentProps) {
  const [state, actions] = context.useContext();
  const [status, setStatus] = createSignal<CloseableStatus>("closed");
  const [localProps, otherProps] = splitProps(props, ["ref", "key"]);
  let ref!: HTMLDivElement;

  onMount(() => {
    makeEventListener(ref, "animationend", () => {
      setStatus(status().replace("ing", "ed") as CloseableStatus);
    });

    createWatch(
      () => localProps.key,
      (_, prev) => {
        const h = getElementHeight(ref);
        actions.setState("refHeights", localProps.key, h);
        if (prev) {
          const newRefHeights = { ...state.refHeights };
          delete newRefHeights[prev];
          actions.setState("refHeights", newRefHeights);
        }
      }
    );

    createWatch(
      () => state.tryClose,
      (v) => {
        if (v === localProps.key) {
          setStatus("closing");
          uiRefreshDo(() => {
            if (!hasAnimation) {
              setStatus("closed");
            }
          });
        }
      }
    );

    createWatch(
      () => state.tryOpen,
      (v) => {
        if (v === localProps.key) {
          setStatus("opening");
          uiRefreshDo(() => {
            if (!hasAnimation) {
              setStatus("opened");
            }
          });
        }
      }
    );

    createWatch(status, (s) => {
      if (s === "opened") {
        actions.setState({
          height: "",
          maxHeight: "",
          active: localProps.key,
          tryOpen: "",
        });
      }

      if (s === "closed") {
        actions.setState("tryClose", "");
      }

      const h = state.refHeights[localProps.key];
      if (s === "closing") {
        actions.setState({
          maxHeight: `${h}px`,
          height: `${state.contentHeight}px`,
        });
      }

      if (s === "opening") {
        requestAnimationFrame(() => {
          actions.setState({
            maxHeight: `${h}px`,
            height: `${state.contentHeight}px`,
          });
        });
      }
    });
  });

  onCleanup(() => {
    // @ts-expect-error xxx
    actions.setState("refHeights", localProps.key, undefined);
  });

  return (
    <div
      {...otherProps}
      data-ag-status={status()}
      ref={mergeRefs(localProps.ref, (r) => {
        ref = r;
      })}
      style={{
        position: status().endsWith("ing") ? "absolute" : "relative",
        top: 0,
        left: 0,
        right: 0,
      }}
    />
  );
}

export function Panel(props: ContentProps) {
  const [state] = context.useContext();
  return (
    <Show
      when={
        state.active === props.key ||
        state.tryOpen === props.key ||
        state.tryClose === props.key
      }
    >
      <ContentCore {...props} />
    </Show>
  );
}
