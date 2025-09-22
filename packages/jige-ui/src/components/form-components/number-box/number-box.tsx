import css from "sass:./number-box.scss";
import inputCss from "sass:../input/input.scss";
import { isNumber, mountStyle } from "solid-tiny-utils";
import { dataIf } from "~/common/dataset";
import { MinusAndPlus } from "./minus-and-plus";
import { NumberInput } from "./number-input";
import { Root } from "./root";

type NumberBoxPropsCommon = {
  disabled?: boolean;
  placeholder?: string;
  max?: number;
  min?: number;
  value?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  onPressEnter?: (e: KeyboardEvent) => void;
  size?: "small" | "medium" | "large";
};

type NumberBoxPropsWithNullable = NumberBoxPropsCommon & {
  nullable: true;
  onChange?: (value: number | null) => void;
};

type NumberBoxPropsWithoutNullable = NumberBoxPropsCommon & {
  nullable?: false;
  onChange?: (value: number) => void;
};

export type NumberBoxProps =
  | NumberBoxPropsWithNullable
  | NumberBoxPropsWithoutNullable;

export function NumberBox(props: NumberBoxProps) {
  mountStyle(inputCss, "jige-ui-input");
  mountStyle(css, "jige-ui-number-box");
  return (
    <Root
      {...props}
      onChange={(v) => {
        if (props.nullable) {
          props.onChange?.(v);
        } else {
          isNumber(v) && props.onChange?.(v);
        }
      }}
    >
      {(state) => (
        <div
          class="jg-input-wrapper"
          data-disabled={dataIf(state.disabled)}
          data-focused={dataIf(state.focused)}
          data-size={props.size}
        >
          <NumberInput
            class="jg-input-native"
            nullable={props.nullable}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            onPressEnter={props.onPressEnter}
          />
          <MinusAndPlus class="jg-number-box-tools" />
        </div>
      )}
    </Root>
  );
}
