import type { Meta, StoryObj } from "@storybook/react";
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerBackdrop,
  DrawerPopup,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "./Drawer";
import { Button } from "../Button";

const meta = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A panel that slides in from the side of the screen. Built on Base UI Dialog. Ideal for side carts, mobile filters, and settings panels.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    side: { control: "select", options: ["left", "right"] },
  },
  args: {
    side: "right",
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default (right side) ───────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger>
        <Button variant="outline" colorScheme="neutral">
          Open Drawer
        </Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerPopup>
          <DrawerClose />
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>
            This is a basic drawer sliding in from the right.
          </DrawerDescription>
          <div className="mt-6 text-sm text-content-secondary">
            <p>Drawer body content goes here.</p>
          </div>
        </DrawerPopup>
      </DrawerPortal>
    </Drawer>
  ),
};

// ── Left side ──────────────────────────────────────────────────────────────

export const LeftSide: Story = {
  args: { side: "left" },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger>
        <Button variant="outline" colorScheme="neutral">
          Open Left Drawer
        </Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerPopup>
          <DrawerClose />
          <DrawerTitle>Navigation</DrawerTitle>
          <DrawerDescription>Site navigation menu.</DrawerDescription>
          <nav className="mt-6 flex flex-col gap-2">
            {["Home", "Products", "Categories", "Account", "Help"].map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  className="rounded-lg px-3 py-2 text-left text-sm text-content-secondary transition-colors duration-[200ms] hover:bg-surface-hover hover:text-content-primary"
                >
                  {item}
                </button>
              ),
            )}
          </nav>
        </DrawerPopup>
      </DrawerPortal>
    </Drawer>
  ),
};

// ── Side Cart ──────────────────────────────────────────────────────────────

const cartItems = [
  { name: "Running Shoes", variant: "Black / Size 10", price: 129.99, qty: 1 },
  { name: "Performance Tee", variant: "White / Medium", price: 49.99, qty: 2 },
  { name: "Training Shorts", variant: "Navy / Large", price: 59.99, qty: 1 },
];

export const SideCart: Story = {
  render: () => (
    <Drawer side="right">
      <DrawerTrigger>
        <Button variant="solid" colorScheme="primary">
          Cart (3)
        </Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerPopup>
          <DrawerClose />
          <DrawerTitle>Your Cart</DrawerTitle>
          <DrawerDescription>3 items in your cart.</DrawerDescription>

          <div className="mt-6 flex flex-1 flex-col gap-4">
            {cartItems.map((item) => (
              <div
                key={item.name}
                className="flex items-start justify-between gap-3 border-b border-border-subtle pb-4"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-content-primary">
                    {item.name}
                  </span>
                  <span className="text-xs text-content-tertiary">
                    {item.variant}
                  </span>
                  <span className="text-xs text-content-secondary">
                    Qty: {item.qty}
                  </span>
                </div>
                <span className="text-sm font-medium text-content-primary">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-auto border-t border-border-default pt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-content-secondary">
                Total
              </span>
              <span className="text-lg font-semibold text-content-primary">
                $289.96
              </span>
            </div>
            <Button variant="solid" colorScheme="primary" fullWidth>
              Checkout
            </Button>
          </div>
        </DrawerPopup>
      </DrawerPortal>
    </Drawer>
  ),
};

// ── Mobile Filters ─────────────────────────────────────────────────────────

export const MobileFilters: Story = {
  render: () => (
    <Drawer side="left">
      <DrawerTrigger>
        <Button variant="outline" colorScheme="neutral">
          Filters
        </Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerPopup>
          <DrawerClose />
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerDescription>Narrow down your search results.</DrawerDescription>

          <div className="mt-6 flex flex-col gap-6">
            <fieldset className="flex flex-col gap-2">
              <legend className="text-xs font-semibold uppercase tracking-wider text-content-tertiary mb-2">
                Category
              </legend>
              {["Shoes", "Apparel", "Accessories", "Equipment"].map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 text-sm text-content-secondary cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="accent-accent-primary"
                  />
                  {cat}
                </label>
              ))}
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <legend className="text-xs font-semibold uppercase tracking-wider text-content-tertiary mb-2">
                Price Range
              </legend>
              {["Under $50", "$50 – $100", "$100 – $200", "Over $200"].map(
                (range) => (
                  <label
                    key={range}
                    className="flex items-center gap-2 text-sm text-content-secondary cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="accent-accent-primary"
                    />
                    {range}
                  </label>
                ),
              )}
            </fieldset>
          </div>

          <div className="mt-auto border-t border-border-default pt-4 flex gap-3">
            <Button variant="outline" colorScheme="neutral" fullWidth>
              Reset
            </Button>
            <Button variant="solid" colorScheme="primary" fullWidth>
              Apply
            </Button>
          </div>
        </DrawerPopup>
      </DrawerPortal>
    </Drawer>
  ),
};

// ── Overview ───────────────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8 rounded-2xl bg-surface-primary">
      <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
        Drawer — All Sides
      </p>
      <div className="flex gap-4">
        <Drawer side="left">
          <DrawerTrigger>
            <Button variant="outline" colorScheme="neutral" size="sm">
              Left
            </Button>
          </DrawerTrigger>
          <DrawerPortal>
            <DrawerBackdrop />
            <DrawerPopup>
              <DrawerClose />
              <DrawerTitle>Left Drawer</DrawerTitle>
              <DrawerDescription>
                Slides in from the left edge.
              </DrawerDescription>
            </DrawerPopup>
          </DrawerPortal>
        </Drawer>

        <Drawer side="right">
          <DrawerTrigger>
            <Button variant="outline" colorScheme="neutral" size="sm">
              Right
            </Button>
          </DrawerTrigger>
          <DrawerPortal>
            <DrawerBackdrop />
            <DrawerPopup>
              <DrawerClose />
              <DrawerTitle>Right Drawer</DrawerTitle>
              <DrawerDescription>
                Slides in from the right edge.
              </DrawerDescription>
            </DrawerPopup>
          </DrawerPortal>
        </Drawer>
      </div>
    </div>
  ),
  parameters: { layout: "padded" },
};
