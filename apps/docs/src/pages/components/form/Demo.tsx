import { FormCore } from 'jige-core'
import {
  Button,
  ComboBox,
  DatePicker,
  DateRangePicker,
  Form,
  Input,
  NumberBox,
  RadioGroup,
  Switcher,
} from 'jige-ui'
import { sleep } from 'radash'
import { For } from 'solid-js'
import { createStore } from 'solid-js/store'
import * as v from 'valibot'

import { Playground } from '~/components/playground'

function valiFieldAdapter(schema: v.GenericSchema | v.GenericSchemaAsync) {
  return async (value: any) => {
    const result = await v.safeParseAsync(schema, value, {
      abortPipeEarly: true,
    })
    return result.issues?.[0]?.message || ''
  }
}

function valiForm(schemas: Record<string, v.GenericSchema | v.GenericSchemaAsync>) {
  const finalValidate = {} as Record<string, any>
  for (const key in schemas) {
    finalValidate[key] = valiFieldAdapter(schemas[key])
  }
  return finalValidate
}

export function Demo() {
  const [p, setP] = createStore({
    disabled: false,
    noLabel: false,
    disableBind: false,
  })

  const [data, setData] = createStore({
    username: '',
    password: '',
  })

  const formSchema = {
    username: v.pipe(v.string(), v.minLength(6, '长度不能小于6')),
    password: v.pipe(
      v.string(),
      v.minLength(6, '密码长度不能小于6'),
      v.maxLength(12, '密码长度不能大于12'),
    ),
  }

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
    }),
    onSubmit: async (value) => {
      await sleep(2000)

      setData(value)
    },
    validate: valiForm(formSchema),
  })

  const [formState] = form.context

  return (
    <Playground>
      <Playground.MainArea>
        <Form staticFormInstance={form} disabled={p.disabled}>
          <Form.Field label={p.noLabel ? undefined : 'Username'} name='username' required>
            <Input
              type='text'
              placeholder={p.noLabel ? 'Username' : ''}
              disableBind={p.disableBind}
            />
          </Form.Field>
          <Form.Field label={p.noLabel ? undefined : 'Age'} name='age' required>
            <NumberBox placeholder={p.noLabel ? 'Age' : ''} disableBind={p.disableBind} />
          </Form.Field>
          <Form.Field label={p.noLabel ? undefined : 'City'} name='city' required>
            <ComboBox
              placeholder={p.noLabel ? 'City' : ''}
              options={['beijing', 'shanghai', 'guangzhou']}
              disableBind={p.disableBind}
            />
          </Form.Field>
          <Form.Field label={p.noLabel ? undefined : 'Password'} name={'password'}>
            <Input
              type='password'
              placeholder={p.noLabel ? 'Password' : ''}
              disableBind={p.disableBind}
            />
          </Form.Field>
          <Form.Field
            required
            label={p.noLabel ? undefined : 'Confirm Password'}
            name={'confirmPassword'}
            validateRelatedFields={['password']}
            validators={[
              (value, form) => {
                if (value !== form.password) {
                  return '两次密码不一致'
                }
              },
            ]}
          >
            <Input
              type='password'
              placeholder={p.noLabel ? 'Confirm Password' : ''}
              disableBind={p.disableBind}
            />
          </Form.Field>
          <Form.Field label={p.noLabel ? undefined : 'Sex'} name='sex'>
            <RadioGroup disableBind={p.disableBind}>
              <For each={['male', 'female']}>
                {(item) => <RadioGroup.Item value={item} label={item} />}
              </For>
            </RadioGroup>
          </Form.Field>
          <Form.Field label={p.noLabel ? undefined : 'date'} name='date'>
            <DatePicker disableBind={p.disableBind} type='second' />
          </Form.Field>
          <Form.Field label={p.noLabel ? undefined : 'dateRange'} name='dateRange'>
            <DateRangePicker disableBind={p.disableBind} type='datetime' />
          </Form.Field>
          <Form.Field name='remember'>
            <div class='flex items-center'>
              <Switcher type='checkbox' disableBind={p.disableBind} /> Remember me
            </div>
          </Form.Field>

          <div class='flex gap-2'>
            <Button
              type='submit'
              label='Submit'
              loading={formState.isSubmitting}
              disabled={!formState.canSubmit}
            />
            <Button type='reset' label='Reset' disabled={formState.isSubmitting} />
          </div>
        </Form>

        <div class='mt-2'>
          <div class='text-sm'>changed after submit: </div>
          <div class='b b-b-blue p-2'>{JSON.stringify(data, null, 2)}</div>
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting properties={p} onChange={setP} />
    </Playground>
  )
}
