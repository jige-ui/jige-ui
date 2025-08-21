import { FloatingUiCore, FormCore } from 'jige-core';
import { batch, createSignal } from 'solid-js';
import { createWatch } from 'solid-tiny-utils';
import { dataIf } from '~/common/dataset';
import { IconFluentCalendar24Regular } from '~/components/icons/fluent-calendar-24-regular';
import { Popover } from '../../popover';
import { ClearableSuffix } from '../input/clearable-suffix';
import { context } from './context';

export function Trigger(props: { clearable: boolean }) {
  const [state, actions] = context.useContext();
  const [floatState, floatActions] = FloatingUiCore.useContext();
  const [, fieldCoreActs] = FormCore.useField();
  const [focused, setFocused] = createSignal(false);

  createWatch(
    () => floatState.status,
    (status) => {
      if (status === 'closed') {
        batch(() => {
          actions.setState('focused', false);
          actions.setActivePanel(state.defaultPanel);
          const inst = state.inst;
          actions.setCurrYear(inst.year());
          actions.setCurrMonth(inst.month());
          actions.syncValueToPreview();
        });
      }
      if (status === 'opened') {
        actions.setState('focused', true);
      }
    }
  );

  return (
    <Popover.Trigger>
      <div
        class="jg-input-wrapper jg-dp-trigger"
        data-disabled={dataIf(state.disabled)}
        data-focused={dataIf(focused())}
        data-preview={dataIf(state.previewMode)}
        onClick={() => {
          state.triggerRef?.focus();
        }}
        role="button"
        tabIndex={-1}
      >
        <input
          autocomplete="off"
          class="jg-input-native"
          name={state.name || 'datepicker'}
          onBlur={(e) => {
            e.currentTarget.value = state.value;
            floatActions.setOpen(false);
            setFocused(false);
            fieldCoreActs.handleBlur?.();
          }}
          onFocus={() => {
            floatActions.setOpen(true);
            setFocused(true);
          }}
          onInput={(e) => {
            const v = e.currentTarget.value;
            if (v.trim() === '') {
              actions.setValue('');
            }
            if (actions.checkDateStr(v)) {
              actions.setValue(e.currentTarget.value);
            }
          }}
          placeholder={state.placeholder || '请选择日期'}
          ref={(el) => {
            actions.setState('triggerRef', el);
          }}
          type="text"
          value={state.previewValue}
        />
        <ClearableSuffix
          onClear={() => {
            actions.clear();
          }}
          showClearable={props.clearable && !!state.value}
          suffix={<IconFluentCalendar24Regular />}
        />
      </div>
    </Popover.Trigger>
  );
}
