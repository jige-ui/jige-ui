import { createComponentState } from 'solid-tiny-context';

const context = createComponentState({
  state: () => ({
    dir: '' as 'left' | 'right',
  }),
});

export default context;
