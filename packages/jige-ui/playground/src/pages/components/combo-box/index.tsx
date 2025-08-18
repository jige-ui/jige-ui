import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { list } from 'solid-tiny-utils';
import { ComboBox } from '~/build';
import { Playground } from '../../../components/playground';

export default function Demo() {
  const [p, setP] = createStore({
    disabled: false,
    size: 'medium' as 'small' | 'medium' | 'large',
    editable: false,
  });
  const [value, setValue] = createSignal<number>();
  return (
    <Playground>
      <Playground.MainArea>
        <div class="flex items-center gap-2">
          <div class="flex gap-2 p-1">
            <div class="text-sm">Value: </div>
            <span>{value()}</span>
          </div>
          <ComboBox
            disabled={p.disabled}
            editable={p.editable}
            onChange={setValue}
            options={list(20_000).map((v) => ({
              value: v,
              label: `Option ${v}`,
            }))}
            size={p.size}
            style={{ width: '128px' }}
            value={value()}
          />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting
        onChange={setP}
        properties={p}
        typeDeclaration={{
          size: ['small', 'medium', 'large'],
        }}
      />
    </Playground>
  );
}
