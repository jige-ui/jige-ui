import { FormCore, RadioGroupCore } from 'jige-core';
import { dataIf } from '~/common/dataset';

export function Item(props: {
  value: string;
  label: string;
  disabled?: boolean;
}) {
  const [state] = RadioGroupCore.useContext();
  const [, fieldCoreActs] = FormCore.useField();
  return (
    <RadioGroupCore.Item disabled={props.disabled} value={props.value}>
      <RadioGroupCore.ItemNative
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
          <div class="jg-radio-group-text">{props.label}</div>
        </div>
      </RadioGroupCore.ItemControl>
    </RadioGroupCore.Item>
  );
}
