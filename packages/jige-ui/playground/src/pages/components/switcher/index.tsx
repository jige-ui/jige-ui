import { createStore } from "solid-js/store";
import { Switcher } from "~/build";
import { Playground } from "../../../components/playground";

export default function Demo() {
  const [p, setP] = createStore({
    disabled: false,
    size: "medium" as "small" | "medium" | "large",
  });
  return (
    <Playground>
      <Playground.MainArea>
        <div class="flex items-center">
          <Switcher disabled={p.disabled || undefined} size={p.size}>
            Switch Me
          </Switcher>
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting
        onChange={setP}
        properties={p}
        typeDeclaration={{
          size: ["small", "medium", "large"],
        }}
      />
    </Playground>
  );
}
