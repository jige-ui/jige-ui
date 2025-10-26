import type { JSX } from "solid-js";
import { splitProps } from "solid-js";
import type { DOMElement } from "solid-js/jsx-runtime";
import { createWatch } from "solid-tiny-utils";
import context from "./context";

export default function Root(
  props: {
    children: JSX.Element;
    height?: string;
    maxHeight?: string;
    onBarChange?: (scrollEl: HTMLElement) => void;
    onMouseEnter?: (
      e: MouseEvent & {
        currentTarget: HTMLDivElement;
        target: DOMElement;
      }
    ) => void;
  } & Omit<JSX.HTMLAttributes<HTMLDivElement>, "style" | "onMouseEnter">
) {
  const Context = context.initial({
    height: () => props.height,
    maxHeight: () => props.maxHeight,
  });
  const [state, actions, nowrapData] = Context.value;
  const [local, others] = splitProps(props, [
    "children",
    "height",
    "maxHeight",
    "onScroll",
    "onScrollEnd",
    "onBarChange",
  ]);

  createWatch(
    () => local.onBarChange,
    () => {
      nowrapData.onBarChange = local.onBarChange || null;
    }
  );

  return (
    <Context.Provider>
      <div
        {...others}
        onMouseEnter={(e) => {
          actions.setValue();
          others.onMouseEnter?.(e);
        }}
        style={{
          overflow: "hidden",
          position: "relative",
          height: state.height,
          "max-height": state.maxHeight,
        }}
      >
        {local.children}
      </div>
    </Context.Provider>
  );
}
