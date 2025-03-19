import { ModalCore } from 'jige-core'
import { combineStyle } from 'jige-core'
import { createSignal } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { watch } from 'solid-uses'
import { undefinedOr } from '~/common/types'
import { RootContext } from '../ROOT/context'
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
  const orginY = centerTrigger.y - centerContent.y + contentRect.height / 2

  return [originX, orginY]
}

export function Content(props: {
  children: JSX.Element
  dynamicTransformOrigin?: boolean
  style?: string | JSX.CSSProperties
  zIndex?: number
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
        {(stat) => {
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
              ref={actions.setContentRef}
              style={combineStyle({ 'transform-origin': transformOrigin() }, props.style)}
            >
              {props.children}
            </div>
          )
        }}
      </ModalCore.Content>
    </ModalCore.Portal>
  )
}
