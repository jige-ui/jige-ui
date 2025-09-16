import type { Maybe, MaybePromise } from "@/common/types";
import type { JigeFormValidatorReturn } from "../validator";
import type { FieldValue, FieldValues } from "./field";

/**
 * Value type of the partial field values.
 */
export type PartialValues<TValue> = TValue extends string[] | File[]
  ? TValue
  : TValue extends FieldValue
    ? Maybe<TValue>
    : { [Key in keyof TValue]?: PartialValues<TValue[Key]> };

export type FormOptions<TFieldValues extends FieldValues> = {
  defaultValues?: () => PartialValues<TFieldValues>;
  onSubmit?: (values: TFieldValues) => MaybePromise<void>;
  validate?: {
    [K in keyof TFieldValues]?: (
      value: TFieldValues[K]
    ) => MaybePromise<JigeFormValidatorReturn>;
  };
};
