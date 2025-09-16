import { FormCore } from "jige-core";
import type { JigeInputProps } from "~/components/form-components/input/types";
import { Input } from "../../form-components";

/**
 * Input component which is already bind with form.
 */
export function FormInput(props: Omit<JigeInputProps, "onChange" | "value">) {
  const [fieldState, fieldActs] = FormCore.useField();

  return (
    <Input
      disabled={fieldState.isDisabled}
      {...props}
      onChange={(v: any) => {
        fieldActs.handleChange(v);
      }}
      value={fieldState.value}
    />
  );
}
