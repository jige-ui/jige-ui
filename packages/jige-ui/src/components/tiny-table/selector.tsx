import { Match, Switch } from "solid-js";
import { Checkbox } from "../form-components";
import { Radio } from "../form-components/radio";

export function Selector(props: {
  type: "checkbox" | "radio";
  selected: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
      }}
    >
      <Switch>
        <Match when={props.type === "checkbox"}>
          <Checkbox checked={props.selected} onChange={props.onChange} />
        </Match>
        <Match when={props.type === "radio"}>
          <Radio
            checked={props.selected}
            label=""
            onChange={(v) => props.onChange(v)}
          />
        </Match>
      </Switch>
    </div>
  );
}

export const SELECTOR_COLUMN = {
  id: "TINY_TABLE_SELECTOR",
  meta: { width: 48 },
};
