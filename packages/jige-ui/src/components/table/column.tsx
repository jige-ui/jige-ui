import { TableCore } from "jige-core";
import { splitProps } from "solid-js";

export function Column(props: Parameters<typeof TableCore.Column>[0]) {
  const [localProps, others] = splitProps(props, ["class"]);
  return (
    <TableCore.Column
      class={["jg-table-head", localProps.class].join(" ")}
      {...others}
    />
  );
}
