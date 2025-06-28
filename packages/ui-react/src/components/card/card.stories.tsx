import type { Meta, Preview } from "@storybook/react";
import { Card } from "./card.js";

export default {
  title: "Components/Card",
  component: Card,
} satisfies Meta;

export const Simple = {
  args: {
    children: "Card Content",
  },
} satisfies Preview;
