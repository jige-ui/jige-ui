import { Paginator } from 'jige-ui'
import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

export function Demo() {
  const [p, setP] = createStore({
    disabled: false,
  })
  const [currPage, setCurrPage] = createSignal(3)
  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <Paginator
            total={87}
            currPage={currPage()}
            pageSize={8}
            onPageClick={(p) => {
              setCurrPage(p)
            }}
            disabled={p.disabled}
          />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting properties={p} onChange={setP} />

    </Playground>

  )
}
