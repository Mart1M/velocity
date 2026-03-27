import type { Meta, StoryObj } from "@storybook/react-vite";
import { RiNotification3Line } from "react-icons/ri";
import { IconButton } from "../IconButton/IconButton";
import { NotificationBadge } from "./NotificationBadge";

const meta = {
  title: "Components/NotificationBadge",
  component: NotificationBadge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Small count or dot for unread state — cart, inbox, tabs. Use `aria-label` on the dot. Position with `absolute` inside a `relative` wrapper.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "brand", "danger", "neutral"],
    },
    size: { control: "select", options: ["sm", "md"] },
    count: { control: "number" },
    max: { control: "number" },
    showZero: { control: "boolean" },
    dot: { control: "boolean" },
  },
  args: {
    count: 3,
    max: 99,
    showZero: false,
    dot: false,
    variant: "danger",
    size: "sm",
  },
} satisfies Meta<typeof NotificationBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Dot: Story = {
  args: {
    dot: true,
    count: undefined,
    "aria-label": "New notifications",
  },
};

export const Capped: Story = {
  args: { count: 120, max: 99 },
};

export const ShowZero: Story = {
  args: { count: 0, showZero: true },
};

export const OnIconButton: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="relative inline-flex">
        <IconButton label="Notifications" variant="ghost" colorScheme="neutral">
          <RiNotification3Line className="h-5 w-5" />
        </IconButton>
        <NotificationBadge
          count={5}
          className="absolute -right-0.5 -top-0.5 z-10"
        />
      </div>
      <div className="relative inline-flex">
        <IconButton label="Alerts" variant="ghost" colorScheme="neutral">
          <RiNotification3Line className="h-5 w-5" />
        </IconButton>
        <NotificationBadge
          dot
          aria-label="You have new alerts"
          className="absolute right-1 top-1 z-10"
        />
      </div>
    </div>
  ),
  parameters: { layout: "padded" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <NotificationBadge count={4} size="sm" />
      <NotificationBadge count={4} size="md" />
      <NotificationBadge dot size="sm" aria-label="Dot sm" />
      <NotificationBadge dot size="md" aria-label="Dot md" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <NotificationBadge count={2} variant="default" />
      <NotificationBadge count={2} variant="danger" />
      <NotificationBadge count={2} variant="brand" />
      <NotificationBadge count={2} variant="neutral" />
    </div>
  ),
};
