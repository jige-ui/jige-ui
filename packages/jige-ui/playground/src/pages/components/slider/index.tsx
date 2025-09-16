import { createStore } from "solid-js/store";
import { Slider } from "~/build";
import { Playground } from "../../../components/playground";

export default function Demo() {
  const [s, setS] = createStore({
    disabled: false,
  });

  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <Slider disabled={s.disabled} />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting onChange={setS} properties={s} />
    </Playground>
  );
}
