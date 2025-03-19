import css from 'sass:./listbox.scss'
import type { JSX } from 'solid-js'
import { Show, createMemo, mergeProps } from 'solid-js'
import { mountStyle } from 'solid-uses'

import { isArray } from 'radash'
import { ListInner } from './ListInner'
import { VirtualInner } from './VirtualInner'

export function Listbox<T extends any[]>(props: {
  virtual?: boolean
  fallback?: JSX.Element
  items: T
  rootHeight: number
  rowHeight: number
  overscanCount?: number
  children: (item: T[number], index: number) => JSX.Element
  onSelect?: (item: T[number], index: number) => void
  selectIndex?: number | number[]
  selectTrigger?: 'click' | 'arrow'
  itemClass?: string
  class?: string
  scrollToSelected?: boolean
}) {
  mountStyle(css, 'jige-ui-listbox')
  const realProps = mergeProps(
    {
      selectIndex: -1,
      selectTrigger: 'click' as 'click' | 'arrow',
      onSelect: () => {},
      scrollToSelected: true,
      overscanCount: 5,
      fallback: <div />,
    },
    props,
  )

  const realSelectIndex = createMemo(() => {
    if (isArray(realProps.selectIndex)) {
      return realProps.selectIndex
    }
    return [realProps.selectIndex]
  })

  return (
    <Show
      when={props.virtual || props.items.length > 500}
      fallback={<ListInner {...realProps} selectIndex={realSelectIndex()} />}
    >
      <VirtualInner {...realProps} selectIndex={realSelectIndex()} />
    </Show>
  )
}
