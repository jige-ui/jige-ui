import css from 'sass:./range-picker.scss';
import dpCss from 'sass:../date-picker/date-picker.scss';
import inputCss from 'sass:../input/input.scss';
import { undefinedOr } from 'jige-core';
import { createWatch, mountStyle } from 'solid-tiny-utils';
import { Popover } from '~/components/popover';
import { context } from './context';
import { Panel } from './panel';
import { Trigger } from './trigger';

export function DateRangePicker(props: {
  disabled?: boolean;
  value?: [string, string];
  onChange?: (value: [string, string]) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: [string, string];
  clearable?: boolean;
  size?: 'small' | 'medium' | 'large';
  type?: 'datetime' | 'date';
  presets?: [
    {
      label: string;
      value: (
        state: ReturnType<typeof context.useContext>[0]
      ) => [string, string];
    },
  ];
}) {
  mountStyle(dpCss, 'jige-ui-date-picker');
  mountStyle(inputCss, 'jige-ui-input');
  mountStyle(css, 'jige-ui-date-range-picker');
  const Context = context.initial({
    placeholder: () => props.placeholder,
    disabled: () => props.disabled,
    type: () => props.type,
  });

  const [state, actions] = Context.value;

  createWatch(
    () => [...state.value],
    (v) => {
      props.onChange?.(v as [string, string]);
    },
    { defer: true }
  );

  createWatch(
    () => props.value,
    (v) => {
      if (v && v[0] !== state.value[0] && v[1] !== state.value[1]) {
        actions.setValue(v);
      }
    }
  );

  createWatch(
    () => state.type,
    () => {
      actions.clear();
    },
    { defer: true }
  );

  createWatch(
    () => state.focused,
    (focused) => {
      if (focused) {
        props.onFocus?.();
      } else {
        props.onBlur?.();
      }
    },
    { defer: true }
  );

  return (
    <Context.Provider>
      <Popover
        disabled={state.disabled}
        placement="bottom-start"
        trigger="manual"
      >
        <Trigger
          clearable={undefinedOr(props.clearable, true)}
          size={props.size || 'medium'}
        />
        <Popover.Content
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          style={{
            padding: 0,
            border: '1px solid var(--jg-t-border)',
          }}
        >
          <Panel presets={props.presets} />
        </Popover.Content>
      </Popover>
    </Context.Provider>
  );
}
