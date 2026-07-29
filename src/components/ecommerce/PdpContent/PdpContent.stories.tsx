import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "../../Breadcrumb/Breadcrumb";
import { Badge } from "../../Badge/Badge";
import { Button } from "../../Button/Button";
import { IconButton } from "../../IconButton/IconButton";
import { Avatar } from "../../Avatar/Avatar";
import { Rating } from "../../Rating/Rating";
import { Price } from "../../Price/Price";
import { BrandLogo } from "../../BrandLogo/BrandLogo";
import {
  Tabs,
  TabsList,
  TabsTab,
  TabsPanels,
  TabsPanel,
} from "../../Tabs/Tabs";
import { Separator } from "../../Separator/Separator";
import {
  HeartIcon,
  LockIcon,
  ShareIcon,
  TagIcon,
  TruckIcon,
} from "../../../icons";
import {
  ProductCard,
  ProductCardActions,
  ProductCardBadges,
  ProductCardBrand,
  ProductCardContent,
  ProductCardFavorite,
  ProductCardImage,
  ProductCardPrice,
  ProductCardTitle,
} from "../ProductCard/ProductCard";
import {
  PdpContent,
  PdpContentAttributes,
  PdpContentAttribute,
  PdpContentBreadcrumb,
  PdpContentBuyBox,
  PdpContentBuyPanel,
  PdpContentTitle,
  PdpContentDetails,
  PdpContentGallery,
  PdpContentGalleryColumn,
  PdpContentMobileBar,
  PdpContentSection,
  PdpContentSellerCard,
  PdpContentStickyRegion,
  PdpContentSuggestions,
  PdpContentTrustItem,
  PdpContentTrustList,
} from "./PdpContent";

const meta: Meta = {
  title: "Ecommerce/PdpContent",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Product detail page layout: breadcrumb, **gallery + sticky buy box** hero, full-width details, then related listings. Use `PdpContentDetails` for tabs/description (buy box stays sticky) and `PdpContentSuggestions` for related products (sticky releases above this row).",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&h=1125&fit=crop",
    alt: "Nike ZoomX Vaporfly — vue latérale",
  },
  {
    src: "https://images.unsplash.com/photo-1606107557195-0a74c4788f17?w=900&h=1125&fit=crop",
    alt: "Nike ZoomX Vaporfly — semelle",
  },
  {
    src: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900&h=1125&fit=crop",
    alt: "Nike ZoomX Vaporfly — détail mesh",
  },
  {
    src: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=900&h=1125&fit=crop",
    alt: "Nike ZoomX Vaporfly — paire",
  },
  {
    src: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=900&h=1125&fit=crop",
    alt: "Nike ZoomX Vaporfly — vue dessus",
  },
];

