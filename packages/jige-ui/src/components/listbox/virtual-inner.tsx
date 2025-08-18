import type { JSX } from 'solid-js';
import { createVirtualList } from '~/common/create-virtual-list';
import { CommonScrollWrapper } from './common-scroll-wrapper';

export function VirtualInner(props: {
  items: any[];
  rootHeight: number;
  rowHeight: number;
  overscanCount: number;
  fallback: JSX.Element;
  children: (item: any, index: number) => JSX.Element;
  onSelect: (item: any, index: number) => void;
  selectIndex: number[];
  selectTrigger: 'click' | 'arrow';
  class?: string;
  itemClass?: string;
  scrollToSelected: boolean;
  preventFocus: boolean;
  scrollTop?: number;
}) {
  const [{ containerHeight, viewerTop, visibleItems }, onScroll] =
    createVirtualList({
      items: () => props.items.map((value, index) => ({ value, index })),
      rowHeight: () => props.rowHeight,
      rootHeight: () => props.rootHeight,
      overscanCount: () => props.overscanCount,
    });

  return (
    <CommonScrollWrapper
      class={props.class}
      contentStyle={{
        height: `${containerHeight()}px`,
        position: 'relative',
      }}
      fallback={props.fallback}
      itemClass={props.itemClass}
      items={props.items}
      onScroll={onScroll}
      onSelect={props.onSelect}
      preventFocus={props.preventFocus}
      rootHeight={props.rootHeight}
      rowHeight={props.rowHeight}
      scrollTop={props.scrollTop}
      scrollToSelected={props.scrollToSelected}
      selectIndex={props.selectIndex}
      selectTrigger={props.selectTrigger}
      ulStyle={{
        position: 'absolute',
        top: `${viewerTop()}px`,
        left: 0,
        right: 0,
      }}
      visibleItems={visibleItems()}
    >
      {props.children}
    </CommonScrollWrapper>
  );
}
