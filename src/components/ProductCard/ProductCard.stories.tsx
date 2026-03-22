import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ProductCard,
  ProductCardImage,
  ProductCardBadges,
  ProductCardFavorite,
  ProductCardContent,
  ProductCardBrand,
  ProductCardTitle,
  ProductCardPrice,
  ProductCardActions,
} from "./ProductCard";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { RiHeartLine } from "react-icons/ri";

const meta = {
  title: "Components/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Product card for running-gear e-commerce. Composable slots: image, **ProductCardBadges** (top-left), **ProductCardFavorite** (top-right overlay for icon-only actions e.g. favorites), brand, title, price, and optional **ProductCardActions**. Use `layout="vertical"` (default) for grid tiles, or `layout="horizontal"` for dense rows. Use `href` to render the whole card as a link, or omit it for a non-clickable `<article>`. Set `disabled` for out-of-stock listings.',
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description:
        "Card size (image area and title typography scale with size)",
    },
    disabled: {
      control: "boolean",
      description:
        "Unavailable product (out of stock)—dims the card and disables link behavior when using href",
    },
    href: {
      control: "text",
      description:
        "Optional product page URL; when set, the root renders as `<a>`",
    },
    layout: {
      control: "select",
      options: ["vertical", "horizontal"],
      description:
        "`vertical` = image on top; `horizontal` = square thumbnail left, details right",
    },
  },
  args: {
    size: "md",
    disabled: false,
    layout: "vertical",
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const RUNNING_SHOE_IMG =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop";

/** Favorite control — used on all vertical layout stories. */
function CardFavoriteButton() {
  return (
    <ProductCardFavorite>
      <IconButton
        label="Add to favorites"
        size="sm"
        variant="outline"
        colorScheme="neutral"
      >
        <RiHeartLine className="h-4 w-4" aria-hidden />
      </IconButton>
    </ProductCardFavorite>
  );
}

// ── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default layout with a promo badge, brand, two-line title area, and sale pricing (current + strikethrough).",
      },
    },
  },
  render: (args) => (
    <div className="w-72">
      <ProductCard {...args} href="#">
        <ProductCardImage
          src={RUNNING_SHOE_IMG}
          alt="Nike Pegasus running shoe"
        >
          <ProductCardBadges>
            <Badge variant="brand" size="sm">
              Promo
            </Badge>
          </ProductCardBadges>
          <CardFavoriteButton />
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

// ── Without promo ───────────────────────────────────────────────────────────

export const WithoutPromo: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "No badge overlay; single price line. Use this for catalog rows without campaigns.",
      },
    },
  },
  render: (args) => (
    <div className="w-72">
      <ProductCard {...args} href="#">
        <ProductCardImage
          src={RUNNING_SHOE_IMG}
          alt="Asics Gel-Kayano running shoe"
        >
          <CardFavoriteButton />
        </ProductCardImage>
        <ProductCardContent>
          <ProductCardBrand>Asics</ProductCardBrand>
          <ProductCardTitle>Gel-Kayano 30</ProductCardTitle>
          <ProductCardPrice price="179,99 €" />
        </ProductCardContent>
      </ProductCard>
    </div>
  ),
};

// ── Multiple badges ───────────────────────────────────────────────────────────

export const MultipleBadges: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "**ProductCardBadges** stacks multiple `Badge` components in the top-left of the image.",
      },
    },
  },
  render: (args) => (
    <div className="w-72">
      <ProductCard {...args} href="#">
        <ProductCardImage
          src={RUNNING_SHOE_IMG}
          alt="Saucony Endorphin running shoe"
        >
          <ProductCardBadges>
            <Badge variant="success" size="sm">
              New
            </Badge>
            <Badge variant="brand" size="sm">
              Best seller
            </Badge>
          </ProductCardBadges>
          <CardFavoriteButton />
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

// ── Out of stock ─────────────────────────────────────────────────────────────

export const OutOfStock: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`disabled` applies reduced opacity and `pointer-events: none` on the card. Pair with an error badge in the image slot.",
      },
    },
  },
  render: (args) => (
    <div className="w-72">
      <ProductCard {...args} href="#" disabled>
        <ProductCardImage
          src={RUNNING_SHOE_IMG}
          alt="Hoka Clifton running shoe"
        >
          <ProductCardBadges>
            <Badge variant="error" size="sm">
              Out of stock
            </Badge>
          </ProductCardBadges>
          <CardFavoriteButton />
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

// ── With actions ─────────────────────────────────────────────────────────────

export const WithActions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "**ProductCardFavorite** pins an **IconButton** (e.g. heart) to the **top-right of the image**. **ProductCardActions** holds the primary CTA (Add to cart) below the price.",
      },
    },
  },
  render: (args) => (
    <div className="w-72">
      <ProductCard {...args} href="#">
        <ProductCardImage
          src={RUNNING_SHOE_IMG}
          alt="Brooks Ghost running shoe"
        >
          <CardFavoriteButton />
        </ProductCardImage>
        <ProductCardContent>
          <ProductCardBrand>Brooks</ProductCardBrand>
          <ProductCardTitle>Ghost 16</ProductCardTitle>
          <ProductCardPrice price="139,99 €" />
          <ProductCardActions>
            <Button size="sm" fullWidth colorScheme="primary">
              Add to cart
            </Button>
          </ProductCardActions>
        </ProductCardContent>
      </ProductCard>
    </div>
  ),
};

