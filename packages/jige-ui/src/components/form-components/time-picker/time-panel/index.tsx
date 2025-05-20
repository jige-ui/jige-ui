import { mountStyle, watch } from 'solid-uses'
import { context } from './context'

import css from 'sass:./time-panel.scss'
import { FakeScrollArea } from './FakeScrollArea'
import { list, max } from 'radash'
import { createMemo, Show } from 'solid-js'
import { CheckFill, CloseFill } from '~/components/icons'
import { Button } from '~/components/button'

export function TimePanel(props: {
  itemHeight: number
  width: number
  type: 'hour' | 'minute' | 'second'
  hour?: number
  minute?: number
  second?: number
  onConfirm?: (hour: number, minute: number, second: number) => void
  onCancel?: () => void
  onChange?: (hour: number, minute: number, second: number) => void
}) {
  mountStyle(css, 'jige-time-panel')
  const Context = context.initial({
    hour: () => props.hour,
    minute: () => props.minute,
    second: () => props.second,
  })
  const [state, actions] = Context.value

  const typeIndex = createMemo(() => {
    return ['hour', 'minute', 'second'].indexOf(props.type)
  })

  watch(
    () => [state.hour, state.minute, state.second],
    ([h, m, s]) => {
      props.onChange?.(h, m, s)
    },
  )

  return (
    <Context.Provider>
      <div style={{ width: `${props.width}px`, display: 'flex', 'flex-direction': 'column' }}>
        <div style={{ width: '100%', display: 'flex', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: `${Math.floor(7 / 2) * props.itemHeight}px`,
              left: '2px',
              right: '2px',
              height: `${props.itemHeight}px`,
              'border-radius': '4px',
              'background-color': 'var(--jg-t-hl)',
            }}
          />
          <FakeScrollArea
            items={list(0, 23).map((v) => ({
              label: v.toString().padStart(2, '0'),
              value: v,
            }))}
            value={state.hour}
            itemHeight={props.itemHeight}
            thumbStyle={{
              display: 'none',
            }}
            onChange={actions.setHour}
          />
          <Show when={typeIndex() > 0}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${props.width / (typeIndex() + 1)}px`,
                width: '1px',
                background: 'var(--jg-t-border)',
              }}
            />
            <FakeScrollArea
              items={list(0, 59).map((v) => ({
                label: v.toString().padStart(2, '0'),
                value: v,
              }))}
              value={state.minute}
              itemHeight={props.itemHeight}
              onChange={actions.setMinute}
              thumbStyle={{
                display: 'none',
              }}
            />
          </Show>
          <Show when={typeIndex() > 1}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${2 * (props.width / (typeIndex() + 1))}px`,
                width: '1px',
                background: 'var(--jg-t-border)',
              }}
            />
            <FakeScrollArea
              items={list(0, 59).map((v) => ({
                label: v.toString().padStart(2, '0'),
                value: v,
              }))}
              itemHeight={props.itemHeight}
              value={state.second}
              onChange={actions.setSecond}
              thumbStyle={{
                display: 'none',
              }}
            />
          </Show>
        </div>
        <div
          style={{
            display: 'flex',
            'justify-content': 'space-between',
            padding: '4px',
            'border-top': '1px solid var(--jg-t-border)',
          }}
        >
          <Button
            variant='text'
            style={{ width: '100%', 'flex-shrink': 1 }}
            icon={<CheckFill />}
            size={max([props.width / 5, 24])}
            onClick={() => {
              props.onConfirm?.(state.hour, state.minute, state.second)
            }}
          />
          <Button
            variant='text'
            size={max([props.width / 5, 24])}
            style={{ width: '100%', 'flex-shrink': 1 }}
            icon={<CloseFill />}
            onClick={() => {
              props.onCancel?.()
            }}
          />
        </div>
      </div>
    </Context.Provider>
  )
}
