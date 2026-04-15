import type { Meta, StoryObj } from '@storybook/react-vite';
import { Combobox, ComboboxOption, ComboboxGroup } from './Combobox';

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A searchable select that lets users type to filter options. Supports groups, placeholder text, error states, and multiple sizes. Built on Base UI Combobox.',
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
    placeholder: 'Search…',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Core states ─────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: 'Country',
    placeholder: 'Search countries…',
  },
  render: (args) => (
    <div className="w-72">
      <Combobox {...args}>
        <ComboboxOption value="au">Australia</ComboboxOption>
        <ComboboxOption value="ca">Canada</ComboboxOption>
        <ComboboxOption value="fr">France</ComboboxOption>
        <ComboboxOption value="de">Germany</ComboboxOption>
        <ComboboxOption value="jp">Japan</ComboboxOption>
        <ComboboxOption value="nz">New Zealand</ComboboxOption>
        <ComboboxOption value="sg">Singapore</ComboboxOption>
        <ComboboxOption value="uk">United Kingdom</ComboboxOption>
        <ComboboxOption value="us">United States</ComboboxOption>
      </Combobox>
    </div>
  ),
};

export const WithLabelAndHelper: Story = {
  render: (args) => (
    <div className="w-72">
      <Combobox
        {...args}
        label="Shipping country"
        placeholder="Search countries…"
        helperText="Used for shipping rates and tax calculations."
      >
        <ComboboxOption value="au">Australia</ComboboxOption>
        <ComboboxOption value="ca">Canada</ComboboxOption>
        <ComboboxOption value="fr">France</ComboboxOption>
        <ComboboxOption value="de">Germany</ComboboxOption>
        <ComboboxOption value="uk">United Kingdom</ComboboxOption>
        <ComboboxOption value="us">United States</ComboboxOption>
      </Combobox>
    </div>
  ),
};

export const WithDefaultValue: Story = {
  render: (args) => (
    <div className="w-72">
      <Combobox {...args} label="Country" defaultValue="us" placeholder="Search countries…">
        <ComboboxOption value="ca">Canada</ComboboxOption>
        <ComboboxOption value="uk">United Kingdom</ComboboxOption>
        <ComboboxOption value="us">United States</ComboboxOption>
      </Combobox>
    </div>
  ),
};

export const ErrorState: Story = {
  render: (args) => (
    <div className="w-72">
      <Combobox
        {...args}
        label="Country"
        placeholder="Search countries…"
        error
        helperText="Please select a country to continue."
      >
        <ComboboxOption value="ca">Canada</ComboboxOption>
        <ComboboxOption value="uk">United Kingdom</ComboboxOption>
        <ComboboxOption value="us">United States</ComboboxOption>
      </Combobox>
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div className="w-72">
      <Combobox
        {...args}
        label="Country"
        placeholder="Search countries…"
        disabled
        helperText="This field is currently disabled."
      >
        <ComboboxOption value="ca">Canada</ComboboxOption>
        <ComboboxOption value="uk">United Kingdom</ComboboxOption>
        <ComboboxOption value="us">United States</ComboboxOption>
      </Combobox>
    </div>
  ),
};

export const DisabledOption: Story = {
  render: (args) => (
    <div className="w-72">
      <Combobox {...args} label="Plan" placeholder="Search plans…">
        <ComboboxOption value="free">Free</ComboboxOption>
        <ComboboxOption value="pro">Pro</ComboboxOption>
        <ComboboxOption value="enterprise" disabled>
          Enterprise (Contact sales)
        </ComboboxOption>
      </Combobox>
    </div>
  ),
};

// ─── Groups ──────────────────────────────────────────────────────────────────

