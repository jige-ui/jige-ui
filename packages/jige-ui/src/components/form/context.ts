import { createComponentState } from 'solid-tiny-context';

export const formContext = createComponentState({
  state: () => ({
    disabled: false,
  }),
});

export const fieldContext = createComponentState({
  state: () => ({
    descriptionID: '',
    labelID: '',
    labelFor: '',
    hasLabel: false,
    hasDescription: false,
  }),
});
