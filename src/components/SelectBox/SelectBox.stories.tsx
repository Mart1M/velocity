import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { RiBox3Line, RiStore2Line, RiTruckLine } from "react-icons/ri";
import { SelectBox, SelectBoxGroup } from "./index";

const meta: Meta = {
  title: "Components/SelectBox",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Selectable card with icon, title, and description. **`SelectBoxGroup`** controls **radio** (single) or **checkbox** (multiple) behavior. Selected state updates **border** and **background**. Icons use [Remix Icon](https://remixicon.com/) (`react-icons/ri`).",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const RadioSingleChoice: Story = {
  name: "Radio (single)",
  render: function RadioStory() {
    const [v, setV] = React.useState("ship");
    return (
      <div className="max-w-md space-y-4">
        <SelectBoxGroup mode="radio" value={v} onValueChange={setV} name="delivery">
          <SelectBox
            value="ship"
            icon={<RiTruckLine />}
            title="Standard shipping"
            description="Arrives in 3–5 business days."
          />
          <SelectBox
            value="express"
            icon={<RiBox3Line />}
            title="Express"
            description="Next-day delivery where available."
          />
          <SelectBox
            value="pickup"
            icon={<RiStore2Line />}
            title="Store pickup"
            description="Collect from a partner store."
          />
        </SelectBoxGroup>
        <p className="text-caption text-content-tertiary">Selected: {v}</p>
      </div>
    );
  },
};

export const CheckboxMultiple: Story = {
  name: "Checkbox (multiple)",
  render: function CheckboxStory() {
    const [v, setV] = React.useState<string[]>(["news"]);
    return (
      <div className="max-w-md space-y-4">
        <SelectBoxGroup mode="checkbox" value={v} onValueChange={setV}>
          <SelectBox
            value="news"
            icon={<RiBox3Line />}
            title="Product updates"
            description="New features and changelog."
          />
          <SelectBox
            value="tips"
            icon={<RiTruckLine />}
            title="Training tips"
            description="Weekly running advice."
          />
          <SelectBox
            value="partner"
            icon={<RiStore2Line />}
            title="Partner offers"
            description="Deals from selected brands."
          />
        </SelectBoxGroup>
        <p className="text-caption text-content-tertiary">
          Selected: {v.length ? v.join(", ") : "none"}
        </p>
      </div>
    );
  },
};

export const HorizontalLayout: Story = {
  name: "Horizontal layout",
  render: () => (
    <SelectBoxGroup mode="radio" defaultValue="md" layout="horizontal" className="max-w-3xl">
      <SelectBox
        className="min-w-[160px] flex-1"
        value="sm"
        title="Small"
        description="Compact"
        size="sm"
      />
      <SelectBox
        className="min-w-[160px] flex-1"
        value="md"
        title="Medium"
        description="Default"
        size="sm"
      />
      <SelectBox
        className="min-w-[160px] flex-1"
        value="lg"
        title="Large"
        description="Spacious"
        size="sm"
      />
    </SelectBoxGroup>
  ),
};

export const DisabledOption: Story = {
  name: "With disabled option",
  render: () => (
    <SelectBoxGroup mode="radio" defaultValue="a">
      <SelectBox value="a" title="Available" description="You can select this option." />
      <SelectBox value="b" disabled title="Unavailable" description="Temporarily disabled." />
    </SelectBoxGroup>
  ),
};
