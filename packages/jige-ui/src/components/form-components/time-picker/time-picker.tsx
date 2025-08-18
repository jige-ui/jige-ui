import { FloatingUiCore } from 'jige-core';
import { Popover } from '~/components/popover';
import { context } from './context';
import { Root } from './root';
import { TimePanel } from './time-panel';
import { Trigger } from './trigger';

function FloatingContent() {
  const [state, actions] = context.useContext();
  const [, floatActs] = FloatingUiCore.useContext();

  return (
    <Popover.Content animation="" class="jg-time-picker-panel">
      <TimePanel
        hour={state.hour}
        itemHeight={state.triggerHeight}
        minute={state.minute}
        onCancel={() => {
          floatActs.setOpen(false);
        }}
        onConfirm={(hour, minute, second) => {
          actions.setState({
            hour,
            minute,
            second,
          });
          floatActs.setOpen(false);
        }}
        second={state.second}
        type={state.type}
        width={state.triggerWidth}
      />
    </Popover.Content>
  );
}

export function TimePicker(props: {
  disabled?: boolean;
  disableBind?: boolean;
  type?: 'hour' | 'minute' | 'second';
  size?: 'small' | 'medium';
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <Root
      disableBind={props.disableBind}
      disabled={props.disabled}
      onChange={props.onChange}
      size={props.size}
      type={props.type}
      value={props.value}
    >
      <Trigger />
      <FloatingContent />
    </Root>
  );
}
