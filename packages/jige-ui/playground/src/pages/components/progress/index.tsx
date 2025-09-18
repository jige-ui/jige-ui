import { createStore } from "solid-js/store";
import { LineProgress } from "~/build";
import { Playground } from "../../../components/playground";

export default function Demo() {
  const [s, setS] = createStore({
    percent: 24,
    indeterminate: false,
  });

  return (
    <Playground>
      <Playground.MainArea>
        <div class="w-full px-4">
          <LineProgress percent={s.indeterminate ? undefined : s.percent} />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting onChange={setS} properties={s} />
    </Playground>
  );
}
