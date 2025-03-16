import { Show } from 'solid-js'
import { IconThreeDots } from '../icons'
import { context } from './context'

export function LoadingIcon() {
  const [state] = context.useContext()
  return (
    <Show when={state.loading}>
      <div class='jg-btn-loading'>
        <IconThreeDots />
      </div>
    </Show>
  )
}
