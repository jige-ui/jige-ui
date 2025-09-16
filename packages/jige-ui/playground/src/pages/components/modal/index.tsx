import { createStore } from 'solid-js/store';
import { Button, Modal } from '~/build';
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
          <Modal closeOnClickMask closeOnEsc>
            <Modal.Trigger>
              <Button label="Open Drawer" />
            </Modal.Trigger>
            <Modal.Content width={`${s.width}px`}>
              <Modal.Header title="Drawer Header">
                <Button label="HEllo" />
              </Modal.Header>
              <Modal.InnerContent>
                <div class="h-3000px">Content</div>
                <Modal closeOnClickMask closeOnEsc>
                  <Modal.Trigger>
                    <Button label="Open Modal" />
                  </Modal.Trigger>
                  <Modal.Content>
                    <div>Modal Content</div>
                  </Modal.Content>
                </Modal>
              </Modal.InnerContent>
              <Modal.Footer>
                <Button label="Footer Button" />
              </Modal.Footer>
            </Modal.Content>
          </Modal>
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
