import { type JSX, Show } from 'solid-js';
import IconFluentDismissCircle24Filled from '~icons/fluent/dismiss-circle-24-filled';

export function ClearableSuffix(props: {
  showClearable: boolean;
  onClear: () => void;
  suffix?: JSX.Element;
}) {
  return (
    <>
      <Show when={props.suffix}>
        <div class="jg-input-suffix">{props.suffix}</div>
      </Show>
      <Show when={props.showClearable}>
        <button
          class="jg-input-clear"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.onClear();
          }}
          style={{
            right: '8px',
          }}
          type="button"
        >
          <IconFluentDismissCircle24Filled />
        </button>
      </Show>
    </>
  );
}
