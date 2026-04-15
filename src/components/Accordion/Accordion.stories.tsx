import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from "./Accordion";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A set of collapsible panels with headings. Built on Base UI Accordion with smooth height animations and full keyboard navigation.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    multiple: false,
    disabled: false,
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    defaultValue: ["item-1"],
  },
  render: (args) => (
    <div className="w-[480px]">
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Base UI?</AccordionTrigger>
          <AccordionPanel>
            Base UI is a library of unstyled, accessible React components. It
            provides the behavior and accessibility primitives so you can focus
            on your design system.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How do I get started?</AccordionTrigger>
          <AccordionPanel>
            Install Base UI from npm:{" "}
            <code className="font-mono text-xs bg-surface-secondary px-1 py-0.5 rounded">
              npm install @base-ui-components/react
            </code>
            , then import and compose the components you need.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can I use it for my project?</AccordionTrigger>
          <AccordionPanel>
            Yes! Base UI is open source and freely available under the MIT
            license. It&apos;s designed to work with any styling approach.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// ── Multiple open ──────────────────────────────────────────────────────────

export const MultipleOpen: Story = {
  name: "Multiple Open",
  args: {
    multiple: true,
    defaultValue: ["item-1", "item-2"],
  },
  render: (args) => (
    <div className="w-[480px]">
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Shipping policy</AccordionTrigger>
          <AccordionPanel>
            We offer free standard shipping on all orders over $50. Expedited
            and overnight options are available at checkout.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Return policy</AccordionTrigger>
          <AccordionPanel>
            Items can be returned within 30 days of purchase in their original
            condition. Refunds are processed within 5–7 business days.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Warranty information</AccordionTrigger>
          <AccordionPanel>
            All products come with a 1-year limited warranty covering
            manufacturing defects. Extended warranties are available for
            purchase.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// ── Disabled item ──────────────────────────────────────────────────────────

export const DisabledItem: Story = {
  name: "Disabled Item",
  render: (args) => (
    <div className="w-[480px]">
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Active item</AccordionTrigger>
          <AccordionPanel>
            This item is active and can be toggled open and closed.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-2" disabled>
          <AccordionTrigger>Disabled item</AccordionTrigger>
          <AccordionPanel>
            This content is not reachable because the item is disabled.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Another active item</AccordionTrigger>
          <AccordionPanel>
            This item is also active and can be toggled normally.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// ── Disabled accordion ─────────────────────────────────────────────────────

export const DisabledAccordion: Story = {
  name: "Disabled Accordion",
  args: {
    disabled: true,
  },
  render: (args) => (
    <div className="w-[480px]">
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Entire accordion disabled</AccordionTrigger>
          <AccordionPanel>
            Setting disabled on the root disables all items at once.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Also disabled</AccordionTrigger>
          <AccordionPanel>
            All interaction is blocked when the root accordion is disabled.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// ── Overview ───────────────────────────────────────────────────────────────

export const Overview: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-col gap-8 p-8 rounded-2xl bg-surface-primary max-w-xl mx-auto">
      <div>
        <p className="text-xs font-medium text-content-tertiary uppercase tracking-widest mb-3">
          Single open (default)
        </p>
        <Accordion defaultValue={["q1"]}>
          <AccordionItem value="q1">
            <AccordionTrigger>What is Velocity?</AccordionTrigger>
            <AccordionPanel>
              Velocity is a design system built on Base UI, styled with Tailwind
              v4 and a semantic token system for consistent, themeable UIs.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>Is it open source?</AccordionTrigger>
            <AccordionPanel>
              Yes — Velocity is free and open source, available under the MIT
              license.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>Which frameworks are supported?</AccordionTrigger>
            <AccordionPanel>
              Velocity works with any React-based framework, including Next.js,
              Remix, and Vite.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <p className="text-xs font-medium text-content-tertiary uppercase tracking-widest mb-3">
          Multiple open
        </p>
        <Accordion multiple defaultValue={["f1", "f2"]}>
          <AccordionItem value="f1">
            <AccordionTrigger>Semantic tokens</AccordionTrigger>
            <AccordionPanel>
              Every color, spacing, and shadow value maps to a named token so
              themes can be swapped without touching component code.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="f2">
            <AccordionTrigger>Accessible by default</AccordionTrigger>
            <AccordionPanel>
              Components are built on Base UI primitives that implement ARIA
              patterns and keyboard navigation out of the box.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="f3" disabled>
            <AccordionTrigger>Coming soon (disabled)</AccordionTrigger>
            <AccordionPanel>This feature is not yet available.</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};
