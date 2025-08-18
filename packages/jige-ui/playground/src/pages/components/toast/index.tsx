import { createStore } from 'solid-js/store';
import type { ToastType } from '~/build';
import { Button, useToast } from '~/build';
import { Playground } from '../../../components/playground';

export default function Demo() {
  const [s, setS] = createStore({
    title: 'title',
    content: 'content',
    timeout: 3000,
    type: 'info' as ToastType,
  });
  const $t = useToast();
  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <Button
            label="Fire Toast"
            onClick={() => {
              $t[s.type]({
                title: s.title,
                content: s.content,
                timeout: s.timeout,
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
