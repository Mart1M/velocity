import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';
import { Input } from '../Input';

const meta = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accessible label for form fields. Wraps a native `<label>` element with semantic token styling, size variants, disabled state, and a required-field asterisk indicator.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Font size of the label',
    },
    disabled: {
      control: 'boolean',
      description: 'Visually dim the label for disabled fields',
    },
    required: {
      control: 'boolean',
      description: 'Show a required asterisk indicator',
    },
    htmlFor: {
      control: 'text',
      description: 'Associates the label with a form control by id',
    },
    children: {
      control: 'text',
      description: 'Label text',
    },
  },
  args: {
    size: 'md',
    disabled: false,
    required: false,
    children: 'Email address',
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Core states ────────────────────────────────────────────────────────────

export const Default: Story = {};

export const Required: Story = {
  args: { required: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledRequired: Story = {
  args: { disabled: true, required: true },
};

// ─── Sizes ──────────────────────────────────────────────────────────────────

export const Small: Story = { args: { size: 'sm', children: 'Small label' } };
export const Medium: Story = { args: { size: 'md', children: 'Medium label' } };
export const Large: Story = { args: { size: 'lg', children: 'Large label' } };

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Label size="sm">Small (sm)</Label>
      <Label size="md">Medium (md)</Label>
      <Label size="lg">Large (lg)</Label>
    </div>
  ),
  parameters: { layout: 'padded' },
};

// ─── With form field ────────────────────────────────────────────────────────

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5 w-72">
      <Label htmlFor="demo-email" required>
        Email address
      </Label>
      <Input id="demo-email" placeholder="you@example.com" />
    </div>
  ),
  parameters: { layout: 'padded' },
};

export const WithDisabledInput: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5 w-72">
      <Label htmlFor="demo-disabled" disabled>
        Disabled field
      </Label>
      <Input id="demo-disabled" placeholder="Cannot interact" disabled />
    </div>
  ),
  parameters: { layout: 'padded' },
};

// ─── Overview ───────────────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8 rounded-2xl bg-surface-primary w-80">
      <div className="flex flex-col gap-1.5">
        <Label size="sm">Small label</Label>
        <Label size="md">Medium label</Label>
        <Label size="lg">Large label</Label>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label required>Required field</Label>
        <Label disabled>Disabled field</Label>
        <Label disabled required>
          Disabled &amp; required
        </Label>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="overview-email" required>
          Email address
        </Label>
        <Input id="overview-email" placeholder="you@example.com" />
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
};
