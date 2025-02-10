import { createComponentState } from 'solid-uses'

export const context = createComponentState({
  state: () => ({
    disabled: false,
    value: '',
    options: [] as string[],
    listItemHeight: 20,
    listItemWidth: 200,
    originY: 0,
    name: 'combo-box',
  }),
  getters: {
    valueIndex() {
      return this.state.options.indexOf(this.state.value)
    },
  },
})
