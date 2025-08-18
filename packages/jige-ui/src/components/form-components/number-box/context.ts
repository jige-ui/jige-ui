import { createComponentState } from 'solid-tiny-context';

export const context = createComponentState({
  state: () => ({
    value: Number.NaN,
    disabled: false,
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    name: '',
    placeholder: '',
    focused: false,
  }),
  getters: {
    safeValue() {
      const v = this.state.value;
      return Number.isNaN(v) ? 0 : v;
    },
  },
  methods: {
    setValue(value: number) {
      if (value > this.state.max) {
        this.actions.setState('value', this.state.max);
      } else if (value < this.state.min) {
        this.actions.setState('value', this.state.min);
      } else {
        this.actions.setState('value', value);
      }
    },
  },
});
