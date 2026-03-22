import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import {
  Tooltip,
  TooltipTrigger,
  TooltipPortal,
  TooltipPositioner,
  TooltipPopup,
  TooltipArrow,
  TooltipProvider,
} from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A popup that appears on hover/focus showing supplementary information. Ideal for price info bubbles, form field help, and icon-button labels. Built on Base UI Tooltip.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    defaultOpen: false,
    disabled: false,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger render={<Button variant="outline" colorScheme="neutral" />}>
        Hover me
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipPositioner>
          <TooltipPopup>
            This is a tooltip
            <TooltipArrow />
          </TooltipPopup>
        </TooltipPositioner>
      </TooltipPortal>
    </Tooltip>
  ),
};

// ─── Placement ────────────────────────────────────────────────────────────────

export const Placement: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-10 p-16">
      <div className="flex justify-center">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" colorScheme="neutral" />}>
            Top
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipPositioner side="top">
              <TooltipPopup>
                Tooltip on top
                <TooltipArrow />
              </TooltipPopup>
            </TooltipPositioner>
          </TooltipPortal>
        </Tooltip>
      </div>

      <div className="flex justify-center gap-32">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" colorScheme="neutral" />}>
            Left
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipPositioner side="left">
              <TooltipPopup>
                Tooltip on left
                <TooltipArrow />
              </TooltipPopup>
            </TooltipPositioner>
          </TooltipPortal>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" colorScheme="neutral" />}>
            Right
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipPositioner side="right">
              <TooltipPopup>
                Tooltip on right
                <TooltipArrow />
              </TooltipPopup>
            </TooltipPositioner>
          </TooltipPortal>
        </Tooltip>
      </div>

      <div className="flex justify-center">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" colorScheme="neutral" />}>
            Bottom
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipPositioner side="bottom">
              <TooltipPopup>
                Tooltip on bottom
                <TooltipArrow />
              </TooltipPopup>
            </TooltipPositioner>
          </TooltipPortal>
        </Tooltip>
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
};

// ─── Without Arrow ────────────────────────────────────────────────────────────

export const WithoutArrow: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="solid" colorScheme="primary" />}>
        No arrow
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipPositioner>
          <TooltipPopup>Tooltip without an arrow</TooltipPopup>
        </TooltipPositioner>
      </TooltipPortal>
    </Tooltip>
  ),
};

// ─── Custom Delay ─────────────────────────────────────────────────────────────

export const CustomDelay: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger
          delay={0}
          render={<Button variant="outline" colorScheme="neutral" />}
        >
          Instant
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipPositioner>
            <TooltipPopup>
              No delay
              <TooltipArrow />
            </TooltipPopup>
          </TooltipPositioner>
        </TooltipPortal>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          delay={1000}
          render={<Button variant="outline" colorScheme="neutral" />}
        >
          1s delay
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipPositioner>
            <TooltipPopup>
              1 second delay
              <TooltipArrow />
            </TooltipPopup>
          </TooltipPositioner>
        </TooltipPortal>
      </Tooltip>
    </div>
  ),
};

// ─── Price Info Bubble ────────────────────────────────────────────────────────

export const PriceInfoBubble: Story = {
  render: () => (
    <div className="flex items-center gap-2 p-8 rounded-2xl bg-surface-primary">
      <span className="text-xl font-bold text-content-primary">$149.99</span>
      <Tooltip>
        <TooltipTrigger className="inline-flex items-center justify-center size-5 rounded-full bg-surface-secondary text-content-secondary text-xs cursor-pointer hover:bg-surface-hover transition-colors duration-[200ms]">
          ?
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipPositioner side="right" sideOffset={6}>
            <TooltipPopup>
              Includes taxes & shipping
              <TooltipArrow />
            </TooltipPopup>
          </TooltipPositioner>
        </TooltipPortal>
      </Tooltip>
    </div>
  ),
};

// ─── Form Field Help ──────────────────────────────────────────────────────────

export const FormFieldHelp: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5 p-8 rounded-2xl bg-surface-primary w-72">
      <div className="flex items-center gap-1.5">
        <label className="text-sm font-medium text-content-primary">
          Password
        </label>
        <Tooltip>
          <TooltipTrigger className="inline-flex items-center justify-center size-4 rounded-full bg-surface-secondary text-content-tertiary text-[10px] cursor-pointer hover:bg-surface-hover transition-colors duration-[200ms]">
            i
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipPositioner side="top" sideOffset={6}>
              <TooltipPopup>
                Must be at least 8 characters with one number
                <TooltipArrow />
              </TooltipPopup>
            </TooltipPositioner>
          </TooltipPortal>
        </Tooltip>
      </div>
      <input
        type="password"
        placeholder="••••••••"
        className="h-10 px-3 rounded-xl border border-border-default bg-surface-secondary text-content-primary text-sm placeholder:text-content-tertiary focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-border-brand transition-[border-color,box-shadow] duration-[200ms]"
      />
    </div>
  ),
};

// ─── Provider Grouping ────────────────────────────────────────────────────────

export const ProviderGrouping: Story = {
  render: () => (
    <TooltipProvider delay={200}>
      <div className="flex gap-2">
        {['Bold', 'Italic', 'Underline'].map((label) => (
          <Tooltip key={label}>
            <TooltipTrigger render={<Button variant="ghost" colorScheme="neutral" size="sm" />}>
              {label.charAt(0)}
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipPositioner side="bottom">
                <TooltipPopup>
                  {label}
                  <TooltipArrow />
                </TooltipPopup>
              </TooltipPositioner>
            </TooltipPortal>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  ),
};

// ─── Overview ─────────────────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8 rounded-2xl bg-surface-primary">
      <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
        Tooltip — Positions
      </p>
      <div className="flex gap-4 justify-center">
        {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger render={<Button variant="outline" colorScheme="neutral" size="sm" />}>
              {side}
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipPositioner side={side}>
                <TooltipPopup>
                  {side} tooltip
                  <TooltipArrow />
                </TooltipPopup>
              </TooltipPositioner>
            </TooltipPortal>
          </Tooltip>
        ))}
      </div>

      <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
        Tooltip — Use Cases
      </p>
      <div className="flex gap-6 items-center">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-content-primary">$99.00</span>
          <Tooltip>
            <TooltipTrigger className="inline-flex items-center justify-center size-5 rounded-full bg-surface-secondary text-content-secondary text-xs cursor-pointer hover:bg-surface-hover transition-colors duration-[200ms]">
              ?
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipPositioner side="top">
                <TooltipPopup>
                  Price before tax
                  <TooltipArrow />
                </TooltipPopup>
              </TooltipPositioner>
            </TooltipPortal>
          </Tooltip>
        </div>

        <Tooltip>
          <TooltipTrigger render={<Button variant="solid" colorScheme="primary" size="sm" />}>
            Save
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipPositioner side="bottom">
              <TooltipPopup>
                Save your changes (Ctrl+S)
                <TooltipArrow />
              </TooltipPopup>
            </TooltipPositioner>
          </TooltipPortal>
        </Tooltip>
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
};
