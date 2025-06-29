import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  type Table as TanstackTable,
  useReactTable,
} from "@tanstack/react-table";
import { EllipsisVerticalIcon, ListFilterIcon } from "lucide-react";
import { type ComponentProps, memo, useMemo, useState } from "react";
import { cn } from "../../lib/utils.js";
import { Button } from "../button/button.js";
import { Card } from "../card/card.js";

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
  });

  return <Table table={table} className="w-full" />;
}

export type Props<TData> = ComponentProps<"table"> & {
  table: TanstackTable<TData>;
};

function Table<TData>(props: Props<TData>) {
  const { table, className, ...otherProps } = props;

  /**
   * Instead of calling `column.getSize()` on every render for every header
   * and especially every data cell (very expensive),
   * we will calculate all column sizes at once at the root table level in a useMemo
   * and pass the column sizes down as CSS variables to the <table> element.
   */
  // biome-ignore lint/correctness/useExhaustiveDependencies: This is carefully optimized to avoid unnecessary recalculations
  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    for (const header of headers) {
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }
    return colSizes;
  }, [table.getState().columnSizingInfo, table.getState().columnSizing]);

  return (
    <>
      <pre style={{ minHeight: "10rem" }}>
        {JSON.stringify(
          {
            columnSizing: table.getState().columnSizing,
          },
          null,
          2,
        )}
      </pre>

      <Card
        className={cn("p-0 inline-block", className)}
        {...otherProps}
        variant="light"
      >
        <table
          style={{
            ...columnSizeVars,
            width: table.getTotalSize(),
          }}
        >
          <thead className="border-b border-gray-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="relative p-2 text-left"
                    style={{
                      width: `calc(var(--header-${header?.id}-size) * 1px)`,
                    }}
                  >
                    <div className="flex justify-between pr-1">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}

                      <div className="flex gap-0.5">
                        <Button size="tiny-icon" variant="text" color="gray">
                          <ListFilterIcon />
                        </Button>
                        <Button size="tiny-icon" variant="text" color="gray">
                          <EllipsisVerticalIcon />
                        </Button>
                      </div>
                    </div>

                    {header.column.getCanResize() && (
                      <div
                        // FIXME: Hiding this from screen readers is not ideal.
                        // Resizing columns might not be important for fully sight
                        // impaired users, but it could be for low vision users.
                        // https://github.com/Scouterna/ui/issues/15
                        aria-hidden
                        onDoubleClick={() => header.column.resetSize()}
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={cn(
                          "absolute flex justify-center items-center py-2 top-0 right-0 h-full w-2 cursor-col-resize touch-none select-none",
                          "after:w-0.5 after:h-full after:bg-gray-300",
                          header.column.getIsResizing() &&
                            "bg-blue-100 after:invisible",
                        )}
                        style={{
                          transform:
                            table.options.columnResizeMode === "onEnd" &&
                            header.column.getIsResizing()
                              ? `translateX(${table.getState().columnSizingInfo.deltaOffset}px)`
                              : "",
                        }}
                      ></div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {table.getState().columnSizingInfo.isResizingColumn ? (
            <MemoizedTableBody table={table} />
          ) : (
            <TableBody table={table} />
          )}
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </Card>
    </>
  );
}

function TableBody<TData>({ table }: { table: TanstackTable<TData> }) {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id} className="not-last:border-b border-gray-300">
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className="text-left px-2 py-1">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

//special memoized wrapper for our table body that we will use during column resizing
export const MemoizedTableBody = memo(
  TableBody,
  (prev, next) => prev.table.options.data === next.table.options.data,
) as typeof TableBody;

export { Table, TableTest };
