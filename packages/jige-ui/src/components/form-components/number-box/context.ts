import { createComponentState } from "solid-tiny-context";
import { isNumber } from "solid-tiny-utils";

export const context = createComponentState({
  state: () => ({
    value: null as number | null,
    disabled: false,
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    name: "",
    placeholder: "",
    focused: false,
  }),
  getters: {
    safeValue() {
      const v = this.state.value;
      return isNumber(v) ? v : 0;
    },
  },
  methods: {
    setValue(value: number | null) {
      if (value === null || Number.isNaN(value)) {
        this.actions.setState("value", null);
        return;
      }

      if (value > this.state.max) {
        this.actions.setState("value", this.state.max);
      } else if (value < this.state.min) {
        this.actions.setState("value", this.state.min);
      } else {
        value !== this.state.value && this.actions.setState("value", value);
      }
    },
  },
});
