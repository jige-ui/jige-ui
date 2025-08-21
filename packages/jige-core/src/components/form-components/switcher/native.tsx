import { mergeRefs } from '@solid-primitives/refs';
import { splitProps } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';
import { hiddenStyle } from '@/common/dom';
import { runSolidEventHandler } from '@/common/solidjs';
import context from './context';

export default function Native(
  props: Omit<
    JSX.InputHTMLAttributes<HTMLInputElement>,
    'style' | 'type' | 'role' | 'value' | 'checked' | 'disabled'
  >
) {
  const [state, actions] = context.useContext();
  const [localProps, otherProps] = splitProps(props, [
    'ref',
    'onChange',
    'onFocus',
    'onBlur',
  ]);
  return (
    <input
      aria-checked={state.checked}
      {...otherProps}
      checked={state.checked}
      disabled={state.disabled}
      onBlur={(e) => {
        actions.setState('focused', false);
        runSolidEventHandler(e, localProps.onBlur);
      }}
      onChange={(e) => {
        e.stopPropagation();
        actions.setState('checked', e.target.checked);
        if (state.$nativeEl) {
          state.$nativeEl.checked = state.checked;
        }
        runSolidEventHandler(e, localProps.onChange);
      }}
      onFocus={(e) => {
        e.preventDefault();
        actions.setState('focused', true);
        runSolidEventHandler(e, localProps.onFocus);
      }}
      ref={mergeRefs(localProps.ref, (r) => {
        actions.setState('$nativeEl', r);
      })}
      role="switch"
      style={hiddenStyle}
      type="checkbox"
      value="on"
    />
  );
}
