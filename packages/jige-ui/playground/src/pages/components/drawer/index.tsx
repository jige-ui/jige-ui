import { createStore } from 'solid-js/store';
import { Button, Drawer, Modal } from '~/build';
import { Playground } from '../../../components/playground';

export default function Demo() {
  const [s, setS] = createStore({
    position: 'right' as 'left' | 'right' | 'top' | 'bottom',
    width: 258,
  });

  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <Drawer closeOnClickMask closeOnEsc>
            <Drawer.Trigger>
              <Button label="Open Drawer" />
            </Drawer.Trigger>
            <Drawer.Content position={s.position} width={`${s.width}px`}>
              <Drawer.Header title="Drawer Header">
                <Button label="HEllo" />
              </Drawer.Header>
              <Drawer.InnerContent>
                <div class="h-3000px">Content</div>
                <Modal closeOnClickMask closeOnEsc>
                  <Modal.Trigger>
                    <Button label="Open Modal" />
                  </Modal.Trigger>
                  <Modal.Content>
                    <div>Modal Content</div>
                  </Modal.Content>
                </Modal>
              </Drawer.InnerContent>
              <Drawer.Footer>
                <Button label="Footer Button" />
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer>
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting
        onChange={setS}
        properties={s}
        typeDeclaration={{
          position: ['left', 'right', 'top', 'bottom'],
        }}
      />
    </Playground>
  );
}
