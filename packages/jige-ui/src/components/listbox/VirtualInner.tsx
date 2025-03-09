import type { JSX } from 'solid-js'
import { createMemo, createSignal } from 'solid-js'
import { CommonScrollWrapper } from './CommonScrollWrapper'

export function VirtualInner(props: {
  items: any[]
  rootHeight: number
  rowHeight: number
  overscanCount: number
  fallback: JSX.Element
  children: (item: any, index: number) => JSX.Element
  onSelect: (item: any, index: number) => void
  selectIndex: number
  selectTrigger: 'click' | 'arrow'
  class?: string
  itemClass?: string
  scrollToSelected: boolean
}) {
  const [offset, setOffset] = createSignal(0)

  const getFirstIdx = () => Math.max(0, Math.floor(offset() / props.rowHeight) - props.overscanCount)

  const getLastIdx = () =>
    Math.min(
      props.items.length,
      Math.floor(offset() / props.rowHeight) + Math.ceil(props.rootHeight / props.rowHeight) + props.overscanCount,
    )

  const containerHeight = createMemo(() => props.items.length * props.rowHeight)
  const viewerTop = createMemo(() => getFirstIdx() * props.rowHeight)
  const visibleItems = createMemo(() => props.items.map((value, index) => ({ value, index })).slice(getFirstIdx(), getLastIdx()))

  return (
    <CommonScrollWrapper
      scrollToSelected={props.scrollToSelected}
      class={props.class}
      itemClass={props.itemClass}
      onScroll={(e) => {
        const el = e.target as HTMLElement
        if (el?.scrollTop !== undefined)
          setOffset(el.scrollTop)
      }}
      rootHeight={props.rootHeight}
      rowHeight={props.rowHeight}
      contentStyle={{
        'height': `${containerHeight()}px`,
        'position': 'relative',
        'min-width': '100px',
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
      children={props.children}
      selectTrigger={props.selectTrigger}
    />
  )
}
