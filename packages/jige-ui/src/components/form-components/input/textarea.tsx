import { mergeRefs } from '@solid-primitives/refs';
import { throttle } from '@solid-primitives/scheduled';
import {
  combineStyle,
  InputCore,
  runSolidEventHandler,
  ScrollbarCore,
} from 'jige-core';
import { createSignal, splitProps } from 'solid-js';
import { dataIf } from '~/common/dataset';
import type { JigeInputProps } from './types';

function ScrollInput(
  props: Omit<JigeInputProps, 'type'> & {
    setFocused: (focused: boolean) => void;
  }
) {
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
    'setFocused',
    'ref',
    'onScroll',
    'onScrollEnd',
  ]);
  const [state, actions] = ScrollbarCore.useContext();
  const throttleSetValue = throttle(actions.setValue, 30);

  return (
    <InputCore.Native
      {...(otherProps as any)}
      autocomplete="off"
      class={['jg-input-native', localProps.class].join(' ')}
      onBlur={(e: Event) => {
        localProps.setFocused(false);
        runSolidEventHandler(e, localProps.onBlur);
      }}
      onFocus={(e: Event) => {
        localProps.setFocused(true);
        runSolidEventHandler(e, localProps.onFocus);
      }}
      onScroll={(e: Event) => {
        throttleSetValue();
        runSolidEventHandler(e, localProps.onScroll);
      }}
      onScrollEnd={(e: Event) => {
        actions.setValue();
        runSolidEventHandler(e, localProps.onScrollEnd);
      }}
      readonly={props.readonly}
      ref={
        mergeRefs(localProps.ref, (el) => {
          actions.setState('refContent', el);
        }) as any
      }
      style={combineStyle(
        {
          position: 'relative',
          overflow: 'auto',
          'scrollbar-width': 'none',
          height: state.height,
          'max-height': state.maxHeight,
          'user-select': state.isDragging ? 'none' : undefined,
          resize: 'none',
          width: '100%',
        },
        localProps.style
      )}
      type="textarea"
    />
  );
}

function ScrollBar(props: {
  children: any;
  focused: boolean;
  readonly?: boolean;
}) {
  const [hidden, setHidden] = createSignal(false);
  const [state] = InputCore.useContext();
  return (
    <ScrollbarCore
      class="jg-input-wrapper"
      data-disabled={dataIf(state.disabled)}
      data-focused={dataIf(props.focused)}
      data-readonly={dataIf(props.readonly)}
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
    >
      {props.children}
      <ScrollbarCore.Bar
        style={{
          position: 'absolute',
          width: '6px',
          top: '4px',
          right: '3px',
          bottom: '4px',
          background: 'transparent',
          transition: 'opacity 300ms',
          opacity: hidden() ? '0' : '.7',
        }}
        type="vertical"
      >
        <ScrollbarCore.Thumb
          style={{
            background: 'var(--jg-t-hl-lighter)',
            cursor: 'pointer',
            'border-radius': '6px',
            transition: 'all 30ms',
          }}
          type="vertical"
        />
      </ScrollbarCore.Bar>
    </ScrollbarCore>
  );
}

export function Textarea(props: Omit<JigeInputProps, 'type'>) {
  const [focused, setFocused] = createSignal(false);
  return (
    <InputCore
      disabled={props.disabled}
      onChange={props.onChange}
      value={props.value}
    >
      <ScrollBar focused={focused()} readonly={props.readonly}>
        <ScrollInput {...props} setFocused={setFocused} />
      </ScrollBar>
    </InputCore>
  );
}
