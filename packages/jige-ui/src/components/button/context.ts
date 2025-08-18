import { createComponentState } from 'solid-tiny-context';
import type { ButtonVariant } from './types';

export const context = createComponentState({
  state: () => ({
    loading: false,
    color: '',
    variant: 'solid' as ButtonVariant,
    iconOnly: false,
    disabled: false,
  }),
});
