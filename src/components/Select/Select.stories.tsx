import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select, SelectOption, SelectGroup } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A select component for choosing from a list of options. Supports groups, placeholder text, error states, and multiple sizes. Built on Base UI Select.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
  },
  args: {
    size: 'md',
    disabled: false,
    error: false,
    placeholder: 'Select an option…',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Core states ─────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: 'Size',
    placeholder: 'Choose a size…',
  },
  render: (args) => (
    <Select {...args}>
      <SelectOption value="xs">Extra Small</SelectOption>
      <SelectOption value="sm">Small</SelectOption>
      <SelectOption value="md">Medium</SelectOption>
      <SelectOption value="lg">Large</SelectOption>
      <SelectOption value="xl">Extra Large</SelectOption>
    </Select>
  ),
};

export const WithPlaceholder: Story = {
  render: (args) => (
    <Select {...args} placeholder="Pick a color…" label="Color">
      <SelectOption value="red">Red</SelectOption>
      <SelectOption value="green">Green</SelectOption>
      <SelectOption value="blue">Blue</SelectOption>
    </Select>
  ),
};

export const WithLabelAndHelper: Story = {
  render: (args) => (
    <Select
      {...args}
      label="Country"
      placeholder="Select your country…"
      helperText="Used for shipping and tax calculations."
    >
      <SelectOption value="us">United States</SelectOption>
      <SelectOption value="uk">United Kingdom</SelectOption>
      <SelectOption value="ca">Canada</SelectOption>
      <SelectOption value="au">Australia</SelectOption>
    </Select>
  ),
};

export const WithDefaultValue: Story = {
  render: (args) => (
    <Select {...args} label="Size" defaultValue="md">
      <SelectOption value="sm">Small</SelectOption>
      <SelectOption value="md">Medium</SelectOption>
      <SelectOption value="lg">Large</SelectOption>
    </Select>
  ),
};

export const ErrorState: Story = {
  render: (args) => (
    <Select
      {...args}
      label="Country"
      placeholder="Select your country…"
      error
      helperText="Please select a country."
    >
      <SelectOption value="us">United States</SelectOption>
      <SelectOption value="uk">United Kingdom</SelectOption>
      <SelectOption value="ca">Canada</SelectOption>
    </Select>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Select
      {...args}
      label="Size"
      placeholder="Choose a size…"
      disabled
      helperText="This field is currently disabled."
    >
      <SelectOption value="sm">Small</SelectOption>
      <SelectOption value="md">Medium</SelectOption>
      <SelectOption value="lg">Large</SelectOption>
    </Select>
  ),
};

export const DisabledOption: Story = {
  render: (args) => (
    <Select {...args} label="Plan" placeholder="Select a plan…">
      <SelectOption value="free">Free</SelectOption>
      <SelectOption value="pro">Pro</SelectOption>
      <SelectOption value="enterprise" disabled>
        Enterprise (Contact sales)
      </SelectOption>
    </Select>
  ),
};

// ─── Groups ──────────────────────────────────────────────────────────────────

export const WithGroups: Story = {
  render: (args) => (
    <Select {...args} label="Country" placeholder="Select a country…">
      <SelectGroup label="North America">
        <SelectOption value="us">United States</SelectOption>
        <SelectOption value="ca">Canada</SelectOption>
        <SelectOption value="mx">Mexico</SelectOption>
      </SelectGroup>
      <SelectGroup label="Europe">
        <SelectOption value="uk">United Kingdom</SelectOption>
        <SelectOption value="fr">France</SelectOption>
        <SelectOption value="de">Germany</SelectOption>
      </SelectGroup>
      <SelectGroup label="Asia">
        <SelectOption value="jp">Japan</SelectOption>
        <SelectOption value="kr">South Korea</SelectOption>
        <SelectOption value="sg">Singapore</SelectOption>
      </SelectGroup>
    </Select>
  ),
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <Select size="sm" label="Small (sm)" placeholder="Choose…">
        <SelectOption value="a">Option A</SelectOption>
        <SelectOption value="b">Option B</SelectOption>
      </Select>
      <Select size="md" label="Medium (md)" placeholder="Choose…">
        <SelectOption value="a">Option A</SelectOption>
        <SelectOption value="b">Option B</SelectOption>
      </Select>
      <Select size="lg" label="Large (lg)" placeholder="Choose…">
        <SelectOption value="a">Option A</SelectOption>
        <SelectOption value="b">Option B</SelectOption>
      </Select>
    </div>
  ),
  parameters: { layout: 'padded' },
};

// ─── E-commerce overview ─────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8 bg-background-primary rounded-2xl w-[400px]">
      <div>
        <span className="text-xs font-semibold text-content-tertiary uppercase tracking-widest">
          Product Size
        </span>
        <div className="mt-2">
          <Select label="Size" placeholder="Choose a size…" defaultValue="md">
            <SelectOption value="xs">XS — Extra Small</SelectOption>
            <SelectOption value="sm">S — Small</SelectOption>
            <SelectOption value="md">M — Medium</SelectOption>
            <SelectOption value="lg">L — Large</SelectOption>
            <SelectOption value="xl">XL — Extra Large</SelectOption>
          </Select>
        </div>
      </div>

      <div>
        <span className="text-xs font-semibold text-content-tertiary uppercase tracking-widest">
          Color
        </span>
        <div className="mt-2">
          <Select label="Color" placeholder="Pick a color…">
            <SelectOption value="black">Black</SelectOption>
            <SelectOption value="white">White</SelectOption>
            <SelectOption value="navy">Navy</SelectOption>
            <SelectOption value="olive">Olive</SelectOption>
          </Select>
        </div>
      </div>

      <div>
        <span className="text-xs font-semibold text-content-tertiary uppercase tracking-widest">
          Shipping
        </span>
        <div className="mt-2">
          <Select
            label="Shipping country"
            placeholder="Select your country…"
            helperText="Determines shipping rates and tax."
          >
            <SelectGroup label="North America">
              <SelectOption value="us">United States</SelectOption>
              <SelectOption value="ca">Canada</SelectOption>
            </SelectGroup>
            <SelectGroup label="Europe">
              <SelectOption value="uk">United Kingdom</SelectOption>
              <SelectOption value="de">Germany</SelectOption>
              <SelectOption value="fr">France</SelectOption>
            </SelectGroup>
          </Select>
        </div>
      </div>

      <div>
        <span className="text-xs font-semibold text-content-tertiary uppercase tracking-widest">
          Error State
        </span>
        <div className="mt-2">
          <Select
            label="Payment method"
            placeholder="Select a method…"
            error
            helperText="Please select a payment method to continue."
          >
            <SelectOption value="card">Credit Card</SelectOption>
            <SelectOption value="paypal">PayPal</SelectOption>
            <SelectOption value="crypto" disabled>
              Crypto (Coming soon)
            </SelectOption>
          </Select>
        </div>
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
};
