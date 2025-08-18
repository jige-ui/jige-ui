import { context } from './context';

export function NumberInput(props: {
  class?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}) {
  const [state, actions] = context.useContext();

  return (
    <input
      autocomplete="off"
      class={props.class}
      disabled={state.disabled}
      name={state.name}
      onBlur={() => {
        actions.setState('focused', false);
        props.onBlur?.();
      }}
      onChange={(e) => {
        e.currentTarget.value = Number.isNaN(state.value)
          ? ''
          : String(state.value);
      }}
      onFocus={() => {
        actions.setState('focused', true);
        props.onFocus?.();
      }}
      onInput={(e) => {
        const v = e.currentTarget.value;
        if (v === '') {
          actions.setValue(Number.NaN);
          return;
        }
        const n = Number(v);
        if (Number.isNaN(n)) {
          return;
        }
        actions.setValue(n);
      }}
      placeholder={state.placeholder}
      type="text"
      value={Number.isNaN(state.value) ? '' : state.value}
    />
  );
}
