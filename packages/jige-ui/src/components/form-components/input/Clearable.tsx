import { InputCore } from 'jige-core'
import { Show } from 'solid-js'
import { CloseLargeFill } from '~/components/icons'

export function Clearable(props: {
  hasSuffix?: boolean
}) {
  const [state, actions] = InputCore.useContext()
  return (
    <Show when={state.value}>
      <button
        type='button'
        class='jg-input-clear'
        onClick={() => {
          actions.setValue('')
        }}
        onMouseDown={(e) => e.preventDefault()}
        style={{
          right: props.hasSuffix ? '28px' : '8px',
        }}
      >
        <CloseLargeFill />
      </button>
    </Show>
  )
}
