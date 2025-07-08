import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Table } from "./table.js";

type Attendee = {
  firstName: string;
  lastName: string;
  role: "scout" | "leader" | "volunteer";
};

const defaultData: Attendee[] = [
  { firstName: "Alice", lastName: "Smith", role: "scout" },
  { firstName: "Bob", lastName: "Abraham", role: "leader" },
  { firstName: "Charlie", lastName: "Brown", role: "volunteer" },
  { firstName: "Diana", lastName: "Prince", role: "scout" },
  { firstName: "Ethan", lastName: "Hunt", role: "leader" },
  { firstName: "Fiona", lastName: "Apple", role: "volunteer" },
  { firstName: "George", lastName: "Washington", role: "scout" },
  { firstName: "Hannah", lastName: "Montana", role: "leader" },
  { firstName: "Ian", lastName: "Fleming", role: "volunteer" },
  { firstName: "Julia", lastName: "Roberts", role: "scout" },
  { firstName: "Kevin", lastName: "Spacey", role: "leader" },
  { firstName: "Laura", lastName: "Croft", role: "volunteer" },
  { firstName: "Mike", lastName: "Tyson", role: "scout" },
  { firstName: "Nina", lastName: "Simone", role: "leader" },
  { firstName: "Oscar", lastName: "Wilde", role: "volunteer" },
  { firstName: "Paula", lastName: "Patton", role: "scout" },
  { firstName: "Quentin", lastName: "Tarantino", role: "leader" },
  { firstName: "Rachel", lastName: "Green", role: "volunteer" },
  { firstName: "Sam", lastName: "Smith", role: "scout" },
  { firstName: "Tina", lastName: "Turner", role: "leader" },
  { firstName: "Ursula", lastName: "K. Le Guin", role: "volunteer" },
];

const columnHelper = createColumnHelper<Attendee>();

const columns = [
  columnHelper.accessor("firstName", {
    header: () => "Förnamn",
    size: 200,
  }),
  columnHelper.accessor("lastName", {
    header: () => "Efternamn",
    size: 200,
  }),
  columnHelper.accessor("role", {
    header: () => "Roll",
    enableSorting: false,
    cell: (info) => {
      const role = info.getValue();
      return role.charAt(0).toUpperCase() + role.slice(1);
    },
  }),
];

function TableTest() {
  const [data, _setData] = useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <pre className="mb-4 min-h-48">
        {JSON.stringify(
          {
            // columnSizing: table.getState().columnSizing,
            // columnSizeVars,
            sort: table.getState().sorting,
          },
          null,
          2,
        )}
      </pre>
      <Table table={table} className="w-full max-h-80" />
    </>
  );
}

export { TableTest };
