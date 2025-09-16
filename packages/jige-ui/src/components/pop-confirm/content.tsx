import css from "sass:./pop-confirm.scss";
import { FloatingUiCore } from "jige-core";
import { mergeProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { mountStyle } from "solid-tiny-utils";
import { Button } from "../button";
import { IconFluentErrorCircle24Filled } from "../icons/fluent-error-circle-24-filled";

export function Content(props: {
  title?: string;
  description?: string;
  icon?: JSX.Element;
  cancelText?: string;
  okText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}) {
  mountStyle(css, "jige-ui-pop-confirm");

  const finalProps = mergeProps(
    {
      icon: (
        <div
          style={{
            color: "var(--jg-fg-warning)",
            "margin-right": "4px",
            "font-size": "16px",
          }}
        >
          <IconFluentErrorCircle24Filled />
        </div>
      ),
      cancelText: "取消",
      okText: "确认",
      title: "警告",
      description: "你确定要这么做?",
    },
    props
  );

  const [, popActs] = FloatingUiCore.useContext();
  return (
    <div class="jg-pop-confirm-content">
      <div class="jg-pop-confirm-title">
        {finalProps.icon}
        {finalProps.title}
      </div>
      <div class="jg-pop-confirm-description">{finalProps.description}</div>
      <div class="jg-pop-confirm-actions">
        <Button
          onClick={() => {
            finalProps.onCancel?.();
            popActs.setOpen(false);
          }}
          size={22}
        >
          {finalProps.cancelText}
        </Button>
        <Button
          color="var(--jg-t-hl)"
          onClick={async () => {
            await finalProps.onConfirm?.();
            popActs.setOpen(false);
          }}
          size={22}
        >
          {finalProps.okText}
        </Button>
      </div>
    </div>
  );
}
