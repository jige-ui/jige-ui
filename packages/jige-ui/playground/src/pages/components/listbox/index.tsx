import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { list } from "solid-tiny-utils";
import { Listbox } from "~/build";
import { Playground } from "../../../components/playground";

export default function Demo() {
  const [s, setS] = createStore({
    disabled: false,
    virtual: true,
    length: 200,
  });

  const [value, setValue] = createSignal([67]);
  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <div
            style={{
              width: "250px",
            }}
          >
            <Listbox
              items={list(s.length)}
              onSelect={(_item, index) => {
                if (value().includes(index)) {
                  setValue(value().filter((i) => i !== index));
                } else {
                  setValue([...value(), index]);
                }
              }}
              rootHeight={240}
              rowHeight={36}
              selectIndex={value()}
              virtual={s.virtual}
            >
              {(item) => item}
            </Listbox>
          </div>
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting onChange={setS} properties={s} />
    </Playground>
  );
}
