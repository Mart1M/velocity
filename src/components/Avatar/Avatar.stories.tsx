import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarParts } from "./index";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "User avatar with image, initials, or fallback. Built on [Base UI Avatar](https://base-ui.com/react/components/avatar). Default icon: Remix **RiUser3Line** (`react-icons/ri`).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    loading: { control: "select", options: ["lazy", "eager"] },
  },
  args: {
    size: "md",
    loading: "lazy",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleSrc =
  "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80";

export const WithImage: Story = {
  args: {
    src: sampleSrc,
    alt: "Portrait",
  },
};

export const Initials: Story = {
  args: {
    alt: "Alex Martin",
    src: undefined,
  },
};

export const IconFallback: Story = {
  name: "Icon (no name)",
  args: {
    alt: "",
    src: undefined,
  },
};

export const BrokenImage: Story = {
  name: "Broken image → fallback",
  args: {
    src: "https://example.invalid/photo.jpg",
    alt: "Jamie Doe",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar src={sampleSrc} alt="SM" size="sm" />
      <Avatar src={sampleSrc} alt="MD" size="md" />
      <Avatar src={sampleSrc} alt="LG" size="lg" />
      <Avatar src={sampleSrc} alt="XL" size="xl" />
    </div>
  ),
};

export const CustomFallback: Story = {
  args: {
    src: undefined,
    alt: "",
    fallback: <span className="text-caption font-semibold text-content-brand">RS</span>,
  },
};

export const Composition: Story = {
  name: "Composition (AvatarParts)",
  render: () => (
    <AvatarParts.Root
      className="inline-flex size-14 min-h-14 min-w-14 items-center justify-center overflow-hidden rounded-full bg-surface-secondary ring-1 ring-border-default ring-inset"
    >
      <AvatarParts.Image
        src={sampleSrc}
        alt="Custom"
        className="h-full w-full object-cover"
      />
      <AvatarParts.Fallback className="flex h-full w-full items-center justify-center text-sm text-content-secondary">
        CM
      </AvatarParts.Fallback>
    </AvatarParts.Root>
  ),
};
