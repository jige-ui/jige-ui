import { createComponentState } from 'solid-uses'

export const context = createComponentState({
  state: () => ({
    value: Number.NaN,
    disabled: false,
    min: Number.NEGATIVE_INFINITY,
    max: Number.POSITIVE_INFINITY,
    name: 'number-box',
    focused: false,
  }),
  methods: {
    setValue(value: number) {
      if (value > this.state.max) {
        this.actions.setState('value', this.state.max)
      }
      else if (value < this.state.min) {
        this.actions.setState('value', this.state.min)
      }
      else {
        this.actions.setState('value', value)
      }
    },
  },
})
