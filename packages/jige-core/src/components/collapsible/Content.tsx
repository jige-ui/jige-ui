import { combineStyle, getElementHeight, hasAnimation } from '@/common/dom'
import type { PropsWithContextChild } from '@/common/props'
import { callMaybeContextChild } from '@/common/props'
import { runSolidEventHandler } from '@/common/solidjs'
import { mergeRefs } from '@solid-primitives/refs'
import { createWatch } from 'jige-utils'
import type { JSX } from 'solid-js'
import { Show, createSignal, onMount, splitProps } from 'solid-js'
import context from './context'

function CollapsibleContentMain(
  props: PropsWithContextChild<
    ReturnType<typeof context.useContext>,
    JSX.HTMLAttributes<HTMLDivElement>
  >,
) {
  const [localProps, otherProps] = splitProps(props, ['ref', 'style', 'children', 'onAnimationEnd'])
  const [state, actions] = context.useContext()
  const [height, setHeight] = createSignal<0 | string | undefined>()
  let ref!: HTMLDivElement

  onMount(() => {
    createWatch([() => state.status], () => {
      if (state.status.endsWith('ing')) {
        setHeight(`${getElementHeight(ref)}px`)
        if (!hasAnimation(ref)) {
          actions.setState('status', state.status.replace('ing', 'ed') as any)
        }
      }
    })
  })

  return (
    <div
      {...otherProps}
      data-col-status={state.status}
      style={combineStyle({ '--el-height': height() }, localProps.style)}
      onAnimationEnd={(e) => {
        if (state.status === 'opening') {
          actions.setState('status', 'opened')
        }
        if (state.status === 'closing') {
          actions.setState('status', 'closed')
        }
        runSolidEventHandler(e, localProps.onAnimationEnd)
      }}
      ref={mergeRefs(localProps.ref, (r) => {
        ref = r
      })}
    >
      {callMaybeContextChild(context.useContext(), localProps.children)}
    </div>
  )
}

export function Content(props: { children: JSX.Element; class?: string }) {
  const [state] = context.useContext()

  return (
    <Show when={state.status !== 'closed'}>
      <CollapsibleContentMain class={props.class}>{props.children}</CollapsibleContentMain>
    </Show>
  )
}
