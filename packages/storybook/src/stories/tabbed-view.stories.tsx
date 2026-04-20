import {
  ScoutTabbedView,
  ScoutTabbedViewPanel,
  ScoutTabs,
  ScoutTabsTab,
} from "@scouterna/ui-react";
import { useState } from "react";
import preview from "#.storybook/preview";

const meta = preview.meta({
  title: "Interaction/Tabbed View",
  component: ScoutTabbedView,
  parameters: {
    layout: "centered",
  },
});

export default meta;

export const BasicExample = meta.story({
  args: {},
  render: (args) => {
    const [value, setValue] = useState(0);
    const [swipeValue, setSwipeValue] = useState<number | undefined>(undefined);

    const handleChange = (newValue: number) => {
      setValue(newValue);
      setSwipeValue(undefined);
    };

    return (
      <div style={{ width: "20rem" }}>
        <ScoutTabs
          value={value}
          swipeValue={swipeValue}
          onScoutChange={(e) => handleChange(e.detail.value)}
        >
          <ScoutTabsTab>Händelser</ScoutTabsTab>
          <ScoutTabsTab>Information</ScoutTabsTab>
          <ScoutTabsTab>Min grupp</ScoutTabsTab>
        </ScoutTabs>

        <ScoutTabbedView
          {...args}
          value={value}
          style={{ height: "12rem" }}
          onScoutChange={(e) => handleChange(e.detail.value)}
          onScoutSwipeProgress={(e) => setSwipeValue(e.detail.swipeValue)}
        >
          <ScoutTabbedViewPanel>
            <div style={{ padding: "1rem" }}>
              <strong>Händelser</strong>
              <p>Swipe left to see the next tab.</p>
            </div>
          </ScoutTabbedViewPanel>
          <ScoutTabbedViewPanel>
            <div style={{ padding: "1rem" }}>
              <strong>Information</strong>
              <p>Swipe right to go back, or left to continue.</p>
            </div>
          </ScoutTabbedViewPanel>
          <ScoutTabbedViewPanel>
            <div style={{ padding: "1rem" }}>
              <strong>Min grupp</strong>
              <p>Last tab. Swipe right to go back.</p>
            </div>
          </ScoutTabbedViewPanel>
        </ScoutTabbedView>
      </div>
    );
  },
});
