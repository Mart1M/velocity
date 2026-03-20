import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const SearchIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
    <path
      fillRule="evenodd"
      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
      clipRule="evenodd"
    />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
    <path
      fillRule="evenodd"
      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
      clipRule="evenodd"
    />
  </svg>
);

const TagIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
    <path
      fillRule="evenodd"
      d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
  </svg>
);

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
    leadingIcon: <SearchIcon />,
    placeholder: 'Search…',
  },
};

export const WithTrailingIcon: Story = {
  args: {
    trailingIcon: <XIcon />,
    defaultValue: 'Some text',
  },
};

export const WithBothIcons: Story = {
  args: {
    leadingIcon: <SearchIcon />,
    trailingIcon: <XIcon />,
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
      <Input size="sm" leadingIcon={<SearchIcon />} placeholder="Small with icon" />
      <Input size="md" leadingIcon={<SearchIcon />} placeholder="Medium with icon" />
      <Input size="lg" leadingIcon={<SearchIcon />} placeholder="Large with icon" />
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
            leadingIcon={<SearchIcon />}
            trailingIcon={<XIcon />}
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
            leadingIcon={<TagIcon />}
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
            leadingIcon={<MailIcon />}
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
            leadingIcon={<LockIcon />}
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
            leadingIcon={<MailIcon />}
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
