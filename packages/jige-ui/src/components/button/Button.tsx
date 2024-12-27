import type { ButtonProps } from './types'
import css from 'sass:./button.scss'

import { mountStyle } from 'solid-uses'
import { ButtonContent } from './ButtonContent'
import { ButtonWrapper } from './ButtonWrapper'
import { context } from './context'
import { LoadingIcon } from './LoadingIcon'

export function Button(props: ButtonProps) {
  mountStyle(css, 'jige-ui-btn')

  const Context = context.initial({
    loading: () => props.loading,
    variant: () => props.variant,
    color: () => props.color,
  })

  return (
    <Context.Provider>
      <ButtonWrapper
        href={props.href}
        onClick={props.onClick}
        style={props.style}
        class={props.class}
        shape={props.shape}
        target={props.target}
        disabled={props.disabled}
      >
        <div class="jg-btn-bg" />
        <ButtonContent icon={props.icon} label={props.label}>
          {props.children}
        </ButtonContent>
        <LoadingIcon />
      </ButtonWrapper>
    </Context.Provider>
  )
}
