import type { Meta, StoryObj } from '@storybook/react-vite';
import { RiAddLine, RiArrowRightSLine } from 'react-icons/ri';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible button component built on BaseUI, supporting **4 variants** (solid, outline, ghost, link), **3 sizes** (sm, md, lg), and **5 color schemes** (primary, success, warning, danger, neutral).',
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
};

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
    startIcon: <RiAddLine className="h-4 w-4" aria-hidden />,
    children: 'Add item',
  },
};

export const WithEndIcon: Story = {
  args: {
    endIcon: <RiArrowRightSLine className="h-4 w-4" aria-hidden />,
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
