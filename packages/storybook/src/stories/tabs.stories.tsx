import { ScoutTabs, ScoutTabsTab } from "@scouterna/ui-react";
import { useState } from "storybook/internal/preview-api";
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
    const [activeTab, setActiveTab] = useState(0);

    return (
      <div style={{ display: "flex", width: "20rem", height: "3.5rem" }}>
        <ScoutTabs {...args}>
          <ScoutTabsTab
            onClick={() => setActiveTab(0)}
            active={activeTab === 0}
          >
            Händelser
          </ScoutTabsTab>
          <ScoutTabsTab
            onClick={() => setActiveTab(1)}
            active={activeTab === 1}
          >
            Information
          </ScoutTabsTab>
        </ScoutTabs>
      </div>
    );
  },
});
