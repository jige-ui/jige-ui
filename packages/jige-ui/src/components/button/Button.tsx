import css from 'sass:./button.scss'
import type { ButtonProps } from './types'

import { mountStyle, watch } from 'solid-uses'
import { Form } from '../form'
import { ButtonContent } from './ButtonContent'
import { ButtonWrapper } from './ButtonWrapper'
import { LoadingIcon } from './LoadingIcon'
import { context } from './context'

export function Button<T extends string | undefined = undefined>(
  props: ButtonProps & {
    href?: T
    ref?: T extends string
      ? HTMLAnchorElement | ((el: HTMLAnchorElement) => void)
      : HTMLButtonElement | ((el: HTMLButtonElement) => void)
  },
) {
  mountStyle(css, 'jige-ui-btn')

  const Context = context.initial({
    loading: () => props.loading,
    variant: () => props.variant,
    color: () => props.color,
    disabled: () => props.disabled,
  })

  const [, actions] = Context.value
  const [formState] = Form.useFormContext()

  watch([() => formState.disabled, () => props.disabled, () => props.type], ([fD, pD, type]) => {
    if ((type === 'submit' || type === 'reset') && fD) {
      actions.setDisabled(true)
    } else {
      actions.setDisabled(pD || false)
    }
  })

  return (
    <Context.Provider>
      <ButtonWrapper
        href={props.href}
        onClick={props.onClick}
        style={props.style}
        ref={props.ref as any}
        size={props.size || 'medium'}
        class={props.class}
        target={props.target}
        type={props.type || 'button'}
        download={props.download}
      >
        <div class='jg-btn-overlay' />
        <ButtonContent icon={props.icon} label={props.label}>
          {props.children}
        </ButtonContent>
        <LoadingIcon />
      </ButtonWrapper>
    </Context.Provider>
  )
}
