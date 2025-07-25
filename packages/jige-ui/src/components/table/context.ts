import { createComponentState } from 'solid-tiny-context'

export const context = createComponentState({
  state: () => ({
    refHeader: null as HTMLDivElement | null,
    headerHeight: 0,
    height: '',
    maxHeight: '',
  }),
  getters: {
    scrollHeight() {
      if (!this.state.height) {
        return undefined
      }
      return `calc(${this.state.height} - ${this.state.headerHeight}px)`
    },
    scrollMaxHeight() {
      if (!this.state.maxHeight) {
        return undefined
      }
      return `calc(${this.state.maxHeight} - ${this.state.headerHeight}px)`
    },
  },
})
