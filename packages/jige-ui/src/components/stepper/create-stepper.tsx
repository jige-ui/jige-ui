import { AnimatedGroup } from "jige-core";
import type { ComponentProps, JSX } from "solid-js";
import { stepperContext } from "./context";
import { Step } from "./step";

export type StepperContext<T extends Record<string, any>> = [
  {
    stepStore: T;
    currentStep: keyof T;
  },
  {
    switchStep: (step: keyof T) => void;
    getStepStore: <K extends keyof T>(step: K) => T[K];
  },
];

export type UseStepResult<T extends Record<string, any>, K extends keyof T> = [
  T[K],
  {
    switchStep: (step: keyof T) => void;
    getStepStore: <Key extends keyof T>(step: Key) => T[Key];
  },
];

export function createStepper<T extends Record<string, any>>(
  params: T,
  initialStep?: keyof T
) {
  const Context = stepperContext.initial({
    stepStore: params,
    currentStep: (initialStep as string) || (Object.keys(params)[0] as string),
  });

  const [state, _, staticData] = Context.value;
  staticData.initialStore = params;
  staticData.initialStep =
    (initialStep as string) || (Object.keys(params)[0] as string);

  return {
    Provider: (props: { children: JSX.Element; class?: string }) => (
      <AnimatedGroup active={state.currentStep} class={props.class}>
        <Context.Provider>{props.children}</Context.Provider>
      </AnimatedGroup>
    ),
    Step: (
      props: { step: keyof T } & Omit<
        ComponentProps<typeof AnimatedGroup.Panel>,
        "key"
      >
    ) => <Step {...props} />,
    ...Context.value[1],
  };
}
