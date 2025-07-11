import type { JSX } from 'solid-js'
import { createVirtualList } from '~/common/createVirtualList'
import { CommonScrollWrapper } from './CommonScrollWrapper'

export function VirtualInner(props: {
  items: any[]
  rootHeight: number
  rowHeight: number
  overscanCount: number
  fallback: JSX.Element
  children: (item: any, index: number) => JSX.Element
  onSelect: (item: any, index: number) => void
  selectIndex: number[]
  selectTrigger: 'click' | 'arrow'
  class?: string
  itemClass?: string
  scrollToSelected: boolean
  preventFocus: boolean
}) {
  const [{ containerHeight, viewerTop, visibleItems }, onScroll] = createVirtualList({
    items: () => props.items.map((value, index) => ({ value, index })),
    rowHeight: () => props.rowHeight,
    rootHeight: () => props.rootHeight,
    overscanCount: () => props.overscanCount,
  })

  return (
    <CommonScrollWrapper
      scrollToSelected={props.scrollToSelected}
      preventFocus={props.preventFocus}
      class={props.class}
      itemClass={props.itemClass}
      onScroll={onScroll}
      rootHeight={props.rootHeight}
      rowHeight={props.rowHeight}
      contentStyle={{
        height: `${containerHeight()}px`,
        position: 'relative',
      }}
      ulStyle={{
        position: 'absolute',
        top: `${viewerTop()}px`,
        left: 0,
        right: 0,
      }}
      items={props.items}
      visibleItems={visibleItems()}
      selectIndex={props.selectIndex}
      onSelect={props.onSelect}
      fallback={props.fallback}
      selectTrigger={props.selectTrigger}
    >
      {props.children}
    </CommonScrollWrapper>
  )
}
