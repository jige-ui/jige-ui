import { createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";
import { Tabs } from "~/build";
import { Playground } from "../../../components/playground";

export default function Demo() {
  const [s, setS] = createStore({});

  const [active, setActive] = createSignal("tab1");

  return (
    <Playground>
      <Playground.MainArea>
        <Tabs
          active={active()}
          onChange={setActive}
          options={["tab1", "tab2", "tab3"]}
        >
          <For each={["tab1", "tab2", "tab3"]}>
            {(tab) => (
              <Tabs.Content key={tab}>
                <div class="p-4">Content of {tab}</div>
              </Tabs.Content>
            )}
          </For>
        </Tabs>
      </Playground.MainArea>
      <Playground.PropertySetting onChange={setS} properties={s} />
    </Playground>
  );
}
