import type { JSX } from "solid-js";

export type PopConfirmProps = {
  title?: string;
  children: JSX.Element;
  description?: string;
  icon?: JSX.Element;
  cancelText?: string;
  okText?: string;
  onCancel?: () => void;
  onConfirm?: () => void | Promise<void>;
};
