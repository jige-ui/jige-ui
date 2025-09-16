import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { list } from "solid-tiny-utils";
import { Button, Listbox, Popover } from "~/build";
import { Playground } from "../../../components/playground";

export default function Demo() {
  const [p, setP] = createStore({
    disabled: false,
    arrow: true,
    trigger: "click" as const,
    placement: "top" as const,
  });

  const [selected, setSelected] = createSignal([1]);

  return (
    <Playground>
      <Playground.MainArea>
        <Popover
          disabled={p.disabled}
          placement={p.placement}
          trigger={p.trigger}
        >
          <Popover.Trigger>
            <Button>{p.trigger} me</Button>
          </Popover.Trigger>
          <Popover.Content
            arrow={p.arrow}
            style={{
              padding: 0,
            }}
          >
            <div>
              <Listbox
                items={list(10)}
                onSelect={(_item, index) => {
                  if (selected().includes(index)) {
                    setSelected(selected().filter((i) => i !== index));
                  } else {
                    setSelected([...selected(), index]);
                  }
                }}
                rootHeight={240}
                rowHeight={34}
                selectIndex={selected()}
              >
                {(item) => (
                  <div
                    style={{
                      width: "100px",
                    }}
                  >
                    {item}
                  </div>
                )}
              </Listbox>
            </div>
          </Popover.Content>
        </Popover>
      </Playground.MainArea>
      <Playground.PropertySetting
        onChange={setP}
        properties={p}
        typeDeclaration={{
          trigger: ["hover", "click", "manual"],
          placement: [
            "top",
            "right",
            "bottom",
            "left",
            "top-start",
            "top-end",
            "right-start",
            "right-end",
            "bottom-start",
            "bottom-end",
            "left-start",
            "left-end",
          ],
        }}
      />
    </Playground>
  );
}
