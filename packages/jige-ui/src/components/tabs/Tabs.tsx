import styles from 'sass:./tabs.scss'
import { AnimatedGroup, RadioGroupCore } from 'jige-core'
import { createWatch, mountStyle } from 'jige-utils'
import type { ComponentProps, JSX } from 'solid-js'
import { For, createMemo, createSignal, splitProps } from 'solid-js'

import { dataIf } from '~/common/dataset'
import context from './context'

function Content(props: {
  children: JSX.Element
  key: string
}) {
  const [state] = context.useContext()
  return (
    <AnimatedGroup.Panel key={props.key} class='jg-ani-tab' data-dir={state.dir}>
      {props.children}
    </AnimatedGroup.Panel>
  )
}

function Root(
  props: {
    active: string
    onChange: (key: string) => void
    options: string[]
  } & ComponentProps<'div'>,
) {
  mountStyle(styles, 'jige-ui-tabs')

  const [localProps, otherProps] = splitProps(props, [
    'active',
    'onChange',
    'options',
    'class',
    'children',
  ])
  const Context = context.initial()
  const [tabState, actions] = Context.value
  const [prevActive, setPrevActive] = createSignal('')

  createWatch(
    () => localProps.active,
    (active, prev) => {
      if (!prev) return
      setPrevActive(prev)
      if (localProps.options.indexOf(prev) < localProps.options.indexOf(active)) {
        actions.setState('dir', 'right')
      } else {
        actions.setState('dir', 'left')
      }
    },
  )

  const normalizeOptions = createMemo(() => {
    return localProps.options.map((option) => {
      if (typeof option === 'string') {
        return { label: option, value: option }
      }
      return option
    })
  })
  return (
    <Context.Provider>
      <div class={['jg-tabs', localProps.class].join(' ')} {...otherProps}>
        <RadioGroupCore onChange={localProps.onChange} value={localProps.active}>
          <div class='jg-tabs-header'>
            <For each={normalizeOptions()}>
              {(item) => (
                <RadioGroupCore.Item value={item.value}>
                  <RadioGroupCore.ItemNative />
                  <RadioGroupCore.ItemControl>
                    {(state) => (
                      <div
                        class='jg-tabs-header-item'
                        data-checked={dataIf(state.value === item.value)}
                        data-prev={dataIf(prevActive() === item.value)}
                        data-dir={tabState.dir}
                      >
                        {item.label}
                      </div>
                    )}
                  </RadioGroupCore.ItemControl>
                </RadioGroupCore.Item>
              )}
            </For>
          </div>
        </RadioGroupCore>
        <AnimatedGroup active={localProps.active} class='jg-tabs-content'>
          {localProps.children}
        </AnimatedGroup>
      </div>
    </Context.Provider>
  )
}

export const Tabs = Object.assign(Root, { Content })
