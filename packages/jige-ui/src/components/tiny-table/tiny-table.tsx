import css from "sass:./tiny-table.scss";
import { TableCore } from "jige-core";
import {
  createMemo,
  createSignal,
  For,
  type JSX,
  Match,
  Show,
  Switch,
} from "solid-js";
import { type ColumnDef, createTable, type RowData } from "solid-tiny-table";
import { createWatch, mountStyle } from "solid-tiny-utils";
import { isDef } from "~/common/types";
import { IconFluentBoxDismiss24Regular } from "../icons/fluent-box-dismiss-24-regular";
import { Paginator } from "../paginator";
import { Table } from "../table";
import { EXPAND_COLUMN, ExpandRow, ExpandTrigger } from "./expendable";
import { SELECTOR_COLUMN, Selector } from "./selector";

declare module "solid-tiny-table" {
  // biome-ignore lint/correctness/noUnusedVariables: e
  // biome-ignore lint/style/useConsistentTypeDefinitions: is required
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
          class="jg-tiny-table-empty"
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
  rowSelection?: {
    type?: "checkbox" | "radio";
    onChange: (selectedRowsIdx: T[]) => void;
  };
  hideHeader?: boolean;
}) {
  mountStyle(css, "jige-ui-tiny-table");

  const [scrollRef, setScrollRef] = createSignal<HTMLDivElement>();

  const table = createTable({
    data: () => props.data,
    columns: () => {
      const columns = [...props.columns];
      if (isDef(props.rowSelection) && !props.columns.includes(EXPAND_COLUMN)) {
        columns.unshift(SELECTOR_COLUMN);
      }
      if (
        isDef(props.expandable?.expandedRowRender) &&
        !props.columns.includes(EXPAND_COLUMN)
      ) {
        columns.unshift(EXPAND_COLUMN);
      }

      return columns;
    },
    store: {
      expandableStore: [] as boolean[],
      rowSelectionStore: [] as boolean[],
    },
  });

  const [state, { setState }] = table.ctx;

  createWatch(table.rows, () => {
    scrollRef()?.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    setState("expandableStore", []);
    setState("rowSelectionStore", []);
  });

  createWatch(
    () => props.rowSelection?.type,
    () => {
      setState("rowSelectionStore", []);
    },
    { defer: true }
  );

  createWatch(
    () => [...state.rowSelectionStore],
    (v) => {
      const selectedRows: T[] = [];
      const rows = table.rows();
      for (let i = 0; i < v.length; i++) {
        const row = rows[i];
        if (v[i] && row) {
          selectedRows.push(row.original);
        }
      }
      props.rowSelection?.onChange(selectedRows);
    },
    { defer: true }
  );

  return (
    <Table
      bordered={props.bordered}
      height={props.height}
      loading={props.loading}
      maxHeight={props.maxHeight}
      style={{ "font-size": "14px" }}
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
                <>
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
                            <Switch fallback={cell.renderCell()}>
                              <Match
                                when={
                                  cell.column.columnDef.id ===
                                  "TINY_TABLE_SELECTOR"
                                }
                              >
                                <Selector
                                  onChange={(v) => {
                                    if (
                                      v &&
                                      props.rowSelection?.type === "radio"
                                    ) {
                                      setState("rowSelectionStore", []);
                                    }
                                    setState("rowSelectionStore", index(), v);
                                  }}
                                  selected={state.rowSelectionStore[index()]}
                                  type={props.rowSelection?.type ?? "checkbox"}
                                />
                              </Match>
                              <Match
                                when={
                                  cell.column.columnDef.id ===
                                    "TINY_TABLE_EXPANDER" && canExpand()
                                }
                              >
                                <ExpandTrigger
                                  expanded={state.expandableStore[index()]}
                                  onClick={() =>
                                    setState(
                                      "expandableStore",
                                      index(),
                                      (v) => !v
                                    )
                                  }
                                />{" "}
                              </Match>
                            </Switch>
                          </Table.Cell>
                        );
                      }}
                    </For>
                  </Table.Row>
                  <Show when={canExpand()}>
                    <ExpandRow expanded={state.expandableStore[index()]}>
                      {props.expandable?.expandedRowRender(row.original)}
                    </ExpandRow>
                  </Show>
                </>
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
