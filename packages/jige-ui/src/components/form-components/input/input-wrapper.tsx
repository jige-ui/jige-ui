import { InputCore } from "jige-core";
import type { JSX } from "solid-js";
import { dataIf } from "~/common/dataset";

export function InputWrapper(props: {
  children: any;
  focused: boolean;
  readonly?: boolean;
  style?: string | JSX.CSSProperties;
  size: "small" | "medium" | "large";
}) {
  const [state] = InputCore.useContext();
  return (
    <div
      class="jg-input-wrapper"
      data-disabled={dataIf(state.disabled)}
      data-focused={dataIf(props.focused)}
      data-readonly={dataIf(props.readonly)}
      data-size={props.size}
      style={props.style}
    >
      {props.children}
    </div>
  );
}
