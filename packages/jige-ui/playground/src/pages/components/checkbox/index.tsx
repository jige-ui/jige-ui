import { createStore } from 'solid-js/store';
import { Checkbox } from '~/build';
import { Playground } from '../../../components/playground';

export default function Demo() {
  const [p, setP] = createStore({
    disabled: false,
    size: 'medium' as 'small' | 'medium' | 'large',
    indeterminate: false,
  });
  return (
    <Playground>
      <Playground.MainArea>
        <div class="flex items-center">
          <Checkbox
            disabled={p.disabled || undefined}
            indeterminate={p.indeterminate}
            size={p.size}
          >
            check me
          </Checkbox>
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
