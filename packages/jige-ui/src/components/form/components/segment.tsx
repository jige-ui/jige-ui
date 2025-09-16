import { FormCore } from "jige-core";
import type { ComponentProps } from "solid-js";
import { Segment } from "../../form-components";

/**
 * Segment component which is already bind with form.
 */
export function FormSegment(
  props: Omit<ComponentProps<typeof Segment>, "onChange" | "value">
) {
  const [fieldState, fieldActs] = FormCore.useField();

  return (
    <Segment
      disabled={fieldState.isDisabled}
      {...props}
      onChange={fieldActs.handleChange}
      value={fieldState.value}
    />
  );
}
