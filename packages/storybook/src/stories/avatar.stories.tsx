import { ScoutAvatar } from "@scouterna/ui-react";
import preview from "#.storybook/preview";

const meta = preview.meta({
  title: "Basics/Avatar",
  component: ScoutAvatar,
  parameters: {
    layout: "centered",
  },
});

export default meta;

export const BasicExample = meta.story({
  args: {},
  render: (args) => (
    <div style={{ width: "200px" }}>
      <ScoutAvatar {...args} />
    </div>
  ),
});
