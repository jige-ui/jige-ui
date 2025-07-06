import { createWatch } from 'jige-utils'
import type { JSX } from 'solid-js'
import { Show, createSignal } from 'solid-js'

export function Remount(props: {
  remountWhenChange: any
  children: JSX.Element
}) {
  const [show, setShow] = createSignal(true)
  createWatch(
    () => props.remountWhenChange,
    () => {
      setShow(false)
      requestAnimationFrame(() => setShow(true))
    },
    { defer: true },
  )

  return <Show when={show()}>{props.children}</Show>
}
