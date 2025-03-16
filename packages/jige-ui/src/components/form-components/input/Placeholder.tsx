import { InputCore } from 'jige-core'
import { Show } from 'solid-js'

export function Placeholder(props: {
  placeholder: string
}) {
  const state = InputCore.useContext()[0]

  return (
    <Show when={!state.value}>
      <div class='jg-input-placeholder'>{props.placeholder}</div>
    </Show>
  )
}
