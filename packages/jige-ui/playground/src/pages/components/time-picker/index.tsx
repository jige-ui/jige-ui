import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { TimePicker } from '~/build';
import { Playground } from '../../../components/playground';

export default function Demo() {
  const [p, setP] = createStore({
    disabled: false,
    size: 'medium' as 'small' | 'medium',
    type: 'second' as 'hour' | 'second' | 'minute',
  });

  const [value, setValue] = createSignal('');

  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <div>value: {value()}</div>
          <TimePicker
            disabled={p.disabled}
            onChange={setValue}
            size={p.size}
            type={p.type}
            value={value()}
          />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting
        onChange={setP}
        properties={p}
        typeDeclaration={{
          type: ['hour', 'minute', 'second'],
          size: ['small', 'medium'],
        }}
      />
    </Playground>
  );
}
