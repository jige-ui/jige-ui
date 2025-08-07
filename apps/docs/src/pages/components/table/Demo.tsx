import { Table } from 'jige-ui'
import { createSignal, For } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

export function Demo() {
  const [p, setP] = createStore({
    disabled: false,
    size: 'medium' as 'small' | 'medium' | 'large',
  })
  const [value, setValue] = createSignal<
    {
      name: string
      age: number
      address: string
      email: string
    }[]
  >([])

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
                      type='text'
                      value={item.name}
                      onInput={(e) =>
                        setValue((prev) =>
                          prev.map((v, i) =>
                            i === index() ? { ...v, name: e.currentTarget.value } : v,
                          ),
                        )
                      }
                      disabled={p.disabled}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      type='number'
                      value={item.age}
                      onInput={(e) =>
                        setValue((prev) =>
                          prev.map((v, i) =>
                            i === index() ? { ...v, age: Number(e.currentTarget.value) } : v,
                          ),
                        )
                      }
                      disabled={p.disabled}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      type='text'
                      value={item.address}
                      onInput={(e) =>
                        setValue((prev) =>
                          prev.map((v, i) =>
                            i === index() ? { ...v, address: e.currentTarget.value } : v,
                          ),
                        )
                      }
                      disabled={p.disabled}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      type='email'
                      value={item.email}
                      onInput={(e) =>
                        setValue((prev) =>
                          prev.map((v, i) =>
                            i === index() ? { ...v, email: e.currentTarget.value } : v,
                          ),
                        )
                      }
                      disabled={p.disabled}
                    />
                  </Table.Cell>
                </Table.Row>
              )}
            </For>
            <Table.Row>
              <Table.Cell colSpan={4}>
                <button
                  type='button'
                  onClick={() =>
                    setValue((prev) => [...prev, { name: '', age: 0, address: '', email: '' }])
                  }
                  disabled={p.disabled}
                >
                  Add Row
                </button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Playground.MainArea>
      <Playground.PropertySetting
        properties={p}
        onChange={setP}
        typeDeclaration={{
          size: ['small', 'medium', 'large'],
        }}
      />
    </Playground>
  )
}
