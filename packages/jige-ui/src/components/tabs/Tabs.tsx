import type { JSX } from 'solid-js'
import { AnimatedGroup, RadioGroupCore } from 'jige-core'
import styles from 'sass:./tabs.scss'
import { createMemo, createSignal, For } from 'solid-js'
import { mountStyle, watch } from 'solid-uses'

import { setData } from '~/common/dataset'
import context from './context'

function Content(props: {
  children: JSX.Element
  key: string
}) {
  const [state] = context.useContext()
  return <AnimatedGroup.Panel key={props.key} class="jg-ani-tab" data-dir={state.dir}>{props.children}</AnimatedGroup.Panel>
}

function Root(props: {
  children: JSX.Element
  active: string
  onChange: (key: string) => void
  options: string[]
}) {
  mountStyle(styles, 'jige-ui-tabs')

  const Context = context.initial()
  const [tabState, actions] = Context.value

  const [prevActive, setPrevActive] = createSignal('')

  watch(() => props.active, (active, prev) => {
    if (!prev)
      return
    setPrevActive(prev)
    if (props.options.indexOf(prev) < props.options.indexOf(active)) {
      actions.setDir('right')
    }
    else {
      actions.setDir('left')
    }
  })

  const normalizeOptions = createMemo(() => {
    return props.options.map((option) => {
      if (typeof option === 'string') {
        return { label: option, value: option }
      }
      return option
    })
  })
  return (
    <Context.Provider>
      <div class="jg-tabs">
        <RadioGroupCore
          onChange={props.onChange}
          value={props.active}
        >
          <div class="jg-tabs-header">
            <For each={normalizeOptions()}>
              {item => (
                <RadioGroupCore.Item value={item.value}>
                  <RadioGroupCore.ItemNative />
                  <RadioGroupCore.ItemControl>
                    {state => (
                      <div
                        class="jg-tabs-header-item"
                        {...setData({
                          checked: state.value === item.value,
                          prev: prevActive() === item.value,
                          dir: tabState.dir,
                        })}
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
        <AnimatedGroup active={props.active} onChange={props.onChange} class="jg-tabs-content">
          {props.children}
        </AnimatedGroup>
      </div>
    </Context.Provider>

  )
}

export const Tabs = Object.assign(Root, { Content })
