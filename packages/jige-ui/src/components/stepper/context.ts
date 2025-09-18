import { createComponentState } from "solid-tiny-context";

export const stepperContext = createComponentState({
  state: () => ({
    stepStore: {} as Record<string, any>,
    currentStep: "" as string,
  }),
  methods: {
    switchStep(step: string) {
      this.actions.setState("currentStep", step);
    },
    getStepStore(step: string) {
      return this.state.stepStore[step];
    },
    reset() {
      this.actions.setState("stepStore", this.nowrapData.initialStore);
      this.actions.setState("currentStep", this.nowrapData.initialStep);
    },
  },
  nowrapData: () => ({
    initialStore: {} as Record<string, any>,
    initialStep: "" as string,
  }),
});

export const oneStepContext = createComponentState({
  state: () => ({
    stepKey: "",
  }),
});
