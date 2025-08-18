import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { DatePicker } from '~/build';
import { Playground } from '../../../components/playground';

export default function Demo() {
  const [p, setP] = createStore({
    disabled: false,
    type: 'date' as const,
  });

  const [value, setValue] = createSignal('');

  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <div>日期: {value()}</div>
          <DatePicker
            disabled={p.disabled}
            onBlur={() => {}}
            onChange={setValue}
            onFocus={() => {}}
            type={p.type}
            value={value()}
          />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting
        onChange={setP}
        properties={p}
        typeDeclaration={{
          type: ['date', 'month', 'hour', 'minute', 'second'],
        }}
      />
    </Playground>
  );
}
