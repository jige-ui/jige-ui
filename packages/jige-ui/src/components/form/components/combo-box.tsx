import { FormCore } from 'jige-core';
import { ComboBox } from '../../form-components';

/**
 * Combo-box component which is already bind with form.
 */
export function FormComboBox<T>(props: {
  options: (T | { label: string; value: T })[];
}) {
  const [fieldState, fieldActs] = FormCore.useField();
  return (
    <ComboBox
      onChange={(v: any) => {
        fieldActs.handleChange(v);
      }}
      options={props.options}
      value={fieldState.value}
    />
  );
}
