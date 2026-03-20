import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible button component built on BaseUI, supporting multiple variants, sizes, and color schemes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'link'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    colorScheme: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'neutral'],
      description: 'Color scheme',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button',
    },
    children: {
      control: 'text',
      description: 'Button label',
    },
  },
  args: {
    children: 'Button',
    variant: 'solid',
    size: 'md',
    colorScheme: 'primary',
    loading: false,
    disabled: false,
    fullWidth: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {};

// Variants
export const Solid: Story = { args: { variant: 'solid' } };
export const Outline: Story = { args: { variant: 'outline' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Link: Story = { args: { variant: 'link' } };

// Sizes
export const Small: Story = { args: { size: 'sm' } };
export const Medium: Story = { args: { size: 'md' } };
export const Large: Story = { args: { size: 'lg' } };

// Color schemes
export const Primary: Story = { args: { colorScheme: 'primary' } };
export const Success: Story = { args: { colorScheme: 'success' } };
export const Warning: Story = { args: { colorScheme: 'warning' } };
export const Danger: Story = { args: { colorScheme: 'danger' } };
export const Neutral: Story = { args: { colorScheme: 'neutral' } };

// States
export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };
export const FullWidth: Story = {
  args: { fullWidth: true },
  parameters: { layout: 'padded' },
};

// With icons
export const WithStartIcon: Story = {
  args: {
    startIcon: (
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
      </svg>
    ),
    children: 'Add item',
  },
};

export const WithEndIcon: Story = {
  args: {
    endIcon: (
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    ),
    children: 'Next',
  },
};

// All variants overview
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8 rounded-radius-lg bg-surface-primary">
      {(['solid', 'outline', 'ghost', 'link'] as const).map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <span className="text-xs font-medium text-content-tertiary uppercase tracking-widest">{variant}</span>
          <div className="flex items-center gap-3 flex-wrap">
            {(['primary', 'success', 'warning', 'danger', 'neutral'] as const).map((colorScheme) => (
              <Button key={colorScheme} variant={variant} colorScheme={colorScheme} size="md">
                {colorScheme}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { layout: 'padded' },
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
