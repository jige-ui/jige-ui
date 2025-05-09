import routes from 'virtual:pages'
import { Router, useCurrentMatches } from '@solidjs/router'
import { esday } from 'esday'
import { Scrollbar } from 'jige-ui'
import { Suspense, createMemo, onMount } from 'solid-js'
import { useEventListener, watch } from 'solid-uses'
import { Aside } from './parts/aside'
import { Header } from './parts/header'
import { useAppState } from './state/app-state'

function RouteWrapper(props: {
  children: any
}) {
  const matches = useCurrentMatches()
  const info = createMemo(() => {
    const m = matches()
    if (m.length === 0) return {}
    return m[m.length - 1].route.info || {}
  })
  return (
    <div class='p-2'>
      <div class='text-2xl fw-bold'>{info().title}</div>
      <div class='text-sm flex gap-1 items-center'>
        <span>updated:</span>
        <span>{esday(info().updated).format('YYYY-MM-DD')}</span>
      </div>
      <div class='p-2'>{props.children}</div>
    </div>
  )
}

export function App() {
  const [state] = useAppState()

  watch(
    () => state.isDark,
    (d) => {
      document.body.classList.toggle('dark', d)
    },
  )

  let timer: NodeJS.Timeout

  onMount(() => {
    useEventListener('resize', () => {
      document.body.classList.add('no-transition')
      clearTimeout(timer)
      timer = setTimeout(() => {
        document.body.classList.remove('no-transition')
      }, 200)
    })
  })
  return (
    <Router
      root={(props) => (
        <div class='flex h-screen w-screen flex-col bg-t-bg2'>
          <div class='h-45px w-full bg-t-bg2 '>
            <Header />
          </div>
          <div class='h-[calc(100%-45px)] flex w-full'>
            <div class='h-full w-185px bg-t-bg2 '>
              <Aside />
            </div>
            <Suspense>
              <Scrollbar class='w-[calc(100%-185px)] bg-t-bg1 b-rd-tl-2xl b b-t-border'>
                <RouteWrapper>{props.children}</RouteWrapper>
              </Scrollbar>
            </Suspense>
          </div>
        </div>
      )}
    >
      {routes}
    </Router>
  )
}
