import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

import {
  type ColumnDef,
  createColumnHelper,
  createSolidTable,
  getCoreRowModel,
} from '@tanstack/solid-table'
import { Button, Form, Input, Modal, NumberBox, TanstackTable } from 'jige-ui'
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
    cell: () => (
      <Button
        size='small'
        label='edit'
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        onDblClick={(e) => {
          e.stopPropagation()
        }}
      />
    ),
    meta: {
      width: 200,
      editable: (_formData, actions) => (
        <div class='flex items-center gap-1'>
          <Button
            variant='text'
            size='small'
            onClick={async () => {
              await actions.confirm()
            }}
            label='Confirm'
            color='var(--jg-t-hl)'
          />
          <Button
            size='small'
            variant='text'
            label='Cancel'
            onClick={() => {
              actions.cancel()
            }}
          />
        </div>
      ),
    },
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
          editable: () => {
            return (
              <Form.Field name='firstName' required>
                <Input />
              </Form.Field>
            )
          },
        },
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
        meta: {
          width: 200,
          editable: () => (
            <Form.Field name='lastName'>
              <Input />
            </Form.Field>
          ),
        },
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
        meta: {
          width: 100,
          editable: () => (
            <Form.Field name='age'>
              <NumberBox min={14} max={150} />
            </Form.Field>
          ),
        },
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

  const [data, { refetch, mutate }] = createResource(
    async () => {
      await sleep(random(5, 15) * 200)
      return genData(100)
    },
    { initialValue: [] },
  )

  const table = createSolidTable({
    get data() {
      return []
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
  const [currPage, setCurrPage] = createSignal(1)

  return (
    <Playground>
      <Playground.MainArea>
        <div class='w-full p-4'>
          <TanstackTable
            onAddNewRow={async (data) => {
              await sleep(1000)
              if (data.age < 18) {
                alert('Age must be greater than 18')
                return false
              }
              mutate((old) => [
                ...old,
                {
                  firstName: data.firstName || '',
                  lastName: data.lastName || '',
                  age: data.age || 0,
                  visits: data.visits || 0,
                  status: data.status || 'unsigned',
                  progress: data.progress || 10,
                },
              ])
              return true
            }}
            loading={data.loading}
            staticTableInstance={table}
            bordered={p.bordered}
            size={p.size}
            onRowDbClick={(row) => {
              setShowItem(row)
              setOpen(true)
            }}
            maxHeight='355px'
            pagination={{
              total: 10000,
              pageSize: 100,
              onPageClick(pn) {
                setCurrPage(pn)
                refetch()
              },
              currPage: currPage(),
            }}
          />
          <Modal open={open()} onOpenChange={setOpen} closeOnClickMask closeOnEsc>
            <Modal.Content width='30vw' title='Row Data'>
              <div>
                <div class='mt-2'>{JSON.stringify(showItem(), null, 2)}</div>
              </div>
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
