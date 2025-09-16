import { createWatch } from "solid-tiny-utils";
import type { FieldValues } from "../types/field";
import type { FormOptions } from "../types/form";
import { formContext } from "./context";

export function createForm<T extends FieldValues>(params?: FormOptions<T>) {
  const Context = formContext.initial({
    formData: params?.defaultValues,
  });

  const [, actions, staticData] = Context.value;

  staticData.initialValues = params?.defaultValues?.() || {};

  createWatch(
    () => params?.onSubmit,
    (onSubmit) => {
      staticData.onSubmit = (onSubmit as any) || (() => {});
    }
  );

  createWatch(
    () => ({ ...params?.validate }),
    (validate) => {
      actions.setState("validate", validate || {});
    }
  );

  const form = {
    Provider: Context.Provider,
    context: Context.value as [
      Omit<(typeof Context.value)[0], "formData"> & { formData: T },
      typeof actions,
      typeof staticData,
    ],
  };

  return form;
}
