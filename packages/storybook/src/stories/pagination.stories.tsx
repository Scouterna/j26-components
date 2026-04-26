import { ScoutPagination } from "@scouterna/ui-react";
import preview from "#.storybook/preview";

const meta = preview.meta({
  title: "Interaction/Pagination",
  component: ScoutPagination,
  parameters: {
    layout: "centered",
  },
});

export default meta;

export const BasicExample = meta.story({
  args: {
    pages: 10,
  },
  render: (args) => <ScoutPagination {...args} />,
});
