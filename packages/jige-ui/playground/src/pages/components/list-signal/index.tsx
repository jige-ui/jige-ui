import { createAutoAnimate } from "@formkit/auto-animate/solid";
import { createListSignal } from "jige-core";
import { createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";
import { Button, Input } from "~/build";
import { Playground } from "../../../components/playground";

export default function Demo() {
  const [s, setS] = createStore({
    disabled: false,
  });

  const [list, helpers] = createListSignal([
    {
      name: "Item 1",
    },
  ]);

  const [parent] = createAutoAnimate<HTMLDivElement>();
  const [name, setName] = createSignal("Item 2");

  const compareByName = (a: { name: string }, b: { name: string }) =>
    a.name.localeCompare(b.name);
  return (
    <Playground>
      <Playground.MainArea>
        <div ref={parent}>
          <For each={list}>
            {(item, index) => (
              <div class="w-full bg-t-bg6 mb-2 rounded-md h-10 flex items-center justify-between px-2 c-fg1">
                <span>{item.name}</span>
                <div class="flex items-center">
                  <Button
                    color="info"
                    disabled={index() === 0}
                    icon={<div class="i-fluent:caret-up-24-filled" />}
                    onClick={() => {
                      helpers.move(index(), index() - 1);
                    }}
                    size={24}
                    variant="text"
                  />
                  <Button
                    color="info"
                    disabled={index() === list.length - 1}
                    icon={<div class="i-fluent:caret-down-24-filled" />}
                    onClick={() => {
                      helpers.move(index(), index() + 1);
                    }}
                    size={24}
                    variant="text"
                  />
                  <Button
                    class="ml-2"
                    color="danger"
                    disabled={s.disabled}
                    icon={<div class="i-fluent:dismiss-12-regular" />}
                    onClick={() => {
                      helpers.remove(index());
                    }}
                    size={12}
                    variant="text"
                  />
                </div>
              </div>
            )}
          </For>
          <div class="flex items-center gap-1 p-2 rounded-md bg-t-bg3">
            <Input
              onChange={setName}
              placeholder="add another"
              size="small"
              value={name()}
            />
            <Button
              color="hl"
              disabled={list.length >= 8 || !name().trim()}
              label="Add"
              onClick={() => {
                helpers.insert({ name: name().trim() });
                setName(`Item ${list.length + 1}`);
              }}
              size="small"
            />
            <Button
              color="hl"
              disabled={helpers.isSortedBy(compareByName)}
              label="Sort"
              onClick={() => {
                helpers.sort(compareByName);
              }}
              size="small"
            />
            <Button
              color="hl"
              disabled={list.length < 2}
              label="Move"
              onClick={() => {
                helpers.move(0, list.length - 1);
              }}
              size="small"
            />
          </div>
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting onChange={setS} properties={s} />
    </Playground>
  );
}
