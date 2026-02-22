import { ScoutDrawer } from "@scouterna/ui-react";
import preview from "#.storybook/preview";

const meta = preview.meta({
  title: "Containers/Drawer",
  component: ScoutDrawer,
  parameters: {
    layout: "centered",
  },
});

export default meta;

export const BasicExample = meta.story({
  args: {
    open: true,
    title: "Drawer Title",
    backButton: true,
    closeButton: true,
  },
  render: (args) => (
    <div>
      <p>some content within the page</p>
      <ScoutDrawer {...args}>
        <p>Content inside the drawer</p>
      </ScoutDrawer>
    </div>
  ),
});
