import { ScoutInput } from "@scouterna/ui-react";
import preview from "#.storybook/preview";

const meta = preview.meta({
  title: "Interaction/Input",
  component: ScoutInput,
  parameters: {
    layout: "centered",
  },
});

export default meta;

export const BasicExample = meta.story({
  args: {
    value: "Super duper",
  },
  render: (args) => <ScoutInput {...args} />,
});

export const Large = BasicExample.extend({
  args: {
    size: "large",
  },
});

export const Elevated = BasicExample.extend({
  args: {
    variant: "elevated",
  },
});

export const Disabled = BasicExample.extend({
  args: {
    disabled: true,
  },
});
