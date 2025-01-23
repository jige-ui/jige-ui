import type { JSX } from 'solid-js'

export function Root(props: {
  children: JSX.Element
}) {
  return (
    <div class="flex b b-t-border rounded-md p-1 m-1">
      {props.children}
    </div>
  )
}
