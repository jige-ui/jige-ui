import { createMemo, Match, Switch } from "solid-js";

import { Button } from "../button";
import { IconFluentCheckmarkCircle24Filled } from "../icons/fluent-checkmark-circle-24-filled";
import { IconFluentDismiss24Regular } from "../icons/fluent-dismiss-24-regular";
import { IconFluentDismissCircle24Filled } from "../icons/fluent-dismiss-circle-24-filled";
import { IconFluentErrorCircle24Filled } from "../icons/fluent-error-circle-24-filled";
import { IconFluentInfo24Filled } from "../icons/fluent-info-24-filled";

export function Header(props: {
  type: "error" | "warning" | "success" | "info";
  title: string;
  onCloseClick: () => void;
}) {
  const color = createMemo(() => {
    switch (props.type) {
      case "error":
        return "var(--jg-fg-danger)";
      default:
        return `var(--jg-fg-${props.type})`;
    }
  });
  return (
    <>
      <div
        style={{
          display: "flex",
          "align-items": "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: color(),
            "font-size": "1.18em",
          }}
        >
          <Switch>
            <Match when={props.type === "error"}>
              <IconFluentDismissCircle24Filled />
            </Match>
            <Match when={props.type === "success"}>
              <IconFluentCheckmarkCircle24Filled />
            </Match>
            <Match when={props.type === "warning"}>
              <IconFluentErrorCircle24Filled />
            </Match>
            <Match when={props.type === "info"}>
              <IconFluentInfo24Filled />
            </Match>
          </Switch>
        </div>
        <div
          style={{
            "margin-left": "8px",
            "font-size": "1.07em",
          }}
        >
          {props.title}
        </div>
      </div>
      <Button
        color="var(--jg-fg4)"
        icon={<IconFluentDismiss24Regular />}
        onClick={() => {
          props.onCloseClick();
        }}
        style={{
          opacity: 0.85,
          "font-size": ".8em",
        }}
        variant="text"
      />
    </>
  );
}
