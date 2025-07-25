import { TableCore } from 'jige-core'
import { splitProps, type ComponentProps } from 'solid-js'

export function Row(props: ComponentProps<'tr'>) {
  const [localProps, others] = splitProps(props, ['class'])
  return <TableCore.Row class={['jg-table-row', localProps.class].join(' ')} {...others} />
}
