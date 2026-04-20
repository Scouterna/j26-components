import { ScoutButton, ScoutCallout } from "@scouterna/ui-react";
import preview from "#.storybook/preview";

const meta = preview.meta({
  title: "Basics/Callout",
  component: ScoutCallout,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "tip", "success", "warning", "error", "announcement"],
    },
  },
});

export default meta;

export const BasicExample = meta.story({
  args: {
    variant: "info",
    heading: "Saved automatically",
  },
  render: (args) => (
    <div style={{ maxWidth: "22rem", width: "100vw" }}>
      <ScoutCallout {...args}>
        Changes sync to your account as you make them.
      </ScoutCallout>
    </div>
  ),
});

export const AllPurposes = meta.story({
  render: () => (
    <div
      style={{
        maxWidth: "22rem",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      <ScoutCallout variant="info" heading="Saved automatically">
        Changes sync to your account as you make them.
      </ScoutCallout>
      <ScoutCallout variant="tip" heading="Tips">
        Enable dark mode from the appearance section below.
      </ScoutCallout>
      <ScoutCallout variant="success" heading="Klart!">
        Dina notisinställningar har uppdaterats.
      </ScoutCallout>
      <ScoutCallout variant="warning" heading="Offline">
        Du är inte uppkopplad. Ändringar sparas när du är online igen.
      </ScoutCallout>
      <ScoutCallout variant="error" heading="Kunde inte uppdatera">
        Kontrollera din uppkoppling och försök igen.
      </ScoutCallout>
      <ScoutCallout variant="announcement" heading="Nytt i Scouterna-appen">
        Nu kan du hantera din scoutgrupps kalender direkt från startsidan.
      </ScoutCallout>
    </div>
  ),
});

export const Dismissible = meta.story({
  render: () => (
    <div
      style={{
        maxWidth: "22rem",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      <ScoutCallout
        variant="announcement"
        dismissible
        heading="Nytt i Scouterna-appen"
      >
        Nu kan du hantera din scoutgrupps kalender direkt från startsidan.
      </ScoutCallout>
      <ScoutCallout variant="tip" dismissible heading="Tips">
        Du kan aktivera mörkt läge i inställningarna.
      </ScoutCallout>
      <ScoutCallout variant="success" dismissible heading="Klart!">
        Dina notisinställningar har uppdaterats.
      </ScoutCallout>
    </div>
  ),
});

export const WithActions = meta.story({
  render: () => (
    <div
      style={{
        maxWidth: "22rem",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      <ScoutCallout variant="info" heading="Komplettera din profil">
        Lägg till bild och kontaktuppgifter så hittar din grupp dig snabbare.
        <ScoutButton slot="actions" variant="primary">
          Till profilen
        </ScoutButton>
      </ScoutCallout>
      <ScoutCallout variant="error" heading="Kunde inte uppdatera">
        Kontrollera din uppkoppling och försök igen.
        <ScoutButton slot="actions" variant="danger">
          Försök igen
        </ScoutButton>
        <ScoutButton slot="actions" variant="text">
          Avbryt
        </ScoutButton>
      </ScoutCallout>
      <ScoutCallout variant="warning" dismissible heading="Platsåtkomst krävs">
        Utan platsåtkomst kan vi inte visa aktiviteter i din närhet.
        <ScoutButton slot="actions" variant="caution">
          Aktivera
        </ScoutButton>
        <ScoutButton slot="actions" variant="text">
          Inte nu
        </ScoutButton>
      </ScoutCallout>
    </div>
  ),
});
