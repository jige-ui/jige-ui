import type { ComponentProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";

export type ButtonVariant = "link" | "text" | "solid";
export type ButtonSize = "small" | "medium" | "large" | number;

type ButtonElementAnchorProps = Omit<ComponentProps<"a">, "onClick" | "href">;
type ButtonElementButtonProps = Omit<
  ComponentProps<"button">,
  "onClick" | "href"
>;
export type ButtonElement<THref = string | undefined> = THref extends string
  ? ButtonElementAnchorProps
  : ButtonElementButtonProps;

export interface ButtonProps {
  label?: string;
  icon?: JSX.Element;
  onClick?: (e: MouseEvent) => void | Promise<void>;
  loading?: boolean;
  disabled?: boolean;
  /**
   * @default solid
   */
  variant?: ButtonVariant;
  color?: string;
  size?: ButtonSize;
}
