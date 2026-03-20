import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible checkbox built on Base UI. Supports checked, unchecked, and indeterminate states.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
  },
  args: {
    size: "md",
    disabled: false,
    indeterminate: false,
    children: "Accept terms and conditions",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
};

export const NoLabel: Story = {
  args: { children: undefined },
};

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8 rounded-2xl bg-surface-primary">
      {/* Sizes */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          Sizes
        </p>
        <div className="flex flex-col gap-3">
          <Checkbox size="sm">Small checkbox</Checkbox>
          <Checkbox size="md">Medium checkbox</Checkbox>
          <Checkbox size="lg">Large checkbox</Checkbox>
        </div>
      </div>

      {/* States */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          States
        </p>
        <div className="flex flex-col gap-3">
          <Checkbox>Unchecked</Checkbox>
          <Checkbox defaultChecked>Checked</Checkbox>
          <Checkbox indeterminate>Indeterminate</Checkbox>
          <Checkbox disabled>Disabled</Checkbox>
          <Checkbox disabled defaultChecked>
            Disabled checked
          </Checkbox>
          <Checkbox disabled indeterminate>
            Disabled indeterminate
          </Checkbox>
        </div>
      </div>

      {/* Without label */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          Without label
        </p>
        <div className="flex items-center gap-4">
          <Checkbox size="sm" />
          <Checkbox size="md" />
          <Checkbox size="lg" />
          <Checkbox size="md" defaultChecked />
          <Checkbox size="md" indeterminate />
        </div>
      </div>
    </div>
  ),
  parameters: { layout: "padded" },
};
