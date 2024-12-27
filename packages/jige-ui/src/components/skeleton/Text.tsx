import { list } from 'radash'
import { createMemo, For, Show } from 'solid-js'
import { Node } from './Node'

export function Text(props: {
  rows?: number
  width?: string
  fontSize?: number
}) {
  const height = createMemo(() => props.fontSize || 14)
  const rows = createMemo(() => props.rows || 1)
  return (
    <div style={{
      'display': 'flex',
      'flex-direction': 'column',
      'gap': '8px',
      'width': props.width || '100%',
    }}
    >
      <Show when={rows() > 1}>
        <For each={list(rows() - 2)}>
          {() => (
            <Node
              width="100%"
              height={`${height()}px`}
              radius="4px"
            />
          )}
        </For>
      </Show>
      <Node
        width="68%"
        height={`${height()}px`}
        radius="4px"
      />
    </div>
  )
}
