import { createComponentState } from 'solid-uses'

const context = createComponentState({
  state: () => ({
    dir: 'left' as 'left' | 'right',
  }),
})

export default context
