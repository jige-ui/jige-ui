import { Ref } from '@solid-primitives/refs'
import { ModalCore } from 'jige-core'
import { onMount } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { useEventListener } from 'solid-uses'

export function Close(props: {
  children: JSX.Element
}) {
  let ref!: HTMLElement

  const [, modalActs] = ModalCore.useContext()

  onMount(() => {
    useEventListener(ref, 'click', () => {
      modalActs.setOpen(false)
    })
  })

  return <Ref ref={ref}>{props.children}</Ref>
}
