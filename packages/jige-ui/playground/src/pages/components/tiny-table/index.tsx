import { createResource, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { random, sleep, uid } from "solid-tiny-utils";
import { Button, createColumnHelper, Form, Input, TinyTable } from "~/build";
import { Playground } from "../../../components/playground";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const columnHelper = createColumnHelper<Person>();
const defaultColumns = [
  columnHelper.display({
    header: "Actions",
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
    },
  }),
  {
    header: "Name",
    columns: [
      {
        accessorKey: "firstName",
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
        accessorFn: (row: any) => row.lastName,
        id: "lastName",
        header: () => <span>Last Name</span>,
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
    header: "Info",
    columns: [
      {
        accessorKey: "age",
        header: () => "Age",
        meta: {
          width: 100,
        },
      },
      {
        header: "More Info",
        columns: [
          {
            accessorKey: "visits",
            header: () => <span>Visits</span>,
          },
          {
            accessorKey: "status",
            header: "Status",
          },
          {
            accessorKey: "progress",
            header: "Profile Progress",
          },
        ],
      },
    ],
  },
];

const status = ["In Relationship", "Single", "Complicated"];

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
    size: "medium" as const,
    bordered: false,
    empty: false,
  });

  const [data, { refetch }] = createResource(
    async () => {
      await sleep(1000);
      return genData(100);
    },
    { initialValue: [] }
  );

  const [showItem, setShowItem] = createSignal<Person>();
  const [currPage, setCurrPage] = createSignal(1);

  return (
    <Playground>
      <Playground.MainArea>
        <div class="w-full p-4">
          <TinyTable
            bordered={p.bordered}
            columns={defaultColumns}
            data={p.empty ? [] : data.latest}
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
            rowClass={(row) => (row === showItem() ? "bg-blue-100" : "")}
            size={p.size}
          />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting
        onChange={setP}
        properties={p}
        typeDeclaration={{
          size: ["small", "medium", "large", 50],
        }}
      />
    </Playground>
  );
}
