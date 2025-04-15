import css from 'sass:./data-table.scss'
import { TableCore } from 'jige-core'
import { For, Show, createMemo } from 'solid-js'
import { mountStyle } from 'solid-uses'
import { flattenObject } from '~/common/flatObject'
import { BoxRemove } from '../icons'
import { Paginator } from '../paginator'
import { Scrollbar } from '../scrollbar'
import { Spin } from '../spin'
import { generateHeaders } from './common'
import type { DataTableColumn, DataTableProps, SimpleType } from './types'

export function DataTable(props: DataTableProps) {
  let headRef!: HTMLTableSectionElement

  const fontSize = createMemo(() => {
    const size = props.size

    if (typeof size === 'number') {
      return `${size / 4 + 6}px`
    }

    switch (size) {
      case 'small':
        return '13px'
      case 'large':
        return '16px'
      case 'medium':
        return '14px'
      default:
        return '14px'
    }
  })

  const columns = createMemo(() => {
    const columns = props.columns
    const result: { [key: string]: Required<DataTableColumn> } = {}

    for (const i of columns) {
      const key = i.key
      const title = i.title || key
      const width = i.width || 0
      result[key] = {
        key,
        title,
        width,
        hidden: i.hidden || false,
        isParentColumn: i.isParentColumn || false,
        render:
          i.render ||
          ((v) => {
            return <span>{v}</span>
          }),
      }
    }

    return result
  })

  const data = createMemo(() => {
    const source = props.dataSource.map(
      (item) =>
        flattenObject(item) as {
          [key: string]: SimpleType
        },
    )

    const finalSource: { [key: string]: SimpleType }[] = []

    for (const i of source) {
      const newItem: { [key: string]: SimpleType } = {}
      for (const key in columns()) {
        const column = columns()[key]
        if (column && !column.hidden && !column.isParentColumn) {
          newItem[key] = i[key]
        }
      }
      finalSource.push(newItem)
    }

    return finalSource
  })

  const headers = createMemo(() => generateHeaders(data()[0]))

  mountStyle(css, 'jige-ui-data-table')
  return (
    <Spin spinning={props.loading}>
      <div
        class='jg-data-table'
        style={{
          'border-color': props.bordered ? 'var(--jg-t-border)' : 'transparent',
          'font-size': fontSize(),
        }}
      >
        <Show when={data().length > 0}>
          <TableCore>
            <div
              ref={headRef}
              style={{
                overflow: 'hidden',
              }}
            >
              <TableCore.Header>
                <For each={headers()}>
                  {(row) => (
                    <TableCore.Row>
                      <For each={row}>
                        {(head) => {
                          return (
                            <TableCore.Column
                              width={columns()[head.key].width || undefined}
                              rowSpan={head.rowSpan}
                              colSpan={head.colSpan}
                              data-key={head.key}
                              class='jg-data-table-head'
                            >
                              {columns()[head.key].title}
                            </TableCore.Column>
                          )
                        }}
                      </For>
                    </TableCore.Row>
                  )}
                </For>
              </TableCore.Header>
            </div>

            <Scrollbar
              onScroll={(e) => {
                if (headRef) {
                  headRef.scrollLeft = e.target.scrollLeft
                }
              }}
              height={props.height}
              maxHeight={props.maxHeight}
            >
              <TableCore.Body>
                <For each={data()}>
                  {(item, index) => (
                    <TableCore.Row class='jg-data-table-row'>
                      <For each={Object.keys(item)}>
                        {(key) => {
                          const column = columns()[key]
                          return (
                            <TableCore.Cell class='jg-data-table-item' data-key={key}>
                              {column.render(item[key], item, index())}
                            </TableCore.Cell>
                          )
                        }}
                      </For>
                    </TableCore.Row>
                  )}
                </For>
              </TableCore.Body>
            </Scrollbar>
          </TableCore>
          <Show when={props.pagination}>
            <div class='jg-data-table-bottom'>
              <div />
              <Paginator {...props.pagination!} />
            </div>
          </Show>
        </Show>

        <Show when={data().length === 0}>
          <div class='jg-data-table-empty'>
            <div>
              <BoxRemove />
            </div>
            <div style={{ 'margin-top': '8px' }}>什么都没有哦</div>
          </div>
        </Show>
      </div>
    </Spin>
  )
}
