import type { JSX } from 'solid-js/jsx-runtime'
import context from './context'
import { createWatch } from 'jige-utils'

export function Root(props: {
  children: JSX.Element
  name?: string
  value?: string[]
  onChange?: (v: string[]) => void
  disabled?: boolean
}) {
  const Context = context.initial({
    disabled: () => props.disabled,
    value: () => props.value,
    name: () => props.name,
  })
  const [state] = Context.value

  createWatch(
    () => state.value,
    (v) => {
      props.onChange?.(v)
    },
  )

  return <Context.Provider>{props.children}</Context.Provider>
}
