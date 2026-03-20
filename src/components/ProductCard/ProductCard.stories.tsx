import type { Meta, StoryObj } from "@storybook/react";
import {
  ProductCard,
  ProductCardImage,
  ProductCardBadges,
  ProductCardContent,
  ProductCardBrand,
  ProductCardTitle,
  ProductCardPrice,
  ProductCardActions,
} from "./ProductCard";
import { Badge } from "../Badge";
import { Button } from "../Button";

const meta = {
  title: "Components/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Carte produit pour un e-commerce de matériel de running. Composant composable avec image, badges, marque, titre, prix et actions.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Taille de la carte",
    },
    disabled: {
      control: "boolean",
      description: "Produit indisponible (épuisé)",
    },
    href: {
      control: "text",
      description: "Lien vers la page produit",
    },
  },
  args: {
    size: "md",
    disabled: false,
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Placeholder image for running shoes
const RUNNING_SHOE_IMG =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop";

// ── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => (
    <div className="w-72">
      <ProductCard {...args} href="#">
        <ProductCardImage src={RUNNING_SHOE_IMG} alt="Chaussure de running Nike Pegasus">
          <ProductCardBadges>
            <Badge variant="brand" size="sm">
              Promo
            </Badge>
          </ProductCardBadges>
        </ProductCardImage>
        <ProductCardContent>
          <ProductCardBrand>Nike</ProductCardBrand>
          <ProductCardTitle>Pegasus 41</ProductCardTitle>
          <ProductCardPrice price="129,99 €" originalPrice="149,99 €" />
        </ProductCardContent>
      </ProductCard>
    </div>
  ),
};

// ── Sans promo ─────────────────────────────────────────────────────────────

export const SansPromo: Story = {
  render: (args) => (
    <div className="w-72">
      <ProductCard {...args} href="#">
        <ProductCardImage
          src={RUNNING_SHOE_IMG}
          alt="Chaussure de running Asics Gel-Kayano"
        />
        <ProductCardContent>
          <ProductCardBrand>Asics</ProductCardBrand>
          <ProductCardTitle>Gel-Kayano 30</ProductCardTitle>
          <ProductCardPrice price="179,99 €" />
        </ProductCardContent>
      </ProductCard>
    </div>
  ),
};

// ── Avec badges multiples ───────────────────────────────────────────────────

export const AvecBadgesMultiples: Story = {
  render: (args) => (
    <div className="w-72">
      <ProductCard {...args} href="#">
        <ProductCardImage
          src={RUNNING_SHOE_IMG}
          alt="Chaussure de running Saucony Endorphin"
        >
          <ProductCardBadges>
            <Badge variant="success" size="sm">
              Nouveau
            </Badge>
            <Badge variant="brand" size="sm">
              Best-seller
            </Badge>
          </ProductCardBadges>
        </ProductCardImage>
        <ProductCardContent>
          <ProductCardBrand>Saucony</ProductCardBrand>
          <ProductCardTitle>Endorphin Speed 4</ProductCardTitle>
          <ProductCardPrice price="169,99 €" />
        </ProductCardContent>
      </ProductCard>
    </div>
  ),
};

// ── Épuisé ─────────────────────────────────────────────────────────────────

export const Epuise: Story = {
  render: (args) => (
    <div className="w-72">
      <ProductCard {...args} href="#" disabled>
        <ProductCardImage
          src={RUNNING_SHOE_IMG}
          alt="Chaussure de running Hoka Clifton"
        >
          <ProductCardBadges>
            <Badge variant="error" size="sm">
              Épuisé
            </Badge>
          </ProductCardBadges>
        </ProductCardImage>
        <ProductCardContent>
          <ProductCardBrand>Hoka</ProductCardBrand>
          <ProductCardTitle>Clifton 9</ProductCardTitle>
          <ProductCardPrice price="149,99 €" />
        </ProductCardContent>
      </ProductCard>
    </div>
  ),
};

// ── Avec actions (hover) ────────────────────────────────────────────────────

export const AvecActions: Story = {
  render: (args) => (
    <div className="w-72">
      <ProductCard {...args} href="#">
        <ProductCardImage
          src={RUNNING_SHOE_IMG}
          alt="Chaussure de running Brooks Ghost"
        />
        <ProductCardContent>
          <ProductCardBrand>Brooks</ProductCardBrand>
          <ProductCardTitle>Ghost 16</ProductCardTitle>
          <ProductCardPrice price="139,99 €" />
          <ProductCardActions>
            <Button size="sm" fullWidth colorScheme="primary">
              Ajouter au panier
            </Button>
          </ProductCardActions>
        </ProductCardContent>
      </ProductCard>
    </div>
  ),
};

// ── Tailles ────────────────────────────────────────────────────────────────

