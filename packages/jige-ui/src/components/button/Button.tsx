import css from 'sass:./button.scss'
import type { ButtonElement, ButtonProps } from './types'

import { createWatch, mountStyle } from 'jige-utils'
import { splitProps } from 'solid-js'
import { Form } from '../form'
import { ButtonContent } from './ButtonContent'
import { ButtonWrapper } from './ButtonWrapper'
import { LoadingIcon } from './LoadingIcon'
import { context } from './context'

export function Button<T extends string | undefined = undefined>(
  props: ButtonProps & {
    href?: T
  } & ButtonElement<T>,
) {
  mountStyle(css, 'jige-ui-btn')

  const [local, others] = splitProps(props, [
    'loading',
    'variant',
    'color',
    'disabled',
    'type',
    'size',
    'icon',
    'label',
    'children',
    'href',
  ])

  const Context = context.initial({
    loading: () => local.loading,
    variant: () => local.variant,
    color: () => local.color,
    disabled: () => local.disabled,
  })

  const [, actions] = Context.value
  const [formState] = Form.useFormContext()

  createWatch(
    [() => formState.disabled, () => local.disabled, () => local.type],
    ([fD, pD, type]) => {
      if ((type === 'submit' || type === 'reset') && fD) {
        actions.setState('disabled', true)
      } else {
        actions.setState('disabled', pD || false)
      }
    },
  )

  return (
    <Context.Provider>
      <ButtonWrapper
        {...others}
        href={local.href}
        size={local.size || 'medium'}
        type={local.type || 'button'}
      >
        <div class='jg-btn-overlay' />
        <ButtonContent icon={local.icon} label={local.label}>
          {local.children}
        </ButtonContent>
        <LoadingIcon />
      </ButtonWrapper>
    </Context.Provider>
  )
}
