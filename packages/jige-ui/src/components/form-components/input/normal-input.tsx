import { InputCore, runSolidEventHandler, undefinedOr } from 'jige-core';
import { createSignal, type JSX, splitProps } from 'solid-js';
import { ClearableSuffix } from './clearable-suffix';
import { InputWrapper } from './input-wrapper';
import type { JigeInputProps } from './types';

export function Suffix(props: { clearable: boolean; suffix?: JSX.Element }) {
  const [state, actions] = InputCore.useContext();

  return (
    <ClearableSuffix
      onClear={() => {
        actions.setValue('');
      }}
      showClearable={props.clearable && !!state.value}
    />
  );
}

export function NormalInput(props: Omit<JigeInputProps, 'type'>) {
  const [focused, setFocused] = createSignal(false);
  const [localProps, otherProps] = splitProps(props, [
    'value',
    'onChange',
    'disabled',
    'clearable',
    'onFocus',
    'onBlur',
    'class',
    'style',
    'readonly',
    'suffix',
    'size',
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
        size={undefinedOr(localProps.size, 'medium')}
        style={localProps.style}
      >
        <InputCore.Native
          {...(otherProps as any)}
          autocomplete="off"
          class={['jg-input-native', localProps.class].join(' ')}
          onBlur={(e: any) => {
            setFocused(false);
            runSolidEventHandler(e, localProps.onBlur);
          }}
          onFocus={(e: any) => {
            setFocused(true);
            runSolidEventHandler(e, localProps.onFocus);
          }}
          readonly={localProps.readonly}
          type="text"
        />
        <Suffix
          clearable={undefinedOr(localProps.clearable, true)}
          suffix={localProps.suffix}
        />
      </InputWrapper>
    </InputCore>
  );
}
