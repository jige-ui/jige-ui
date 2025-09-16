import { createComponentState } from "solid-tiny-context";

const context = createComponentState({
  state: () => ({
    currPage: 1,
    totalPages: 1,
  }),
});

export default context;
