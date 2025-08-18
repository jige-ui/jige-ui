import { TableCore } from 'jige-core';
import { type ComponentProps, splitProps } from 'solid-js';

export function Cell(props: ComponentProps<'td'>) {
  const [localProps, others] = splitProps(props, ['class']);
  return (
    <TableCore.Cell
      class={['jg-table-cell', localProps.class].join(' ')}
      {...others}
    />
  );
}
