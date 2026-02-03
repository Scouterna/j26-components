import { ScoutTabsTab } from "@scouterna/ui-react";
import preview from "#.storybook/preview";

const meta = preview.meta({
  title: "Interaction/Tabs Tab",
  component: ScoutTabsTab,
  parameters: {
    layout: "centered",
  },
});

export default meta;

export const BasicExample = meta.story({
  args: {},
  render: (args) => <ScoutTabsTab {...args} />,
});
