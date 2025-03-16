import { Listbox } from 'jige-ui'
import { list } from 'radash'
import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

export function Demo() {
  const [s, setS] = createStore({
    disabled: false,
    virtual: true,
    length: 200,
  })

  const [value, setValue] = createSignal(67)
  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <div
            style={{
              width: '250px',
            }}
          >
            <Listbox
              items={list(s.length)}
              rootHeight={240}
              rowHeight={36}
              virtual={s.virtual}
              selectIndex={value()}
              onSelect={(item, index) => {
                setValue(index)
              }}
            >
              {(item) => item}
            </Listbox>
          </div>
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting properties={s} onChange={setS} />
    </Playground>
  )
}
