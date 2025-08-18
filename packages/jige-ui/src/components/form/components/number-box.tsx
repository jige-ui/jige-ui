import { FormCore } from 'jige-core';
import { NumberBox } from '../../form-components';

/**
 * NumberBox component which is already bind with form.
 */
export function FormNumberBox() {
  const [fieldState, fieldActs] = FormCore.useField();
  return (
    <NumberBox
      onChange={(v: any) => {
        fieldActs.handleChange(v);
      }}
      value={fieldState.value}
    />
  );
}
