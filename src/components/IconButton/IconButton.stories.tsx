import type { Meta, StoryObj } from "@storybook/react-vite";
import { RiDeleteBinLine, RiHeartLine, RiShoppingCartLine } from "react-icons/ri";
import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Square, icon-only button for toolbars, product cards, and compact actions. Wraps **Button** (Base UI). Always pass a meaningful `label` — it is exposed to assistive tech via visually hidden text. Icons use [Remix Icon](https://remixicon.com/) (`react-icons/ri`).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost", "link"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    colorScheme: {
      control: "select",
      options: ["primary", "success", "warning", "danger", "neutral"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    label: "Save to wishlist",
    variant: "outline",
    size: "md",
    colorScheme: "neutral",
    loading: false,
    disabled: false,
    children: <RiHeartLine className="h-4 w-4 shrink-0" aria-hidden />,
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  render: (args) => <IconButton {...args} />,
};

export const PrimarySolid: Story = {
  args: {
    variant: "solid",
    colorScheme: "primary",
    label: "Add to cart",
    children: <RiShoppingCartLine className="h-4 w-4 shrink-0" aria-hidden />,
  },
  render: (args) => <IconButton {...args} />,
};

export const DangerGhost: Story = {
  args: {
    variant: "ghost",
    colorScheme: "danger",
    label: "Remove item",
    children: <RiDeleteBinLine className="h-4 w-4 shrink-0" aria-hidden />,
  },
  render: (args) => <IconButton {...args} />,
};

export const Loading: Story = {
  args: {
    loading: true,
    label: "Saving",
    children: <RiHeartLine className="h-4 w-4 shrink-0" aria-hidden />,
  },
  render: (args) => <IconButton {...args} />,
};

export const Overview: Story = {
  args: {
    label: "Overview",
    children: <RiHeartLine className="h-4 w-4 shrink-0" aria-hidden />,
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8 rounded-2xl bg-surface-primary">
      <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
        Sizes
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <IconButton label="Small" size="sm" variant="outline" colorScheme="neutral">
          <RiHeartLine className="h-4 w-4 shrink-0" aria-hidden />
        </IconButton>
        <IconButton label="Medium" size="md" variant="outline" colorScheme="neutral">
          <RiHeartLine className="h-4 w-4 shrink-0" aria-hidden />
        </IconButton>
        <IconButton label="Large" size="lg" variant="outline" colorScheme="neutral">
          <RiHeartLine className="h-4 w-4 shrink-0" aria-hidden />
        </IconButton>
      </div>
      <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
        Variants
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <IconButton label="Outline" variant="outline" colorScheme="neutral">
          <RiHeartLine className="h-4 w-4 shrink-0" aria-hidden />
        </IconButton>
        <IconButton label="Ghost" variant="ghost" colorScheme="neutral">
          <RiHeartLine className="h-4 w-4 shrink-0" aria-hidden />
        </IconButton>
        <IconButton label="Solid primary" variant="solid" colorScheme="primary">
          <RiShoppingCartLine className="h-4 w-4 shrink-0" aria-hidden />
        </IconButton>
        <IconButton label="Danger outline" variant="outline" colorScheme="danger">
          <RiDeleteBinLine className="h-4 w-4 shrink-0" aria-hidden />
        </IconButton>
      </div>
    </div>
  ),
  parameters: { layout: "padded" },
};
