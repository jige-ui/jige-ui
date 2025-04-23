import type { ComponentProps } from 'solid-js'

export type JigeInputType = 'text' | 'textarea' | 'password'
export type JigeInputProps = {
  type?: JigeInputType
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  clearable?: boolean
} & Omit<ComponentProps<'input'>, 'type' | 'value' | 'onChange' | 'onInput' | 'disabled'>
