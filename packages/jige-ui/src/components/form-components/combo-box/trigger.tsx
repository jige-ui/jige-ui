import { FloatingUiCore, hiddenStyle } from 'jige-core';
import { Show } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';
import { dataIf } from '~/common/dataset';
import { IconFluentChevronDown24Filled } from '~/components/icons/fluent-chevron-down-24-filled';
import { Input } from '../input';
import { context } from './context';

export function Trigger(props: {
  style?: string | JSX.CSSProperties;
  class?: string;
  size: 'small' | 'medium' | 'large';
}) {
  const [state, actions] = context.useContext();
  const [, flActs] = FloatingUiCore.useContext();
  return (
    <div>
      <input
        name={state.name}
        readOnly
        style={hiddenStyle}
        tabindex={-1}
        type="text"
        value={state.value}
      />
      <FloatingUiCore.Trigger>
        <Show when={state.editable}>
          <Input
            class={props.class}
            onChange={(v) => {
              actions.setState('editableValue', v);
            }}
            onInput={() => {
              flActs.setOpen(true);
            }}
            placeholder={state.placeholder}
            ref={(el) => {
              actions.setState('refTrigger', el);
            }}
            size={props.size}
            style={props.style}
            value={state.editableValue}
          />
        </Show>

        <Show when={!state.editable}>
          <button
            class={['jg-combo-box-trigger', props.class].join(' ')}
            data-disabled={dataIf(state.disabled)}
            data-large={dataIf(props.size === 'large')}
            data-medium={dataIf(props.size === 'medium')}
            data-small={dataIf(props.size === 'small')}
            ref={(el) => {
              actions.setState('refTrigger', el);
            }}
            style={props.style}
            type="button"
          >
            <div class="jg-combo-box-overlay" />
            <i
              class="jg-combo-box-arrow"
              style={{
                'font-size': '.75em',
              }}
            >
              <IconFluentChevronDown24Filled />
            </i>
            <div
              style={{
                display: 'block',
                overflow: 'hidden',
                'text-overflow': 'ellipsis',
                'max-width': 'calc(100% - 16px)',
                opacity: state.valueIndex !== -1 ? 1 : 0.5,
              }}
            >
              <span>{state.valueLabel || state.placeholder}</span>
            </div>
          </button>
        </Show>
      </FloatingUiCore.Trigger>
    </div>
  );
}