export const Tailles: Story = {
  render: () => (
    <div className="flex gap-6 flex-wrap">
      <div className="w-56">
        <ProductCard size="sm" href="#">
          <ProductCardImage
            src={RUNNING_SHOE_IMG}
            alt="Chaussure running - petit"
          />
          <ProductCardContent>
            <ProductCardBrand>Nike</ProductCardBrand>
            <ProductCardTitle>Pegasus 41</ProductCardTitle>
            <ProductCardPrice price="129,99 €" />
          </ProductCardContent>
        </ProductCard>
      </div>
      <div className="w-72">
        <ProductCard size="md" href="#">
          <ProductCardImage
            src={RUNNING_SHOE_IMG}
            alt="Chaussure running - moyen"
          />
          <ProductCardContent>
            <ProductCardBrand>Asics</ProductCardBrand>
            <ProductCardTitle>Gel-Kayano 30</ProductCardTitle>
            <ProductCardPrice price="179,99 €" />
          </ProductCardContent>
        </ProductCard>
      </div>
      <div className="w-80">
        <ProductCard size="lg" href="#">
          <ProductCardImage
            src={RUNNING_SHOE_IMG}
            alt="Chaussure running - grand"
          />
          <ProductCardContent>
            <ProductCardBrand>Saucony</ProductCardBrand>
            <ProductCardTitle>Endorphin Speed 4</ProductCardTitle>
            <ProductCardPrice price="169,99 €" />
          </ProductCardContent>
        </ProductCard>
      </div>
    </div>
  ),
  parameters: { layout: "padded" },
};

// ── Grille catalogue running ────────────────────────────────────────────────

export const GrilleCatalogue: Story = {
  render: () => {
    const products = [
      {
        brand: "Nike",
        title: "Pegasus 41",
        price: "129,99 €",
        originalPrice: "149,99 €",
        badge: "Promo" as const,
        variant: "brand" as const,
      },
      {
        brand: "Asics",
        title: "Gel-Kayano 30",
        price: "179,99 €",
        badge: "Nouveau" as const,
        variant: "success" as const,
      },
      {
        brand: "Saucony",
        title: "Endorphin Speed 4",
        price: "169,99 €",
        badge: "Best-seller" as const,
        variant: "brand" as const,
      },
      {
        brand: "Hoka",
        title: "Clifton 9",
        price: "149,99 €",
        badge: null,
        variant: "default" as const,
      },
      {
        brand: "Brooks",
        title: "Ghost 16",
        price: "139,99 €",
        badge: "En stock" as const,
        variant: "info" as const,
      },
      {
        brand: "New Balance",
        title: "FuelCell Rebel v4",
        price: "159,99 €",
        originalPrice: "179,99 €",
        badge: "Promo" as const,
        variant: "brand" as const,
      },
    ];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8 max-w-4xl">
        {products.map((p) => (
          <ProductCard key={`${p.brand}-${p.title}`} href="#" size="md">
            <ProductCardImage
              src={RUNNING_SHOE_IMG}
              alt={`${p.brand} ${p.title}`}
            >
              {p.badge && (
                <ProductCardBadges>
                  <Badge variant={p.variant} size="sm">
                    {p.badge}
                  </Badge>
                </ProductCardBadges>
              )}
            </ProductCardImage>
            <ProductCardContent>
              <ProductCardBrand>{p.brand}</ProductCardBrand>
              <ProductCardTitle>{p.title}</ProductCardTitle>
              <ProductCardPrice
                price={p.price}
                originalPrice={p.originalPrice}
              />
            </ProductCardContent>
          </ProductCard>
        ))}
      </div>
    );
  },
  parameters: { layout: "padded" },
};

// ── Overview ────────────────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8 rounded-2xl bg-surface-primary max-w-4xl">
      <div>
        <h3 className="text-sm font-medium text-content-tertiary uppercase tracking-widest mb-4">
          Variantes
        </h3>
        <div className="flex gap-6 flex-wrap">
          <div className="w-64">
            <ProductCard href="#">
              <ProductCardImage
                src={RUNNING_SHOE_IMG}
                alt="Produit avec promo"
              >
                <ProductCardBadges>
                  <Badge variant="brand" size="sm">
                    Promo
                  </Badge>
                </ProductCardBadges>
              </ProductCardImage>
              <ProductCardContent>
                <ProductCardBrand>Nike</ProductCardBrand>
                <ProductCardTitle>Pegasus 41</ProductCardTitle>
                <ProductCardPrice price="129,99 €" originalPrice="149,99 €" />
              </ProductCardContent>
            </ProductCard>
          </div>
          <div className="w-64">
            <ProductCard href="#">
              <ProductCardImage src={RUNNING_SHOE_IMG} alt="Produit standard" />
              <ProductCardContent>
                <ProductCardBrand>Asics</ProductCardBrand>
                <ProductCardTitle>Gel-Kayano 30</ProductCardTitle>
                <ProductCardPrice price="179,99 €" />
              </ProductCardContent>
            </ProductCard>
          </div>
          <div className="w-64">
            <ProductCard disabled>
              <ProductCardImage src={RUNNING_SHOE_IMG} alt="Produit épuisé">
                <ProductCardBadges>
                  <Badge variant="error" size="sm">
                    Épuisé
                  </Badge>
                </ProductCardBadges>
              </ProductCardImage>
              <ProductCardContent>
                <ProductCardBrand>Hoka</ProductCardBrand>
                <ProductCardTitle>Clifton 9</ProductCardTitle>
                <ProductCardPrice price="149,99 €" />
              </ProductCardContent>
            </ProductCard>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: { layout: "padded" },
};
