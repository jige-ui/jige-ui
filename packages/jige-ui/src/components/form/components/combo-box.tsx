import { FormCore } from "jige-core";
import type { ComponentProps } from "solid-js";
import type { SimpleType } from "~/common/types";
import { ComboBox } from "../../form-components";

/**
 * Combo-box component which is already bind with form.
 */
export function FormComboBox<T extends SimpleType>(
  props: Omit<ComponentProps<typeof ComboBox<T>>, "onChange" | "value">
) {
  const [fieldState, fieldActs] = FormCore.useField();

  return (
    <ComboBox
      disabled={fieldState.isDisabled}
      {...props}
      onChange={fieldActs.handleChange}
      value={fieldState.value}
    />
  );
}
