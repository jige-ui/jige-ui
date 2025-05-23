import { ModalCore, callMaybeContextChild, undefinedOr } from 'jige-core'
import { combineStyle } from 'jige-core'
import { Show, createSignal } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { watch } from 'solid-uses'
import { RootContext } from '../ROOT/context'
import { Footer } from './Footer'
import { Header } from './Header'
import { context } from './context'

function calcOrigin(triggerRef: HTMLElement, contentRef: HTMLElement) {
  contentRef.style.animationName = 'none'
  const triggerRect = triggerRef.getBoundingClientRect()
  const contentRect = contentRef.getBoundingClientRect()
  contentRef.style.animationName = ''

  const getCenter = (rect: DOMRect) => ({
    x: rect.left + (rect.right - rect.left) / 2,
    y: rect.top + (rect.bottom - rect.top) / 2,
  })

  const centerTrigger = getCenter(triggerRect)
  const centerContent = getCenter(contentRect)

  const originX = centerTrigger.x - centerContent.x + contentRect.width / 2
  const originY = centerTrigger.y - centerContent.y + contentRect.height / 2

  return [originX, originY]
}

export function Content(props: {
  children: Parameters<typeof ModalCore.Content>['0']['children']
  dynamicTransformOrigin?: boolean
  style?: string | JSX.CSSProperties
  zIndex?: number
  width?: string
  title?: string
  header?: JSX.Element
  hideClose?: boolean
  footer?: JSX.Element
  okText?: string
  cancelText?: string
  onOk?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
}) {
  const [state, actions] = context.useContext()
  const [rs] = RootContext.useContext()
  return (
    <ModalCore.Portal>
      <ModalCore.Mask
        class='jg-modal-mask'
        style={{
          'z-index': undefinedOr(props.zIndex, rs.zIndexConfig.modal),
        }}
      />
      <ModalCore.Content
        class='jg-modal-content-wrapper'
        style={{
          'z-index': undefinedOr(props.zIndex, rs.zIndexConfig.modal),
        }}
      >
        {(stat, acts, staticData) => {
          const [transformOrigin, setTransformOrigin] = createSignal('')
          watch(
            () => stat.status,
            (status) => {
              if (
                status === 'opened' ||
                status === 'closed' ||
                props.dynamicTransformOrigin === false
              ) {
                setTransformOrigin('center center')
                return
              }
              const { triggerRef, contentRef } = state

              if (!triggerRef || !triggerRef.isConnected || !contentRef) {
                setTransformOrigin('center center')
                return
              }
              const [originX, originY] = calcOrigin(triggerRef, contentRef)
              setTransformOrigin(`${originX}px ${originY}px`)
            },
          )

          return (
            <div
              data-modal-status={stat.status}
              class='jg-modal-content'
              ref={(el) => {
                actions.setState('contentRef', el)
              }}
              style={combineStyle(
                {
                  'transform-origin': transformOrigin(),
                  width: props.width || '520px',
                  top: '100px',
                  position: 'relative',
                },
                props.style,
              )}
            >
              <Show when={props.header !== null}>
                <Header label={props.title} hideClose={props.hideClose}>
                  {props.header}
                </Header>
              </Show>
              {callMaybeContextChild([stat, acts, staticData], props.children)}
              <Show when={props.footer !== null}>
                <Footer
                  okText={props.okText}
                  cancelText={props.cancelText}
                  onOk={props.onOk}
                  onCancel={props.onCancel}
                >
                  {props.footer}
                </Footer>
              </Show>
            </div>
          )
        }}
      </ModalCore.Content>
    </ModalCore.Portal>
  )
}
