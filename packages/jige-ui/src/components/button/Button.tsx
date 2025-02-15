import type { ButtonProps } from './types'
import css from 'sass:./button.scss'

import { mountStyle } from 'solid-uses'
import { ButtonContent } from './ButtonContent'
import { ButtonWrapper } from './ButtonWrapper'
import { context } from './context'
import { LoadingIcon } from './LoadingIcon'

export function Button<T extends (string | undefined) = undefined>(props: ButtonProps & {
  href?: T
  ref?: T extends string ? (HTMLAnchorElement | ((el: HTMLAnchorElement) => void)) :
      (HTMLButtonElement | ((el: HTMLButtonElement) => void))
}) {
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
        ref={props.ref as any}
        class={props.class}
        target={props.target}
        disabled={props.disabled}
        type={props.type || 'button'}
        download={props.download}
      >
        <div class="jg-btn-overlay" />
        <ButtonContent icon={props.icon} label={props.label}>
          {props.children}
        </ButtonContent>
        <LoadingIcon />
      </ButtonWrapper>
    </Context.Provider>
  )
}
