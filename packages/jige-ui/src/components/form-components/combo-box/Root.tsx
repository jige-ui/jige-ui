import css from 'sass:./combo-box.scss'
import { FloatingUiCore } from 'jige-core'
import type { JSX } from 'solid-js/jsx-runtime'

import { createWatch, mountStyle } from 'jige-utils'
import { Form } from '~/components/form'
import { context } from './context'

function ThiftCheck() {
  const [fState] = FloatingUiCore.useContext()
  const [state, actions] = context.useContext()
  createWatch(
    () => fState.middlewareData.shift.y,
    (y) => {
      const $scroll = state.scrollElement
      if (!$scroll || !y) return

      const scrollTop = $scroll.scrollTop
      $scroll.scrollTop = scrollTop + y
      actions.setState('originY', state.originY - y)
    },
  )

  return <></>
}

export function Root<T>(props: {
  value?: T
  options: { label: string; value: T }[]
  onChange?: (value: T) => void
  disabled?: boolean
  placeholder: string
  children: JSX.Element
  disableBind: boolean
}) {
  mountStyle(css, 'jige-ui-combo-box')

  const Context = context.initial({
    disabled: () => props.disabled,
    value: () => props.value,
    options: () => props.options,
    placeholder: () => props.placeholder,
  })
  const [state, actions] = Context.value

  createWatch(
    () => state.value,
    (v) => {
      props.onChange?.(v)
    },
  )

  return (
    <Context.Provider>
      <Form.Bind
        propDisabled={props.disabled}
        value={state.value}
        setName={actions.setName}
        setValue={actions.setValue}
        setDisabled={actions.setDisabled}
        disableBind={props.disableBind}
      >
        <FloatingUiCore
          disabled={state.disabled}
          trigger='click'
          placement='bottom'
          floatingOption={{
            offset: ({ elements, rects }) => {
              const $scroll = elements.floating.querySelector('.jg-combo-box-scrollarea')!
                .firstChild as HTMLElement
              if (state.valueIndex === -1) return 0
              const totalHeight = state.valueIndex * state.listItemHeight
              const scrollTop = totalHeight - rects.floating.height / 2 + state.listItemHeight / 2
              $scroll.scrollTop = scrollTop
              actions.setState('scrollElement', $scroll)
              const toTop = totalHeight - $scroll.scrollTop + state.listItemHeight
              actions.setState('originY', totalHeight - $scroll.scrollTop)
              return -toTop - 8
            },
            flip: false,
            shift: {
              crossAxis: true,
            },
            size: {
              apply({ rects }) {
                actions.setState({
                  listItemHeight: rects.reference.height + 4,
                  listItemWidth: rects.reference.width,
                })
              },
            },
          }}
        >
          <ThiftCheck />
          {props.children}
        </FloatingUiCore>
      </Form.Bind>
    </Context.Provider>
  )
}
