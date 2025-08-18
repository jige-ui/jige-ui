import { FormCore } from 'jige-core';
import { Switcher } from '../../form-components';

/**
 * Switcher component which is already bind with form.
 */
export function FormSwitcher(props: { type?: 'checkbox' | 'switcher' }) {
  const [fieldState, fieldActs] = FormCore.useField();
  return (
    <Switcher
      onChange={(v: any) => {
        fieldActs.handleChange(v);
      }}
      type={props.type}
      value={fieldState.value}
    />
  );
}
