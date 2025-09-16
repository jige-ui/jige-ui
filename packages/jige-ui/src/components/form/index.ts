import { fieldContext } from "./context";
import { Field } from "./field";
import { FormBase as F } from "./form-base";

export const Form = Object.assign(F, {
  Field,
  useFieldContext: fieldContext.useContext,
});

export * from "./components";
