import { createComponentState } from "solid-tiny-context";

export const context = createComponentState({
  state: () => ({
    refHeader: null as HTMLDivElement | null,
    refScrollBody: null as HTMLDivElement | null,
    headerHeight: 0,
    footerHeight: 0,
    height: "",
    maxHeight: "",
    canScroll: {
      top: false,
      bottom: false,
      left: false,
      right: false,
    },
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
  methods: {
    calcCanScroll() {
      const el = this.state.refScrollBody;
      if (!el) {
        return;
      }
      this.actions.setState("canScroll", {
        top: el.scrollTop > 0,
        bottom: el.scrollHeight > el.clientHeight + el.scrollTop,
        left: el.scrollLeft > 0,
        right: el.scrollWidth > el.clientWidth + el.scrollLeft,
      });
    },
  },
});
