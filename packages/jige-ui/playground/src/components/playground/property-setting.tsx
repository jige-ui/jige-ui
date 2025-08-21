import { FormCore } from 'jige-core';
import { createSignal, For, Match, Switch } from 'solid-js';
import type { SetStoreFunction } from 'solid-js/store';
import { createWatch } from 'solid-tiny-utils';
import {
  Form,
  FormCheckbox,
  FormComboBox,
  FormInput,
  FormNumberBox,
} from '~/build';

export function PropertySetting<T extends { [key: string]: unknown }>(props: {
  properties: T;
  onChange: SetStoreFunction<T>;
  typeDeclaration?: Record<
    string,
    'string' | 'number' | 'boolean' | (string | number)[]
  >;
}) {
  const checkType = (key: string) => {
    return props.typeDeclaration?.[key] || typeof props.properties[key];
  };

  const form = FormCore.createForm({
    defaultValues: () => ({ ...props.properties }) as any,
  });

  const [propName, setPropName] = createSignal<string[]>([]);

  createWatch(
    () => ({ ...props.properties }),
    (p) => {
      setPropName(Object.keys(p));
    }
  );

  createWatch(
    () => ({ ...form.context[0].formData }),
    (data: unknown) => {
      props.onChange(data as T);
    }
  );

  return (
    <div class="flex w-185px shrink-0 flex-col">
      <div class="b-b b-t-border p-2">Properties</div>
      <Form staticFormInstance={form}>
        <For each={propName()}>
          {(item) => (
            <FormCore.Field name={item}>
              <div class="m-1 flex flex-wrap items-center justify-between">
                <Switch>
                  <Match when={checkType(item) === 'boolean'}>
                    <div>{item}</div>
                    <FormCheckbox />
                  </Match>
                  <Match when={checkType(item) === 'string'}>
                    <div>{item}</div>
                    <FormInput />
                  </Match>
                  <Match when={checkType(item) === 'number'}>
                    <div>{item}</div>
                    <FormNumberBox />
                  </Match>
                  <Match when={Array.isArray(checkType(item))}>
                    <div>{item}</div>
                    <FormComboBox options={checkType(item) as string[]} />
                  </Match>
                </Switch>
              </div>
            </FormCore.Field>
          )}
        </For>
      </Form>
    </div>
  );
}
