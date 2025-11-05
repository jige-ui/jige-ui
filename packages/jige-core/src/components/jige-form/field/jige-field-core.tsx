import { type JSX, mergeProps, onCleanup, onMount } from "solid-js";
import { createWatch } from "solid-tiny-utils";
import { callMaybeCallableChild } from "~/common/props";
import { formContext } from "../form/context";
import { getValueFromPath } from "../utils";
import type { JigeFormAsyncValidator, JigeFormValidator } from "../validator";
import { FieldContext } from "./context";
import { createFieldContext } from "./field-context";

export type JigeFieldCoreProps = {
  name: string;
  validateDebounceMs?: number;
  // default is true
  keepState?: boolean;
  validators?: (JigeFormValidator | JigeFormAsyncValidator)[];
  validateOn?: "change" | "blur";
  validateRelatedFields?: string[];
  children:
    | JSX.Element
    | ((
        state: ReturnType<typeof createFieldContext>[0],
        actions: ReturnType<typeof createFieldContext>[1]
      ) => JSX.Element);
};

function FieldCore(props: JigeFieldCoreProps) {
  const realProps = mergeProps(
    {
      keepState: true,
      validateRelatedFields: [] as string[],
    },
    props
  );

  const [, formActs, formStatic] = formContext.useContext();

  const context = createFieldContext(() => realProps.name, {
    validateDebounceMs: () => realProps.validateDebounceMs || 50,
    validateOn: () => realProps.validateOn || "change",
    validators: () => realProps.validators || [],
    validateFirst: () => true,
  });

  onMount(() => {});

  onCleanup(() => {
    formActs.clearState(realProps.name);
  });

  createWatch(
    () => context[0].value,
    (v) => {
      if (v !== getValueFromPath(formStatic.initialValues, realProps.name)) {
        formActs.setState("dirtyFields", realProps.name, true);
      } else {
        formActs.setState("dirtyFields", realProps.name, false);
      }
    }
  );

  createWatch(
    () => context[0].isTouched,
    (v) => {
      v && formActs.setState("isTouched", v);
    }
  );

  createWatch(
    () => realProps.validateRelatedFields.map((v) => formActs.getFieldValue(v)),
    () => {
      context[1].handleValidate();
    },
    { defer: true }
  );

  return (
    <FieldContext.Provider value={context}>
      {callMaybeCallableChild(realProps.children, ...context)}
    </FieldContext.Provider>
  );
}

export function JigeFieldCore(props: JigeFieldCoreProps) {
  return <FieldCore {...props} />;
}
