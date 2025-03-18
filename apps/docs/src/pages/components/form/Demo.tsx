import { FormCore } from 'jige-core'
import { Button, Form, Input, RadioGroup, Switcher } from 'jige-ui'
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

export function Demo() {
  const [p, setP] = createStore({
    disabled: false,
    noLabel: false,
  })

  const [data, setData] = createStore({
    username: '',
    password: '',
  })

  const form = FormCore.createForm({
    defaultValues: () => ({
      username: 'haha',
      password: '',
      sex: 'male',
    }),
    onSubmit: async (value) => {
      await sleep(2000)

      setData(value)
    },
  })

  const [formState] = form.context

  return (
    <Playground>
      <Playground.MainArea>
        <Form staticFormInstance={form} disabled={p.disabled}>
          <Form.Field label={p.noLabel ? undefined : 'Username'} name='username'>
            <Input type='text' placeholder={p.noLabel ? 'Username' : ''} />
          </Form.Field>
          <Form.Field
            label={p.noLabel ? undefined : 'Password'}
            name={'password'}
            validators={[valiFieldAdapter(v.pipe(v.string(), v.nonEmpty('不能为空')))]}
          >
            <Input type='password' placeholder={p.noLabel ? 'Password' : ''} />
          </Form.Field>
          <Form.Field label={p.noLabel ? undefined : 'Sex'} name='sex'>
            <RadioGroup>
              <For each={['male', 'female']}>
                {(item) => <RadioGroup.Item value={item} label={item} />}
              </For>
            </RadioGroup>
          </Form.Field>
          <Form.Field name='remember'>
            <div class='flex items-center'>
              <Switcher type='checkbox' /> Remember me
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
          <div class='b b-b-blue p-2'>{JSON.stringify(data)}</div>
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting properties={p} onChange={setP} />
    </Playground>
  )
}
