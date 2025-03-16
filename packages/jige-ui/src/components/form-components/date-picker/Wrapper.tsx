import type { JSX } from 'solid-js/jsx-runtime'
import { Popover } from '../../popover'

export function Wrapper(props: {
  children: JSX.Element
}) {
  return (
    <Popover.Content
      onMouseDown={(e) => {
        e.preventDefault()
      }}
    >
      {props.children}
    </Popover.Content>
  )
}
