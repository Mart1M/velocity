import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Rating } from "./Rating";

const meta = {
  title: "Components/Rating",
  component: Rating,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Star rating (1…`max`). Not a Base UI primitive — native buttons + [Remix Icon](https://remixicon.com/) stars (`RiStarFill` / `RiStarLine`), `text-state-warning` for filled stars.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    max: { control: { type: "number", min: 1, max: 10 } },
    readOnly: { control: "boolean" },
    disabled: { control: "boolean" },
    showLabel: { control: "boolean" },
    labelPosition: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Only when showLabel is true",
    },
  },
  args: {
    defaultValue: 3,
    max: 5,
    size: "md",
    readOnly: false,
    disabled: false,
    label: "Rating",
    showLabel: false,
    labelPosition: "top",
  },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [v, setV] = React.useState(4);
    return (
      <div className="flex flex-col items-center gap-2">
        <Rating value={v} onChange={setV} label="Your rating" />
        <p className="text-caption text-content-tertiary">Value: {v}</p>
      </div>
    );
  },
};

export const ReadOnly: Story = {
  args: {
    value: 4,
    readOnly: true,
    label: "Average rating",
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 2,
    disabled: true,
  },
};

export const WithLabel: Story = {
  args: {
    showLabel: true,
    label: "Course quality",
    defaultValue: 5,
    labelPosition: "top",
  },
};

export const LabelPositions: Story = {
  name: "Label positions",
  render: () => (
    <div className="flex flex-col gap-8">
      {(["top", "bottom", "left", "right"] as const).map((labelPosition) => (
        <div key={labelPosition} className="flex flex-col gap-1">
          <span className="text-caption text-content-tertiary">labelPosition=&quot;{labelPosition}&quot;</span>
          <Rating
            showLabel
            labelPosition={labelPosition}
            label="Your rating"
            defaultValue={4}
          />
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-6">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-10 text-caption text-content-tertiary">{size}</span>
          <Rating size={size} defaultValue={4} readOnly />
        </div>
      ))}
    </div>
  ),
};

export const Max10: Story = {
  name: "10 stars",
  args: {
    max: 10,
    defaultValue: 7,
  },
};
