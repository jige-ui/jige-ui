import { FloatingUiCore, hiddenStyle } from 'jige-core';
import { createSignal } from 'solid-js';
import { createDebouncedWatch, createWatch } from 'solid-tiny-utils';
import { dataIf } from '~/common/dataset';
import { Popover } from '~/components/popover';
import IconFluentArrowRight24Filled from '~icons/fluent/arrow-right-24-filled';
import IconFluentCalendar24Regular from '~icons/fluent/calendar-24-regular';
import { ClearableSuffix } from '../input/clearable-suffix';
import { context } from './context';

export function Trigger(props: { clearable: boolean }) {
  const [state, actions] = context.useContext();
  const [floatState, floatActions] = FloatingUiCore.useContext();
  const [focused, setFocused] = createSignal(false);

  createDebouncedWatch(focused, (f) => {
    floatActions.setOpen(f);
  });

  createWatch(
    () => floatState.status,
    (s) => {
      if (s === 'closed') {
        actions.setState('focused', false);
        actions.syncValueToPreview();
      }
      if (s === 'opened') {
        actions.setState('focused', true);
      }
      if (s === 'closing') {
        const [ref1, ref2] = state.triggerRefs;
        if (ref1) {
          ref1.value = state.value[0];
        }
        if (ref2) {
          ref2.value = state.value[1];
        }
      }
    },
    { defer: true }
  );

  return (
    <Popover.Trigger>
      <div
        class="jg-input-wrapper jg-dp-trigger"
        data-disabled={dataIf(state.disabled)}
        data-focused={dataIf(focused())}
        data-preview={dataIf(state.previewMode)}
      >
        <input name={state.name} style={hiddenStyle} type="text" />
        <input
          autocomplete="off"
          class="jg-input-native"
          onBlur={() => {
            setFocused(false);
          }}
          onFocus={() => {
            setFocused(true);
          }}
          onInput={(e) => {
            const value = e.currentTarget.value;
            if (value.trim() === '') {
              actions.setValue(['', state.previewValue[1]]);
              return;
            }
            if (actions.checkDateStr(value)) {
              actions.setValue([value, state.previewValue[1]]);
            }
          }}
          placeholder={state.placeholder[0]}
          ref={(el) => {
            actions.setState('triggerRefs', 0, el);
          }}
          type="text"
          value={state.previewValue[0]}
        />
        <div
          style={{
            position: 'relative',
          }}
        >
          <IconFluentArrowRight24Filled />
        </div>
        <input
          autocomplete="off"
          class="jg-input-native"
          onBlur={() => {
            setFocused(false);
          }}
          onFocus={() => {
            setFocused(true);
          }}
          onInput={(e) => {
            const value = e.currentTarget.value;
            if (value.trim() === '') {
              actions.setValue([state.previewValue[0], '']);
              return;
            }
            if (actions.checkDateStr(value)) {
              actions.setValue([state.previewValue[0], value]);
            }
          }}
          placeholder={state.placeholder[1]}
          ref={(el) => {
            actions.setState('triggerRefs', 1, el);
          }}
          type="text"
          value={state.previewValue[1]}
        />
        <ClearableSuffix
          onClear={() => {
            actions.clear();
          }}
          showClearable={props.clearable && !state.isEmpty}
          suffix={<IconFluentCalendar24Regular />}
        />
      </div>
    </Popover.Trigger>
  );
}
