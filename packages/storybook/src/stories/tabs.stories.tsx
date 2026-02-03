import { ScoutTabs, ScoutTabsTab } from "@scouterna/ui-react";
import { useArgs } from "storybook/internal/preview-api";
import preview from "#.storybook/preview";

const meta = preview.meta({
  title: "Interaction/Tabs",
  component: ScoutTabs,
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
      <div style={{ display: "flex", width: "20rem", height: "3.5rem" }}>
        <ScoutTabs
          {...args}
          onScoutChange={(e) => setArgs({ value: e.detail.value })}
        >
          <ScoutTabsTab>Händelser</ScoutTabsTab>
          <ScoutTabsTab>Information</ScoutTabsTab>
        </ScoutTabs>
      </div>
    );
  },
});
