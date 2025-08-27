import {
  type ColumnDef,
  createColumnHelper,
  createSolidTable,
  getCoreRowModel,
} from '@tanstack/solid-table';
import { createResource, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { random, sleep, uid } from 'solid-tiny-utils';
import { Button, Form, Input, NumberBox, TanstackTable } from '~/build';
import { Playground } from '../../../components/playground';

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const columnHelper = createColumnHelper<Person>();
const defaultColumns: ColumnDef<Person>[] = [
  columnHelper.display({
    header: 'Actions',
    cell: () => (
      <Button
        label="edit"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDblClick={(e) => {
          e.stopPropagation();
        }}
        size="small"
      />
    ),
    meta: {
      width: 200,
      editable: (_formData, actions) => (
        <div class="flex items-center gap-1">
          <Button
            color="var(--jg-t-hl)"
            label="Confirm"
            onClick={async () => {
              await actions.confirm();
            }}
            size="small"
            variant="text"
          />
          <Button
            label="Cancel"
            onClick={() => {
              actions.cancel();
            }}
            size="small"
            variant="text"
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
              <Form.Field name="firstName" required>
                <Input />
              </Form.Field>
            );
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
            <Form.Field name="lastName">
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
            <Form.Field name="age">
              <NumberBox max={150} min={14} />
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
];

const status = ['In Relationship', 'Single', 'Complicated'];

function genData(count: number): Person[] {
  const data: Person[] = [];
  for (let i = 0; i < count; i++) {
    data.push({
      firstName: uid(7),
      lastName: uid(6),
      age: random(1, 100),
      visits: random(1, 100),
      status: status[random(0, 2)],
      progress: random(1, 100),
    });
  }
  return data;
}

export default function Demo() {
  const [p, setP] = createStore({
    size: 'medium' as const,
    bordered: false,
  });

  const [data, { refetch }] = createResource(
    async () => {
      await sleep(1000);
      return genData(100);
    },
    { initialValue: [] }
  );

  const table = createSolidTable({
    get data() {
      return data();
    },
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnPinning: {
        right: ['Actions'],
      },
    },
  });

  const [showItem, setShowItem] = createSignal<Person>();
  const [currPage, setCurrPage] = createSignal(1);

  return (
    <Playground>
      <Playground.MainArea>
        <div class="w-full p-4">
          <TanstackTable
            bordered={p.bordered}
            loading={data.loading}
            maxHeight="355px"
            onRowClick={(row) => {
              setShowItem(row);
            }}
            pagination={{
              total: 10_000,
              pageSize: 100,
              onPageClick(pn) {
                setCurrPage(pn);
                refetch();
              },
              currPage: currPage(),
            }}
            rowClass={(row) => (row === showItem() ? 'bg-blue-100' : '')}
            size={p.size}
            staticTableInstance={table}
          />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting
        onChange={setP}
        properties={p}
        typeDeclaration={{
          size: ['small', 'medium', 'large', 50],
        }}
      />
    </Playground>
  );
}
