import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "./button.js";

export default {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Click me",
    onClick: fn(),
  },
  argTypes: {
    disabled: {
      type: "boolean",
    },
  },
} satisfies Meta;

export const Contained = {
  args: {
    variant: "contained",
  },
};

// <Button
//   variant="contained"
// >

// </Button>

export const Text = {
  args: {
    variant: "text",
  },
};

export const Outlined = {
  args: {
    variant: "outlined",
  },
};

export const Small = {
  args: {
    size: "small",
  },
};

export const Link = {
  args: {
    render: (
      <a href="https://github.com" target="_blank" rel="noopener noreferrer" />
    ),
    children: "Go to GitHub",
  },
};
