import { type RowData, type Table, flexRender } from '@tanstack/solid-table'
import { TableCore, dataIf } from 'jige-core'
import { For, type JSX, Show, createMemo, createSignal } from 'solid-js'
import { Scrollbar } from '../scrollbar'
import { Spin } from '../spin'

import css from 'sass:./tanstack-table.scss'
import { mountStyle } from 'solid-uses'
import { Paginator } from '../paginator'
import { getMergeHeaderGroups } from './utils'
import { Button } from '../button'
import { AddNewRow } from './AddNewRow'
import { BoxRemove } from '../icons'

declare module '@tanstack/solid-table' {
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  interface ColumnMeta<TData extends RowData, TValue> {
    width?: number
    editable?: (
      rowData: Record<string, any>,
      actions: {
        confirm: () => Promise<void>
        cancel: () => void
      },
    ) => JSX.Element
  }
}

export function TanstackTable<T>(props: {
  staticTableInstance: Table<T>
  loading?: boolean
  height?: string
  maxHeight?: string
  size?: 'small' | 'medium' | 'large' | number
  bordered?: boolean
  onRowClick?: (row: T, index: number) => void
  pagination?: {
    total: number
    pageSize: number
    onPageClick: (page: number) => void
    currPage: number
  }
  footer?: JSX.Element
  onAddNewRow?: (data: Record<string, any>) => void | Promise<void>
}) {
  mountStyle(css, 'jige-ui-tanstack-table')

  // non-reactive
  const tableInst = props.staticTableInstance

  const rows = createMemo(() => tableInst.getRowModel().rows)

  let headRef!: HTMLDivElement

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

  const [showNewRow, setShowNewRow] = createSignal(false)

  const [scrollRef, setScrollRef] = createSignal<HTMLDivElement>()

  return (
    <Spin spinning={props.loading}>
      <div
        class='jg-data-table'
        style={{
          'border-color': props.bordered ? 'var(--jg-t-border)' : 'transparent',
          'font-size': fontSize(),
        }}
        data-bordered={dataIf(props.bordered)}
      >
        <TableCore>
          <div style={{ overflow: 'hidden' }} ref={headRef}>
            <TableCore.Header>
              <For each={getMergeHeaderGroups(tableInst.getHeaderGroups())}>
                {(headerGroup) => (
                  <TableCore.Row>
                    <For each={headerGroup.headers}>
                      {(header) => {
                        return (
                          <TableCore.Column
                            rowSpan={header.rowSpan}
                            colSpan={header.colSpan}
                            width={header.column.columnDef.meta?.width}
                            class='jg-data-table-head'
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
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
            scrollRef={setScrollRef}
          >
            <Show when={rows().length === 0 && !showNewRow()}>
              <div class='jg-data-table-empty'>
                <div>
                  <BoxRemove />
                </div>
                <div style={{ 'margin-top': '8px' }}>什么都没有哦</div>
              </div>
            </Show>
            <TableCore.Body>
              <Show when={rows().length > 0 || showNewRow()}>
                <For each={rows()}>
                  {(row, index) => (
                    <TableCore.Row
                      class='jg-data-table-row'
                      onClick={() => props.onRowClick?.(row.original, index())}
                    >
                      <For each={row.getVisibleCells()}>
                        {(cell) => {
                          return (
                            <TableCore.Cell class='jg-data-table-item'>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCore.Cell>
                          )
                        }}
                      </For>
                    </TableCore.Row>
                  )}
                </For>
              </Show>
              <Show when={showNewRow()}>
                <AddNewRow
                  staticTableInstance={tableInst}
                  onCancel={() => {
                    setShowNewRow(false)
                  }}
                  onConfirm={async (data) => {
                    await props.onAddNewRow?.(data)
                    setShowNewRow(false)
                  }}
                />
              </Show>
            </TableCore.Body>
          </Scrollbar>
        </TableCore>
        <div>
          <Button
            label='新增一行'
            onClick={() => {
              setShowNewRow(true)
              scrollRef()?.scrollTo({
                top: scrollRef()?.scrollHeight,
                behavior: 'smooth',
              })
            }}
          />
        </div>
        <Show when={props.pagination || props.footer}>
          <div class='jg-data-table-footer'>
            <div>{props.footer || ''}</div>
            <Show when={props.pagination}>
              <Paginator {...props.pagination!} />
            </Show>
          </div>
        </Show>
      </div>
    </Spin>
  )
}
