import { createElementBounds } from '@solid-primitives/bounds'
import { mergeRefs } from '@solid-primitives/refs'
import { throttle } from '@solid-primitives/scheduled'
import { createWatch } from 'jige-utils'
import type { JSX } from 'solid-js'
import { createSignal, splitProps } from 'solid-js'
import context from './context'

export default function Content(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [, action] = context.useContext()
  const [local, others] = splitProps(props, ['ref'])
  const [scrollRef, setScrollRef] = createSignal<HTMLDivElement | null>(null)

  const bounds = createElementBounds(scrollRef)
  const throttleSetValue = throttle(action.setValue, 35)
  createWatch([() => bounds.height, () => bounds.width], () => {
    throttleSetValue()
    console.log(2)
  })

  return <div {...others} ref={mergeRefs(local.ref, setScrollRef)} />
}
