import css from "sass:./time-panel.scss";
import { createMemo, Show } from "solid-js";
import { createWatch, list, mountStyle } from "solid-tiny-utils";
import { Button } from "~/components/button";
import { IconFluentCheckmark24Regular } from "~/components/icons/fluent-checkmark-24-regular";
import { IconFluentDismiss24Regular } from "~/components/icons/fluent-dismiss-24-regular";
import { context } from "./context";
import { FakeScrollArea } from "./fake-scroll-area";

export function TimePanel(props: {
  itemHeight: number;
  width: number;
  type: "hour" | "minute" | "second";
  hour?: number;
  minute?: number;
  second?: number;
  onConfirm?: (hour: number, minute: number, second: number) => void;
  onCancel?: () => void;
  onChange?: (hour: number, minute: number, second: number) => void;
}) {
  mountStyle(css, "jige-time-panel");
  const Context = context.initial({
    hour: () => props.hour,
    minute: () => props.minute,
    second: () => props.second,
  });
  const [state, actions] = Context.value;

  const typeIndex = createMemo(() => {
    return ["hour", "minute", "second"].indexOf(props.type);
  });

  createWatch(
    () => [state.hour, state.minute, state.second],
    ([h, m, s]) => {
      props.onChange?.(h, m, s);
    }
  );

  return (
    <Context.Provider>
      <div
        style={{
          width: `${props.width}px`,
          display: "flex",
          "flex-direction": "column",
        }}
      >
        <div style={{ width: "100%", display: "flex", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: `${Math.floor(7 / 2) * props.itemHeight}px`,
              left: "2px",
              right: "2px",
              height: `${props.itemHeight}px`,
              "border-radius": "4px",
              "background-color": "var(--jg-t-hl)",
            }}
          />
          <FakeScrollArea
            itemHeight={props.itemHeight}
            items={list(0, 23).map((v) => ({
              label: v.toString().padStart(2, "0"),
              value: v,
            }))}
            onChange={actions.setHour}
            thumbStyle={{
              display: "none",
            }}
            value={state.hour}
          />
          <Show when={typeIndex() > 0}>
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${props.width / (typeIndex() + 1)}px`,
                width: "1px",
                background: "var(--jg-t-border)",
              }}
            />
            <FakeScrollArea
              itemHeight={props.itemHeight}
              items={list(0, 59).map((v) => ({
                label: v.toString().padStart(2, "0"),
                value: v,
              }))}
              onChange={actions.setMinute}
              thumbStyle={{
                display: "none",
              }}
              value={state.minute}
            />
          </Show>
          <Show when={typeIndex() > 1}>
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${2 * (props.width / (typeIndex() + 1))}px`,
                width: "1px",
                background: "var(--jg-t-border)",
              }}
            />
            <FakeScrollArea
              itemHeight={props.itemHeight}
              items={list(0, 59).map((v) => ({
                label: v.toString().padStart(2, "0"),
                value: v,
              }))}
              onChange={actions.setSecond}
              thumbStyle={{
                display: "none",
              }}
              value={state.second}
            />
          </Show>
        </div>
        <div
          style={{
            display: "flex",
            "justify-content": "space-between",
            padding: "4px",
            "border-top": "1px solid var(--jg-t-border)",
          }}
        >
          <Button
            icon={<IconFluentCheckmark24Regular />}
            onClick={() => {
              props.onConfirm?.(state.hour, state.minute, state.second);
            }}
            size={Math.max(props.width / 5, 24)}
            style={{ width: "100%", "flex-shrink": 1 }}
            variant="text"
          />
          <Button
            icon={<IconFluentDismiss24Regular />}
            onClick={() => {
              props.onCancel?.();
            }}
            size={Math.max(props.width / 5, 24)}
            style={{ width: "100%", "flex-shrink": 1 }}
            variant="text"
          />
        </div>
      </div>
    </Context.Provider>
  );
}
