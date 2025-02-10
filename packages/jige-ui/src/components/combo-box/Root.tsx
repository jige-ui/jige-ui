import type { JSX } from 'solid-js/jsx-runtime'
import { FloatingUiCore, FormCore } from 'jige-core'
import css from 'sass:./combo-box.scss'

import { mountStyle } from 'solid-uses'
import { context } from './context'

export function Root(props: {
  value?: string
  options?: string[]
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
              const totalHeight = state.valueIndex * (state.listItemHeight + 4)
              const scrollTop = totalHeight - rects.floating.height / 2 + state.listItemHeight / 2
              $scroll.scrollTop = scrollTop
              const toTop = totalHeight - $scroll.scrollTop + state.listItemHeight + 4
              actions.setOriginY(totalHeight - $scroll.scrollTop)
              return -toTop
            },
            flip: false,
            shift: {
              crossAxis: true,
            },
            size: {
              apply({ rects }) {
                actions.setListItemHeight(rects.reference.height)
                actions.setListItemWidth(rects.reference.width - 8)
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
