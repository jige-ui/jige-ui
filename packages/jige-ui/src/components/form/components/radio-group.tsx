import { FormCore } from 'jige-core';
import type { ComponentProps } from 'solid-js';
import { RadioGroup } from '../../form-components';

/**
 * Radio group component which is already bind with form.
 */
function Root(
  props: Omit<ComponentProps<typeof RadioGroup>, 'onChange' | 'value'>
) {
  const [fieldState, fieldActs] = FormCore.useField();
  return (
    <RadioGroup
      disabled={fieldState.isDisabled}
      {...props}
      onChange={fieldActs.handleChange}
      value={fieldState.value}
    />
  );
}

export const FormRadioGroup = Object.assign(Root, {
  Item: RadioGroup.Item,
});
