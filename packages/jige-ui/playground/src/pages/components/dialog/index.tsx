import { createStore } from 'solid-js/store';
import type { ToastType } from '~/build';
import { Button, useDialog } from '~/build';
import { Playground } from '../../../components/playground';

export default function Demo() {
  const [s, setS] = createStore({
    title: 'title',
    content: 'content',
    type: 'info' as ToastType,
  });
  const $d = useDialog();
  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <Button
            label="Fire Dialog"
            onClick={() => {
              $d[s.type]({
                title: s.title,
                content: s.content,
              });
            }}
          />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting
        onChange={setS}
        properties={s}
        typeDeclaration={{
          type: ['error', 'warning', 'success', 'info'],
        }}
      />
    </Playground>
  );
}
