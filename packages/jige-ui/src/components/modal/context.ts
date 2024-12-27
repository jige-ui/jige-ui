import { createComponentState } from 'solid-uses'

export const context = createComponentState({
  state: () => ({
    contentRef: null as HTMLElement | null,
    triggerRef: null as HTMLElement | null,
  }),
})

export const useModalContext = context.useContext
