import css from "sass:./number-box.scss";
import inputCss from "sass:../input/input.scss";
import { mountStyle } from "solid-tiny-utils";

import { dataIf } from "~/common/dataset";
import { MinusAndPlus } from "./minus-and-plus";
import { NumberInput } from "./number-input";
import { Root } from "./root";

export function NumberBox(props: {
  disabled?: boolean;
  placeholder?: string;
  max?: number;
  min?: number;
  value?: number;
  onChange?: (value: number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  size?: "small" | "medium" | "large";
}) {
  mountStyle(inputCss, "jige-ui-input");
  mountStyle(css, "jige-ui-number-box");
  return (
    <Root {...props}>
      {(state) => (
        <div
          class="jg-input-wrapper"
          data-disabled={dataIf(state.disabled)}
          data-focused={dataIf(state.focused)}
          data-large={dataIf(props.size === "large")}
          data-medium={dataIf(props.size === "medium")}
          data-small={dataIf(props.size === "small")}
        >
          <NumberInput
            class="jg-input-native"
            onBlur={props.onBlur}
            onFocus={props.onFocus}
          />
          <MinusAndPlus class="jg-number-box-tools" />
        </div>
      )}
    </Root>
  );
}
