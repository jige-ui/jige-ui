import type { ButtonVariant } from './types'
import { createComponentState } from 'solid-uses'

export const context = createComponentState({
  state: () => ({
    loading: false,
    color: '',
    variant: 'solid' as ButtonVariant,
    iconOnly: false,
  }),
})
