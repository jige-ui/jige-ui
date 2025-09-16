import { FormCore } from "jige-core";
import type { ComponentProps } from "solid-js";
import { Switcher } from "../../form-components";

/**
 * Switcher component which is already bind with form.
 */
export function FormSwitcher(
  props: Omit<ComponentProps<typeof Switcher>, "onChange" | "value">
) {
  const [fieldState, fieldActs] = FormCore.useField();

  return (
    <Switcher
      disabled={fieldState.isDisabled}
      {...props}
      onChange={(v: any) => {
        fieldActs.handleChange(v);
      }}
      value={fieldState.value}
    />
  );
}
