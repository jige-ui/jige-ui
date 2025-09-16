import type { ComponentProps } from "solid-js";
import Colgroup from "./colgroup";
import { NormalTable } from "./common";

export function TableBody(props: ComponentProps<"tbody">) {
  return (
    <NormalTable>
      <Colgroup />
      <tbody {...props} />
    </NormalTable>
  );
}
