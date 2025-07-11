import { createElementBounds } from '@solid-primitives/bounds'
import { mergeRefs } from '@solid-primitives/refs'
import { createWatch } from 'jige-utils'
import { type ComponentProps, createSignal, splitProps } from 'solid-js'
import context from './context'

export default function Table(props: ComponentProps<'div'>) {
  const Context = context.initial()
  const [local, others] = splitProps(props, ['ref'])
  const [state, actions] = Context.value
  const [ref, setRef] = createSignal<HTMLDivElement | null>(null)
  const bounds = createElementBounds(ref)

  createWatch([() => bounds.width, () => ({ ...state.manualWidths })], ([w]) => {
    if (w) {
      actions.refresh(w)
    }
  })

  return (
    <Context.Provider>
      <div ref={mergeRefs(local.ref, setRef)} {...others} />
    </Context.Provider>
  )
}
