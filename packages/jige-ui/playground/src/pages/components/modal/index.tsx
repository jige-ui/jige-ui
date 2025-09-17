import { createStore } from "solid-js/store";
import { Button, Checkbox, Modal } from "~/build";
import { Playground } from "../../../components/playground";

export default function Demo() {
  const [s, setS] = createStore({
    width: 658,
  });

  const [config, setConfig] = createStore({
    longContent: false,
  });

  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <Modal closeOnClickMask closeOnEsc>
            <Modal.Trigger>
              <Button label="Open Modal" />
            </Modal.Trigger>
            <Modal.Content width={`${s.width}px`}>
              {(_state, actions) => {
                return (
                  <>
                    <Modal.Header
                      description="Modal Description"
                      title="Modal Header"
                    />
                    <Modal.InnerContent class="flex flex-col gap-2">
                      <Checkbox.Button
                        checked={config.longContent}
                        class="w-full"
                        label="启用长内容"
                        onChange={(v) => {
                          setConfig("longContent", v);
                        }}
                      />
                      <Modal closeOnClickMask closeOnEsc>
                        <Modal.Trigger>
                          <Button class="w-full" label="Open a new modal" />
                        </Modal.Trigger>
                        <Modal.Content>
                          <div>Modal Content</div>
                        </Modal.Content>
                      </Modal>
                      <div
                        style={{
                          height: config.longContent ? "3000px" : "0",
                        }}
                      />
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
