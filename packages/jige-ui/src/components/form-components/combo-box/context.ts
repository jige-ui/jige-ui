import { createComponentState } from 'solid-tiny-context'

export const context = createComponentState({
  state: () => ({
    disabled: false,
    value: undefined as any,
    options: [] as { label: string; value: any }[],
    listItemHeight: 20,
    listItemWidth: 200,
    originY: 0,
    placeholder: '',
    name: 'combo-box',
    isCalculating: true,
    scrollElement: null as HTMLElement | null,
    offset: 0,
    refTrigger: null as HTMLElement | null,
  }),
  getters: {
    valueIndex() {
      return this.state.options.findIndex((item) => item.value === this.state.value)
    },
    valueLabel() {
      const index = this.state.valueIndex
      if (index === -1) return this.state.placeholder
      return this.state.options[index].label
    },
  },
  methods: {
    setValue<T>(value: T) {
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
