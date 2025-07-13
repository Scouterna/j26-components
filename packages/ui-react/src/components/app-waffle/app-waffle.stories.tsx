import type { Meta, Preview } from "@storybook/react";
import { AppWaffle } from "./app-waffle.js";

export default {
  title: "Experimental/App Waffle",
  component: AppWaffle,
  args: {
    referrer: "ui-react-storybook",
    usherUrl: "https://j26-usher.nihlen.io",
  },
  decorators: [
    (Story) => (
      <div className="flex justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export const Simple = {} satisfies Preview;
