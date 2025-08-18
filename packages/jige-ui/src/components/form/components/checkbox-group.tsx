import { FormCore } from 'jige-core';
import { CheckboxGroup } from '../../form-components';

/**
 * Checkbox group component which is already bind with form.
 */
export function FormCheckboxGroup() {
  const [fieldState, fieldActs] = FormCore.useField();
  return (
    <CheckboxGroup
      onChange={(v: any) => {
        fieldActs.handleChange(v);
      }}
      value={fieldState.value}
    />
  );
}
