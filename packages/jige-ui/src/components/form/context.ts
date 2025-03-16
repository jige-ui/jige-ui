import { createComponentState } from 'solid-uses'

export const formContext = createComponentState({
  state: () => ({
    disabled: false,
  }),
})

export const fieldContext = createComponentState({
  state: () => ({
    descriptionID: '',
    labelID: '',
    labelFor: '',
  }),
})
