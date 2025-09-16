import { FormCore } from "jige-core";
import type { ComponentProps } from "solid-js";
import { Slider } from "../../form-components";

/**
 * Slider component which is already bind with form.
 */
export function FormSlider(
  props: Omit<ComponentProps<typeof Slider>, "onChange" | "value">
) {
  const [fieldState, fieldActs] = FormCore.useField();

  return (
    <Slider
      disabled={fieldState.isDisabled}
      {...props}
      onChange={fieldActs.handleChange}
      value={fieldState.value}
    />
  );
}
