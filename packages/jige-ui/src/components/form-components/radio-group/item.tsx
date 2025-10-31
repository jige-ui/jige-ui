import { createUniqueId } from "solid-js";
import { Radio } from "../radio";
import context from "./context";

export function Item(props: {
  value: string;
  label: string;
  disabled?: boolean;
}) {
  const [state, actions] = context.useContext();
  const itemID = `radio_item__${createUniqueId()}`;
  return (
    <Radio
      checked={state.value === props.value}
      disabled={state.disabled || props.disabled}
      id={itemID}
      label={props.label}
      onChange={(checked) => {
        if (checked) {
          actions.setState("value", props.value);
        }
      }}
    />
  );
}
