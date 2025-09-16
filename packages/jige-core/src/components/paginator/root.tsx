import { createEffect } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import context from "./context";

export function Root(props: {
  children: JSX.Element;
  total?: number;
  pageSize?: number;
  totalPage?: number;
  currPage: number;
}) {
  const Context = context.initial();
  const [state, actions] = Context.value;

  createEffect(() => {
    actions.setState({
      totalPages:
        props.totalPage ||
        Math.ceil((props.total || 0) / (props.pageSize || 10)),
      currPage: Math.min(Math.max(1, props.currPage), state.totalPages),
    });
  });

  return <Context.Provider>{props.children}</Context.Provider>;
}
