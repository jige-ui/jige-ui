import scrollCss from 'sass:./scrollbar.scss'
import { ScrollbarCore, combineStyle, runSolidEventHandler } from 'jige-core'
import type { JSX, Ref } from 'solid-js'
import { Show, createMemo, createSignal } from 'solid-js'
import { mountStyle } from 'solid-uses'

function GmScrollBar(props: {
  type: 'vertical' | 'horizontal'
  hidden: boolean
  position?: { top?: string; left?: string; right?: string; bottom?: string; 'z-index'?: number }
  color?: string
}) {
  const state = ScrollbarCore.useContext()[0]
  const isVertical = createMemo(() => props.type === 'vertical')
  const classes = createMemo(() => {
    const base = ['jg-scrollbar']
    if (isVertical()) base.push('jg-scrollbar-vertical')
    else base.push('jg-scrollbar-horizontal')

    if (props.hidden) base.push('is-hidden')
    if (state.isDragging) base.push('is-dragging')
    return base.join(' ')
  })
  const pos = createMemo(() => {
    if (isVertical()) {
      return Object.assign({ top: '2px', right: '2px', bottom: '2px' }, props.position)
    }
    return Object.assign({ left: '2px', right: '12px', bottom: '2px' }, props.position)
  })
  return (
    <ScrollbarCore.Bar type={props.type} class={classes()} style={pos()}>
      <ScrollbarCore.Thumb
        type={props.type}
        class='jg-scrollbar-thumb'
        style={{ background: props.color || 'var(--jg-t-hl-lighter)' }}
      />
    </ScrollbarCore.Bar>
  )
}

export function Scrollbar(props: {
  children: JSX.Element
  color?: string
  hideVertical?: boolean
  verticalPos?: { top?: string; left?: string; right?: string; bottom?: string; 'z-index'?: number }
  horizontalPos?: {
    top?: string
    left?: string
    right?: string
    bottom?: string
    'z-index'?: number
  }
  hideHorizontal?: boolean
  class?: string
  height?: string
  maxHeight?: string
  always?: boolean
  onScroll?: JSX.EventHandlerUnion<HTMLDivElement, Event>
  onClick?: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>
  contentStyle?: string | JSX.CSSProperties
  scrollRef?: Ref<HTMLDivElement>
}) {
  mountStyle(scrollCss, 'jige-ui-scrollbar')
  const [hidden, setHidden] = createSignal(true)
  const [isScrolling, setIsScrolling] = createSignal(false)
  return (
    <ScrollbarCore
      class={props.class}
      height={props.height}
      maxHeight={props.maxHeight}
      onMouseEnter={() => {
        !props.always && setHidden(false)
      }}
      onMouseLeave={() => {
        !props.always && setHidden(true)
      }}
      onClick={props.onClick}
    >
      <ScrollbarCore.ScrollArea
        onScroll={(e) => {
          setIsScrolling(true)
          runSolidEventHandler(e, props.onScroll)
        }}
        onScrollEnd={() => {
          setIsScrolling(false)
        }}
        ref={props.scrollRef}
      >
        <ScrollbarCore.Content
          style={combineStyle(
            {
              'user-select': isScrolling() ? 'none' : 'auto',
            },
            props.contentStyle,
          )}
        >
          {props.children}
        </ScrollbarCore.Content>
      </ScrollbarCore.ScrollArea>
      <Show when={!props.hideVertical}>
        <GmScrollBar
          type='vertical'
          hidden={hidden()}
          color={props.color}
          position={props.verticalPos}
        />
      </Show>

      <Show when={!props.hideHorizontal}>
        <GmScrollBar
          type='horizontal'
          hidden={hidden()}
          color={props.color}
          position={props.horizontalPos}
        />
      </Show>
    </ScrollbarCore>
  )
}
