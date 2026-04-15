import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { RadioGroup, RadioItem } from "./Radio";

const meta: Meta<typeof RadioItem> = {
  title: "Components/Radio",
  component: RadioItem,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A radio button component for selecting a single option from a group. Built on Base UI's Radio primitives.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    label: { control: "text" },
    description: { control: "text" },
  },
  args: {
    value: "option",
    size: "md",
    disabled: false,
    label: "Radio option",
  },
  decorators: [
    (Story) => (
      <RadioGroup defaultValue="option">
        <Story />
      </RadioGroup>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    label: "SSD Storage",
    description: "Fast NVMe storage, ideal for workloads that require low latency.",
  },
};

export const Disabled: Story = {
  args: { disabled: true, label: "Unavailable option" },
};

export const Sizes: Story = {
  render: () => (
    <RadioGroup defaultValue="md" className="gap-4">
      <RadioItem value="sm" size="sm" label="Small" description="14px radio" />
      <RadioItem value="md" size="md" label="Medium" description="18px radio (default)" />
      <RadioItem value="lg" size="lg" label="Large" description="20px radio" />
    </RadioGroup>
  ),
  parameters: { controls: { disable: true } },
};

export const StorageType: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-content-secondary">Storage type</p>
      <RadioGroup defaultValue="ssd">
        <RadioItem
          value="ssd"
          label="SSD"
          description="Solid-state drive — faster, more durable."
        />
        <RadioItem
          value="hdd"
          label="HDD"
          description="Hard disk drive — more affordable for large capacities."
        />
        <RadioItem
          value="nvme"
          label="NVMe"
          description="Non-volatile memory express — highest performance."
        />
      </RadioGroup>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const HorizontalGroup: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-content-secondary">Billing cycle</p>
      <RadioGroup defaultValue="monthly" orientation="horizontal">
        <RadioItem value="monthly" label="Monthly" />
        <RadioItem value="quarterly" label="Quarterly" />
        <RadioItem value="annually" label="Annually" />
      </RadioGroup>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const DisabledGroup: Story = {
  render: () => (
    <RadioGroup defaultValue="option-a" disabled>
      <RadioItem value="option-a" label="Option A" description="Selected but disabled" />
      <RadioItem value="option-b" label="Option B" description="Also disabled" />
    </RadioGroup>
  ),
  parameters: { controls: { disable: true } },
};

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-8 rounded-2xl bg-surface-primary p-8">
      {/* Sizes */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          Sizes
        </p>
        <RadioGroup defaultValue="md">
          <RadioItem value="sm" size="sm" label="Small (sm)" />
          <RadioItem value="md" size="md" label="Medium (md)" />
          <RadioItem value="lg" size="lg" label="Large (lg)" />
        </RadioGroup>
      </div>

      {/* With descriptions */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          With descriptions
        </p>
        <RadioGroup defaultValue="ssd">
          <RadioItem
            value="ssd"
            label="SSD"
            description="Solid-state drive — fast and reliable."
          />
          <RadioItem
            value="hdd"
            label="HDD"
            description="Hard disk drive — cost-effective storage."
          />
        </RadioGroup>
      </div>

      {/* Horizontal */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          Horizontal orientation
        </p>
        <RadioGroup defaultValue="monthly" orientation="horizontal">
          <RadioItem value="monthly" label="Monthly" />
          <RadioItem value="quarterly" label="Quarterly" />
          <RadioItem value="annually" label="Annually" />
        </RadioGroup>
      </div>

      {/* Disabled */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          Disabled
        </p>
        <RadioGroup defaultValue="enabled">
          <RadioItem value="enabled" label="Enabled option" />
          <RadioItem value="disabled" label="Disabled option" disabled />
        </RadioGroup>
      </div>

      {/* Disabled group */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          Disabled group
        </p>
        <RadioGroup defaultValue="a" disabled>
          <RadioItem value="a" label="Option A" />
          <RadioItem value="b" label="Option B" />
        </RadioGroup>
      </div>
    </div>
  ),
  parameters: { layout: "padded", controls: { disable: true } },
};
