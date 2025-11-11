import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { formatToDateTime, setWeekday } from "time-core";
import { DateRangePicker } from "~/build";
import { Playground } from "../../../components/playground";

export default function Demo() {
  const [p, setP] = createStore({
    disabled: false,
    type: "date" as "datetime" | "date",
    size: "medium" as "small" | "medium" | "large",
    customValues: false,
  });

  const [value, setValue] = createSignal<[string | number, string | number]>([
    "",
    "",
  ]);

  const customToVals = (timestamps: [number | null, number | null]) => {
    return timestamps;
  };

  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <div>起始日期: {value()[0]}</div>
          <div>结束日期: {value()[1]}</div>
          <DateRangePicker
            disabled={p.disabled}
            onBlur={() => {}}
            onChange={setValue}
            onFocus={() => {}}
            presets={[
              {
                label: "本周",
                value: () => [
                  formatToDateTime(setWeekday(Date.now(), 1)),
                  formatToDateTime(setWeekday(Date.now(), 7)),
                ],
              },
            ]}
            size={p.size}
            toValues={p.customValues ? customToVals : undefined}
            type={p.type}
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
