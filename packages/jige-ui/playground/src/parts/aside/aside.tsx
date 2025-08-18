import routeInfo from 'virtual:route-info';
import { For } from 'solid-js';
import { camel } from 'solid-tiny-utils';
import { Scrollbar } from '~/build';

function ItemHeader(props: { title: string }) {
  return <div class="b-b b-t-border c-fg3 mt-2 pb-1">{props.title}</div>;
}

function Item(props: { title: string; path: string }) {
  return (
    <a class="flex rounded-md p-1 hover:bg-bg3-hover" href={props.path}>
      {props.title}
    </a>
  );
}

export function Aside() {
  return (
    <Scrollbar class="h-full p-2">
      <ItemHeader title="Components" />
      <div class="p-1">
        <For each={routeInfo.filter((v) => v.path.startsWith('component'))}>
          {({ path, info }) => (
            <Item path={`/${path}`} title={camel(info.title)} />
          )}
        </For>
      </div>
    </Scrollbar>
  );
}
