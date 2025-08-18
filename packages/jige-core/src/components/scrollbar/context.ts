import { batch } from 'solid-js';
import { createComponentState } from 'solid-tiny-context';

const context = createComponentState({
  state: () => ({
    verticalPer: null as number | null,
    horizontalPer: null as number | null,
    domVPer: 0 as number,
    domHPer: 0 as number,
    refContent: null as HTMLElement | null,
    isDragging: false,
    isScrolling: false,
    height: '100%',
    maxHeight: '100%',
  }),
  methods: {
    setScrollTop(scrollTopPer: number, smooth = false) {
      if (!this.state.refContent) {
        return;
      }
      const ratio = Math.min(1, Math.max(0, scrollTopPer / 100));
      const scrollPx =
        ratio *
        (this.state.refContent.scrollHeight -
          this.state.refContent.clientHeight +
          1);
      if (!smooth) {
        this.state.refContent.scrollTop = scrollPx;
        return;
      }
      this.state.refContent.scroll({
        top: scrollPx,
        behavior: 'smooth',
      });
    },
    setScrollLeft(scrollLeftPer: number, smooth = false) {
      if (!this.state.refContent) {
        return;
      }
      const ratio = Math.min(1, Math.max(0, scrollLeftPer / 100));
      const scrollPx =
        ratio *
        (this.state.refContent.scrollWidth -
          this.state.refContent.clientWidth +
          1);
      if (!smooth) {
        this.state.refContent.scrollLeft = scrollPx;
        return;
      }
      this.state.refContent.scroll({
        left: scrollPx,
        behavior: 'smooth',
      });
    },

    setValue() {
      const { state, actions } = this;
      if (!state.refContent) {
        return;
      }
      const refContent = state.refContent;
      const scollVTop = refContent.scrollTop;
      const scrollVHeight = refContent.scrollHeight - refContent.clientHeight;

      batch(() => {
        actions.setState(
          'domVPer',
          (refContent.clientHeight / refContent.scrollHeight) * 100
        );

        if (scrollVHeight === 0) {
          actions.setState('verticalPer', null);
        } else {
          const scrollVPercent = (scollVTop / scrollVHeight) * 100;
          actions.setState('verticalPer', scrollVPercent);
        }

        const scrollHTop = refContent.scrollLeft;
        const scrollHWidth = refContent.scrollWidth - refContent.clientWidth;
        actions.setState(
          'domHPer',
          (refContent.clientWidth / refContent.scrollWidth) * 100
        );

        if (scrollHWidth === 0) {
          actions.setState('horizontalPer', null);
        } else {
          const scrollHPercent = (scrollHTop / scrollHWidth) * 100;
          actions.setState('horizontalPer', scrollHPercent);
        }
      });
    },
  },
});

export default context;
