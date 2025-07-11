import { createWatch } from 'jige-utils'
import { type ComponentProps, createMemo, createUniqueId, onCleanup, splitProps } from 'solid-js'
import Colgroup from './Colgroup'
import { NormalTable } from './common'
import context from './context'

export function TableHeader(props: ComponentProps<'thead'>) {
  const [, actions] = context.useContext()
  return (
    <NormalTable
      ref={(el) => {
        actions.setState('headerScrollRef', el)
      }}
    >
      <Colgroup />
      <thead {...props} />
    </NormalTable>
  )
}

export function Column(
  props: Omit<ComponentProps<'th'>, 'rowspan' | 'colspan' | 'rowSpan' | 'colSpan'> & {
    width?: number
    rowSpan?: number
    colSpan?: number
  },
) {
  const [, actions] = context.useContext()
  const [local, others] = splitProps(props, ['width', 'rowSpan', 'colSpan'])

  const id = `col-${createUniqueId()}`

  // maybe not , when colSpan == 1 but row is not bottom
  const isLeafColumn = createMemo(() => {
    const colSpan = Number(local.colSpan || 0)
    return colSpan <= 1
  })

  onCleanup(() => {
    actions.setState('colsWidth', id, undefined!)
    actions.setState('colsKeys', id, undefined!)
  })

  createWatch([() => local.width, isLeafColumn], ([w, isLeafColumn]) => {
    actions.setState('colsWidth', id, (isLeafColumn ? w || 80 : undefined)!)
    actions.setState('colsKeys', id, isLeafColumn)
    actions.setState('manualWidths', id, (isLeafColumn ? w || undefined : undefined)!)
  })

  return <th {...others} rowSpan={local.rowSpan} colSpan={local.colSpan} data-key={id} />
}
