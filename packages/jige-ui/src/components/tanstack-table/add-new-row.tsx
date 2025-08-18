import type { Table } from '@tanstack/solid-table';
import { FormCore, TableCore } from 'jige-core';
import { createMemo, For } from 'solid-js';
import { unwrap } from 'solid-js/store';

export function AddNewRow<T>(props: {
  staticTableInstance: Table<T>;
  onConfirm: (data: Record<string, any>) => Promise<void>;
  onCancel: () => void;
}) {
  // non-reactive
  const tableInst = props.staticTableInstance;

  const columns = createMemo(() => {
    const headerGroups = tableInst.getHeaderGroups();
    const lastHeaders = headerGroups.at(-1)?.headers || [];
    return lastHeaders.map((header) => header.column);
  });

  const form = FormCore.createForm();
  const [state, actions] = form.context;

  return (
    <TableCore.Row>
      <form.Provider>
        <For each={columns()}>
          {(column) => {
            return (
              <TableCore.Cell class="jg-data-table-item">
                {column.columnDef.meta?.editable?.(
                  unwrap(state.formData) as any,
                  {
                    confirm: async () => {
                      await actions.handleSubmit();
                      if (state.canSubmit) {
                        await props.onConfirm(unwrap(state.formData));
                      }
                    },
                    cancel: () => {
                      props.onCancel();
                    },
                  }
                )}
              </TableCore.Cell>
            );
          }}
        </For>
      </form.Provider>
    </TableCore.Row>
  );
}
