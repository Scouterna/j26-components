import {
  ScoutButton,
  ScoutCheckbox,
  ScoutField,
  ScoutInput,
  ScoutSelect,
  ScoutSwitch,
} from "@scouterna/ui-react";
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
  render: (args) => (
    <ScoutField {...args}>
      <ScoutInput
        validate={(value) => {
          if (value.toLowerCase().includes("a")) {
            return "Please don't use the letter a.";
          }
          return null;
        }}
      />
    </ScoutField>
  ),
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
  render: (args) => (
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
          validate={(val) => (val.length < 5 ? "Minimum 5 characters" : null)}
        />
      </ScoutField>
      <ScoutButton type="submit">Submit</ScoutButton>
    </form>
  ),
});
