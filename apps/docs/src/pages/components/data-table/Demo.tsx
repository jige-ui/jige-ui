import { DataTable } from 'jige-ui'
import { random, uid } from 'radash'
import { createResource, createSignal } from 'solid-js'
import { watch } from 'solid-uses'

export function Demo() {
  const generateData = () => {
    const data: any[] = []
    for (let i = 0; i < 100; i++) {
      data.push({
        'name': `${uid(7)}`,
        'age': random(1, 100),
        'sex': random(0, 1) === 0 ? '男' : '女',
        'address': `${uid(10)}`,
        'info.phone': `${random(13000000000, 19999999999)}`,
        'info.email': {
          data: `${uid(7)}@gmail.com`,
          width: 200,
        },
      })
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data)
      }, 1000)
    })
  }

  const [data, { refetch }] = createResource(generateData, { initialValue: [] })

  const [currPage, setCurrPage] = createSignal(1)

  watch(currPage, () => {
    refetch()
  })

  return (
    <div>
      <DataTable
        pagination={{
          total: 100,
          pageSize: 10,
          onPageClick(page) {
            setCurrPage(page)
          },
          currPage: currPage(),
        }}
        data={(data.latest) as any}
        loading={data.loading}
        maxHeight="400px"
      />
    </div>

  )
}
