import css from 'sass:./combo-box.scss'
import { FloatingUiCore } from 'jige-core'
import type { JSX } from 'solid-js/jsx-runtime'

import { mountStyle, watch } from 'solid-uses'
import { Form } from '~/components/form'
import { context } from './context'

export function Root<T>(props: {
  value?: string
  options: { label: string; value: T }[]
  onChange?: (value: string) => void
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

  watch(
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
          {props.children}
        </FloatingUiCore>
      </Form.Bind>
    </Context.Provider>
  )
}
