import css from "sass:./table.scss";
import { dataIf, TableCore } from "jige-core";
import { type ComponentProps, splitProps } from "solid-js";
import { mountStyle } from "solid-tiny-utils";
import { Spin } from "../spin";
import { context } from "./context";

export function Root(
  props: ComponentProps<"div"> & {
    height?: string;
    maxHeight?: string;
    bordered?: boolean;
    loading?: boolean;
  }
) {
  mountStyle(css, "jige-ui-table");

  const [localProps, others] = splitProps(props, [
    "height",
    "maxHeight",
    "bordered",
    "loading",
  ]);
  const Context = context.initial({
    height: () => localProps.height,
    maxHeight: () => localProps.maxHeight,
  });

  return (
    <Context.Provider>
      <Spin spinning={localProps.loading}>
        <div
          class="jg-table"
          data-bordered={dataIf(localProps.bordered)}
          style={{
            "border-color": localProps.bordered
              ? "var(--jg-t-border)"
              : "transparent",
          }}
        >
          <TableCore {...others} />
        </div>
      </Spin>
    </Context.Provider>
  );
}
