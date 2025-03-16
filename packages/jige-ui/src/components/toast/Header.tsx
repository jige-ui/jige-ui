import { Match, Switch, createMemo } from 'solid-js'
import { Button } from '../button'
import {
  CheckboxCircleFill,
  CloseCircleFill,
  CloseLargeFill,
  InfoFill,
  WarningFill,
} from '../icons'

export function Header(props: {
  type: 'error' | 'warning' | 'success' | 'info'
  title: string
  onCloseClick: () => void
}) {
  const color = createMemo(() => {
    switch (props.type) {
      case 'error':
        return 'var(--jg-fg-danger)'
      default:
        return `var(--jg-fg-${props.type})`
    }
  })
  return (
    <>
      <div
        style={{
          display: 'flex',
          'align-items': 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: color(),
            'font-size': '1.18em',
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
            <Match when={props.type === 'info'}>
              <InfoFill />
            </Match>
          </Switch>
        </div>
        <div
          style={{
            'margin-left': '8px',
            'font-size': '1.07em',
          }}
        >
          {props.title}
        </div>
      </div>
      <Button
        variant='text'
        onClick={() => {
          props.onCloseClick()
        }}
        icon={<CloseLargeFill />}
        color='var(--jg-fg4)'
        style={{
          opacity: 0.85,
          'font-size': '.8em',
        }}
      />
    </>
  )
}
