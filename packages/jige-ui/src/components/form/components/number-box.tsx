import { FormCore } from "jige-core";
import type { ComponentProps } from "solid-js";
import { NumberBox } from "../../form-components";

/**
 * NumberBox component which is already bind with form.
 */
export function FormNumberBox(
  props: Omit<ComponentProps<typeof NumberBox>, "onChange" | "value">
) {
  const [fieldState, fieldActs] = FormCore.useField();

  return (
    <NumberBox
      disabled={fieldState.isDisabled}
      {...props}
      onChange={fieldActs.handleChange}
      value={fieldState.value}
    />
  );
}
