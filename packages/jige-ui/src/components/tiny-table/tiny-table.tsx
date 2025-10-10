import css from "sass:./tiny-table.scss";
import { TableCore } from "jige-core";
import { createMemo, createSignal, For, type JSX, Show } from "solid-js";
import { type ColumnDef, createTable, type RowData } from "solid-tiny-table";
import { createWatch, mountStyle } from "solid-tiny-utils";
import { isDef } from "~/common/types";
import { IconFluentBoxDismiss24Regular } from "../icons/fluent-box-dismiss-24-regular";
import { Paginator } from "../paginator";
import { Table } from "../table";
import { EXPAND_COLUMN, Expandable } from "./expendable";

declare module "solid-tiny-table" {
  // biome-ignore lint/correctness/noUnusedVariables: e
  interface ColumnMeta<TData extends RowData, TValue> {
    width?: number;
  }
}

function Empty() {
  const [state] = TableCore.useContext();

  return (
    <Table.Row>
      <Table.Cell
        colSpan={"100%"}
        style={{
          padding: "0",
        }}
      >
        <div
          class="jg-data-table-empty"
          style={{
            width: `${state.wrapperWidth}px`,
          }}
        >
          <IconFluentBoxDismiss24Regular />
          <span>没有数据</span>
        </div>
      </Table.Cell>
    </Table.Row>
  );
}

export function TinyTable<T extends RowData>(props: {
  data: T[];
  columns: ColumnDef<T, any>[];
  loading?: boolean;
  height?: string;
  maxHeight?: string;
  rowClass?: (row: T) => string;
  size?: "small" | "medium" | "large" | number;
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
  expandable?: {
    expandedRowRender: (row: T) => JSX.Element;
    rowExpandable?: (row: T) => boolean;
  };
  hideHeader?: boolean;
}) {
  mountStyle(css, "jige-ui-tanstack-table");

  const [scrollRef, setScrollRef] = createSignal<HTMLDivElement>();

  const table = createTable({
    data: () => props.data,
    columns: () => {
      if (
        isDef(props.expandable?.expandedRowRender) &&
        !props.columns.includes(EXPAND_COLUMN)
      ) {
        return [EXPAND_COLUMN, ...props.columns];
      }
      return props.columns;
    },
  });

  const fontSize = createMemo(() => {
    const size = props.size;

    if (typeof size === "number") {
      return `${size / 4 + 6}px`;
    }

    switch (size) {
      case "small":
        return "13px";
      case "large":
        return "16px";
      case "medium":
        return "14px";
      default:
        return "14px";
    }
  });

  createWatch(table.rows, () => {
    scrollRef()?.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  });

  return (
    <Table
      bordered={props.bordered}
      height={props.height}
      loading={props.loading}
      maxHeight={props.maxHeight}
      style={{ "font-size": fontSize() }}
    >
      <Table.Header hide={props.hideHeader}>
        <For each={table.headers()}>
          {(headerGroup) => (
            <Table.Row>
              <For each={headerGroup}>
                {(header) => {
                  return (
                    <Table.Column
                      colSpan={header.colSpan}
                      rowSpan={header.rowSpan || undefined}
                      width={header.column.columnDef.meta?.width}
                    >
                      {header.renderHeader()}
                    </Table.Column>
                  );
                }}
              </For>
            </Table.Row>
          )}
        </For>
      </Table.Header>

      <Table.Body scrollRef={setScrollRef}>
        <Show when={table.rows().length > 0}>
          <For each={table.rows()}>
            {(row, index) => {
              const canExpand = createMemo(() => {
                return props.expandable?.rowExpandable?.(row.original) ?? false;
              });
              return (
                <Expandable>
                  <Table.Row
                    class={props.rowClass?.(row.original)}
                    onClick={() => props.onRowClick?.(row.original, index())}
                    onDblClick={() =>
                      props.onRowDbClick?.(row.original, index())
                    }
                  >
                    <For each={row.getCells()}>
                      {(cell) => {
                        return (
                          <Table.Cell>
                            <Show
                              fallback={cell.renderCell()}
                              when={
                                cell.column.columnDef.id === "expander" &&
                                canExpand()
                              }
                            >
                              <Expandable.Trigger />
                            </Show>
                          </Table.Cell>
                        );
                      }}
                    </For>
                  </Table.Row>
                  <Show when={canExpand()}>
                    <Expandable.Row
                      expandedRowRender={props.expandable?.expandedRowRender}
                      row={row.original}
                    />
                  </Show>
                </Expandable>
              );
            }}
          </For>
        </Show>
        <Show when={table.rows().length === 0}>
          <Empty />
        </Show>
      </Table.Body>

      <Show when={props.pagination || props.footer}>
        <Table.Footer>
          <div>{props.footer || ""}</div>
          <Show when={props.pagination}>
            <Paginator {...props.pagination!} />
          </Show>
        </Table.Footer>
      </Show>
    </Table>
  );
}
