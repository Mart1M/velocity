import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Loading placeholders with semantic surface color and optional pulse animation. Use for list rows, cards, and text while content loads. Purely presentational (not a Base UI primitive).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "circular", "rectangular"],
    },
    animation: {
      control: "select",
      options: ["pulse", "none"],
    },
  },
  args: {
    variant: "rectangular",
    animation: "pulse",
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-72">
      <Skeleton {...args} />
    </div>
  ),
};

export const TextLine: Story = {
  args: { variant: "text" },
  render: (args) => (
    <div className="w-72 space-y-2">
      <Skeleton {...args} />
      <Skeleton {...args} className="w-4/5" />
      <Skeleton {...args} className="w-3/5" />
    </div>
  ),
};

export const Circular: Story = {
  args: { variant: "circular" },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Skeleton {...args} />
      <Skeleton {...args} className="size-14" />
      <Skeleton {...args} className="size-6" />
    </div>
  ),
};

export const CardPlaceholder: Story = {
  render: () => (
    <div className="w-80 rounded-2xl border border-border-default bg-surface-primary p-4 shadow-sm">
      <div className="flex gap-3">
        <Skeleton variant="circular" className="size-12 shrink-0" />
        <div className="flex min-w-0 flex-1 flex-col gap-2 pt-0.5">
          <Skeleton variant="text" className="w-2/3" />
          <Skeleton variant="text" className="w-full" />
          <Skeleton variant="text" className="w-1/2" />
        </div>
      </div>
      <Skeleton variant="rectangular" className="mt-4 h-36 w-full rounded-xl" />
    </div>
  ),
  parameters: { layout: "centered" },
};

export const NoAnimation: Story = {
  args: { animation: "none", variant: "rectangular" },
  render: (args) => (
    <div className="w-72">
      <Skeleton {...args} />
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-8 rounded-2xl bg-surface-primary p-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
        Skeleton — variants
      </p>
      <div className="flex flex-wrap items-end gap-6">
        <div className="w-48 space-y-2">
          <p className="text-xs text-content-tertiary">text</p>
          <Skeleton variant="text" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs text-content-tertiary">circular</p>
          <Skeleton variant="circular" />
        </div>
        <div className="w-56">
          <p className="mb-2 text-xs text-content-tertiary">rectangular</p>
          <Skeleton variant="rectangular" />
        </div>
      </div>
    </div>
  ),
  parameters: { layout: "padded" },
};
