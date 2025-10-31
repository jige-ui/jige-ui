import { type JSX, Show } from "solid-js";
import type { DisplayColumnDef } from "solid-tiny-table";
import { Button } from "../button";
import { IconFluentAddCircle24Regular } from "../icons/fluent-add-circle-24-regular";
import { IconFluentSubtractCircle24Regular } from "../icons/fluent-subtract-circle-24-regular";
import { Table } from "../table";

export function ExpandRow(props: {
  children?: JSX.Element;
  expanded: boolean;
}) {
  return (
    <Table.Row
      style={{
        display: props.expanded ? undefined : "none",
      }}
    >
      <Table.Cell colSpan={"100%"}>{props.children}</Table.Cell>
    </Table.Row>
  );
}

export function ExpandTrigger(props: {
  expanded: boolean;
  onClick: () => void;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
      }}
    >
      <Button
        icon={
          <div
            style={{
              transition: "transform .3s",
              transform: props.expanded ? undefined : "rotate(-90deg)",
            }}
          >
            <Show
              fallback={<IconFluentAddCircle24Regular />}
              when={props.expanded}
            >
              <IconFluentSubtractCircle24Regular />
            </Show>
          </div>
        }
        onClick={props.onClick}
        size="small"
        variant="text"
      />
    </div>
  );
}

export const EXPAND_COLUMN: DisplayColumnDef<any> = {
  id: "TINY_TABLE_EXPANDER",
  meta: { width: 48 },
};
