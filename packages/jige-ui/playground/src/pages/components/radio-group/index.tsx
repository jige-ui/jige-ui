import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { RadioGroup } from '~/build';
import { Playground } from '../../../components/playground';

export default function Demo() {
  const [value, setValue] = createSignal('1');
  const [s, setS] = createStore({
    disabled: false,
  });
  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <div class="b b-t-border rounded-md">
            <div class="p-4">
              Selected value:
              {value()}
            </div>
          </div>
          <RadioGroup disabled={s.disabled} onChange={setValue} value={value()}>
            <RadioGroup.Item label="Option 1" value="1" />
            <RadioGroup.Item label="Option 2" value="2" />
            <RadioGroup.Item disabled label="Option 3" value="3" />
          </RadioGroup>
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting onChange={setS} properties={s} />
    </Playground>
  );
}
