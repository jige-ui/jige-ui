import type { JSX } from 'solid-js'
import css from 'sass:./listbox.scss'
import { mergeProps, Show } from 'solid-js'
import { mountStyle } from 'solid-uses'

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
  selectIndex?: number
  selectTrigger?: 'click' | 'arrow'
  itemClass?: string
  class?: string
  scrollToSelected?: boolean
}) {
  mountStyle(css, 'jige-ui-listbox')
  const realProps = mergeProps({
    selectIndex: -1,
    selectTrigger: 'click' as 'click' | 'arrow',
    onSelect: () => {},
    scrollToSelected: true,
    overscanCount: 5,
    fallback: <div />,
  }, props)

  return (
    <Show
      when={props.virtual || props.items.length > 500}
      fallback={(
        <ListInner
          {...realProps}
        />
      )}
    >
      <VirtualInner
        {...realProps}
      />
    </Show>
  )
}
