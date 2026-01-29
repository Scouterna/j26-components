import {
  ScoutButton,
  ScoutCheckbox,
  ScoutField,
  ScoutInput,
  ScoutSelect,
  ScoutSwitch,
} from "@scouterna/ui-react";
import { useState } from "storybook/internal/preview-api";
import preview from "#.storybook/preview";

const meta = preview.meta({
  title: "Interaction/Field",
  component: ScoutField,
});

export default meta;

export const WithInput = meta.story({
  args: {
    label: "Name",
  },
  render: (args) => (
    <ScoutField {...args}>
      <ScoutInput />
    </ScoutField>
  ),
});

export const WithFieldTypeValidation = WithInput.extend({
  args: {
    helpText: "This field must contain a valid email address.",
  },
  render: (args) => (
    <ScoutField {...args}>
      <ScoutInput type="email" />
    </ScoutField>
  ),
});

export const WithCustomValidation = WithInput.extend({
  args: {
    helpText: "This field will fail validation if it contains the letter a.",
  },
  render: (args) => {
    const [validity, setValidity] = useState("");

    return (
      <ScoutField {...args}>
        <ScoutInput
          validity={validity}
          onScoutValidate={(e) => {
            if (e.detail.value.toLowerCase().includes("a")) {
              setValidity("Please don't use the letter a.");
            } else {
              setValidity("");
            }
          }}
        />
      </ScoutField>
    );
  },
});

export const WithCheckbox = WithInput.extend({
  args: {},
  render: (args) => (
    <ScoutField {...args}>
      <ScoutCheckbox />
    </ScoutField>
  ),
});

export const WithSwitch = WithInput.extend({
  args: {
    label: "Do you like it on or off?",
  },
  render: (args) => (
    <ScoutField {...args}>
      <ScoutSwitch />
    </ScoutField>
  ),
});

export const WithSelect = WithInput.extend({
  args: {
    label: "Favorite icecream",
  },
  render: (args) => (
    <ScoutField {...args}>
      <ScoutSelect>
        <option value="vanilla">Vanilla</option>
        <option value="chocolate">Chocolate</option>
        <option value="strawberry">Strawberry</option>
      </ScoutSelect>
    </ScoutField>
  ),
});

export const InForm = WithInput.extend({
  args: {
    label: "This field is inside a form",
  },
  render: (args) => {
    const [validity, setValidity] = useState("");

    return (
      <form
        noValidate
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          maxWidth: "300px",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          const valid = e.currentTarget.checkValidity();
          if (!valid) return;
          alert("Submitted!");
        }}
      >
        <ScoutField {...args}>
          <ScoutInput
            validity={validity}
            onScoutValidate={(e) => {
              if (e.detail.value.length < 5) {
                setValidity("Minimum 5 characters.");
              } else {
                setValidity("");
              }
            }}
          />
        </ScoutField>
        <ScoutButton type="submit">Submit</ScoutButton>
      </form>
    );
  },
});
