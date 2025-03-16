import css from 'sass:./data-table.scss'
import { TableCore } from 'jige-core'
import { For, Show } from 'solid-js'
import { mountStyle } from 'solid-uses'
import { BoxRemove } from '../icons'
import { Paginator } from '../paginator'
import { Scrollbar } from '../scrollbar'
import { Spin } from '../spin'
import type { DataTableProps } from './types'

export function DataTable(props: DataTableProps) {
  let headRef!: HTMLDivElement

  mountStyle(css, 'jige-ui-data-table')
  return (
    <Spin spinning={props.loading}>
      <div class='jg-data-table'>
        <Show when={props.data.length > 0}>
          <TableCore data={props.data}>
            <TableCore.Head ref={headRef}>
              {(item) => (
                <th colspan={item.colspan} rowspan={item.rowspan} class='jg-data-table-head'>
                  {item.data}
                </th>
              )}
            </TableCore.Head>
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
                {(row) => (
                  <tr class='jg-data-table-row'>
                    <For each={Object.keys(row)}>
                      {(key) => <td class='jg-data-table-item'>{row[key]}</td>}
                    </For>
                  </tr>
                )}
              </TableCore.Body>
            </Scrollbar>
          </TableCore>
          <Show when={props.pagination}>
            <div class='jg-data-table-bottom'>
              <div>
                total:
                {props.pagination!.total}
              </div>
              <Paginator {...props.pagination!} />
            </div>
          </Show>
        </Show>

        <Show when={props.data.length === 0}>
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
