import { createComponentState } from 'solid-uses'

const context = createComponentState({
  state: () => ({
    dir: '' as 'left' | 'right',
  }),
})

export default context
