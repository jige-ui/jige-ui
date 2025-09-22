import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { NumberBox } from "~/build";
import { Playground } from "../../../components/playground";

export default function Demo() {
  const [value, setValue] = createSignal(1);
  const [s, setS] = createStore({
    disabled: false,
    max: 100,
    min: 0,
    nullable: false,
    size: "medium" as "small" | "medium" | "large",
  });
  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <div class="b b-t-border mb-2 rounded-md">
            <div class="p-4">
              value:
              {value()}
            </div>
          </div>
          <NumberBox onChange={setValue} value={value()} {...s} />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting
        onChange={setS}
        properties={s}
        typeDeclaration={{
          size: ["small", "medium", "large"],
        }}
      />
    </Playground>
  );
}
