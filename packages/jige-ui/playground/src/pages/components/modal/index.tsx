import { Show } from "solid-js";
import { createStore } from "solid-js/store";
import { list } from "solid-tiny-utils";
import { Button, Checkbox, Modal, Scrollbar, TinyTable } from "~/build";
import { Playground } from "../../../components/playground";

export default function Demo() {
  const [s, setS] = createStore({
    width: 658,
  });

  const [config, setConfig] = createStore({
    longContent: false,
    tinyTable: true,
  });

  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <Modal closeOnClickMask closeOnEsc>
            <Modal.Trigger>
              <Button label="Open Modal" />
            </Modal.Trigger>
            <Modal.Content width={config.tinyTable ? "80%" : `${s.width}px`}>
              {(_state, actions) => {
                return (
                  <>
                    <Modal.Header
                      description="Modal Description"
                      title="Modal Header"
                    />
                    <Modal.InnerContent class="flex flex-col gap-2">
                      <div class="flex gap-1 items-center">
                        <Checkbox.Button
                          checked={config.longContent}
                          label="启用长内容"
                          onChange={(v) => {
                            setConfig("longContent", v);
                          }}
                          size="small"
                        />
                        <Checkbox.Button
                          checked={config.tinyTable}
                          label="启用表格"
                          onChange={(v) => {
                            setConfig("tinyTable", v);
                          }}
                          size="small"
                        />
                        <Modal closeOnClickMask closeOnEsc>
                          <Modal.Trigger>
                            <Button label="Open modal" size={"small"} />
                          </Modal.Trigger>
                          <Modal.Content>
                            <Modal.Header title="Inner Modal" />
                            <Modal.InnerContent>
                              This is an inner modal content.
                            </Modal.InnerContent>
                          </Modal.Content>
                        </Modal>
                      </div>

                      <Show when={config.tinyTable}>
                        <TinyTable
                          columns={list(5).map((i) => ({
                            accessorKey: `col_${i}`,
                            header: `Header ${i}`,
                            meta: {
                              width: 80 + i * 10,
                            },
                          }))}
                          data={[]}
                        />
                      </Show>

                      <div
                        style={{
                          height: config.longContent ? "3000px" : "0",
                          overflow: "hidden",
                        }}
                      >
                        <Scrollbar maxHeight="300px">
                          <div class="h-600px w-2000px bg-gray-200">
                            This is a long content area.
                          </div>
                        </Scrollbar>
                      </div>
                    </Modal.InnerContent>
                    <Modal.Footer>
                      <Button
                        color="var(--jg-t-hl)"
                        label="确认"
                        onClick={() => actions.setOpen(false)}
                      />
                      <Button
                        label="取消"
                        onClick={() => actions.setOpen(false)}
                      />
                    </Modal.Footer>
                  </>
                );
              }}
            </Modal.Content>
          </Modal>
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting onChange={setS} properties={s} />
    </Playground>
  );
}
