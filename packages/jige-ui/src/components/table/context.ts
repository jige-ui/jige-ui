import { createComponentState } from 'solid-tiny-context'

export const context = createComponentState({
  state: () => ({
    refHeader: null as HTMLDivElement | null,
  }),
})
