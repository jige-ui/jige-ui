import {
  FormCore,
  InputCore,
  runSolidEventHandler,
  undefinedOr,
} from "jige-core";
import { createSignal, Show, splitProps } from "solid-js";
import { IconFluentEye24Regular } from "~/components/icons/fluent-eye-24-regular";
import { IconFluentEyeOff24Filled } from "~/components/icons/fluent-eye-off-24-filled";
import { InputWrapper } from "./input-wrapper";
import type { JigeInputProps } from "./types";

function VisibleSwitcher(props: {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
}) {
  const [state] = InputCore.useContext();

  return (
    <Show when={!!state.value}>
      <button
        aria-label="Toggle password visibility"
        class="jg-input-password-switcher"
        onClick={() => {
          props.onVisibleChange(!props.visible);
        }}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
        onMouseUp={(e) => {
          e.preventDefault();
        }}
        type="button"
      >
        <Show fallback={<IconFluentEye24Regular />} when={props.visible}>
          <IconFluentEyeOff24Filled />
        </Show>
      </button>
    </Show>
  );
}

export function PasswordInput(props: Omit<JigeInputProps, "type">) {
  const [showPass, setShowPass] = createSignal(false);
  const [focused, setFocused] = createSignal(false);

  const [, fieldCoreActs] = FormCore.useField();

  const [localProps, otherProps] = splitProps(props, [
    "value",
    "onChange",
    "disabled",
    "clearable",
    "onFocus",
    "onBlur",
    "class",
    "style",
    "readonly",
    "size",
  ]);

  return (
    <InputCore
      disabled={localProps.disabled}
      onChange={localProps.onChange}
      value={localProps.value}
    >
      <InputWrapper
        focused={focused()}
        readonly={localProps.readonly}
        size={undefinedOr(localProps.size, "medium")}
      >
        <InputCore.Native
          {...(otherProps as any)}
          autocomplete="off"
          class={["jg-input-native", localProps.class].join(" ")}
          onBlur={(e: any) => {
            setFocused(false);
            fieldCoreActs.handleBlur?.();
            runSolidEventHandler(e, props.onBlur);
          }}
          onFocus={(e: any) => {
            setFocused(true);
            runSolidEventHandler(e, localProps.onFocus);
          }}
          readonly={localProps.readonly}
          type={showPass() ? "text" : "password"}
        />
        <VisibleSwitcher onVisibleChange={setShowPass} visible={showPass()} />
      </InputWrapper>
    </InputCore>
  );
}
