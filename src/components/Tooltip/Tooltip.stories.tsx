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

/**
 * Base UI merges trigger props via `cloneElement(render, mergedProps)`.
 * Put **label text inside** `<Button>...</Button>` in `render` — children of
 * `<TooltipTrigger>` are not passed into `render`, so `render={<Button />}` alone yields an empty button and broken hover targets.
 */
const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A popup that appears on hover/focus showing supplementary information. Ideal for price info bubbles, form field help, and icon-button labels. Built on Base UI Tooltip. When using `render={<Button />}`, put the label **inside** the Button; do not rely on children of `TooltipTrigger`.',
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
};

export default meta;
type Story = StoryObj<typeof meta>;

const outlineBtn = (label: string) => (
  <Button variant="outline" colorScheme="neutral">
    {label}
  </Button>
);

const ghostSmBtn = (label: string) => (
  <Button variant="ghost" colorScheme="neutral" size="sm">
    {label}
  </Button>
);

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger delay={200} render={outlineBtn('Hover me')} />
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
          <TooltipTrigger delay={200} render={outlineBtn('Top')} />
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
          <TooltipTrigger delay={200} render={outlineBtn('Left')} />
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
          <TooltipTrigger delay={200} render={outlineBtn('Right')} />
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
          <TooltipTrigger delay={200} render={outlineBtn('Bottom')} />
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
      <TooltipTrigger
        delay={200}
        render={
          <Button variant="solid" colorScheme="primary">
            No arrow
          </Button>
        }
      />
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
        <TooltipTrigger delay={0} render={outlineBtn('Instant')} />
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
        <TooltipTrigger delay={1000} render={outlineBtn('1s delay')} />
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
    <div className="flex items-center gap-2 rounded-2xl bg-surface-primary p-8">
      <span className="text-xl font-bold text-content-primary">$149.99</span>
      <Tooltip>
        <TooltipTrigger
          delay={200}
          className="inline-flex size-5 cursor-pointer items-center justify-center rounded-full bg-surface-secondary text-xs text-content-secondary transition-colors duration-[200ms] hover:bg-surface-hover"
        >
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
    <div className="flex w-72 flex-col gap-1.5 rounded-2xl bg-surface-primary p-8">
      <div className="flex items-center gap-1.5">
        <label className="text-sm font-medium text-content-primary">
          Password
        </label>
        <Tooltip>
          <TooltipTrigger
            delay={200}
            className="inline-flex size-4 cursor-pointer items-center justify-center rounded-full bg-surface-secondary text-[10px] text-content-tertiary transition-colors duration-[200ms] hover:bg-surface-hover"
          >
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
        className="h-10 rounded-xl border border-border-default bg-surface-secondary px-3 text-sm text-content-primary transition-[border-color,box-shadow] duration-[200ms] placeholder:text-content-tertiary focus:border-border-brand focus:outline-none focus:ring-2 focus:ring-border-focus"
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
            <TooltipTrigger delay={200} render={ghostSmBtn(label.charAt(0))} />
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
    <div className="flex flex-col gap-8 rounded-2xl bg-surface-primary p-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
        Tooltip — Positions
      </p>
      <div className="flex justify-center gap-4">
        {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger delay={200} render={ghostSmBtn(side)} />
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
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-content-primary">$99.00</span>
          <Tooltip>
            <TooltipTrigger
              delay={200}
              className="inline-flex size-5 cursor-pointer items-center justify-center rounded-full bg-surface-secondary text-xs text-content-secondary transition-colors duration-[200ms] hover:bg-surface-hover"
            >
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
          <TooltipTrigger
            delay={200}
            render={
              <Button variant="solid" colorScheme="primary" size="sm">
                Save
              </Button>
            }
          />
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
