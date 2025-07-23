import type { JSX } from 'solid-js'

export function Footer(props: {
  children: JSX.Element
}) {
  return <div class='jg-drawer-footer'>{props.children}</div>
}
