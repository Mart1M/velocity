import type { Meta, StoryObj } from "@storybook/react-vite";
import { RiDeleteBinLine } from "react-icons/ri";
import { Button } from "../../Button/Button";
import { IconButton } from "../../IconButton/IconButton";
import { NumberField } from "../../NumberField/NumberField";
import {
  ProductCard,
  ProductCardBrand,
  ProductCardContent,
  ProductCardImage,
  ProductCardPrice,
  ProductCardTitle,
} from "../ProductCard/ProductCard";
import {
  CartContent,
  CartContentAside,
  CartContentItem,
  CartContentItems,
  CartContentMain,
  CartContentOrderSummary,
  CartContentRow,
  CartContentSection,
  CartContentTotalRow,
} from "./CartContent";

const meta = {
  title: "Ecommerce/CartContent",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Two-column **cart** layout: line items (often a horizontal `ProductCard`) + **sticky** summary column with CTA. Compose `CartContentMain` / `CartContentAside`, `CartContentOrderSummary`, `CartContentRow`, `CartContentTotalRow`.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function CartLineCard({
  brand,
  title,
  price,
  originalPrice,
  imageSrc,
  imageAlt,
}: {
  brand: string;
  title: string;
  price: string;
  originalPrice?: string;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <ProductCard layout="horizontal" size="sm">
      <ProductCardImage src={imageSrc} alt={imageAlt} />
      <ProductCardContent>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1 space-y-1">
            <ProductCardBrand>{brand}</ProductCardBrand>
            <ProductCardTitle>{title}</ProductCardTitle>
            <ProductCardPrice price={price} originalPrice={originalPrice} />
          </div>
          <div className="flex shrink-0 flex-col items-stretch gap-3 sm:items-end">
            <div className="w-28">
              <NumberField label="Quantity" size="sm" defaultValue={1} min={1} />
            </div>
            <div className="flex justify-end">
              <IconButton label="Remove from cart" variant="ghost" colorScheme="neutral" size="sm">
                <RiDeleteBinLine className="h-5 w-5" />
              </IconButton>
            </div>
          </div>
        </div>
      </ProductCardContent>
    </ProductCard>
  );
}

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-background-primary py-8 sm:py-12">
      <CartContent>
        <CartContentMain>
          <CartContentSection title="Cart (2 items)">
            <CartContentItems>
              <CartContentItem>
                <CartLineCard
                  brand="Asics"
                  title="Gel-Nimbus 26 — Black / White"
                  price="159,99 €"
                  originalPrice="189,99 €"
                  imageSrc="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80"
                  imageAlt="Running shoe"
                />
              </CartContentItem>
              <CartContentItem>
                <CartLineCard
                  brand="Nike"
                  title="Dri-FIT TechKnit Ultra"
                  price="64,99 €"
                  imageSrc="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80"
                  imageAlt="Technical running t-shirt"
                />
              </CartContentItem>
            </CartContentItems>
          </CartContentSection>
        </CartContentMain>

        <CartContentAside>
          <CartContentOrderSummary
            footer={
              <Button type="button" colorScheme="primary" variant="solid" fullWidth size="lg">
                Checkout
              </Button>
            }
          >
            <CartContentRow label="Subtotal" value="224,98 €" />
            <CartContentRow label="Shipping" value="Free" />
            <CartContentRow label="Tax (incl.)" value="37,50 €" />
            <CartContentTotalRow label="Total" value="262,48 €" />
            <p className="text-xs text-content-tertiary">
              Promo codes and gift cards in the next step.
            </p>
          </CartContentOrderSummary>
        </CartContentAside>
      </CartContent>
    </div>
  ),
};

export const EmptyAsidePlaceholder: Story = {
  name: "No summary card (layout only)",
  render: () => (
    <div className="min-h-[320px] bg-background-primary py-8">
      <CartContent>
        <CartContentMain>
          <CartContentSection title="Cart">
            <CartContentItems>
              <CartContentItem>
                <p className="rounded-xl border border-dashed border-border-strong bg-surface-secondary px-4 py-10 text-center text-sm text-content-secondary">
                  No items yet — add products to see them here.
                </p>
              </CartContentItem>
            </CartContentItems>
          </CartContentSection>
        </CartContentMain>
        <CartContentAside>
          <div className="rounded-xl border border-border-default bg-surface-primary p-5 text-sm text-content-secondary">
            Right column placeholder (custom summary, etc.).
          </div>
        </CartContentAside>
      </CartContent>
    </div>
  ),
};
