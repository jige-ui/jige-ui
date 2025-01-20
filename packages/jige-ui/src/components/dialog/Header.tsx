import { ModalCore } from 'jige-core'
import { createMemo, Match, Switch } from 'solid-js'
import { Button } from '../button'
import { CheckboxCircleFill, CloseCircleFill, CloseLargeFill, WarningFill } from '../icons'

export function Header(props: {
  type: 'error' | 'warning' | 'success'
  title: string
  onCloseClick?: () => void
}) {
  const [, actions] = ModalCore.useContext()
  const color = createMemo(() => {
    switch (props.type) {
      case 'error':
        return 'var(--jg-fg-danger)'
      case 'success':
        return 'var(--jg-fg-success)'
      case 'warning':
        return 'var(--jg-fg-warning)'
    }
  })
  return (
    <>
      <div style={{
        'display': 'flex',
        'align-items': 'center',
      }}
      >

        <div style={{
          'color': color(),
          'font-size': '26px',
        }}
        >
          <Switch>
            <Match when={props.type === 'error'}>
              <CloseCircleFill />
            </Match>
            <Match when={props.type === 'success'}>
              <CheckboxCircleFill />
            </Match>
            <Match when={props.type === 'warning'}>
              <WarningFill />
            </Match>
          </Switch>

        </div>
        <div style={{
          'margin-left': '8px',
          'font-size': '18px',
        }}
        >
          {props.title}
        </div>
      </div>
      <Button
        variant="text"
        onClick={() => {
          actions.setOpen(false)
          props.onCloseClick?.()
        }}
        icon={<CloseLargeFill />}
        color="var(--jg-fg4)"
        style={{
          opacity: 0.85,
        }}
      />
    </>
  )
}
