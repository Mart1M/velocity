import type { Meta, StoryObj } from "@storybook/react-vite";
import { Price } from "./Price";

const meta = {
  title: "Components/Price",
  component: Price,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Displays a product price with optional struck-through original amount and discount badge. Formats numeric values with `Intl.NumberFormat` (default `fr-FR` / `EUR`). Use in product cards, cart lines, and PDPs.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    layout: { control: "select", options: ["horizontal", "vertical"] },
    showDiscountBadge: { control: "boolean" },
    currency: { control: "text" },
    locale: { control: "text" },
  },
  args: {
    value: 129.99,
    size: "md",
    layout: "horizontal",
    currency: "EUR",
    locale: "fr-FR",
    showDiscountBadge: false,
  },
} satisfies Meta<typeof Price>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OnSale: Story = {
  args: {
    value: 103,
    originalValue: 129,
    showDiscountBadge: true,
  },
};

export const Formatted: Story = {
  args: {
    formattedValue: "89,99 €",
    formattedOriginalValue: "119,99 €",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-6 rounded-2xl bg-surface-primary p-8">
      <Price value={49.99} size="sm" />
      <Price value={129.99} size="md" />
      <Price value={249.99} size="lg" />
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    value: 103,
    originalValue: 129,
    showDiscountBadge: true,
    layout: "vertical",
    size: "lg",
  },
};

export const VerticalSizes: Story = {
  name: "Vertical sizes",
  render: () => (
    <div className="flex items-start gap-10 rounded-2xl bg-surface-primary p-8">
      <Price value={49.99} originalValue={59.99} layout="vertical" size="sm" />
      <Price value={129.99} originalValue={149.99} layout="vertical" size="md" />
      <Price
        value={249.99}
        originalValue={299.99}
        layout="vertical"
        size="lg"
        showDiscountBadge
      />
    </div>
  ),
};

export const WithDiscountBadge: Story = {
  args: {
    value: 79.99,
    originalValue: 99.99,
    showDiscountBadge: true,
  },
};

export const DisabledSaleContext: Story = {
  name: "Without discount badge",
  args: {
    value: 103,
    originalValue: 129,
    showDiscountBadge: false,
  },
};

export const Overview: Story = {
  render: () => (
    <div className="flex w-full max-w-lg flex-col gap-8 rounded-2xl bg-surface-primary p-8">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          Standard
        </p>
        <Price value={179.99} />
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          Promotion
        </p>
        <Price
          value={103}
          originalValue={129}
          showDiscountBadge
          size="lg"
        />
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          Vertical (promo)
        </p>
        <Price
          value={103}
          originalValue={129}
          showDiscountBadge
          layout="vertical"
          size="lg"
        />
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          Compact (cart line)
        </p>
        <Price value={64.99} originalValue={79.99} size="sm" />
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          Pre-formatted strings
        </p>
        <Price
          formattedValue="1 299,00 €"
          formattedOriginalValue="1 499,00 €"
        />
      </div>
    </div>
  ),
  parameters: { layout: "padded" },
};
