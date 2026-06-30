import { ScoutBottomBar, ScoutBottomBarItem } from "@scouterna/ui-react";
import BellIcon from "iconoir/icons/bell.svg?raw";
import BonfireIcon from "iconoir/icons/bonfire.svg?raw";
import CalendarIcon from "iconoir/icons/calendar.svg?raw";
import InfoCircleIcon from "iconoir/icons/info-circle.svg?raw";
import MapIcon from "iconoir/icons/map.svg?raw";
import MoreHorizIcon from "iconoir/icons/more-horiz.svg?raw";
import { useState } from "storybook/internal/preview-api";
import preview from "#.storybook/preview";

const meta = preview.meta({
  title: "Jamboree26/Bottom Bar",
  component: ScoutBottomBar,
  parameters: {
    layout: "centered",
  },
});

export default meta;

export const BasicExample = meta.story({
  args: {},
  render: (args) => {
    const [active, setActive] = useState(0);

    const items = [
      { label: "Schedule", icon: CalendarIcon },
      { label: "Map", icon: MapIcon },
      { label: "Activities", icon: BonfireIcon },
      { label: "More", icon: MoreHorizIcon },
    ];

    return (
      <div style={{ maxWidth: "24rem", width: "100vw" }}>
        <ScoutBottomBar {...args}>
          {items.map((item, index) => (
            <ScoutBottomBarItem
              // biome-ignore lint/suspicious/noArrayIndexKey: They're static
              key={index}
              active={active === index}
              onScoutClick={() => setActive(index)}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </ScoutBottomBar>
      </div>
    );
  },
});

export const TightExample = meta.story({
  args: {},
  render: (args) => {
    const [active, setActive] = useState(0);

    const items = [
      { label: "Händelser", icon: BellIcon },
      { label: "Information", icon: InfoCircleIcon },
      { label: "Aktiviteter", icon: BonfireIcon },
      { label: "Map", icon: MapIcon },
      { label: "Mer", icon: MoreHorizIcon },
    ];

    return (
      <div style={{ maxWidth: "24rem", width: "100vw" }}>
        <ScoutBottomBar {...args}>
          {items.map((item, index) => (
            <ScoutBottomBarItem
              // biome-ignore lint/suspicious/noArrayIndexKey: They're static
              key={index}
              active={active === index}
              onScoutClick={() => setActive(index)}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </ScoutBottomBar>
      </div>
    );
  },
});
