import { esday } from 'esday';
import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { DateRangePicker } from '~/build';
import { Playground } from '../../../components/playground';

export default function Demo() {
  const [p, setP] = createStore({
    disabled: false,
    type: 'date' as 'datetime' | 'date',
    size: 'medium' as 'small' | 'medium' | 'large',
  });

  const [value, setValue] = createSignal<[string, string]>(['', '']);

  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <div>起始日期: {value()[0]}</div>
          <div>结束日期: {value()[1]}</div>
          <DateRangePicker
            disabled={p.disabled}
            onBlur={() => {}}
            onChange={setValue}
            onFocus={() => {}}
            presets={[
              {
                label: '本周',
                value: () => [
                  esday().startOf('week').format('YYYY-MM-DD HH:mm:ss'),
                  esday().endOf('week').format('YYYY-MM-DD HH:mm:ss'),
                ],
              },
            ]}
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
          type: ['date', 'datetime'],
          size: ['small', 'medium', 'large'],
        }}
      />
    </Playground>
  );
}