// ── Horizontal ──────────────────────────────────────────────────────────────

export const Horizontal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`layout="horizontal"` — fixed-width image column on the left (**full height** of the card, `object-cover`), text on the right. Good for lists and cart rows.',
      },
    },
  },
  args: {
    layout: "horizontal",
  },
  render: (args) => (
    <div className="w-full max-w-xl">
      <ProductCard {...args} href="#">
        <ProductCardImage
          src={RUNNING_SHOE_IMG}
          alt="Brooks Ghost running shoe"
        >
          <ProductCardBadges>
            <Badge variant="brand" size="sm">
              Sale
            </Badge>
          </ProductCardBadges>
        </ProductCardImage>
        <ProductCardContent>
          <ProductCardBrand>Brooks</ProductCardBrand>
          <ProductCardTitle>
            Ghost 16 — Men&apos;s cushioning daily trainer
          </ProductCardTitle>
          <ProductCardPrice price="139,99 €" originalPrice="159,99 €" />
        </ProductCardContent>
      </ProductCard>
    </div>
  ),
};

export const HorizontalWithActions: Story = {
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Horizontal card: **ProductCardFavorite** on the **top-right of the image**; **ProductCardActions** uses `mt-auto` for **Add to cart** at the bottom of the text column.",
      },
    },
  },
  args: {
    layout: "horizontal",
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <ProductCard {...args} href="#">
        <ProductCardImage
          src={RUNNING_SHOE_IMG}
          alt="Nike Pegasus running shoe"
        >
          <CardFavoriteButton />
        </ProductCardImage>
        <ProductCardContent>
          <ProductCardBrand>Nike</ProductCardBrand>
          <ProductCardTitle>Pegasus 41</ProductCardTitle>
          <ProductCardPrice price="129,99 €" />
          <ProductCardActions>
            <Button size="sm" colorScheme="primary" fullWidth>
              Add to cart
            </Button>
          </ProductCardActions>
        </ProductCardContent>
      </ProductCard>
    </div>
  ),
};

//  ── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Compare `sm`, `md`, and `lg`: corner radius and title size follow the `size` prop on **ProductCard**.",
      },
    },
  },
  render: () => (
    <div className="flex gap-6 flex-wrap">
      <div className="w-56">
        <ProductCard size="sm" href="#">
          <ProductCardImage
            src={RUNNING_SHOE_IMG}
            alt="Running shoe — small card"
          >
            <CardFavoriteButton />
          </ProductCardImage>
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
            alt="Running shoe — medium card"
          >
            <CardFavoriteButton />
          </ProductCardImage>
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
            alt="Running shoe — large card"
          >
            <CardFavoriteButton />
          </ProductCardImage>
          <ProductCardContent>
            <ProductCardBrand>Saucony</ProductCardBrand>
            <ProductCardTitle>Endorphin Speed 4</ProductCardTitle>
            <ProductCardPrice price="169,99 €" />
          </ProductCardContent>
        </ProductCard>
      </div>
    </div>
  ),
};

// ── Catalog grid ──────────────────────────────────────────────────────────────

export const CatalogGrid: Story = {
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Responsive grid of cards mixing promo, new, in-stock, and no-badge examples—typical PLP (product listing page) preview.",
      },
    },
  },
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
        badge: "New" as const,
        variant: "success" as const,
      },
      {
        brand: "Saucony",
        title: "Endorphin Speed 4",
        price: "169,99 €",
        badge: "Best seller" as const,
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
        badge: "In stock" as const,
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
              <CardFavoriteButton />
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
};

// ── Overview ────────────────────────────────────────────────────────────────

export const Overview: Story = {
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Quick comparison: promo vs standard vs disabled card in a single padded canvas.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8 rounded-2xl bg-surface-primary max-w-4xl">
      <div>
        <h3 className="text-sm font-medium text-content-tertiary uppercase tracking-widest mb-4">
          Variants
        </h3>
        <div className="flex gap-6 flex-wrap">
          <div className="w-64">
            <ProductCard href="#">
              <ProductCardImage
                src={RUNNING_SHOE_IMG}
                alt="Product with promo badge"
              >
                <ProductCardBadges>
                  <Badge variant="brand" size="sm">
                    Promo
                  </Badge>
                </ProductCardBadges>
                <CardFavoriteButton />
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
              <ProductCardImage src={RUNNING_SHOE_IMG} alt="Standard product">
                <CardFavoriteButton />
              </ProductCardImage>
              <ProductCardContent>
                <ProductCardBrand>Asics</ProductCardBrand>
                <ProductCardTitle>Gel-Kayano 30</ProductCardTitle>
                <ProductCardPrice price="179,99 €" />
              </ProductCardContent>
            </ProductCard>
          </div>
          <div className="w-64">
            <ProductCard disabled>
              <ProductCardImage
                src={RUNNING_SHOE_IMG}
                alt="Out of stock product"
              >
                <ProductCardBadges>
                  <Badge variant="error" size="sm">
                    Out of stock
                  </Badge>
                </ProductCardBadges>
                <CardFavoriteButton />
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
};
