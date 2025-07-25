import { type RowData, flexRender, type Table as TansTable } from '@tanstack/solid-table'
import { For, type JSX, Show, createMemo } from 'solid-js'

import css from 'sass:./tanstack-table.scss'
import { mountStyle } from 'jige-utils'
import IconFluentBoxDismiss24Regular from '~icons/fluent/box-dismiss-24-regular'
import { Paginator } from '../paginator'
import { getMergeHeaderGroups } from './utils'
import { Table } from '../table'

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
  staticTableInstance: TansTable<T>
  loading?: boolean
  height?: string
  maxHeight?: string
  size?: 'small' | 'medium' | 'large' | number
  bordered?: boolean
  onRowClick?: (row: T, index: number) => void
  onRowDbClick?: (row: T, index: number) => void
  pagination?: {
    total: number
    pageSize: number
    onPageClick: (page: number) => void
    currPage: number
  }
  footer?: JSX.Element
  onAddNewRow?: (data: Record<string, any>) => boolean | Promise<boolean>
}) {
  mountStyle(css, 'jige-ui-tanstack-table')

  // non-reactive
  const tableInst = props.staticTableInstance

  const rows = createMemo(() => tableInst.getRowModel().rows)

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

  return (
    <Table
      style={{ 'font-size': fontSize() }}
      height={props.height}
      maxHeight={props.maxHeight}
      bordered={props.bordered}
      loading={props.loading}
    >
      <Table.Header>
        <For each={getMergeHeaderGroups(tableInst.getHeaderGroups())}>
          {(headerGroup) => (
            <Table.Row>
              <For each={headerGroup.headers}>
                {(header) => {
                  return (
                    <Table.Column
                      rowSpan={header.rowSpan || undefined}
                      colSpan={header.colSpan}
                      width={header.column.columnDef.meta?.width}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </Table.Column>
                  )
                }}
              </For>
            </Table.Row>
          )}
        </For>
      </Table.Header>

      <Show when={rows().length === 0}>
        <div class='jg-data-table-empty'>
          <div>
            <IconFluentBoxDismiss24Regular />
          </div>
          <div style={{ 'margin-top': '8px' }}>什么都没有哦</div>
        </div>
      </Show>
      <Table.Body>
        <Show when={rows().length > 0}>
          <For each={rows()}>
            {(row, index) => (
              <Table.Row
                onClick={() => props.onRowClick?.(row.original, index())}
                onDblClick={() => props.onRowDbClick?.(row.original, index())}
              >
                <For each={row.getVisibleCells()}>
                  {(cell) => {
                    return (
                      <Table.Cell>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Table.Cell>
                    )
                  }}
                </For>
              </Table.Row>
            )}
          </For>
        </Show>
      </Table.Body>

      <Show when={props.pagination || props.footer}>
        <Table.Footer>
          <div>{props.footer || ''}</div>
          <Show when={props.pagination}>
            <Paginator {...props.pagination!} />
          </Show>
        </Table.Footer>
      </Show>
    </Table>
  )
}
