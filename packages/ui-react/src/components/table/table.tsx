import { ScrollArea } from "@base-ui-components/react";
import {
  flexRender,
  type Header,
  type Table as TanstackTable,
} from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDownIcon,
  EllipsisVerticalIcon,
  ListFilterIcon,
} from "lucide-react";
import { memo, useId, useMemo } from "react";
import { Fragment } from "react/jsx-runtime";
import { cn } from "../../lib/utils.js";
import { Button } from "../button/button.js";
import { Card } from "../card/card.js";
import * as Menu from "../menu/menu.js";

export type Props<TData> = Parameters<typeof Card>[0] & {
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
    <Card
      className={cn("p-0 inline-block overflow-auto", className)}
      {...otherProps}
      variant="light"
    >
      <table
        className="border-separate border-spacing-0"
        style={{
          ...columnSizeVars,
          width:
            (table.options.enableColumnResizing ?? true)
              ? table.getTotalSize()
              : "100%",
        }}
      >
        <thead className="sticky top-0 bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="relative p-2 select-none border-b border-gray-300"
                  style={{
                    width: `calc(var(--header-${header?.id}-size) * 1px)`,
                  }}
                >
                  <div className="flex justify-between pr-1">
                    <HeaderTitle header={header} />

                    <div className="flex gap-0.5">
                      <Button size="tiny-icon" variant="text" color="gray">
                        <ListFilterIcon />
                      </Button>
                      <HeaderMenu header={header} />
                    </div>
                  </div>

                  {header.column.getCanResize() && (
                    <ResizeHandle table={table} header={header} />
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
  );
}

function TableBody<TData>({ table }: { table: TanstackTable<TData> }) {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id} className="group/row">
          {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              className="text-left px-2 py-1 group-not-last/row:border-b border-gray-300"
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

function ResizeHandle({
  table,
  header,
}: {
  // biome-ignore lint/suspicious/noExplicitAny: We don't care about the type here
  table: TanstackTable<any>;
  // biome-ignore lint/suspicious/noExplicitAny: We don't care about the type here
  header: Header<any, any>;
}) {
  return (
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
        header.column.getIsResizing() && "bg-blue-100 after:invisible",
      )}
      style={{
        transform:
          table.options.columnResizeMode === "onEnd" &&
          header.column.getIsResizing()
            ? `translateX(${table.getState().columnSizingInfo.deltaOffset}px)`
            : "",
      }}
    />
  );
}

// biome-ignore lint/suspicious/noExplicitAny: We don't care about the type here
function HeaderTitle({ header }: { header: Header<any, any> }) {
  const sortDescriptionId = useId();

  if (header.isPlaceholder) {
    return null;
  }

  const rendered = flexRender(
    header.column.columnDef.header,
    header.getContext(),
  );

  if (!header.column.getCanSort()) {
    return rendered;
  }

  return (
    <>
      <button
        type="button"
        className={cn("flex-1 flex items-center gap-1 cursor-pointer")}
        onClick={header.column.getToggleSortingHandler()}
        aria-describedby={sortDescriptionId}
      >
        {rendered}

        {header.column.getIsSorted() === "asc" && (
          <ArrowUpIcon className="size-4" />
        )}
        {header.column.getIsSorted() === "desc" && (
          <ArrowDownIcon className="size-4" />
        )}
      </button>

      <p id={sortDescriptionId} hidden>
        Toggle column sorting
      </p>
    </>
  );
}

// biome-ignore lint/suspicious/noExplicitAny: We don't care about the type here
function HeaderMenu({ header }: { header: Header<any, any> }) {
  const menuSections = [
    header.column.getCanSort() && (
      <Fragment key="sortMenu">
        {header.column.getIsSorted() !== "asc" && (
          <Menu.Item
            icon={<ArrowUpIcon />}
            onClick={() => header.column.toggleSorting(false)}
          >
            Sort Ascending
          </Menu.Item>
        )}
        {header.column.getIsSorted() !== "desc" && (
          <Menu.Item
            icon={<ArrowDownIcon />}
            onClick={() => header.column.toggleSorting(true)}
          >
            Sort Descending
          </Menu.Item>
        )}
        {header.column.getIsSorted() && (
          <Menu.Item
            icon={<ChevronsUpDownIcon />}
            onClick={() => header.column.clearSorting()}
          >
            Clear Sorting
          </Menu.Item>
        )}
      </Fragment>
    ),
  ].filter((section) => section !== false);

  if (menuSections.length === 0) {
    return null;
  }

  return (
    <Menu.Root>
      <Menu.Trigger
        render={
          <Button size="tiny-icon" variant="text" color="gray">
            <EllipsisVerticalIcon />
          </Button>
        }
      />

      <Menu.Positioner align="start">
        {menuSections.map((section, index) => (
          <>
            {section}
            {index < menuSections.length - 1 && <Menu.Separator />}
          </>
        ))}
      </Menu.Positioner>
    </Menu.Root>
  );
}

// Special memoized wrapper for our table body that we will use during column resizing
export const MemoizedTableBody = memo(
  TableBody,
  (prev, next) => prev.table.options.data === next.table.options.data,
) as typeof TableBody;

export { Table };
