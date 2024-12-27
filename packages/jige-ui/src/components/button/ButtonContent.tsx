import type { JSX } from 'solid-js/jsx-runtime'
import { children, Show } from 'solid-js'
import { watch } from 'solid-uses'
import { context } from './context'

export function ButtonContent(props: {
  children?: JSX.Element
  icon?: JSX.Element
  label?: string
}) {
  const [state, actions] = context.useContext()
  const child = children(() => props.children)
  const icon = children(() => props.icon)

  watch([() => props.label, () => child()], ([label, child]) => {
    actions.setIconOnly(!label && !child)
  })
  return (
    <div
      class="jg-btn-content"
      style={{
        opacity: state.loading ? 0 : 1,
      }}
    >
      <Show
        when={child()}
        fallback={(
          <>
            <Show when={icon()}>
              <div
                class="jg-btn-icon"
                style={{
                  'margin-right': props.label ? '0.375em' : '0',
                }}
              >
                {icon()}
              </div>
            </Show>
            <Show when={props.label}>
              <span>{props.label}</span>
            </Show>
          </>
        )}
      >
        {child()}
      </Show>
    </div>
  )
}