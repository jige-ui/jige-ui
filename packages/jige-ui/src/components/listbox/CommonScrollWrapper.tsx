import { undefinedOr } from 'jige-core'
import { For, createSignal } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { watch } from 'solid-uses'
import { dataIf } from '~/common/dataset'
import { Scrollbar } from '../scrollbar'

export function CommonScrollWrapper<T extends any[]>(props: {
  onScroll?: (e: Event) => void
  rootHeight: number
  rowHeight: number
  contentStyle?: string | JSX.CSSProperties
  ulStyle?: string | JSX.CSSProperties
  children: (item: T[number], index: number) => JSX.Element
  selectIndex: number[]
  onSelect: (item: T[number], index: number) => void
  selectTrigger: 'click' | 'arrow'
  visibleItems?: { value: T[number]; index: number }[]
  items: T
  fallback: JSX.Element
  scrollToSelected: boolean
  preventFocus: boolean
  itemClass?: string
  class?: string
}) {
  let listRef!: HTMLDivElement

  const [hlIndex, setHlIndex] = createSignal(-1)
  const [scrollRef, setScrollRef] = createSignal<HTMLDivElement | null>(null)

  watch(
    () => props.selectIndex,
    (index) => {
      const lastItem = index[index.length - 1]
      setHlIndex(undefinedOr(lastItem, -1))
    },
  )

  function handleKeyDown(e: any) {
    if (props.preventFocus) {
      return
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault() // 防止滚动区域滚动
    }
    if (e.key === 'ArrowDown') {
      setHlIndex((prev) => Math.min(prev + 1, props.items.length - 1))
    } else if (e.key === 'ArrowUp') {
      setHlIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter') {
      props.onSelect(props.items[hlIndex()], hlIndex())
    }
    const $item = listRef?.querySelector(`[data-index="${hlIndex()}"]`)
    if ($item) {
      $item.scrollIntoView({ block: 'nearest' })
    }
  }

  watch([hlIndex, scrollRef], ([index, ref]) => {
    if (!props.preventFocus) {
      listRef?.focus()
    }
    if (props.scrollToSelected) {
      const $item = listRef?.querySelector(`[data-index="${index}"]`)
      if ($item) {
        $item.scrollIntoView({ block: 'nearest' })
      } else {
        if (ref) {
          ref.scrollTop = index * props.rowHeight - (props.rootHeight - props.rowHeight)
        }
      }
    }
    if (props.selectTrigger === 'arrow') {
      props.onSelect(props.items[index], index)
    }
  })

  return (
    <Scrollbar
      onScroll={props.onScroll}
      maxHeight={`${props.rootHeight}px`}
      contentStyle={props.contentStyle}
      color='var(--jg-fg4)'
      scrollRef={setScrollRef}
      class={props.class}
    >
      <div
        tabIndex={0}
        class='jg-listbox'
        role='listbox'
        onKeyDown={handleKeyDown}
        style={props.ulStyle}
        ref={listRef}
      >
        <For
          fallback={props.fallback}
          each={props.visibleItems || props.items.map((item, index) => ({ value: item, index }))}
        >
          {(item) => {
            return (
              <div
                tabIndex={-1}
                class={props.itemClass || 'jg-listbox-item'}
                role='option'
                style={{
                  height: `${props.rowHeight}px`,
                }}
                aria-selected={props.selectIndex.includes(item.index)}
                onClick={() => props.onSelect(item.value, item.index)}
                data-index={item.index}
                data-selected={dataIf(props.selectIndex.includes(item.index))}
                data-highlight={dataIf(item.index === hlIndex())}
              >
                <div class='jg-listbox-item-inner'>{props.children(item.value, item.index)}</div>
              </div>
            )
          }}
        </For>
      </div>
    </Scrollbar>
  )
}
