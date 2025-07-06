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
  { firstName: "Bob", lastName: "Johnson", role: "leader" },
  { firstName: "Charlie", lastName: "Brown", role: "volunteer" },
];

const columnHelper = createColumnHelper<Attendee>();

const columns = [
  columnHelper.accessor("firstName", {
    header: () => "Förnamn",
  }),
  columnHelper.accessor("lastName", {
    header: () => "Efternamn",
    enableSorting: false,
  }),
  columnHelper.accessor("role", {
    header: () => "Roll",
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
          },
          null,
          2,
        )}
      </pre>
      <Table table={table} className="w-full" />
    </>
  );
}

export { TableTest };
