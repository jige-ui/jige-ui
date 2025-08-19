import { FormCore } from 'jige-core';
import type { ComponentProps } from 'solid-js';
import { DatePicker } from '../../form-components';

/**
 * Input component which is already bind with form.
 */
export function FormDatePicker(
  props: Omit<ComponentProps<typeof DatePicker>, 'onChange' | 'value'>
) {
  const [fieldState, fieldActs] = FormCore.useField();
  return (
    <DatePicker
      disabled={fieldState.isDisabled}
      onChange={fieldActs.handleChange}
      value={fieldState.value}
      {...props}
    />
  );
}
