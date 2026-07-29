import type { Meta, StoryObj } from "@storybook/react-vite";
import { BrandLogo, BRAND_CATALOG, hasBrandLogo } from "./BrandLogo";

const meta: Meta<typeof BrandLogo> = {
  title: "Components/BrandLogo",
  component: BrandLogo,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Running & cycling brand logos from committed local SVG assets. Refresh with `pnpm fetch:brands` (Brandfetch MCP).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    monochrome: { control: "boolean" },
    brand: {
      control: "select",
      options: BRAND_CATALOG.map((b) => b.id),
    },
  },
  args: {
    brand: "nike",
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <BrandLogo brand="nike" size="xs" />
      <BrandLogo brand="nike" size="sm" />
      <BrandLogo brand="nike" size="md" />
      <BrandLogo brand="nike" size="lg" />
    </div>
  ),
};

export const Monochrome: Story = {
  name: "Noir et blanc",
  render: () => (
    <div className="flex flex-wrap items-end gap-8">
      <div className="space-y-2">
        <p className="text-caption text-content-secondary">Couleur</p>
        <BrandLogo brand="nike" size="lg" />
      </div>
      <div className="space-y-2">
        <p className="text-caption text-content-secondary">Monochrome</p>
        <BrandLogo brand="nike" size="lg" monochrome />
      </div>
    </div>
  ),
};

export const RunningBrands: Story = {
  name: "Running",
  render: () => <BrandGrid category="running" />,
};

export const ElectronicsBrands: Story = {
  name: "Electronics",
  render: () => <BrandGrid category="electronics" />,
};

export const CyclingBrands: Story = {
  name: "Cycling",
  render: () => <BrandGrid category="cycling" />,
};

export const CatalogOverview: Story = {
  name: "Full catalog",
  render: () => (
    <div className="space-y-10">
      <BrandGrid category="running" title="Running" />
      <BrandGrid category="electronics" title="Electronics" />
      <BrandGrid category="cycling" title="Cycling" />
    </div>
  ),
  parameters: { layout: "padded" },
};

function BrandGrid({
  category,
  title,
}: {
  category: "running" | "cycling" | "electronics";
  title?: string;
}) {
  const brands = BRAND_CATALOG.filter((b) => b.category === category);

  return (
    <section className="space-y-4">
      {title ? (
        <h3 className="text-heading-4 text-content-primary">{title}</h3>
      ) : null}
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {brands.map((brand) => (
          <li
            key={brand.id}
            className="flex flex-col items-start gap-2 rounded-xl border border-border-default bg-surface-primary p-4"
          >
            <BrandLogo brand={brand.id} size="md" />
            <span className="text-caption text-content-secondary">{brand.name}</span>
            {!hasBrandLogo(brand.id) ? (
              <span className="text-caption text-content-tertiary">lettermark</span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
