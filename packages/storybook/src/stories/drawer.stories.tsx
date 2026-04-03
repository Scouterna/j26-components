import { ScoutDrawer } from "@scouterna/ui-react";
import { fn } from "storybook/test";
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
    open: false,
    heading: "Drawer Heading",
    showBackButton: true,
    showExitButton: true,
    onBackButtonClicked: fn(),
    onExitButtonClicked: fn(),
  },
  render: (args) => (
    <div>
      <p>some content within the page.</p>
      <p>Make sure the Drawer is placed in the root.</p>
      <ScoutDrawer {...args}>
        <p>Content inside the drawer</p>
      </ScoutDrawer>
    </div>
  ),
});
