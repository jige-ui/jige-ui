import css from 'sass:./tanstack-table.scss';
import {
  flexRender,
  type RowData,
  type Table as TansTable,
} from '@tanstack/solid-table';
import { createMemo, For, type JSX, Show } from 'solid-js';
import { mountStyle } from 'solid-tiny-utils';
import IconFluentBoxDismiss24Regular from '~icons/fluent/box-dismiss-24-regular';
import { Paginator } from '../paginator';
import { Table } from '../table';
import { getMergeHeaderGroups } from './utils';

declare module '@tanstack/solid-table' {
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  interface ColumnMeta<TData extends RowData, TValue> {
    width?: number;
    editable?: (
      rowData: Record<string, any>,
      actions: {
        confirm: () => Promise<void>;
        cancel: () => void;
      }
    ) => JSX.Element;
  }
}

export function TanstackTable<T>(props: {
  staticTableInstance: TansTable<T>;
  loading?: boolean;
  height?: string;
  maxHeight?: string;
  size?: 'small' | 'medium' | 'large' | number;
  bordered?: boolean;
  onRowClick?: (row: T, index: number) => void;
  onRowDbClick?: (row: T, index: number) => void;
  pagination?: {
    total: number;
    pageSize: number;
    onPageClick: (page: number) => void;
    currPage: number;
  };
  footer?: JSX.Element;
  onAddNewRow?: (data: Record<string, any>) => boolean | Promise<boolean>;
}) {
  mountStyle(css, 'jige-ui-tanstack-table');

  // non-reactive
  const tableInst = props.staticTableInstance;

  const rows = createMemo(() => tableInst.getRowModel().rows);

  const fontSize = createMemo(() => {
    const size = props.size;

    if (typeof size === 'number') {
      return `${size / 4 + 6}px`;
    }

    switch (size) {
      case 'small':
        return '13px';
      case 'large':
        return '16px';
      case 'medium':
        return '14px';
      default:
        return '14px';
    }
  });

  const hdGroups = createMemo(() =>
    getMergeHeaderGroups(tableInst.getHeaderGroups())
  );

  return (
    <Table
      bordered={props.bordered}
      height={props.height}
      loading={props.loading}
      maxHeight={props.maxHeight}
      style={{ 'font-size': fontSize() }}
    >
      <Table.Header>
        <For each={hdGroups()}>
          {(headerGroup) => (
            <Table.Row>
              <For each={headerGroup.headers}>
                {(header) => {
                  return (
                    <Table.Column
                      colSpan={header.colSpan}
                      rowSpan={header.rowSpan || undefined}
                      width={header.column.columnDef.meta?.width}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </Table.Column>
                  );
                }}
              </For>
            </Table.Row>
          )}
        </For>
      </Table.Header>

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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Table.Cell>
                    );
                  }}
                </For>
              </Table.Row>
            )}
          </For>
        </Show>
        <Show when={rows().length === 0}>
          <Table.Row>
            <Table.Cell colSpan={'100%'}>
              <div class="jg-data-table-empty">
                <IconFluentBoxDismiss24Regular />
                <span>没有数据</span>
              </div>
            </Table.Cell>
          </Table.Row>
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
  );
}
