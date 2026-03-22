import type { Meta, StoryObj } from "@storybook/react-vite";
import { RiGiftLine } from "react-icons/ri";
import { AlertBanner } from "./AlertBanner";

const meta = {
  title: "Components/AlertBanner",
  component: AlertBanner,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Full-width banner for page-level alerts and announcements — promotions, free shipping, low stock alerts, system notices.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "error", "brand"],
      description: "Color variant",
    },
    title: {
      control: "text",
      description: "Bold heading text",
    },
    description: {
      control: "text",
      description: "Supporting body text",
    },
    dismissible: {
      control: "boolean",
      description: "Show dismiss close button",
    },
    icon: {
      control: false,
      description: "Custom icon override",
    },
    action: {
      control: false,
      description: "Optional action button",
    },
  },
  args: {
    variant: "info",
    title: "New feature available",
    description:
      "We just shipped dark mode support. Try it out in your account settings.",
    dismissible: false,
  },
} satisfies Meta<typeof AlertBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Dismissible: Story = {
  args: {
    dismissible: true,
    title: "Heads up!",
    description: "This banner can be dismissed by clicking the close button.",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "Scheduled maintenance",
    description:
      "We will be performing routine maintenance this Saturday from 2–4 AM UTC.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Order confirmed",
    description:
      "Your order #12345 has been placed successfully. You will receive a confirmation email shortly.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Low stock alert",
    description:
      "Only 3 items remaining. Order soon to avoid missing out.",
  },
};

export const ErrorVariant: Story = {
  name: "Error",
  args: {
    variant: "error",
    title: "Payment failed",
    description:
      "We could not process your payment. Please update your billing information.",
  },
};

export const Brand: Story = {
  args: {
    variant: "brand",
    title: "Free shipping this weekend!",
    description: "Use code SHIP2025 at checkout. No minimum purchase required.",
  },
};

export const WithAction: Story = {
  args: {
    variant: "brand",
    title: "Summer sale — 30% off everything",
    description: "Limited time offer. Don't miss out on our biggest sale of the year.",
    action: { label: "Shop now", onClick: () => {} },
    dismissible: true,
  },
};

export const TitleOnly: Story = {
  args: {
    variant: "info",
    title: "Your trial expires in 3 days.",
    description: undefined,
  },
};

export const DescriptionOnly: Story = {
  args: {
    variant: "success",
    title: undefined,
    description:
      "Free shipping on all orders over $50. No code needed.",
  },
};

export const WithCustomIcon: Story = {
  args: {
    variant: "brand",
    title: "Exclusive member deal",
    description: "Sign in to unlock your personalised discount.",
    icon: <RiGiftLine className="h-5 w-5" aria-hidden />,
  },
};

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8 rounded-2xl bg-surface-primary">
      <span className="text-xs font-medium text-content-tertiary uppercase tracking-widest mb-2">
        All variants
      </span>
      <AlertBanner
        variant="info"
        title="Scheduled maintenance"
        description="Routine maintenance this Saturday 2–4 AM UTC."
      />
      <AlertBanner
        variant="success"
        title="Order confirmed"
        description="Order #12345 placed. Confirmation email on its way."
      />
      <AlertBanner
        variant="warning"
        title="Low stock"
        description="Only 3 left — order soon."
      />
      <AlertBanner
        variant="error"
        title="Payment failed"
        description="Could not process payment. Update billing info."
      />
      <AlertBanner
        variant="brand"
        title="Free shipping this weekend!"
        description="Code SHIP2025 at checkout."
        action={{ label: "Shop now", onClick: () => {} }}
      />

      <span className="text-xs font-medium text-content-tertiary uppercase tracking-widest mt-6 mb-2">
        Dismissible
      </span>
      <AlertBanner
        variant="info"
        title="This can be dismissed"
        description="Click the X to close."
        dismissible
      />

      <span className="text-xs font-medium text-content-tertiary uppercase tracking-widest mt-6 mb-2">
        Title only
      </span>
      <AlertBanner variant="warning" title="Your trial expires in 3 days." />
    </div>
  ),
};
