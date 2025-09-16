import { FormCore } from "jige-core";
import type { ComponentProps } from "solid-js";
import { CheckboxGroup } from "../../form-components";

/**
 * Checkbox group component which is already bind with form.
 */
function Root(
  props: Omit<ComponentProps<typeof CheckboxGroup>, "onChange" | "value">
) {
  const [fieldState, fieldActs] = FormCore.useField();
  return (
    <CheckboxGroup
      disabled={fieldState.isDisabled}
      {...props}
      onChange={fieldActs.handleChange}
      value={fieldState.value}
    />
  );
}

export const FormCheckboxGroup = Object.assign(Root, {
  Item: CheckboxGroup.Item,
});
