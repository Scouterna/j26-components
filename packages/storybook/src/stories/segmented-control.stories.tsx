import { ScoutSegmentedControl } from "@scouterna/ui-react";
import { useArgs } from "storybook/internal/preview-api";
import preview from "#.storybook/preview";

const meta = preview.meta({
  title: "Interaction/Segmented Control",
  component: ScoutSegmentedControl,
  parameters: {
    layout: "centered",
  },
});

export default meta;

export const BasicExample = meta.story({
  args: {},
  render: (args) => {
    const [_, setArgs] = useArgs();

    return (
      <ScoutSegmentedControl
        {...args}
        onScoutChange={(e) => setArgs({ value: e.detail.value })}
      >
        <button type="button">Alla</button>
        <button type="button">Bokade</button>
      </ScoutSegmentedControl>
    );
  },
});

export const Small = BasicExample.extend({
  args: {
    size: "small",
  },
});
