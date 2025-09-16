import { undefinedOr } from "jige-core";
import type { JSX } from "solid-js/jsx-runtime";
import type { SimpleType } from "~/common/types";
import { ListBox } from "./list-box";
import { Root } from "./root";
import { Trigger } from "./trigger";

export function normalizeOptions<T extends SimpleType>(
  options: (T | { label: string; value: T })[]
): { label: string; value: T }[] {
  return options.map((option) => {
    if (typeof option !== "object") {
      return { label: `${option}`, value: option };
    }
    return option as { label: string; value: T };
  });
}

export function ComboBox<T extends SimpleType>(props: {
  value?: T;
  options: (T | { label: string; value: T })[];
  disabled?: boolean;
  onChange?: (value: T) => void;
  placeholder?: string;
  class?: string;
  style?: string | JSX.CSSProperties;
  size?: "small" | "medium" | "large";
  editable?: boolean;
}) {
  return (
    <Root
      disabled={props.disabled}
      editable={props.editable}
      onChange={props.onChange}
      options={normalizeOptions(props.options)}
      placeholder={props.placeholder || "请选择..."}
      value={props.value}
    >
      <Trigger
        class={props.class}
        size={undefinedOr(props.size, "medium")}
        style={props.style}
      />
      <ListBox size={undefinedOr(props.size, "medium")} />
    </Root>
  );
}
