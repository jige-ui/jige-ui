import type { JSX } from 'solid-js/jsx-runtime'
import css from 'sass:./toast.scss'
import { For } from 'solid-js'
import { Portal } from 'solid-js/web'

import { mountStyle } from 'solid-uses'
import { JigeRootContext } from '../ROOT'
import { context } from './context'
import { Toast } from './Toast'

export function Provider(props: {
  children: JSX.Element
  defaultTimeout?: number
  zIndex?: number
}) {
  mountStyle(css, 'jige-ui-toast')

  const Context = context.initial({
    defaultTimeout: () => props.defaultTimeout,
  })
  const [state] = Context.value
  const [rootState] = JigeRootContext.useContext()

  return (
    <Context.Provider>
      {props.children}
      <Portal mount={document.body}>
        <div
          class="jg-toast-container"
          style={{
            'z-index': rootState.zIndexConfig.toast,
          }}
        >
          <For each={state.insts}>
            {(item) => {
              return (
                <Toast inst={{
                  ...item,
                  timeout: item.timeout || state.defaultTimeout,
                }}
                />
              )
            }}
          </For>
        </div>
      </Portal>
    </Context.Provider>
  )
}
