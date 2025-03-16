import { getElementHeight, hasAnimation } from 'jige-core'
import { createSignal, onMount } from 'solid-js'
import { watch } from 'solid-uses'
import type { CloseableStatus } from '~/common/types'
import { Header } from './Header'
import { context } from './context'
import type { ToastInst } from './types'

export function Toast(props: {
  inst: ToastInst
}) {
  const [, actions] = context.useContext()
  let $bar!: HTMLDivElement
  let $wrapper!: HTMLDivElement

  const [pause, setPause] = createSignal(false)
  const [status, setStatus] = createSignal<CloseableStatus>('opening')

  onMount(() => {
    requestAnimationFrame(() => {
      $bar.style.width = '0'
    })

    watch(
      pause,
      (p) => {
        const percent = $bar.clientWidth / $bar.parentElement!.clientWidth
        if (p) {
          $bar.style.width = `${percent * 100}%`
          $bar.style.transition = 'none'
        } else {
          $bar.style.width = '0'
          $bar.style.transition = `width ${props.inst.timeout! * percent}ms linear`
        }
      },
      { defer: true },
    )

    watch(status, (s) => {
      $wrapper.style.setProperty('--height', `${getElementHeight($wrapper)}px`)
      if (s.endsWith('ing')) {
        if (!hasAnimation($wrapper)) {
          setStatus(status().replace('ing', 'ed') as CloseableStatus)
        }
      }

      if (s === 'closed') {
        actions.removeInst(props.inst.id)
      }
    })
  })

  return (
    <div
      class='jg-toast-wrapper'
      ref={$wrapper}
      data-status={status()}
      onAnimationEnd={() => {
        setStatus(status().replace('ing', 'ed') as CloseableStatus)
      }}
    >
      <div
        style={{
          'padding-top': '1em',
          'padding-right': '1em',
          'padding-left': '1em',
          'padding-bottom': '4px',
        }}
      >
        <div
          class='jg-toast'
          onMouseEnter={() => setPause(true)}
          onMouseLeave={() => setPause(false)}
        >
          <div class='jg-toast-header'>
            <Header
              type={props.inst.type}
              title={props.inst.title}
              onCloseClick={() => {
                setStatus('closing')
              }}
            />
          </div>
          <div class='jg-toast-body'>{props.inst.content}</div>
          <div class='jg-toast-progress'>
            <div
              class='jg-toast-progress-bar'
              style={{
                transition: `width ${props.inst.timeout}ms linear`,
              }}
              ref={$bar}
              onTransitionEnd={() => {
                setStatus('closing')
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
