import type { Meta, Preview } from "@storybook/react";
import * as Textarea from "./textarea.js";

export default {
  title: "Components/Textarea",
  component: Textarea.Textarea,
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta;

export const Simple = {} satisfies Preview;
