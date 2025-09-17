import { createStore } from "solid-js/store";
import { Spin } from "~/build";
import { Playground } from "../../../components/playground";

export default function Demo() {
  const [s, setS] = createStore({
    size: 24,
    enabled: true,
  });

  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <Spin size={s.size} spinning={s.enabled}>
            <div class="h-24 flex items-center justify-center">
              some content here
            </div>
          </Spin>
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting onChange={setS} properties={s} />
    </Playground>
  );
}
