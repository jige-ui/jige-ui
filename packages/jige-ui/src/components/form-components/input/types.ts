import type { ComponentProps, JSX } from 'solid-js';

export type JigeInputType = 'text' | 'textarea' | 'password';
export type JigeInputProps = {
  type?: JigeInputType;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  clearable?: boolean;
  readonly?: boolean;
  suffix?: JSX.Element;
  size?: 'small' | 'medium' | 'large';
} & Omit<ComponentProps<'input'>, 'type' | 'value' | 'onChange' | 'disabled'>;
