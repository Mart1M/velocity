import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from "./Accordion";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible accordion for collapsible content sections. Built on Base UI Accordion. Ideal for FAQ, mobile filters, and order details.",
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

const faqItems = [
  {
    value: "shipping",
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 5–7 business days. Express shipping is available for 2–3 business day delivery. Free shipping on orders over $75.",
  },
  {
    value: "returns",
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of purchase. Items must be unused and in their original packaging. Refunds are processed within 5–10 business days.",
  },
  {
    value: "payment",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay.",
  },
];

export const Default: Story = {
  render: (args) => (
    <div className="w-[480px]">
      <Accordion {...args}>
        {faqItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionPanel>{item.answer}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
};

export const DefaultOpen: Story = {
  render: (args) => (
    <div className="w-[480px]">
      <Accordion {...args} defaultValue={["shipping"]}>
        {faqItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionPanel>{item.answer}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
};

export const Multiple: Story = {
  args: { multiple: true },
  render: (args) => (
    <div className="w-[480px]">
      <Accordion {...args} defaultValue={["shipping", "returns"]}>
        {faqItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionPanel>{item.answer}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
};

export const DisabledAll: Story = {
  args: { disabled: true },
  render: (args) => (
    <div className="w-[480px]">
      <Accordion {...args}>
        {faqItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionPanel>{item.answer}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
};

export const DisabledItem: Story = {
  render: (args) => (
    <div className="w-[480px]">
      <Accordion {...args}>
        <AccordionItem value="shipping">
          <AccordionTrigger>How long does shipping take?</AccordionTrigger>
          <AccordionPanel>
            Standard shipping takes 5–7 business days.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="returns" disabled>
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionPanel>
            We accept returns within 30 days of purchase.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="payment">
          <AccordionTrigger>
            What payment methods do you accept?
          </AccordionTrigger>
          <AccordionPanel>
            We accept all major credit cards, PayPal, Apple Pay, and Google Pay.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-10 p-8 rounded-2xl bg-surface-primary w-[540px]">
      {/* Default — single expand */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          Single expand (FAQ)
        </p>
        <Accordion defaultValue={["shipping"]}>
          {faqItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionPanel>{item.answer}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Multiple expand */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          Multiple expand
        </p>
        <Accordion multiple defaultValue={["shipping", "returns"]}>
          <AccordionItem value="shipping">
            <AccordionTrigger>Shipping information</AccordionTrigger>
            <AccordionPanel>
              Free shipping on orders over $75. Express delivery available.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="returns">
            <AccordionTrigger>Return policy</AccordionTrigger>
            <AccordionPanel>
              30-day return window on all unused items.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="warranty">
            <AccordionTrigger>Warranty details</AccordionTrigger>
            <AccordionPanel>
              All products come with a 1-year manufacturer warranty.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Disabled item */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          Disabled item
        </p>
        <Accordion>
          <AccordionItem value="available">
            <AccordionTrigger>Available section</AccordionTrigger>
            <AccordionPanel>This section is interactive.</AccordionPanel>
          </AccordionItem>
          <AccordionItem value="locked" disabled>
            <AccordionTrigger>Locked section</AccordionTrigger>
            <AccordionPanel>This section is disabled.</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
  parameters: { layout: "padded" },
};
