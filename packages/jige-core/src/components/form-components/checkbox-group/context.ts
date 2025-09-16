import { createComponentState } from "solid-tiny-context";

const context = createComponentState({
  state: () => ({
    value: [] as string[],
    name: "",
    disabled: false,
  }),
  methods: {
    removeValue(value: string) {
      this.actions.setState("value", [
        ...this.state.value.filter((v) => v !== value),
      ]);
    },
    pushValue(value: string) {
      this.actions.setState("value", [...this.state.value, value]);
    },
  },
});

export default context;
