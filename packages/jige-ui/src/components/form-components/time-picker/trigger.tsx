import { combineStyle, dataIf, hiddenStyle } from 'jige-core';
import { Show } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';
import { Popover } from '~/components/popover';
import { context } from './context';

export function Trigger(props: {
  style?: string | JSX.CSSProperties;
  class?: string;
}) {
  const [state] = context.useContext();
  return (
    <div>
      <input
        name={state.name}
        readOnly
        style={hiddenStyle}
        tabindex={-1}
        type="text"
        value={state.asStr}
      />
      <Popover.Trigger>
        <button
          class={['jg-time-picker-trigger', props.class].join(' ')}
          data-disabled={dataIf(state.disabled)}
          style={combineStyle(
            {
              width: `${state.triggerWidth}px`,
              height: `${state.triggerHeight}px`,
            },
            props.style
          )}
          type="button"
        >
          <div class="jg-time-picker-overlay" />
          <div
            style={{
              display: 'flex',
              'align-items': 'center',
              width: '100%',
              opacity: state.asStr ? 1 : 0.5,
            }}
          >
            <div class="jg-time-picker-trigger-item">
              {state.hourStr || '时'}
            </div>
            <Show when={state.typeIndex > 0}>
              <div class="jg-time-picker-trigger-item">
                {state.minuteStr || '分'}
              </div>
            </Show>
            <Show when={state.typeIndex > 1}>
              <div class="jg-time-picker-trigger-item">
                {state.secondStr || '秒'}
              </div>
            </Show>
          </div>
        </button>
      </Popover.Trigger>
    </div>
  );
}
