import { FormCore } from 'jige-core';
import { Input } from '../../form-components';

/**
 * Input component which is already bind with form.
 */
export function FormInput(props: { type?: 'text' | 'password' | 'textarea' }) {
  const [fieldState, fieldActs] = FormCore.useField();
  return (
    <Input
      onChange={(v: any) => {
        fieldActs.handleChange(v);
      }}
      type={props.type}
      value={fieldState.value}
    />
  );
}
