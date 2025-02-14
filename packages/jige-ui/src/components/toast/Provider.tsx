import type { JSX } from 'solid-js/jsx-runtime'
import css from 'sass:./toast.scss'
import { For } from 'solid-js'
import { Portal } from 'solid-js/web'

import { mountStyle } from 'solid-uses'
import { context } from './context'
import { Toast } from './Toast'

export function Provider(props: {
  children: JSX.Element
}) {
  mountStyle(css, 'jige-ui-toast')

  const Context = context.initial()
  const [state] = Context.value

  return (
    <Context.Provider>
      {props.children}
      <Portal mount={document.body}>
        <div class="jg-toast-container">
          <For each={state.insts}>
            {(item) => {
              return (
                <Toast inst={item} />
              )
            }}
          </For>
        </div>
      </Portal>
    </Context.Provider>
  )
}
