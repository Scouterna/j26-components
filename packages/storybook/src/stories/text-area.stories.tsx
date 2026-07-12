import { ScoutField, ScoutTextArea } from "@scouterna/ui-react";
import { useState } from "storybook/internal/preview-api";
import preview from "#.storybook/preview";

const meta = preview.meta({
  title: "Interaction/Text Area",
  component: ScoutTextArea,
  parameters: {
    layout: "centered",
  },
});

export default meta;

export const BasicExample = meta.story({
  args: {
    value: "Super duper",
  },
  render: (args) => <ScoutTextArea {...args} />,
});

export const Disabled = BasicExample.extend({
  args: {
    disabled: true,
  },
});

export const WithDefaultValue = meta.story({
  args: {
    defaultValue: "Super duper",
  },
  render: (args) => <ScoutTextArea {...args} />,
});

export const WithField = meta.story({
  args: {},
  render: () => (
    <ScoutField label="Biography">
      <ScoutTextArea />
    </ScoutField>
  ),
});

export const WithCustomValidation = meta.story({
  args: {},
  render: () => {
    const [validity, setValidity] = useState("");

    return (
      <ScoutField
        label="Biography"
        helpText="This field must be at least 10 characters."
      >
        <ScoutTextArea
          validity={validity}
          onScoutValidate={(e) => {
            if (e.detail.value.length < 10) {
              setValidity("Please write at least 10 characters.");
            } else {
              setValidity("");
            }
          }}
        />
      </ScoutField>
    );
  },
});
