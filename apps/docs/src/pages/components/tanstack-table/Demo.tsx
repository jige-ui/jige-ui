import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

import {
  type ColumnDef,
  createColumnHelper,
  createSolidTable,
  getCoreRowModel,
} from '@tanstack/solid-table'
import { Button, Modal, TanstackTable } from 'jige-ui'
import { random, sleep, uid } from 'radash'
import { createResource, createSignal } from 'solid-js'

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const columnHelper = createColumnHelper<Person>()
const defaultColumns: ColumnDef<Person>[] = [
  columnHelper.display({
    header: 'Actions',
    cell: (props) => (
      <Button size='small' onClick={() => alert(props.row.index)}>
        Edit
      </Button>
    ),
  }),
  {
    header: 'Name',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        meta: {
          width: 200,
        },
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
    ],
  },
  {
    header: 'Info',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'age',
        header: () => 'Age',
        footer: (props) => props.column.id,
      },
      {
        header: 'More Info',
        columns: [
          {
            accessorKey: 'visits',
            header: () => <span>Visits</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'status',
            header: 'Status',
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'progress',
            header: 'Profile Progress',
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
  },
]

const status = ['In Relationship', 'Single', 'Complicated']

function genData(count: number): Person[] {
  const data: Person[] = []
  for (let i = 0; i < count; i++) {
    data.push({
      firstName: uid(7),
      lastName: uid(6),
      age: random(1, 100),
      visits: random(1, 100),
      status: status[random(0, 2)],
      progress: random(1, 100),
    })
  }
  return data
}

export function Demo() {
  const [p, setP] = createStore({
    size: 'medium' as const,
    bordered: false,
  })

  const [data, { refetch }] = createResource(
    async () => {
      await sleep(random(5, 15) * 200)
      return genData(100)
    },
    { initialValue: [] },
  )

  const table = createSolidTable({
    get data() {
      return data.latest
    },
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnPinning: {
        right: ['Actions'],
      },
    },
  })

  const [open, setOpen] = createSignal(false)
  const [showItem, setShowItem] = createSignal<Person>()

  return (
    <Playground>
      <Playground.MainArea>
        <div class='w-full p-4'>
          <TanstackTable
            loading={data.loading}
            staticTableInstance={table}
            bordered={p.bordered}
            size={p.size}
            onRowClick={(row) => {
              setShowItem(row)
              setOpen(true)
            }}
            maxHeight='355px'
            pagination={{
              total: 10000,
              pageSize: 100,
              onPageClick() {
                refetch()
              },
              currPage: 1,
            }}
          />
          <Modal open={open()} onOpenChange={setOpen} closeOnClickMask closeOnEsc>
            <Modal.Content width='30vw'>
              <Modal.Header>
                <div class='flex items-center gap-2'>
                  <div class='i-ri-account-box-fill text-xl' />
                  <div>User Info</div>
                </div>
              </Modal.Header>
              <div>
                <div class='mt-2'>{JSON.stringify(showItem(), null, 2)}</div>
              </div>
              <Modal.Footer />
            </Modal.Content>
          </Modal>
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
