import { ScoutButton } from "@scouterna/ui-react";
import ArrowLeftIcon from "@tabler/icons/outline/arrow-left.svg?raw";
import ExternalLinkIcon from "@tabler/icons/outline/external-link.svg?raw";
import LockIcon from "@tabler/icons/outline/lock.svg?raw";
import TrashIcon from "@tabler/icons/outline/trash.svg?raw";
import preview from "#.storybook/preview";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = preview.meta({
  title: "Interaction/Button",
  component: ScoutButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
});

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = meta.story({
  args: {
    variant: "primary",
  },
  render: (args) => <ScoutButton {...args}>Sign in</ScoutButton>,
});

export const Outlined = meta.story({
  args: {
    variant: "outlined",
  },
  render: (args) => <ScoutButton {...args}>Show more</ScoutButton>,
});

export const Text = meta.story({
  args: {
    variant: "text",
  },
  render: (args) => <ScoutButton {...args}>Cancel</ScoutButton>,
});

export const Caution = meta.story({
  args: {
    variant: "caution",
    icon: LockIcon,
  },
  render: (args) => <ScoutButton {...args}>Make private</ScoutButton>,
});

export const Danger = meta.story({
  args: {
    variant: "danger",
    icon: TrashIcon,
  },
  render: (args) => <ScoutButton {...args}>Delete</ScoutButton>,
});

export const Link = meta.story({
  args: {
    type: "link",
    variant: "primary",
    icon: ExternalLinkIcon,
    href: "https://www.google.com",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  render: (args) => <ScoutButton {...args}>Open Google</ScoutButton>,
});

export const Disabled = meta.story({
  args: {
    variant: "primary",
    disabled: true,
  },
  render: (args) => <ScoutButton {...args}>Sign in</ScoutButton>,
});

export const IconOnly = meta.story({
  args: {
    icon: ArrowLeftIcon,
    iconOnly: true,
  },
  render: (args) => <ScoutButton {...args}>Go back</ScoutButton>,
});
