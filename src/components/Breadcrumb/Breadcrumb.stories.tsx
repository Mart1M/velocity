import type { Meta, StoryObj } from "@storybook/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "./Breadcrumb";

const meta = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Navigation breadcrumb trail for category → subcategory → product hierarchies. Uses semantic `<nav>` and `<ol>` for accessibility.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Text size of the breadcrumb trail",
    },
    separator: {
      control: "text",
      description: "Custom separator character between items",
    },
  },
  args: {
    size: "md",
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Products</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrent>Running Shoes</BreadcrumbItem>
    </Breadcrumb>
  ),
};

// Slash separator
export const SlashSeparator: Story = {
  args: { separator: "/" },
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Clothing</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Men</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrent>Jackets</BreadcrumbItem>
    </Breadcrumb>
  ),
};

// Custom separator (arrow SVG)
export const CustomSeparator: Story = {
  render: (args) => (
    <Breadcrumb
      {...args}
      separator={
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 3L11 8L6 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
    >
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Electronics</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrent>Headphones</BreadcrumbItem>
    </Breadcrumb>
  ),
};

// Small size
export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Sale</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrent>Summer Collection</BreadcrumbItem>
    </Breadcrumb>
  ),
};

// Large size
export const Large: Story = {
  args: { size: "lg" },
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Categories</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrent>Featured</BreadcrumbItem>
    </Breadcrumb>
  ),
};

// Deep navigation
export const DeepNavigation: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Sports &amp; Outdoors</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Running</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Shoes</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrent>Nike Air Max 270</BreadcrumbItem>
    </Breadcrumb>
  ),
};

// Manual separator placement (using BreadcrumbSeparator directly)
export const ManualSeparators: Story = {
  render: () => (
    <nav aria-label="Breadcrumb" className="inline-flex">
      <ol className="flex items-center gap-1.5 list-none m-0 p-0 text-sm">
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Shop</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem isCurrent>Cart</BreadcrumbItem>
      </ol>
    </nav>
  ),
};

// Overview
export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8 rounded-2xl bg-surface-primary">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-content-tertiary uppercase tracking-widest">
          Small
        </span>
        <Breadcrumb size="sm">
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrent>Item</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-content-tertiary uppercase tracking-widest">
          Medium (default)
        </span>
        <Breadcrumb size="md">
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrent>Item</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-content-tertiary uppercase tracking-widest">
          Large
        </span>
        <Breadcrumb size="lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrent>Item</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-content-tertiary uppercase tracking-widest">
          Slash separator
        </span>
        <Breadcrumb separator="/">
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Category</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrent>Current Page</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-content-tertiary uppercase tracking-widest">
          Deep navigation
        </span>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Sports</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Running</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Shoes</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrent>Nike Air Max</BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
  ),
  parameters: { layout: "padded" },
};
