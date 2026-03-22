import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  RiCloseLine,
  RiLockLine,
  RiMailLine,
  RiPriceTag3Line,
  RiSearchLine,
} from 'react-icons/ri';
import { Input } from './Input';

const searchIcon = <RiSearchLine className="size-full" aria-hidden />;
const clearIcon = <RiCloseLine className="size-full" aria-hidden />;
const lockIcon = <RiLockLine className="size-full" aria-hidden />;
const tagIcon = <RiPriceTag3Line className="size-full" aria-hidden />;
const mailIcon = <RiMailLine className="size-full" aria-hidden />;

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible input component supporting icons, addons, error states, and multiple sizes. Built on a native `<input>` element with semantic token styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
    error: {
      control: 'boolean',
      description: 'Error state — red border and error-styled helper text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
    label: {
      control: 'text',
      description: 'Accessible label rendered above the input',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
  args: {
    size: 'md',
    error: false,
    disabled: false,
    placeholder: 'Placeholder…',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Core states ────────────────────────────────────────────────────────────

export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: { placeholder: 'Search products…' },
};

export const WithLabelAndHelper: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    helperText: "We'll never share your email with anyone else.",
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    error: true,
    helperText: 'This field is required.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled field',
    placeholder: 'Cannot interact',
    disabled: true,
    helperText: 'This input is currently disabled.',
  },
};

// ─── Icons ───────────────────────────────────────────────────────────────────

export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: searchIcon,
    placeholder: 'Search…',
  },
};

export const WithTrailingIcon: Story = {
  args: {
    trailingIcon: clearIcon,
    defaultValue: 'Some text',
  },
};

export const WithBothIcons: Story = {
  args: {
    leadingIcon: searchIcon,
    trailingIcon: clearIcon,
    defaultValue: 'Running shoes',
  },
};

// ─── Addons ──────────────────────────────────────────────────────────────────

export const WithLeadingAddon: Story = {
  args: {
    leadingAddon: 'https://',
    placeholder: 'yourstore.com',
  },
};

export const WithTrailingAddon: Story = {
  args: {
    placeholder: 'yourstore',
    trailingAddon: '.com',
  },
};

export const WithBothAddons: Story = {
  args: {
    leadingAddon: 'https://',
    placeholder: 'yourstore',
    trailingAddon: '.com',
  },
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input size="sm" placeholder="Small input" label="Small (sm)" />
      <Input size="md" placeholder="Medium input" label="Medium (md)" />
      <Input size="lg" placeholder="Large input" label="Large (lg)" />
    </div>
  ),
  parameters: { layout: 'padded' },
};

export const AllSizesWithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input size="sm" leadingIcon={searchIcon} placeholder="Small with icon" />
      <Input size="md" leadingIcon={searchIcon} placeholder="Medium with icon" />
      <Input size="lg" leadingIcon={searchIcon} placeholder="Large with icon" />
    </div>
  ),
  parameters: { layout: 'padded' },
};

// ─── E-commerce overview ─────────────────────────────────────────────────────

export const EcommerceOverview: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8 bg-background-primary rounded-2xl w-[480px]">
      <div>
        <span className="text-xs font-semibold text-content-tertiary uppercase tracking-widest">
          Search
        </span>
        <div className="mt-2">
          <Input
            leadingIcon={searchIcon}
            trailingIcon={clearIcon}
            placeholder="Search products, brands…"
            defaultValue="Running shoes"
          />
        </div>
      </div>

      <div>
        <span className="text-xs font-semibold text-content-tertiary uppercase tracking-widest">
          Promo Code
        </span>
        <div className="mt-2">
          <Input
            leadingIcon={tagIcon}
            placeholder="Enter promo code"
            helperText="Apply a discount code at checkout."
          />
        </div>
      </div>

      <div>
        <span className="text-xs font-semibold text-content-tertiary uppercase tracking-widest">
          Email
        </span>
        <div className="mt-2">
          <Input
            label="Email address"
            leadingIcon={mailIcon}
            placeholder="you@example.com"
            type="email"
            helperText="Used for order confirmations and shipping updates."
          />
        </div>
      </div>

      <div>
        <span className="text-xs font-semibold text-content-tertiary uppercase tracking-widest">
          Password
        </span>
        <div className="mt-2">
          <Input
            label="Password"
            leadingIcon={lockIcon}
            placeholder="••••••••"
            type="password"
            helperText="Must be at least 8 characters."
          />
        </div>
      </div>

      <div>
        <span className="text-xs font-semibold text-content-tertiary uppercase tracking-widest">
          Website URL
        </span>
        <div className="mt-2">
          <Input
            label="Store URL"
            leadingAddon="https://"
            placeholder="yourstore"
            trailingAddon=".com"
          />
        </div>
      </div>

      <div>
        <span className="text-xs font-semibold text-content-tertiary uppercase tracking-widest">
          Error state
        </span>
        <div className="mt-2">
          <Input
            label="Email address"
            leadingIcon={mailIcon}
            placeholder="you@example.com"
            type="email"
            error
            helperText="Please enter a valid email address."
          />
        </div>
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
};
