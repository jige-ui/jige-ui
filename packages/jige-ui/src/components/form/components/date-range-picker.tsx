import { FormCore } from "jige-core";
import type { ComponentProps } from "solid-js";
import { DateRangePicker } from "../../form-components";

/**
 * Input component which is already bind with form.
 */
export function FormDateRangePicker(
  props: Omit<ComponentProps<typeof DateRangePicker>, "onChange" | "value">
) {
  const [fieldState, fieldActs] = FormCore.useField();

  return (
    <DateRangePicker
      disabled={fieldState.isDisabled}
      onBlur={fieldActs.handleBlur}
      onChange={fieldActs.handleChange}
      value={fieldState.value}
      {...props}
    />
  );
}
