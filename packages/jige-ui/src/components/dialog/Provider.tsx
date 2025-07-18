import css from 'sass:./dialog.scss'
import { ModalCore } from 'jige-core'
import { createWatch, makeEventListener, mountStyle } from 'jige-utils'
import { For, onMount } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'

import { Modal } from '../modal'
import { useModalContext } from '../modal/context'
import { Footer } from './Footer'
import { Header } from './Header'
import { context } from './context'

function ModalCloseHandle(props: {
  id: string
}) {
  const [modalState] = ModalCore.useContext()
  const [state, actions] = context.useContext()
  const [jgModalState, jgModalActs] = useModalContext()

  createWatch(
    () => modalState.status,
    (s) => {
      if (s === 'closed') {
        actions.removeInst(props.id)
      }
    },
  )

  if (!jgModalState.triggerRef) jgModalActs.setState('triggerRef', state.maybeTriggerRef)

  return <></>
}

export function Provider(props: {
  children: JSX.Element
}) {
  mountStyle(css, 'jige-ui-dialog')

  const Context = context.initial()
  const [state, actions] = Context.value

  onMount(() => {
    makeEventListener(document, 'mouseup', (e) => {
      if (e.target === document.body) return

      actions.setMaybeTriggerRef(e.target as HTMLElement)
    })
  })

  return (
    <Context.Provider>
      {props.children}
      <For each={state.insts}>
        {(item) => {
          return (
            <Modal open={true}>
              <ModalCloseHandle id={item.id} />
              <Modal.Content width='450px' footer={null} header={null}>
                <div class='jg-dialog-content'>
                  <div class='jg-dialog-header'>
                    <Header
                      type={item.type}
                      title={item.title}
                      onCloseClick={item.onNegativeClick}
                    />
                  </div>
                  <div class='jg-dialog-body'>{item.content}</div>
                  <div class='jg-dialog-footer'>
                    <Footer
                      type={item.type}
                      positiveText={item.positiveText === undefined ? '确定' : item.positiveText}
                      negativeText={item.negativeText === undefined ? '取消' : item.negativeText}
                      onPositiveClick={item.onPositiveClick}
                      onNegativeClick={item.onNegativeClick}
                    />
                  </div>
                </div>
              </Modal.Content>
            </Modal>
          )
        }}
      </For>
    </Context.Provider>
  )
}
