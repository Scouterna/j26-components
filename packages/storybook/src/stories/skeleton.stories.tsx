import { ScoutSkeleton } from "@scouterna/ui-react";
import preview from "#.storybook/preview";

const meta = preview.meta({
  title: "Uncategorized/Skeleton",
  component: ScoutSkeleton,
  parameters: {
    layout: "centered",
  },
});

export default meta;

export const BasicExample = meta.story({
  args: {},
  render: (args) => (
    <ScoutSkeleton {...args} style={{ width: "300px", height: "300px" }} />
  ),
});
