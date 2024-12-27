import type { JSX } from 'solid-js/jsx-runtime'
import { ModalCore } from 'jige-core'
import { context } from './context'

export function Trigger(props: {
  children: JSX.Element
}) {
  const [,actions] = context.useContext()
  return (
    <ModalCore.Trigger ref={actions.setTriggerRef}>
      {props.children}
    </ModalCore.Trigger>
  )
}
