import { FormCore } from 'jige-core';
import { For } from 'solid-js';
import { createStore } from 'solid-js/store';
// biome-ignore lint/performance/noNamespaceImport: valibot exports many schemas
import * as v from 'valibot';
import {
  Button,
  CheckboxGroup,
  ComboBox,
  DatePicker,
  DateRangePicker,
  Form,
  Input,
  NumberBox,
  RadioGroup,
  Switcher,
} from '~/build';

import { Playground } from '../../../components/playground';

function valiFieldAdapter(schema: v.GenericSchema | v.GenericSchemaAsync) {
  return async (value: unknown) => {
    const result = await v.safeParseAsync(schema, value, {
      abortPipeEarly: true,
    });
    return result.issues?.[0]?.message || '';
  };
}

function valiForm(
  schemas: Record<string, v.GenericSchema | v.GenericSchemaAsync>
) {
  const finalValidate = {} as Record<
    string,
    (value: unknown) => Promise<string>
  >;
  for (const [key, schema] of Object.entries(schemas)) {
    finalValidate[key] = valiFieldAdapter(schema);
  }
  return finalValidate;
}

export default function Demo() {
  const [p, setP] = createStore({
    disabled: false,
    noLabel: false,
  });

  const [data, setData] = createStore({
    username: '',
    password: '',
  });

  const formSchema = {
    username: v.pipe(v.string(), v.minLength(6, '长度不能小于6')),
    password: v.pipe(
      v.string(),
      v.minLength(6, '密码长度不能小于6'),
      v.maxLength(12, '密码长度不能大于12')
    ),
  };

  const form = FormCore.createForm({
    defaultValues: () => ({
      username: 'haha',
      age: 7,
      city: '',
      password: '',
      confirmPassword: '',
      sex: 'male',
      date: '',
      dateRange: ['2024-01-01', '2024-12-27'],
      checkbox: [1, 2, 3],
    }),
    onSubmit: async (value) => {
      await sleep(2000);

      setData(value);
    },
    validate: valiForm(formSchema),
  });

  const [formState] = form.context;

  return (
    <Playground>
      <Playground.MainArea>
        <Form disabled={p.disabled} staticFormInstance={form}>
          <Form.Field
            label={p.noLabel ? undefined : 'Username'}
            name="username"
            required
          >
            <Input placeholder={p.noLabel ? 'Username' : ''} type="text" />
          </Form.Field>
          <Form.Field label={p.noLabel ? undefined : 'Age'} name="age" required>
            <NumberBox placeholder={p.noLabel ? 'Age' : ''} />
          </Form.Field>
          <Form.Field
            label={p.noLabel ? undefined : 'City'}
            name="city"
            required
          >
            <ComboBox
              options={['beijing', 'shanghai', 'guangzhou']}
              placeholder={p.noLabel ? 'City' : ''}
            />
          </Form.Field>
          <Form.Field
            label={p.noLabel ? undefined : 'Password'}
            name={'password'}
          >
            <Input placeholder={p.noLabel ? 'Password' : ''} type="password" />
          </Form.Field>
          <Form.Field
            label={p.noLabel ? undefined : 'Confirm Password'}
            name={'confirmPassword'}
            required
            validateRelatedFields={['password']}
            validators={[
              (value, f) => {
                if (value !== f.password) {
                  return '两次密码不一致';
                }
              },
            ]}
          >
            <Input
              placeholder={p.noLabel ? 'Confirm Password' : ''}
              type="password"
            />
          </Form.Field>
          <Form.Field label={p.noLabel ? undefined : 'Sex'} name="sex">
            <RadioGroup>
              <For each={['male', 'female']}>
                {(item) => <RadioGroup.Item label={item} value={item} />}
              </For>
            </RadioGroup>
          </Form.Field>
          <Form.Field label={p.noLabel ? undefined : 'date'} name="date">
            <DatePicker type="second" />
          </Form.Field>
          <Form.Field
            label={p.noLabel ? undefined : 'dateRange'}
            name="dateRange"
          >
            <DateRangePicker type="datetime" />
          </Form.Field>
          <Form.Field
            label={p.noLabel ? undefined : 'Checkbox'}
            name="checkbox"
          >
            <CheckboxGroup>
              <CheckboxGroup.Item value={1}>Option 1</CheckboxGroup.Item>
              <CheckboxGroup.Item value={2}>Option 2</CheckboxGroup.Item>
              <CheckboxGroup.Item value={3}>Option 3</CheckboxGroup.Item>
              <CheckboxGroup.Item value={4}>Option 4</CheckboxGroup.Item>
            </CheckboxGroup>
          </Form.Field>
          <Form.Field name="remember">
            <div class="flex items-center">
              <Switcher type="checkbox" /> Remember me
            </div>
          </Form.Field>

          <div class="flex gap-2">
            <Button
              disabled={!formState.canSubmit}
              label="Submit"
              loading={formState.isSubmitting}
              type="submit"
            />
            <Button
              disabled={formState.isSubmitting}
              label="Reset"
              type="reset"
            />
          </div>
        </Form>

        <div class="mt-2">
          <div class="text-sm">changed after submit: </div>
          <div class="b b-b-blue p-2">{JSON.stringify(data, null, 2)}</div>
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting onChange={setP} properties={p} />
    </Playground>
  );
}
function sleep(arg0: number) {
  return new Promise((resolve) => setTimeout(resolve, arg0));
}
