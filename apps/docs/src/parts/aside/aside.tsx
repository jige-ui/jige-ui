import routeInfo from 'virtual:route-info'
import { Scrollbar } from 'jige-ui'
import { For } from 'solid-js'

function ItemHeader(props: {
  title: string
}) {
  return <div class='b-b b-t-border pb-1 mt-2 c-fg3'>{props.title}</div>
}

function Item(props: {
  title: string
  path: string
}) {
  return (
    <a class='p-1 flex rounded-md hover:bg-bg3-hover' href={props.path}>
      {props.title}
    </a>
  )
}

export function Aside() {
  return (
    <Scrollbar class='h-full p-2'>
      <ItemHeader title='Getting Started' />
      <div class='p-2'>
        <ul class='list-disc list-inside'>
          <li>Installation</li>
          <li>Usage</li>
        </ul>
      </div>
      <ItemHeader title='Components' />
      <div class='p-1'>
        <For each={routeInfo.filter((v) => v.path.startsWith('component'))}>
          {({ path, info }) => <Item title={info.title} path={`/${path}`} />}
        </For>
      </div>
    </Scrollbar>
  )
}
