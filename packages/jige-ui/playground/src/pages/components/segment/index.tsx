import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Segment } from '~/build';
import { Playground } from '../../../components/playground';

export default function Demo() {
  const [value, setValue] = createSignal('Apple');
  const [s, setS] = createStore({
    disabled: false,
  });
  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <div class="b b-t-border mb-2 rounded-md">
            <div class="p-2">
              Selected value:
              {value()}
            </div>
          </div>
          <Segment
            disabled={s.disabled}
            onChange={setValue}
            options={['Apple', 'Banana', 'Watermelon', 'Orange', 'Pineapple']}
            value={value()}
          />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting onChange={setS} properties={s} />
    </Playground>
  );
}
