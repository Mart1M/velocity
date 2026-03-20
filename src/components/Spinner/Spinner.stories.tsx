import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An animated loading spinner for cart loading, payment confirmation, and other async states.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Spinner size",
    },
    colorScheme: {
      control: "select",
      options: ["primary", "neutral", "brand"],
      description: "Color scheme",
    },
    label: {
      control: "text",
      description: "Screen-reader accessible label",
    },
  },
  args: {
    size: "md",
    colorScheme: "brand",
    label: "Loading",
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = { args: { size: "sm" } };
export const Medium: Story = { args: { size: "md" } };
export const Large: Story = { args: { size: "lg" } };

export const Primary: Story = { args: { colorScheme: "primary" } };
export const Neutral: Story = { args: { colorScheme: "neutral" } };
export const Brand: Story = { args: { colorScheme: "brand" } };

export const CustomLabel: Story = {
  args: { label: "Processing payment…" },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const AllColorSchemes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner colorScheme="primary" />
      <Spinner colorScheme="neutral" />
      <Spinner colorScheme="brand" />
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8 rounded-2xl bg-surface-primary">
      <span className="text-xs font-medium text-content-tertiary uppercase tracking-widest">
        Sizes
      </span>
      <div className="flex items-center gap-6">
        <Spinner size="sm" colorScheme="brand" />
        <Spinner size="md" colorScheme="brand" />
        <Spinner size="lg" colorScheme="brand" />
      </div>

      <span className="text-xs font-medium text-content-tertiary uppercase tracking-widest">
        Color schemes
      </span>
      <div className="flex items-center gap-6">
        <Spinner colorScheme="primary" size="lg" />
        <Spinner colorScheme="neutral" size="lg" />
        <Spinner colorScheme="brand" size="lg" />
      </div>

      <span className="text-xs font-medium text-content-tertiary uppercase tracking-widest">
        Inline with text
      </span>
      <div className="flex items-center gap-2 text-content-secondary text-sm">
        <Spinner size="sm" colorScheme="brand" />
        Processing payment…
      </div>
    </div>
  ),
  parameters: { layout: "padded" },
};
