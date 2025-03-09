import type { JSX } from 'solid-js/jsx-runtime'
import { FloatingUiCore, FormCore } from 'jige-core'
import css from 'sass:./combo-box.scss'

import { mountStyle, watch } from 'solid-uses'
import { context } from './context'

export function Root(props: {
  value?: string
  options: string[]
  onChange?: (value: string) => void
  disabled?: boolean
  children: JSX.Element
}) {
  mountStyle(css, 'jige-ui-combo-box')

  const Context = context.initial({
    disabled: () => props.disabled,
    value: () => props.value,
    options: () => props.options,
  })
  const [state, actions] = Context.value

  watch(() => state.value, (v) => {
    props.onChange?.(v)
  })
  return (
    <Context.Provider>
      <FormCore.Bind
        propDisabled={props.disabled}
        value={state.value}
        setName={actions.setName}
        setValue={actions.setValue}
        setDisabled={actions.setDisabled}
      >
        <FloatingUiCore
          disabled={state.disabled}
          trigger="click"
          placement="bottom"
          floatingOption={{
            offset: ({ elements, rects }) => {
              const $scroll = elements.floating.querySelector('.jg-combo-box-scrollarea')!.firstChild as HTMLElement
              const totalHeight = state.valueIndex * (state.listItemHeight)
              const scrollTop = totalHeight - rects.floating.height / 2 + state.listItemHeight / 2
              $scroll.scrollTop = scrollTop
              const toTop = totalHeight - $scroll.scrollTop + state.listItemHeight
              actions.setOriginY(totalHeight - $scroll.scrollTop)
              return -toTop - 8
            },
            flip: false,
            shift: {
              crossAxis: true,
            },
            size: {
              apply({ rects }) {
                actions.setListItemHeight(rects.reference.height + 4)
                actions.setListItemWidth(rects.reference.width)
              },
            },
          }}
        >
          {props.children}
        </FloatingUiCore>
      </FormCore.Bind>
    </Context.Provider>
  )
}
