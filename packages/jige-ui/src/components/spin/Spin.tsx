import type { JSX } from 'solid-js/jsx-runtime'

import styles from 'sass:./spin.scss'
import { Show, mergeProps } from 'solid-js'
import { mountStyle } from 'jige-utils'

function NormalRotateSpin(props: {
  size?: number
}) {
  const realProps = mergeProps({ size: 12 }, props)

  const SpinItem = () => (
    <div
      style={{
        width: `${realProps.size}px`,
        height: `${realProps.size}px`,
      }}
    />
  )

  return (
    <div
      class='jg-spin-normal'
      style={{
        width: `${realProps.size * 2.5}px`,
        height: `${realProps.size * 2.5}px`,
      }}
    >
      <SpinItem />
      <SpinItem />
      <SpinItem />
      <SpinItem />
    </div>
  )
}

export function Spin(props: {
  spinning?: boolean
  percent?: number
  children?: JSX.Element
  size?: number
}) {
  mountStyle(styles, 'jige-ui-spin')

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <Show when={props.spinning}>
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            inset: 0,
          }}
        >
          <NormalRotateSpin size={props.size} />
        </div>
      </Show>
      <div
        classList={{
          'jg-spin-is-spinning': props.spinning,
        }}
        style={{
          transition: 'opacity 0.3s',
        }}
      >
        {props.children}
      </div>
    </div>
  )
}
