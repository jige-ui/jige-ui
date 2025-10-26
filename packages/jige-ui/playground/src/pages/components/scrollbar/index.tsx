import { For } from "solid-js";
import { createStore } from "solid-js/store";
import { list } from "solid-tiny-utils";
import { Scrollbar } from "~/build";
import { Playground } from "../../../components/playground";

export default function Demo() {
  const [s, setS] = createStore({
    showMask: false,
  });

  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <Scrollbar showMask={s.showMask}>
            <div style={{ height: "300px", width: "600px" }}>
              <div class="flex flex-col gap-1">
                <For each={list(25)}>
                  {(item) => (
                    <div class="h-28px flex items-center bg-blue">
                      Try me ? {item}
                    </div>
                  )}
                </For>
              </div>
            </div>
          </Scrollbar>
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting onChange={setS} properties={s} />
    </Playground>
  );
}
