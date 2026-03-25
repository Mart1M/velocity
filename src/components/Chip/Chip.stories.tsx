import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { RiRunLine, RiMapPinLine } from "react-icons/ri";
import { Chip } from "./Chip";

const meta = {
  title: "Components/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Compact label for **filters**, **tags**, and **dismissible** values. **Selectable** chips use [Base UI Toggle](https://base-ui.com/react/components/toggle) (`data-[pressed]`). For static status labels without interaction, prefer **Badge**. Icons: [Remix Icon](https://remixicon.com/) (`react-icons/ri`).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error", "info", "brand"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    outline: { control: "boolean" },
    rounded: { control: "boolean" },
    disabled: { control: "boolean" },
    selectable: { control: "boolean" },
  },
  args: {
    children: "Chip",
    variant: "default",
    size: "md",
    outline: false,
    rounded: true,
    disabled: false,
    selectable: false,
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    children: "5 km",
    startIcon: <RiRunLine className="size-4" aria-hidden />,
    variant: "brand",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    outline: true,
    variant: "brand",
  },
};

export const Selectable: Story = {
  render: function SelectableStory() {
    const [pressed, setPressed] = React.useState(false);
    return (
      <div className="flex flex-col items-center gap-2">
        <Chip
          selectable
          pressed={pressed}
          onPressedChange={setPressed}
          variant="brand"
          outline
        >
          {pressed ? "Selected" : "Tap to select"}
        </Chip>
        <p className="text-caption text-content-tertiary">Pressed: {String(pressed)}</p>
      </div>
    );
  },
};

export const Removable: Story = {
  args: {
    children: "Amsterdam",
    onRemove: () => {},
    startIcon: <RiMapPinLine className="size-4" aria-hidden />,
    variant: "default",
    outline: true,
  },
};

export const SelectableRemovable: Story = {
  render: function SelectableRemovableStory() {
    const [pressed, setPressed] = React.useState(true);
    return (
      <Chip
        selectable
        pressed={pressed}
        onPressedChange={setPressed}
        variant="brand"
        outline
        onRemove={() => {}}
      >
        Filter
      </Chip>
    );
  },
};

export const Clickable: Story = {
  args: {
    children: "Open menu",
    onClick: () => {},
    variant: "info",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
    selectable: true,
    pressed: true,
    variant: "brand",
  },
};

export const Overview: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-8 rounded-2xl bg-surface-primary p-8">
      <div>
        <p className="mb-3 text-overline text-content-tertiary">Static</p>
        <div className="flex flex-wrap gap-2">
          <Chip variant="default">Default</Chip>
          <Chip variant="default" outline>
            Outline
          </Chip>
          <Chip variant="brand" startIcon={<RiRunLine className="size-4" aria-hidden />}>
            With icon
          </Chip>
        </div>
      </div>
      <div>
        <p className="mb-3 text-overline text-content-tertiary">Selectable</p>
        <div className="flex flex-wrap gap-2">
          <Chip selectable defaultPressed variant="brand">
            Brand
          </Chip>
          <Chip selectable defaultPressed outline variant="success">
            Success
          </Chip>
          <Chip selectable defaultPressed outline variant="warning">
            Warning
          </Chip>
        </div>
      </div>
      <div>
        <p className="mb-3 text-overline text-content-tertiary">Removable</p>
        <div className="flex flex-wrap gap-2">
          <Chip variant="default" outline onRemove={() => {}}>
            Tag
          </Chip>
          <Chip variant="brand" onRemove={() => {}}>
            Sale
          </Chip>
          <Chip selectable defaultPressed outline variant="info" onRemove={() => {}}>
            + Removable
          </Chip>
        </div>
      </div>
    </div>
  ),
  parameters: { layout: "padded" },
};
