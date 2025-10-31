import styles from "sass:./switcher.scss";
import { CheckboxCore } from "jige-core";
import { createUniqueId, type JSX } from "solid-js";
import { mountStyle } from "solid-tiny-utils";
import { dataIf } from "~/common/dataset";

export function Switcher(props: {
  onChange?: (checked: boolean) => void;
  value?: boolean;
  disabled?: boolean;
  children?: JSX.Element;
  size?: "small" | "medium" | "large";
}) {
  mountStyle(styles, "jige-ui-switcher");
  const labelFor = `switcher-${createUniqueId()}`;

  return (
    <div class="jg-switcher" data-size={props.size || "medium"}>
      <CheckboxCore
        checked={props.value}
        disabled={props.disabled}
        onChange={props.onChange}
      >
        <CheckboxCore.Native class="jg-switcher-native" id={labelFor} />
        <CheckboxCore.Control>
          {(state) => (
            <div
              class="jg-switcher-control"
              data-disabled={dataIf(state.disabled)}
            >
              <div
                class="jg-switcher-thumb"
                data-checked={dataIf(state.checked)}
              />
            </div>
          )}
        </CheckboxCore.Control>
        <label
          for={labelFor}
          style={{
            "margin-left": "0.5em",
          }}
        >
          {props.children}
        </label>
      </CheckboxCore>
    </div>
  );
}
