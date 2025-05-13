import { createComponentState } from 'solid-uses'

export const context = createComponentState({
  state: () => ({
    disabled: false,
    value: '',
    options: [] as { label: string; value: any }[],
    listItemHeight: 20,
    listItemWidth: 200,
    originY: 0,
    placeholder: '',
    name: 'combo-box',
    scrollElement: null as HTMLElement | null,
  }),
  getters: {
    valueIndex() {
      return this.state.options.findIndex((item) => item.value === this.state.value)
    },
  },
  methods: {
    setValue(value: string) {
      this.actions.setState('value', value)
    },
    setName(name: string) {
      this.actions.setState('name', name)
    },
    setDisabled(disabled: boolean) {
      this.actions.setState('disabled', disabled)
    },
  },
})
