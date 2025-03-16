import { createComponentState } from 'solid-uses'
import type { ButtonVariant } from './types'

export const context = createComponentState({
  state: () => ({
    loading: false,
    color: '',
    variant: 'solid' as ButtonVariant,
    iconOnly: false,
    disabled: false,
  }),
})
