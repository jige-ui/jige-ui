import { createComponentState } from 'solid-tiny-context';

export const context = createComponentState({
  state: () => ({
    size: 'medium' as 'small' | 'medium' | 'large',
    value: [] as string[],
    name: '',
    disabled: false,
  }),
  methods: {
    removeValue(value: string) {
      this.actions.setState('value', [
        ...this.state.value.filter((v) => v !== value),
      ]);
    },
    pushValue(value: string) {
      this.actions.setState('value', [...this.state.value, value]);
    },
  },
});
