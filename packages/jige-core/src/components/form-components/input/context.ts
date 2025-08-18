import { createComponentState } from 'solid-tiny-context';

const context = createComponentState({
  state: () => ({
    value: '',
    name: '',
    disabled: false,
  }),
  methods: {
    setValue(value: string) {
      this.actions.setState('value', value);
    },
  },
});

export default context;
