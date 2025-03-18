import { Button, Listbox, Popover } from 'jige-ui'
import { list } from 'radash'
import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

export function Demo() {
  const [p, setP] = createStore({
    disabled: false,
    arrow: true,
    trigger: 'click',
    placement: 'top',
  })

  const [selected, setSelected] = createSignal([1])

  return (
    <Playground>
      <Playground.MainArea>
        <Popover disabled={p.disabled} trigger={p.trigger as any} placement={p.placement as any}>
          <Popover.Trigger>
            <Button>{p.trigger} me</Button>
          </Popover.Trigger>
          <Popover.Content
            arrow={p.arrow}
            style={{
              padding: 0,
            }}
          >
            <div>
              <Listbox
                rootHeight={240}
                items={list(10)}
                rowHeight={34}
                selectIndex={selected()}
                onSelect={(_item, index) => {
                  if (selected().includes(index)) {
                    setSelected(selected().filter((i) => i !== index))
                  } else setSelected([...selected(), index])
                }}
              >
                {(item) => (
                  <div
                    style={{
                      width: '100px',
                    }}
                  >
                    {item}
                  </div>
                )}
              </Listbox>
            </div>
          </Popover.Content>
        </Popover>
      </Playground.MainArea>
      <Playground.PropertySetting
        properties={p}
        onChange={setP}
        typeDeclaration={{
          trigger: ['hover', 'click', 'manual'],
          placement: [
            'top',
            'right',
            'bottom',
            'left',
            'top-start',
            'top-end',
            'right-start',
            'right-end',
            'bottom-start',
            'bottom-end',
            'left-start',
            'left-end',
          ],
        }}
      />
    </Playground>
  )
}
