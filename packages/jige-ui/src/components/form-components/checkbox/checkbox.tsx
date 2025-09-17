import css from "sass:./checkbox.scss";
import { SwitcherCore } from "jige-core";
import { createUniqueId, type JSX, Show } from "solid-js";
import { dataIf, mountStyle } from "solid-tiny-utils";
import { IconFluentCheckmark12Filled } from "~/components/icons/fluent-checkmark-12-filled";
import { IconFluentSquare12Filled } from "~/components/icons/fluent-square-12-filled";

export type CheckboxProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  indeterminate?: boolean;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  children?: JSX.Element;
  name?: string;
};

export function NormalCheckbox(props: CheckboxProps) {
  mountStyle(css, "jige-ui-checkbox");
  const itemID = `checkbox__${createUniqueId()}`;

  return (
    <div class="jg-checkbox" data-size={props.size || "medium"}>
      <SwitcherCore
        checked={props.checked}
        disabled={props.disabled}
        onChange={props.onChange}
      >
        <SwitcherCore.Native
          class="jg-checkbox-native"
          id={itemID}
          name={props.name}
        />
        <SwitcherCore.Control>
          {(state) => (
            <>
              <div
                class="jg-checkbox-control"
                data-checked={dataIf(state.checked)}
                data-disabled={dataIf(state.disabled)}
                data-indeterminate={dataIf(Boolean(props.indeterminate))}
              >
                <Show when={state.checked && !props.indeterminate}>
                  <i
                    class="jg-checkbox-icon"
                    style={{
                      color: "var(--jg-t-bg1)",
                    }}
                  >
                    <IconFluentCheckmark12Filled />
                  </i>
                </Show>
                <Show when={props.indeterminate}>
                  <i
                    class="jg-checkbox-icon"
                    style={{
                      color: "var(--jg-t-hl)",
                    }}
                  >
                    <IconFluentSquare12Filled />
                  </i>
                </Show>
              </div>
              <label
                for={itemID}
                style={{
                  "margin-left": ".5em",
                  opacity: state.disabled ? 0.5 : 1,
                }}
              >
                {props.children}
              </label>
            </>
          )}
        </SwitcherCore.Control>
      </SwitcherCore>
    </div>
  );
}
