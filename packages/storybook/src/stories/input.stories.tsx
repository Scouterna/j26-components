import { ScoutInput } from "@scouterna/ui-react";
import SearchIcon from "@tabler/icons/outline/search.svg?raw";
import UserIcon from "@tabler/icons/outline/user.svg?raw";
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

export const Disabled = BasicExample.extend({
  args: {
    disabled: true,
  },
});

export const WithIcon = meta.story({
  args: {
    icon: UserIcon,
    placeholder: "Namn",
  },
  render: (args) => <ScoutInput {...args} />,
});

export const WithClear = BasicExample.extend({
  args: {
    clearable: true,
  },
});

export const SearchExample = meta.story({
  args: {
    icon: SearchIcon,
    clearable: true,
    palceholder: "Sök efter platser, kårer eller aktiviteter",
  },
  render: (args) => <ScoutInput {...args} />,
});
