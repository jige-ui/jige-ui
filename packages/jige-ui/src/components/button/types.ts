import type { JSX } from 'solid-js/jsx-runtime'

export type ButtonVariant = 'link' | 'text' | 'solid'

export interface ButtonProps {
  label?: string
  target?: string
  icon?: JSX.Element
  onClick?: (e: MouseEvent) => void | Promise<void>
  loading?: boolean
  children?: JSX.Element
  class?: string
  style?: string | JSX.CSSProperties
  /**
   * @default solid
   */
  variant?: ButtonVariant
  color?: string
  disabled?: boolean
}