function PdpDemo() {
  return (
    <div className="min-h-screen bg-background-primary py-6 sm:py-10">
      <PdpContent>
        <PdpContentBreadcrumb>
          <Breadcrumb size="sm">
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Accueil</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Chaussures</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Route</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrent>
              Nike ZoomX Vaporfly Next% 3
            </BreadcrumbItem>
          </Breadcrumb>
        </PdpContentBreadcrumb>

        <PdpContentStickyRegion>
          <PdpContentGalleryColumn>
            <PdpContentGallery images={GALLERY_IMAGES} />
          </PdpContentGalleryColumn>

          <PdpContentBuyBox>
            <PdpContentBuyPanel>
              <div className="space-y-3">
                <BrandLogo brand="nike" size="sm" />
                <PdpContentTitle>
                  ZoomX Vaporfly Next% 3 — Rose / Blanc
                </PdpContentTitle>

                <div className="flex flex-wrap items-center gap-2 text-sm text-content-secondary">
                  <Rating value={5} readOnly size="sm" label="Note vendeur" />
                  <span>4,8/5</span>
                  <span className="text-content-tertiary">·</span>
                  <span>Publié il y a 2 jours</span>
                </div>
              </div>

              <Separator />

              <Price
                value={189}
                originalValue={260}
                size="lg"
                layout="horizontal"
                showDiscountBadge
              />

              <div className="flex flex-col gap-3">
                <Button
                  type="button"
                  variant="solid"
                  colorScheme="primary"
                  size="lg"
                  fullWidth
                >
                  Acheter maintenant
                </Button>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    colorScheme="neutral"
                    size="lg"
                    fullWidth
                    startIcon={<TagIcon className="size-5" aria-hidden />}
                  >
                    Faire une offre
                  </Button>
                  <IconButton
                    label="Ajouter aux favoris"
                    variant="outline"
                    colorScheme="neutral"
                    size="lg"
                  >
                    <HeartIcon className="size-5" aria-hidden />
                  </IconButton>
                  <IconButton
                    label="Partager"
                    variant="outline"
                    colorScheme="neutral"
                    size="lg"
                  >
                    <ShareIcon className="size-5" aria-hidden />
                  </IconButton>
                </div>
              </div>

              <PdpContentTrustList>
                <PdpContentTrustItem icon={<TruckIcon />}>
                  Livraison suivie incluse — expédié sous 48 h
                </PdpContentTrustItem>
                <PdpContentTrustItem icon={<LockIcon />}>
                  Paiement sécurisé — fonds bloqués jusqu&apos;à réception
                </PdpContentTrustItem>
              </PdpContentTrustList>

              <Separator />

              <PdpContentAttributes>
                <PdpContentAttribute label="État" value="Très bon état" />
                <PdpContentAttribute label="Taille EU" value="42" />
                <PdpContentAttribute
                  label="Catégorie"
                  value="Chaussures route"
                />
                <PdpContentAttribute label="Kilométrage" value="~120 km" />
              </PdpContentAttributes>

              <PdpContentSellerCard
                name="Marie L."
                subtitle="Paris · Membre depuis 2023"
                avatar={
                  <Avatar
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop"
                    alt="Marie L."
                    size="lg"
                  />
                }
                meta={
                  <div className="flex items-center gap-2 text-xs text-content-secondary">
                    <Rating value={5} readOnly size="sm" label="Note" />
                    <span>(47 avis)</span>
                  </div>
                }
                action={
                  <Button
                    type="button"
                    variant="ghost"
                    colorScheme="neutral"
                    size="sm"
                  >
                    Profil
                  </Button>
                }
              />
            </PdpContentBuyPanel>
          </PdpContentBuyBox>

          <PdpContentDetails>
            <PdpContentSection title={"À propos de l'annonce"}>
              <Tabs defaultValue="description">
                <TabsList variant="line" className="w-full justify-start">
                  <TabsTab value="description">Description</TabsTab>
                  <TabsTab value="specs">Caractéristiques</TabsTab>
                  <TabsTab value="seller">Vendeur</TabsTab>
                </TabsList>
                <TabsPanels className="pt-6">
                  <TabsPanel value="description">
                    <div className="w-full text-content-secondary">
                      <p className="text-body leading-relaxed">
                        Paire de Vaporfly Next% 3 portée uniquement sur 3
                        sorties longues (marathon de Paris + 2 séances tempo).
                        Semelle encore très réactive, upper intact. Vendu car
                        passage à une taille au-dessus.
                      </p>
                      <p className="mt-4 text-body leading-relaxed">
                        Livrée avec boîte d&apos;origine et lacets
                        supplémentaires fournis par Nike.
                      </p>
                    </div>
                  </TabsPanel>
                  <TabsPanel value="specs">
                    <PdpContentAttributes>
                      <PdpContentAttribute label="Drop" value="8 mm" />
                      <PdpContentAttribute label="Poids" value="198 g" />
                      <PdpContentAttribute label="Plaque" value="Carbone" />
                      <PdpContentAttribute
                        label="Usage"
                        value="Compétition route"
                      />
                    </PdpContentAttributes>
                  </TabsPanel>
                  <TabsPanel value="seller">
                    <p className="w-full text-body text-content-secondary">
                      Marie est une coureuse confirmée, 12 annonces vendues sur
                      Runcycl avec un taux de réponse de 98 %. Elle expédie
                      généralement le jour même.
                    </p>
                  </TabsPanel>
                </TabsPanels>
              </Tabs>
            </PdpContentSection>
          </PdpContentDetails>
        </PdpContentStickyRegion>

        <PdpContentSuggestions>
          <PdpContentSection title="Autres annonces de ce vendeur">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
              {[
                {
                  brand: "Garmin",
                  title: "Forerunner 965",
                  price: "349,00 €",
                  img: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop",
                },
                {
                  brand: "Salomon",
                  title: "Sense Ride 5 — 43",
                  price: "79,00 €",
                  img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop",
                },
                {
                  brand: "Craft",
                  title: "Adv Essence 2-in-1",
                  price: "32,00 €",
                  img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
                },
                {
                  brand: "COROS",
                  title: "Pace 3",
                  price: "199,00 €",
                  img: "https://images.unsplash.com/photo-1508685098649-9aacd3260913?w=400&h=300&fit=crop",
                },
              ].map((item) => (
                <ProductCard key={item.title} layout="vertical" size="md">
                  <ProductCardImage src={item.img} alt={item.title}>
                    <ProductCardBadges>
                      <Badge variant="success" size="sm">
                        Dispo
                      </Badge>
                    </ProductCardBadges>
                    <ProductCardFavorite>
                      <IconButton
                        label="Favoris"
                        size="sm"
                        variant="outline"
                        colorScheme="neutral"
                      >
                        <HeartIcon className="size-4" aria-hidden />
                      </IconButton>
                    </ProductCardFavorite>
                  </ProductCardImage>
                  <ProductCardContent>
                    <ProductCardBrand>{item.brand}</ProductCardBrand>
                    <ProductCardTitle>{item.title}</ProductCardTitle>
                    <ProductCardPrice price={item.price} />
                  </ProductCardContent>
                </ProductCard>
              ))}
            </div>
          </PdpContentSection>
        </PdpContentSuggestions>
      </PdpContent>

      <PdpContentMobileBar
        price={
          <Price
            value={189}
            originalValue={260}
            size="md"
            layout="horizontal"
          />
        }
        action={
          <Button
            type="button"
            variant="solid"
            colorScheme="primary"
            size="lg"
            fullWidth
          >
            Acheter
          </Button>
        }
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <PdpDemo />,
};

export const GalleryOnly: Story = {
  name: "Gallery",
  parameters: { layout: "padded" },
  render: () => (
    <div className="mx-auto max-w-2xl rounded-2xl bg-background-primary p-6">
      <PdpContentGallery images={GALLERY_IMAGES} defaultSelectedIndex={0} />
    </div>
  ),
};

export const BuyPanelOnly: Story = {
  name: "Buy panel",
  parameters: { layout: "padded" },
  render: () => (
    <div className="mx-auto max-w-md bg-background-primary p-6">
      <PdpContentBuyPanel>
        <PdpContentTitle>ZoomX Vaporfly Next% 3</PdpContentTitle>
        <Price
          value={189}
          originalValue={260}
          size="lg"
          layout="horizontal"
          showDiscountBadge
        />
        <Button
          type="button"
          variant="solid"
          colorScheme="primary"
          size="lg"
          fullWidth
        >
          Acheter maintenant
        </Button>
      </PdpContentBuyPanel>
    </div>
  ),
};
