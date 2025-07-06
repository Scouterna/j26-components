import type { Meta, Preview } from "@storybook/react";
import { Button } from "../button/button.js";
import * as Menu from "./menu.js";

export default {
  title: "Components/Menu",
  component: Menu.Root,
  argTypes: {
    children: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div className="p-40 max-w-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export const Simple = {
  args: {
    children: (
      <>
        <Menu.Trigger render={<Button>Open Menu</Button>} />
        <Menu.Positioner>
          <Menu.Item>Option 1</Menu.Item>
          <Menu.Item>Option 2</Menu.Item>
          <Menu.Separator />
          <Menu.Item>Option 3</Menu.Item>
        </Menu.Positioner>
      </>
    ),
  },
} satisfies Preview;

export const Nested = {
  args: {
    children: (
      <>
        <Menu.Trigger render={<Button>Open Menu</Button>} />
        <Menu.Positioner>
          <Menu.Item>Option 1</Menu.Item>
          <Menu.Item>Option 2</Menu.Item>
          <Menu.Separator />

          <Menu.SubmenuRoot>
            <Menu.SubmenuTrigger render={<Menu.Item>Submenu</Menu.Item>} />
            <Menu.Positioner>
              <Menu.Item>Option 1</Menu.Item>
              <Menu.Item>Option 2</Menu.Item>
            </Menu.Positioner>
          </Menu.SubmenuRoot>
        </Menu.Positioner>
      </>
    ),
  },
} satisfies Preview;
