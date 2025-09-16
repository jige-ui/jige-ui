import css from "sass:./tooltip.scss";
import aniFloatCss from "sass:../../styles/common/ani-floating-ui.scss";
import { FloatingUiCore } from "jige-core";
import type { JSX } from "solid-js/jsx-runtime";

import { mountStyle } from "solid-tiny-utils";
import { RootContext } from "../root/context";

export function Tooltip(props: {
  content: string;
  children: JSX.Element;
  /**
   * @default 350
   */
  openDelay?: number;
  closeDelay?: number;
  placement?: "top" | "bottom" | "left" | "right";
  zIndex?: number;
  trigger?: "hover" | "click";
  disabled?: boolean;
}) {
  mountStyle(css, "jige-ui-tooltip");
  mountStyle(aniFloatCss, "jige-ui-ani-floating-ui");
  const [state] = RootContext.useContext();
  return (
    <FloatingUiCore
      closeDelay={props.closeDelay}
      disabled={props.disabled}
      openDelay={props.openDelay || 350}
      placement={props.placement}
      trigger={props.trigger}
    >
      <FloatingUiCore.Trigger>{props.children}</FloatingUiCore.Trigger>
      <FloatingUiCore.Content
        class="jg-tooltip-content ani-floating-ui-move"
        zindex={props.zIndex || state.zIndexConfig.tooltip}
      >
        {props.content}
      </FloatingUiCore.Content>
    </FloatingUiCore>
  );
}
