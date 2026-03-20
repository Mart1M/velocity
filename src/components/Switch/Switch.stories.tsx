import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A toggle control that indicates whether a setting is on or off. Built on Base UI with full keyboard and screen-reader support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
    defaultChecked: { control: "boolean" },
  },
  args: {
    size: "md",
    disabled: false,
    children: "Enable notifications",
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
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

export const SizeSmall: Story = {
  args: { size: "sm", defaultChecked: true },
};

export const SizeMedium: Story = {
  args: { size: "md", defaultChecked: true },
};

export const SizeLarge: Story = {
  args: { size: "lg", defaultChecked: true },
};

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8 rounded-2xl bg-surface-primary w-80">
      {/* Sizes */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          Sizes
        </p>
        <div className="flex flex-col gap-3">
          <Switch size="sm">Small</Switch>
          <Switch size="md">Medium</Switch>
          <Switch size="lg">Large</Switch>
        </div>
      </div>

      {/* States */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          States
        </p>
        <div className="flex flex-col gap-3">
          <Switch>Off</Switch>
          <Switch defaultChecked>On</Switch>
          <Switch disabled>Disabled off</Switch>
          <Switch disabled defaultChecked>
            Disabled on
          </Switch>
        </div>
      </div>

      {/* Settings list example */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          Settings
        </p>
        <div className="flex flex-col divide-y divide-border-subtle rounded-xl overflow-hidden border border-border-default">
          {[
            { label: "Push notifications", defaultChecked: true },
            { label: "Email digest", defaultChecked: false },
            { label: "Marketing emails", defaultChecked: false },
            { label: "Activity summary", defaultChecked: true },
          ].map(({ label, defaultChecked }) => (
            <div
              key={label}
              className="flex items-center justify-between px-4 py-3 bg-surface-primary"
            >
              <span className="text-sm text-content-primary">{label}</span>
              <Switch defaultChecked={defaultChecked} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: { layout: "padded" },
};
