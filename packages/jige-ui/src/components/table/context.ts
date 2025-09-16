import { createComponentState } from "solid-tiny-context";

export const context = createComponentState({
  state: () => ({
    refHeader: null as HTMLDivElement | null,
    headerHeight: 0,
    footerHeight: 0,
    height: "",
    maxHeight: "",
  }),
  getters: {
    scrollHeight() {
      if (!this.state.height) {
        return;
      }
      return `calc(${this.state.height} - ${this.state.headerHeight + 2 + this.state.footerHeight}px)`;
    },
    scrollMaxHeight() {
      if (!this.state.maxHeight) {
        return;
      }
      return `calc(${this.state.maxHeight} - ${this.state.headerHeight + 2 + this.state.footerHeight}px)`;
    },
  },
});
