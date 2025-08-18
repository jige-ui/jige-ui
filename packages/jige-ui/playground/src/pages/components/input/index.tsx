import { createStore } from 'solid-js/store';
import { Input } from '~/build';
import { Playground } from '../../../components/playground';

export default function Demo() {
  const [p, setP] = createStore({
    disabled: false,
    clearable: false,
    readonly: false,
    type: 'text' as 'text' | 'textarea' | 'password',
    size: 'medium' as 'small' | 'medium' | 'large',
  });

  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <Input
            clearable={p.clearable}
            disabled={p.disabled}
            onBlur={() => {}}
            onFocus={() => {}}
            placeholder="Input some"
            readonly={p.readonly}
            size={p.size}
            type={p.type}
          />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting
        onChange={setP}
        properties={p}
        typeDeclaration={{
          type: ['text', 'textarea', 'password'],
          size: ['small', 'medium', 'large'],
        }}
      />
    </Playground>
  );
}
