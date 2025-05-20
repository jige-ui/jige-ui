import { combineStyle, dataIf, uiRefreshDo } from 'jige-core'
import { createMemo, createSignal, For, type JSX, mergeProps, onMount } from 'solid-js'
import { watch } from 'solid-uses'

export function FakeScrollArea<TValue extends string | number>(props: {
  value: TValue
  items: { label: string; value: TValue }[]
  itemHeight?: number
  style?: string | JSX.CSSProperties
  thumbStyle?: string | JSX.CSSProperties
  visibleItems?: number
  onChange: (item: TValue) => void
}) {
  const realProps = mergeProps(
    {
      itemHeight: 24,
      visibleItems: 7,
    },
    props,
  )
  const [currIndex, setCurrIndex] = createSignal(0)
  const overScan = createMemo(() => {
    return Math.ceil(realProps.visibleItems / 2) + 3
  })
  const shouldFake = createMemo(() => {
    return realProps.items.length > realProps.visibleItems
  })

  const renderItems = createMemo(() => {
    if (shouldFake()) {
      const items = [...realProps.items, ...realProps.items, ...realProps.items]
      const startIndex = realProps.items.length - overScan()
      const endIndex = 2 * realProps.items.length + overScan()
      return items.slice(startIndex, endIndex)
    }
    return props.items
  })

  const [isScrolling, setIsScrolling] = createSignal(false)
  const handleOnWheel = (e: WheelEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const { deltaY } = e
    const index = currIndex()
    const newIndex = deltaY > 0 ? index + 1 : index - 1
    if (shouldFake()) {
      setCurrIndex(newIndex)
    } else {
      if (newIndex < 0) {
        setCurrIndex(props.items.length - 1)
      } else if (newIndex >= props.items.length) {
        setCurrIndex(0)
      } else {
        setCurrIndex(newIndex)
      }
    }
  }

  const translateY = createMemo(() => {
    const centerHeight = Math.floor(realProps.visibleItems / 2) * realProps.itemHeight
    const overScanHeight = overScan() * realProps.itemHeight
    return -currIndex() * realProps.itemHeight + centerHeight - overScanHeight
  })

  let ref!: HTMLDivElement

  watch(
    () => realProps.value,
    (v) => {
      if (v !== currItem().value) {
        const index = realProps.items.findIndex((item) => item.value === v)
        if (index >= 0) {
          setCurrIndex(index)
        }
      }
    },
  )

  const realIndex = createMemo(() => {
    let index = currIndex()
    if (index < 0) {
      index = realProps.items.length + (index % realProps.items.length)
    }
    if (index >= realProps.items.length) {
      index = index % realProps.items.length
    }
    return index
  })

  const currItem = createMemo(() => {
    return realProps.items[realIndex()]
  })

  watch(currItem, (newItem) => {
    if (newItem.value !== props.value) {
      props.onChange(newItem.value)
    }
  })

  const checkPos = () => {
    if (currIndex() < 0 || currIndex() >= realProps.items.length) {
      setCurrIndex(realIndex())
      ref.style.transition = 'none'
      uiRefreshDo(() => {
        ref.style.transition = 'transform 0.2s ease'
      })
    }
  }

  onMount(() => {
    uiRefreshDo(() => {
      ref.style.transition = 'transform 0.2s ease'
    })
  })

  return (
    <div
      class='jg-fake-scroll-area'
      onWheel={handleOnWheel}
      style={combineStyle(
        {
          height: `${realProps.itemHeight * realProps.visibleItems}px`,
          width: '100%',
        },
        realProps.style,
      )}
    >
      <div
        style={combineStyle(
          {
            position: 'absolute',
            height: `${realProps.itemHeight}px`,
            left: 0,
            right: 0,
            top: `${Math.floor(realProps.visibleItems / 2) * realProps.itemHeight}px`,
            'pointer-events': 'none',
            background: 'var(--jg-t-hl)',
          },
          realProps.thumbStyle,
        )}
      />
      <div
        ref={ref}
        style={{
          transform: `translateY(${translateY()}px)`,
        }}
        onTransitionEnd={() => {
          checkPos()
          setIsScrolling(false)
        }}
        onTransitionStart={() => {
          setIsScrolling(true)
        }}
      >
        <For each={renderItems()}>
          {(item) => {
            return (
              <div
                class='jg-fake-scroll-item'
                style={{
                  height: `${realProps.itemHeight}px`,
                  'pointer-events': isScrolling() ? 'none' : 'auto',
                }}
                onClick={() => {
                  props.onChange(item.value)
                }}
                data-selected={dataIf(item.value === currItem().value)}
              >
                <div class='jg-fake-scroll-item-inner'>{item.label}</div>
              </div>
            )
          }}
        </For>
      </div>
    </div>
  )
}
