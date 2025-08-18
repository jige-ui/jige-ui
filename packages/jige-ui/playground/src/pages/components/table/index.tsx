import { createSignal, For } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Table } from '~/build';
import { Playground } from '../../../components/playground';

export default function Demo() {
  const [p, setP] = createStore({
    disabled: false,
    size: 'medium' as 'small' | 'medium' | 'large',
  });
  const [value, setValue] = createSignal<
    {
      name: string;
      age: number;
      address: string;
      email: string;
    }[]
  >([]);

  return (
    <Playground>
      <Playground.MainArea>
        <Table bordered>
          <Table.Header>
            <Table.Row>
              <Table.Column width={100}>Name</Table.Column>
              <Table.Column width={100}>Age</Table.Column>
              <Table.Column width={100}>Address</Table.Column>
              <Table.Column width={100}>Email</Table.Column>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <For each={value()}>
              {(item, index) => (
                <Table.Row>
                  <Table.Cell>
                    <input
                      disabled={p.disabled}
                      onInput={(e) =>
                        setValue((prev) =>
                          prev.map((v, i) =>
                            i === index()
                              ? { ...v, name: e.currentTarget.value }
                              : v
                          )
                        )
                      }
                      type="text"
                      value={item.name}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      disabled={p.disabled}
                      onInput={(e) =>
                        setValue((prev) =>
                          prev.map((v, i) =>
                            i === index()
                              ? { ...v, age: Number(e.currentTarget.value) }
                              : v
                          )
                        )
                      }
                      type="number"
                      value={item.age}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      disabled={p.disabled}
                      onInput={(e) =>
                        setValue((prev) =>
                          prev.map((v, i) =>
                            i === index()
                              ? { ...v, address: e.currentTarget.value }
                              : v
                          )
                        )
                      }
                      type="text"
                      value={item.address}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      disabled={p.disabled}
                      onInput={(e) =>
                        setValue((prev) =>
                          prev.map((v, i) =>
                            i === index()
                              ? { ...v, email: e.currentTarget.value }
                              : v
                          )
                        )
                      }
                      type="email"
                      value={item.email}
                    />
                  </Table.Cell>
                </Table.Row>
              )}
            </For>
            <Table.Row>
              <Table.Cell colSpan={4}>
                <button
                  disabled={p.disabled}
                  onClick={() =>
                    setValue((prev) => [
                      ...prev,
                      { name: '', age: 0, address: '', email: '' },
                    ])
                  }
                  type="button"
                >
                  Add Row
                </button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Playground.MainArea>
      <Playground.PropertySetting
        onChange={setP}
        properties={p}
        typeDeclaration={{
          size: ['small', 'medium', 'large'],
        }}
      />
    </Playground>
  );
}
