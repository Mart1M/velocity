import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button/Button";
import { MarketingBanner } from "./MarketingBanner";

const meta = {
  title: "Components/MarketingBanner",
  component: MarketingBanner,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Top-of-page promo strip — shipping, sale, signup. Not for errors or critical alerts (use **AlertBanner**).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "brand", "accent", "inverse"],
    },
    layout: { control: "select", options: ["center", "split"] },
    dismissible: { control: "boolean" },
  },
  args: {
    variant: "neutral",
    layout: "center",
    message: "Free express shipping on orders over $150.",
    dismissible: false,
  },
} satisfies Meta<typeof MarketingBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTitleAndCta: Story = {
  args: {
    title: "Spring sale",
    message: "Up to 30% off trail running gear through Sunday.",
    cta: { label: "Shop the edit", href: "#" },
  },
};

export const Brand: Story = {
  args: {
    variant: "brand",
    layout: "split",
    title: "Members get more",
    message: "Earn points on every order and unlock exclusive drops.",
    cta: { label: "Join free", href: "#" },
    dismissible: true,
  },
};

export const Accent: Story = {
  args: {
    variant: "accent",
    message: "New arrivals weekly — be first to know.",
    cta: { label: "Subscribe", href: "#", external: true },
  },
};

export const Inverse: Story = {
  args: {
    variant: "inverse",
    message: "Holiday hours: support replies within 24h Dec 24–26.",
    cta: { label: "Contact us", href: "#" },
  },
};

export const SplitWithButton: Story = {
  name: "Split layout + trailing Button",
  args: {
    variant: "neutral",
    layout: "split",
    title: "Ready to checkout?",
    message: "Your cart is saved for 7 days.",
    trailing: (
      <Button type="button" size="sm" colorScheme="primary" variant="solid">
        View cart
      </Button>
    ),
  },
};

export const CustomChildren: Story = {
  args: {
    variant: "neutral",
    message: undefined,
    children: (
      <p className="text-sm text-content-secondary">
        Custom <strong className="text-content-primary">rich</strong> markup inside
        the banner.
      </p>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 bg-background-primary p-6">
      <MarketingBanner
        variant="neutral"
        message="Neutral — subtle surface for low-noise promos."
        cta={{ label: "Details", href: "#" }}
      />
      <MarketingBanner
        variant="brand"
        message="Brand — high emphasis on primary accent."
        cta={{ label: "Act now", href: "#" }}
      />
      <MarketingBanner
        variant="accent"
        message="Accent — lime-tinted strip."
        cta={{ label: "Learn more", href: "#" }}
      />
      <MarketingBanner
        variant="inverse"
        message="Inverse — dark strip with light text."
        cta={{ label: "Explore", href: "#" }}
      />
    </div>
  ),
};
