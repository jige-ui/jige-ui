import { Show } from 'solid-js'
import { context } from './context'
import IconFluentMoreHorizontal24Filled from '~icons/fluent/more-horizontal-24-filled'

export function LoadingIcon() {
  const [state] = context.useContext()
  return (
    <Show when={state.loading}>
      <div class='jg-btn-loading'>
        <IconFluentMoreHorizontal24Filled />
      </div>
    </Show>
  )
}
