import { Button, ComboBox, DataTable } from 'jige-ui'
import { random, uid } from 'radash'
import { createResource, createSignal, Show } from 'solid-js'
import { createStore } from 'solid-js/store'
import { watch } from 'solid-uses'
import { Playground } from '~/components/playground'

export function Demo() {
  const generateData = () => {
    const data: {
      name: string
      age: number
      sex: '男' | '女'
      address: string
      'info.phone': string
      'info.email': string
    }[] = []
    for (let i = 0; i < 100; i++) {
      data.push({
        name: `${uid(7)}`,
        age: random(1, 100),
        sex: random(0, 1) === 0 ? '男' : '女',
        address: `${uid(10)}`,
        'info.phone': `${random(13000000000, 19999999999)}`,
        'info.email': `${uid(7)}@gmail.com`,
      })
    }
    return new Promise<typeof data>((resolve) => {
      setTimeout(() => {
        resolve(data)
      }, 1000)
    })
  }

  const [data, { refetch, mutate }] = createResource(generateData, { initialValue: [] })

  const [currPage, setCurrPage] = createSignal(1)

  watch(currPage, () => {
    refetch()
  })

  const [p, setP] = createStore({
    size: 'medium',
    bordered: false,
  })

  const [editIndex, setEditIndex] = createSignal<number | null>(null)

  const isEditing = (index: number) => {
    return editIndex() === index
  }

  return (
    <Playground>
      <Playground.MainArea>
        <div class='w-full p-4'>
          <DataTable
            bordered={p.bordered}
            size={p.size as any}
            pagination={{
              total: 100,
              pageSize: 10,
              onPageClick(page) {
                setCurrPage(page)
              },
              currPage: currPage(),
            }}
            dataSource={data.latest}
            columns={[
              { key: 'info', title: '信息', isParentColumn: true },
              { key: 'info.phone', title: '电话' },
              { key: 'name', title: '姓名' },
              {
                width: 200,
                key: 'info.email',
                title: '邮箱',
                render(v) {
                  return (
                    <a href={`mailto:${v}`} class='bg-amber p-3 text-blue block'>
                      {v}
                    </a>
                  )
                },
              },
              { key: 'age', title: '年龄', width: 60 },
              {
                key: 'sex',
                title: '性别',
                width: 100,
                render(v, _row, index) {
                  return (
                    <Show when={isEditing(index)} fallback={<span>{v}</span>}>
                      <ComboBox
                        value={v as string}
                        options={['男', '女']}
                        onChange={(value) => {
                          value !== v &&
                            mutate((prev) => {
                              const res = [...prev]
                              res[index].sex = value as '男'
                              return [...res]
                            })
                        }}
                      />
                    </Show>
                  )
                },
              },
              {
                key: 'action',
                title: '操作',
                width: 200,
                render(_, _row, index) {
                  return (
                    <div class='flex gap-2'>
                      <Show
                        when={!isEditing(index)}
                        fallback={
                          <>
                            <Button
                              label='确认'
                              variant='text'
                              size='small'
                              color='var(--jg-t-hl)'
                            />
                            <Button
                              label='取消'
                              variant='text'
                              size='small'
                              color='var(--jg-fg-danger)'
                            />
                          </>
                        }
                      >
                        <Button
                          label='编辑'
                          variant='text'
                          size='small'
                          color='var(--jg-t-hl)'
                          onClick={() => {
                            setEditIndex(index)
                          }}
                        />
                        <Button
                          label='删除'
                          variant='text'
                          size='small'
                          color='var(--jg-fg-danger)'
                        />
                      </Show>
                    </div>
                  )
                },
              },
            ]}
            loading={data.loading}
            maxHeight='400px'
          />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting
        properties={p}
        onChange={setP}
        typeDeclaration={{
          size: ['small', 'medium', 'large', 50],
        }}
      />
    </Playground>
  )
}
