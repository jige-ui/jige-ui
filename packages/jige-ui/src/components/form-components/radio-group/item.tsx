import { FormCore, RadioGroupCore } from 'jige-core';
import { createUniqueId } from 'solid-js';
import { dataIf } from '~/common/dataset';

export function Item(props: {
  value: string;
  label: string;
  disabled?: boolean;
}) {
  const [state] = RadioGroupCore.useContext();
  const [, fieldCoreActs] = FormCore.useField();
  const itemID = `radio_item__${createUniqueId()}`;
  return (
    <RadioGroupCore.Item disabled={props.disabled} value={props.value}>
      <RadioGroupCore.ItemNative
        id={itemID}
        onBlur={() => {
          fieldCoreActs.handleBlur?.();
        }}
      />
      <RadioGroupCore.ItemControl>
        <div
          class="jg-radio-group-item"
          data-checked={dataIf(state.value === props.value)}
          data-disabled={dataIf(state.disabled || props.disabled)}
        >
          <button class="jg-radio-group-circle" type="button" />
          <label class="jg-radio-group-text" for={itemID}>
            {props.label}
          </label>
        </div>
      </RadioGroupCore.ItemControl>
    </RadioGroupCore.Item>
  );
}
