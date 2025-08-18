import { TableCore } from 'jige-core';
import { type ComponentProps, splitProps } from 'solid-js';
import { Scrollbar } from '../scrollbar';
import { context } from './context';

export function Body(props: ComponentProps<'tbody'>) {
  const [state] = context.useContext();
  const [localProps, others] = splitProps(props, ['class']);
  return (
    <Scrollbar
      height={state.scrollHeight}
      maxHeight={state.scrollMaxHeight}
      onScroll={(e) => {
        if (state.refHeader) {
          state.refHeader.scrollLeft = e.target.scrollLeft;
        }
      }}
    >
      <TableCore.Body
        class={['jg-table-body', localProps.class].join(' ')}
        {...others}
      />
    </Scrollbar>
  );
}
