import customElements from "@scouterna/ui-webc/dist/custom-elements.json";
import { setCustomElementsManifest } from "@stencil/storybook-plugin";
import addonA11y from "@storybook/addon-a11y";
import addonDocs from "@storybook/addon-docs";
import {
  Controls,
  Description,
  Heading,
  Primary,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs/blocks";
import addonVitest from "@storybook/addon-vitest";
import { definePreview } from "@storybook/react-vite";
import kebabCase from "lodash.kebabcase";
// @ts-expect-error React is used in the JSX runtime
import React from "react";

// This import isn't very nice, but @stencil/storybook-plugin doesn't expose this functionality
import { parameters } from "../node_modules/@stencil/storybook-plugin/dist/entry-preview-argtypes";

// Include styles to have our web components render correctly
import "@scouterna/ui-webc/style.css";
import "@fontsource-variable/source-sans-3/index.css";

// Register the custom elements manifest for Stencil integration
setCustomElementsManifest(customElements);

// Utility for converting our React component display names to web component tag names
const getComponentWebcName = (component: unknown): string | null => {
  if (
    component &&
    typeof component === "object" &&
    "displayName" in component &&
    typeof component.displayName === "string"
  ) {
    return kebabCase(component.displayName);
  }

  return null;
};

const stencilComponentConfiguration = {
  // Automatically extract argTypes and component descriptions from web components
  extractArgTypes: (component: unknown) => {
    const webcName = getComponentWebcName(component);
    if (!webcName) return null;
    return parameters.docs.extractArgTypes(webcName);
  },
  extractComponentDescription: (component: unknown) => {
    const webcName = getComponentWebcName(component);
    if (!webcName) return null;
    return parameters.docs.extractComponentDescription(webcName);
  },
  // biome-ignore lint/suspicious/noExplicitAny: We need to cast becuase these are internal APIs.
} as any;

export default definePreview({
  addons: [addonDocs(), addonA11y(), addonVitest()],
  parameters: {
    docs: {
      toc: {
        headingSelector: "h2,h3,h4",
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />

          <Heading>Stories</Heading>
          {/** biome-ignore lint/suspicious/noExplicitAny: Workaround to make Storybook remove the title so we can render it properly */}
          <Stories title={false as any} />
        </>
      ),
      ...stencilComponentConfiguration,
    },
    actions: {
      argTypesRegex: "^onScout.*",
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
    options: {
      storySort: {
        order: [
          "Home",
          "Setup – React",
          "Setup – Web Components",
          "Using icons",
          "Basics",
          "Interaction",
          "Jamboree26",
          ["Bottom Bar", "Bottom Bar Item"],
        ],
      },
    },
  },
  tags: ["autodocs"],
});
