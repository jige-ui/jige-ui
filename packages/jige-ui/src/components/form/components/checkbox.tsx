import { FormCore } from "jige-core";
import type { ComponentProps } from "solid-js";
import { Checkbox } from "../../form-components";

/**
 * Checkbox component which is already bind with form.
 */
export function FormCheckbox(
  props: Omit<ComponentProps<typeof Checkbox>, "onChange" | "checked">
) {
  const [fieldState, fieldActs] = FormCore.useField();

  return (
    <Checkbox
      disabled={fieldState.isDisabled}
      {...props}
      checked={fieldState.value}
      onChange={fieldActs.handleChange}
    />
  );
}
