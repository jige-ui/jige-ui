import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { DatePicker } from "~/build";
import type { DatePickerToValueFunc } from "~/components/form-components/date-picker/types";
import { Playground } from "../../../components/playground";

export default function Demo() {
  const [p, setP] = createStore({
    disabled: false,
    type: "date" as const,
    size: "medium" as "small" | "medium" | "large",
    customValue: false,
  });

  const [value, setValue] = createSignal<string | number | null>("");

  const customToVal: DatePickerToValueFunc<number | null> = (timestamp) => {
    if (timestamp === null) {
      return null;
    }

    return timestamp;
  };

  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <div>日期: {value()}</div>
          <DatePicker
            disabled={p.disabled}
            onBlur={() => {}}
            onChange={setValue}
            onFocus={() => {}}
            size={p.size}
            toValue={p.customValue ? customToVal : undefined}
            type={p.type}
            value={""}
          />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting
        onChange={setP}
        properties={p}
        typeDeclaration={{
          type: ["date", "datetime"],
          size: ["small", "medium", "large"],
        }}
      />
    </Playground>
  );
}
