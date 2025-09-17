import { createStore } from "solid-js/store";
import { SpinRing } from "~/build";
import { Playground } from "../../../components/playground";

export default function Demo() {
  const [s, setS] = createStore({
    size: 24,
  });

  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <SpinRing size={s.size} />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting onChange={setS} properties={s} />
    </Playground>
  );
}
