import type { Meta, Preview } from "@storybook/react";
import { Table } from "./table.js";
import { TableTest } from "./table-test.js";

export default {
  title: "Components/Table",
  component: Table,
} satisfies Meta;

export const Simple = {
  render: () => <TableTest />,
} satisfies Preview;