export const WithGroups: Story = {
  render: (args) => (
    <div className="w-72">
      <Combobox {...args} label="Country" placeholder="Search countries…">
        <ComboboxGroup label="North America">
          <ComboboxOption value="us">United States</ComboboxOption>
          <ComboboxOption value="ca">Canada</ComboboxOption>
          <ComboboxOption value="mx">Mexico</ComboboxOption>
        </ComboboxGroup>
        <ComboboxGroup label="Europe">
          <ComboboxOption value="uk">United Kingdom</ComboboxOption>
          <ComboboxOption value="fr">France</ComboboxOption>
          <ComboboxOption value="de">Germany</ComboboxOption>
        </ComboboxGroup>
        <ComboboxGroup label="Asia Pacific">
          <ComboboxOption value="jp">Japan</ComboboxOption>
          <ComboboxOption value="kr">South Korea</ComboboxOption>
          <ComboboxOption value="sg">Singapore</ComboboxOption>
          <ComboboxOption value="au">Australia</ComboboxOption>
        </ComboboxGroup>
      </Combobox>
    </div>
  ),
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <Combobox size="sm" label="Small (sm)" placeholder="Search…">
        <ComboboxOption value="a">Option A</ComboboxOption>
        <ComboboxOption value="b">Option B</ComboboxOption>
        <ComboboxOption value="c">Option C</ComboboxOption>
      </Combobox>
      <Combobox size="md" label="Medium (md)" placeholder="Search…">
        <ComboboxOption value="a">Option A</ComboboxOption>
        <ComboboxOption value="b">Option B</ComboboxOption>
        <ComboboxOption value="c">Option C</ComboboxOption>
      </Combobox>
      <Combobox size="lg" label="Large (lg)" placeholder="Search…">
        <ComboboxOption value="a">Option A</ComboboxOption>
        <ComboboxOption value="b">Option B</ComboboxOption>
        <ComboboxOption value="c">Option C</ComboboxOption>
      </Combobox>
    </div>
  ),
  parameters: { layout: 'padded' },
};

// ─── E-commerce overview ─────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8 bg-background-primary rounded-2xl w-[420px]">
      <div>
        <span className="text-xs font-semibold text-content-tertiary uppercase tracking-widest">
          Default
        </span>
        <div className="mt-2">
          <Combobox label="Country" placeholder="Search countries…">
            <ComboboxOption value="au">Australia</ComboboxOption>
            <ComboboxOption value="ca">Canada</ComboboxOption>
            <ComboboxOption value="fr">France</ComboboxOption>
            <ComboboxOption value="de">Germany</ComboboxOption>
            <ComboboxOption value="jp">Japan</ComboboxOption>
            <ComboboxOption value="uk">United Kingdom</ComboboxOption>
            <ComboboxOption value="us">United States</ComboboxOption>
          </Combobox>
        </div>
      </div>

      <div>
        <span className="text-xs font-semibold text-content-tertiary uppercase tracking-widest">
          With Groups
        </span>
        <div className="mt-2">
          <Combobox label="City" placeholder="Search cities…" helperText="Select your nearest city.">
            <ComboboxGroup label="United States">
              <ComboboxOption value="nyc">New York</ComboboxOption>
              <ComboboxOption value="la">Los Angeles</ComboboxOption>
              <ComboboxOption value="chi">Chicago</ComboboxOption>
            </ComboboxGroup>
            <ComboboxGroup label="United Kingdom">
              <ComboboxOption value="lon">London</ComboboxOption>
              <ComboboxOption value="man">Manchester</ComboboxOption>
            </ComboboxGroup>
          </Combobox>
        </div>
      </div>

      <div>
        <span className="text-xs font-semibold text-content-tertiary uppercase tracking-widest">
          Error State
        </span>
        <div className="mt-2">
          <Combobox
            label="Country"
            placeholder="Search countries…"
            error
            helperText="Please select a valid country."
          >
            <ComboboxOption value="ca">Canada</ComboboxOption>
            <ComboboxOption value="uk">United Kingdom</ComboboxOption>
            <ComboboxOption value="us">United States</ComboboxOption>
          </Combobox>
        </div>
      </div>

      <div>
        <span className="text-xs font-semibold text-content-tertiary uppercase tracking-widest">
          Disabled
        </span>
        <div className="mt-2">
          <Combobox label="Country" placeholder="Search countries…" disabled defaultValue="us">
            <ComboboxOption value="ca">Canada</ComboboxOption>
            <ComboboxOption value="uk">United Kingdom</ComboboxOption>
            <ComboboxOption value="us">United States</ComboboxOption>
          </Combobox>
        </div>
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
};
