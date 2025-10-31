import css from "sass:./radio.scss";
import { RadioCore } from "jige-core";
import { Show } from "solid-js";
import { dataIf, mountStyle } from "solid-tiny-utils";

export function Radio(props: {
  checked?: boolean;
  label?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  onChange?: (checked: boolean) => void;
}) {
  mountStyle(css, "jige-ui-radio");
  return (
    <RadioCore
      checked={props.checked}
      disabled={props.disabled}
      onChange={props.onChange}
    >
      <RadioCore.Native id={props.id} name={props.name} />
      <RadioCore.Control>
        {(state) => (
          <div
            class="jg-radio"
            data-checked={dataIf(state.checked)}
            data-disabled={dataIf(state.disabled)}
          >
            <button class="jg-radio-circle" type="button" />
            <Show when={props.label}>
              <label class="jg-radio-text" for={props.id}>
                {props.label}
              </label>
            </Show>
          </div>
        )}
      </RadioCore.Control>
    </RadioCore>
  );
}
