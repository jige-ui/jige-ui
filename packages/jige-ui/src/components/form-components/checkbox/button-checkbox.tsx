import css from "sass:./checkbox.scss";
import { CheckboxCore } from "jige-core";
import { createUniqueId } from "solid-js";
import { mountStyle } from "solid-tiny-utils";
import { Button } from "~/components/button";
import type { CheckboxProps } from "./checkbox";

export function ButtonCheckbox(
  props: Omit<CheckboxProps, "indeterminate"> & {
    class?: string;
    label?: string;
  }
) {
  mountStyle(css, "jige-ui-checkbox");
  const itemID = `checkbox__${createUniqueId()}`;

  return (
    <div class="jg-checkbox" data-size={props.size || "medium"}>
      <CheckboxCore
        checked={props.checked}
        disabled={props.disabled}
        onChange={props.onChange}
      >
        <CheckboxCore.Native
          class="jg-checkbox-native"
          id={itemID}
          name={props.name}
        />
        <CheckboxCore.Control>
          {(state) => (
            <Button
              class={props.class}
              color={state.checked ? "var(--jg-t-hl)" : undefined}
              label={props.label}
              size={props.size}
            >
              {props.children}
            </Button>
          )}
        </CheckboxCore.Control>
      </CheckboxCore>
    </div>
  );
}
