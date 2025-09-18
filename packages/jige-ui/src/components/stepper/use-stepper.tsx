import { createMemo } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";
import { oneStepContext, stepperContext } from "./context";

export function useStepper<T extends Record<string, any>, K extends keyof T>() {
  const [one] = oneStepContext.useContext();
  const [state, actions, staticData] = stepperContext.useContext();
  const key = createMemo(() => one.stepKey);

  return {
    get store() {
      return state.stepStore[key()] as T[K];
    },
    getStepStore<Key extends Exclude<keyof T, K>>(step: Key) {
      return state.stepStore[step as string] as T[Key];
    },
    switchStep: (step: Exclude<keyof T, K>) =>
      actions.switchStep(step as string),
    setStore: ((...args: [any]) => {
      actions.setState("stepStore", key(), ...args);
    }) as SetStoreFunction<T[K]>,
    reset: () =>
      actions.setState("stepStore", key(), staticData.initialStore[key()]),
  };
}
