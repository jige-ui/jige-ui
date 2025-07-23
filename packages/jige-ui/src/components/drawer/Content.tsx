import { ModalCore, callMaybeContextChild, combineStyle, undefinedOr } from 'jige-core'
import { createMemo, mergeProps } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { RootContext } from '../ROOT/context'

export function Content(props: {
  children: Parameters<typeof ModalCore.Content>['0']['children']
  style?: string | JSX.CSSProperties
  zIndex?: number
  width?: string
  header?: JSX.Element
  footer?: JSX.Element
  position?: 'left' | 'right' | 'top' | 'bottom'
}) {
  const [rs] = RootContext.useContext()
  const realProps = mergeProps(
    {
      width: '258px',
      position: 'right',
    },
    props,
  )

  const isVertical = createMemo(() => props.position === 'top' || props.position === 'bottom')

  const translate3d = createMemo(() => {
    switch (realProps.position) {
      case 'left':
        return '-100%, 0, 0'
      case 'right':
        return '100%, 0, 0'
      case 'top':
        return '0, -100%, 0'
      case 'bottom':
        return '0, 100%, 0'
      default:
        return '0, 0, 0'
    }
  })

  const styles = createMemo<JSX.CSSProperties>(() => {
    return {
      'z-index': undefinedOr(props.zIndex, rs.zIndexConfig.modal),
      width: isVertical() ? undefined : realProps.width,
      height: isVertical() ? realProps.width : undefined,
      top: isVertical() ? (realProps.position === 'top' ? 0 : undefined) : 0,
      bottom: isVertical() ? (realProps.position === 'bottom' ? 0 : undefined) : 0,
      left: isVertical() ? 0 : realProps.position === 'left' ? 0 : undefined,
      right: isVertical() ? 0 : realProps.position === 'right' ? 0 : undefined,
      '--translate-3d': translate3d(),
      position: 'absolute',
    }
  })

  return (
    <ModalCore.Portal>
      <ModalCore.Mask
        class='jg-drawer-mask'
        style={{
          'z-index': undefinedOr(props.zIndex, rs.zIndexConfig.modal),
        }}
      />
      <ModalCore.Content
        style={{
          'z-index': undefinedOr(props.zIndex, rs.zIndexConfig.modal),
        }}
      >
        {(state, actions, staticData) => (
          <div
            class='jg-drawer-content'
            data-status={state.status}
            style={combineStyle(styles(), props.style)}
          >
            {callMaybeContextChild([state, actions, staticData], props.children)}
          </div>
        )}
      </ModalCore.Content>
    </ModalCore.Portal>
  )
}
