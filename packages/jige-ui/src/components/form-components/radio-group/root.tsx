import css from "sass:./radio-group.scss";
import { RadioGroupCore } from "jige-core";
import type { JSX } from "solid-js/jsx-runtime";
import { mountStyle } from "solid-tiny-utils";

export function Root(props: {
  children: JSX.Element;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}) {
  mountStyle(css, "jige-ui-radio-group");
  return (
    <RadioGroupCore
      disabled={props.disabled}
      onChange={props.onChange}
      value={props.value}
    >
      <div>{props.children}</div>
    </RadioGroupCore>
  );
}
