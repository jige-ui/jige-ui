import scrollCss from "sass:./scrollbar.scss";
import { runSolidEventHandler, ScrollbarCore } from "jige-core";
import type { JSX } from "solid-js";
import { createMemo, createSignal, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { mountStyle } from "solid-tiny-utils";

function GmScrollBar(props: {
  type: "vertical" | "horizontal";
  hidden: boolean;
  position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    "z-index"?: number;
  };
  color?: string;
}) {
  const state = ScrollbarCore.useContext()[0];
  const isVertical = createMemo(() => props.type === "vertical");
  const classes = createMemo(() => {
    const base = ["jg-scrollbar"];
    if (isVertical()) {
      base.push("jg-scrollbar-vertical");
    } else {
      base.push("jg-scrollbar-horizontal");
    }

    if (props.hidden) {
      base.push("is-hidden");
    }
    if (state.isDragging) {
      base.push("is-dragging");
    }
    return base.join(" ");
  });
  const pos = createMemo(() => {
    if (isVertical()) {
      return { top: "2px", right: "2px", bottom: "2px", ...props.position };
    }
    return { left: "2px", right: "12px", bottom: "2px", ...props.position };
  });
  return (
    <ScrollbarCore.Bar class={classes()} style={pos()} type={props.type}>
      <ScrollbarCore.Thumb
        class="jg-scrollbar-thumb"
        style={{ background: props.color || "var(--jg-fg4)" }}
        type={props.type}
      />
    </ScrollbarCore.Bar>
  );
}

export function Scrollbar(props: {
  children: JSX.Element;
  color?: string;
  hideVertical?: boolean;
  verticalPos?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    "z-index"?: number;
  };
  horizontalPos?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    "z-index"?: number;
  };
  hideHorizontal?: boolean;
  class?: string;
  height?: string;
  maxHeight?: string;
  always?: boolean;
  onScroll?: JSX.EventHandlerUnion<HTMLDivElement, Event>;
  onClick?: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>;
  contentStyle?: string | JSX.CSSProperties;
  scrollRef?: (val: HTMLDivElement) => void;
  onScrollBarChange?: (scrollEl: HTMLElement) => void;
  showMask?: boolean;
}) {
  mountStyle(scrollCss, "jige-ui-scrollbar");
  const [hidden, setHidden] = createSignal(true);

  const [maskFade, setMaskFade] = createStore({
    top: false,
    bottom: false,
  });

  const handleMask = (scrollEl: HTMLElement) => {
    const { scrollTop, scrollHeight, clientHeight } = scrollEl;
    if (scrollTop > 0) {
      setMaskFade("top", true);
    } else {
      setMaskFade("top", false);
    }
    if (scrollTop + clientHeight < scrollHeight) {
      setMaskFade("bottom", true);
    } else {
      setMaskFade("bottom", false);
    }
  };

  const maskFadeType = createMemo(() => {
    if (!props.showMask) {
      return undefined;
    }
    if (maskFade.top && maskFade.bottom) {
      return "both";
    }
    if (maskFade.top) {
      return "top";
    }
    if (maskFade.bottom) {
      return "bottom";
    }
    return undefined;
  });

  return (
    <ScrollbarCore
      class={props.class}
      height={props.height}
      maxHeight={props.maxHeight}
      onBarChange={(el) => {
        handleMask(el);
        props.onScrollBarChange?.(el);
      }}
      onClick={props.onClick}
      onMouseEnter={() => {
        !props.always && setHidden(false);
      }}
      onMouseLeave={() => {
        !props.always && setHidden(true);
      }}
    >
      <ScrollbarCore.ScrollArea
        class="jg-scroll-area"
        data-mask={maskFadeType()}
        onScroll={(e) => {
          runSolidEventHandler(e, props.onScroll);
        }}
        ref={(el) => {
          props.scrollRef?.(el);
        }}
      >
        <ScrollbarCore.Content style={props.contentStyle}>
          {props.children}
        </ScrollbarCore.Content>
      </ScrollbarCore.ScrollArea>
      <Show when={!props.hideVertical}>
        <GmScrollBar
          color={props.color}
          hidden={hidden()}
          position={props.verticalPos}
          type="vertical"
        />
      </Show>

      <Show when={!props.hideHorizontal}>
        <GmScrollBar
          color={props.color}
          hidden={hidden()}
          position={props.horizontalPos}
          type="horizontal"
        />
      </Show>
    </ScrollbarCore>
  );
}
