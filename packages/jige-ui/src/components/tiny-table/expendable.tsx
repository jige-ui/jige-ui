import { type JSX, Show } from "solid-js";
import { createComponentState } from "solid-tiny-context";
import type { DisplayColumnDef } from "solid-tiny-table";
import { Button } from "../button";
import { IconFluentAddCircle24Regular } from "../icons/fluent-add-circle-24-regular";
import { IconFluentSubtractCircle24Regular } from "../icons/fluent-subtract-circle-24-regular";
import { Table } from "../table";

const context = createComponentState({
  state: () => ({
    expanded: false,
  }),
});

export function ExpandableProvider(props: { children: JSX.Element }) {
  const Context = context.initial();

  return <Context.Provider>{props.children}</Context.Provider>;
}

export function Expand(props: {
  expandedRowRender?: (row: any) => JSX.Element;
  row: any;
}) {
  const [state] = context.useContext();
  return (
    <Show when={!!props.expandedRowRender}>
      <Table.Row
        style={{
          display: state.expanded ? undefined : "none",
        }}
      >
        <Table.Cell colSpan={"100%"}>
          {props.expandedRowRender?.(props.row)}
        </Table.Cell>
      </Table.Row>
    </Show>
  );
}

export function ExpandableTrigger() {
  const [state, actions] = context.useContext();
  return (
    <Button
      icon={
        <div
          style={{
            transition: "transform .3s",
            transform: state.expanded ? undefined : "rotate(-90deg)",
          }}
        >
          <Show
            fallback={<IconFluentAddCircle24Regular />}
            when={state.expanded}
          >
            <IconFluentSubtractCircle24Regular />
          </Show>
        </div>
      }
      onClick={() => actions.setState("expanded", (v) => !v)}
      size="small"
      variant="text"
    />
  );
}

export const EXPAND_COLUMN: DisplayColumnDef<any> = {
  id: "expander",
};

export const Expandable = Object.assign(ExpandableProvider, {
  Trigger: ExpandableTrigger,
  Row: Expand,
});
