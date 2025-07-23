import type { JSX } from 'solid-js'
import { Scrollbar } from '../scrollbar'

export function InnerContent(props: {
  children: JSX.Element
}) {
  return (
    <Scrollbar
      height='100%'
      contentStyle={{
        padding: '8px',
      }}
    >
      {props.children}
    </Scrollbar>
  )
}
