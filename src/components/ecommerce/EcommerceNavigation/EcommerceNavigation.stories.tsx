import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  RiArrowRightSLine,
  RiSearchLine,
  RiShoppingCart2Line,
  RiUser3Line,
} from "react-icons/ri";
import { Button } from "../../Button/Button";
import { IconButton } from "../../IconButton/IconButton";
import { Logo } from "../../Logo/Logo";
import {
  EcommerceNavigation,
  EcommerceNavigationMegaViewport,
  EcommerceNavigationMenu,
  EcommerceNavigationMenuContent,
  EcommerceNavigationMenuItem,
  EcommerceNavigationMenuLink,
  EcommerceNavigationMenuList,
  EcommerceNavigationMenuTrigger,
} from "./EcommerceNavigation";
import { Badge } from "../../Badge/Badge";
import { NotificationBadge } from "../../NotificationBadge/NotificationBadge";

const shoesLinks = [
  {
    href: "#",
    title: "Road",
    desc: "Pre-loved road shoes and carbon plates",
  },
  {
    href: "#",
    title: "Trail & skyrunning",
    desc: "Lugs, aggressive outsoles, skyracing models",
  },
  {
    href: "#",
    title: "Track & race",
    desc: "Spikes, lightweight session shoes",
  },
  {
    href: "#",
    title: "By brand",
    desc: "Nike, Saucony, Asics, Hoka, New Balance…",
  },
] as const;

const apparelLinks = [
  {
    href: "#",
    title: "Tops",
    desc: "Technical tees, tanks, mid-layers",
  },
  {
    href: "#",
    title: "Tights & shorts",
    desc: "Winter / summer, trail, compression",
  },
  {
    href: "#",
    title: "Jackets & wind shells",
    desc: "Breathable waterproofs, light insulation",
  },
  {
    href: "#",
    title: "Base layers",
    desc: "Merino, synthetic, first layer",
  },
] as const;

const accessoriesLinks = [
  {
    href: "#",
    title: "GPS watches & heart rate",
    desc: "Garmin, Coros, Polar — running",
  },
  {
    href: "#",
    title: "Cycling GPS & bike computers",
    desc: "Garmin Edge, Wahoo, refurbished head units",
  },
  {
    href: "#",
    title: "HR straps & sensors",
    desc: "Heart rate belts, foot pods, power meters",
  },
  {
    href: "#",
    title: "Packs & hydration",
    desc: "Bottle belts, trail vests, flasks",
  },
] as const;

function MegaLinkGrid({
  items,
}: {
  items: readonly { href: string; title: string; desc: string }[];
}) {
  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2 lg:grid-cols-2">
      {items.map((item) => (
        <li key={item.title}>
          <EcommerceNavigationMenuLink
            href={item.href}
            className="px-3 py-2.5 sm:px-4 sm:py-3"
          >
            <span className="block text-sm font-medium text-content-primary">
              {item.title}
            </span>
            <span className="mt-0.5 block text-xs text-content-tertiary">
              {item.desc}
            </span>
          </EcommerceNavigationMenuLink>
        </li>
      ))}
    </ul>
  );
}

/** Promo aside shown next to shoe links on desktop mega menu and below links in the mobile drawer. */
function ShoesNavAsideCard({ className }: { className?: string }) {
  return (
    <div
      className={["rounded-xl bg-surface-secondary p-4", className]
        .filter(Boolean)
        .join(" ")}
    >
      <h3 className="m-0 text-sm font-medium text-content-primary">
        Sizing & condition
      </h3>
      <p className="mt-1 text-xs text-content-secondary">
        Every listing shows wear and shoe width so you can buy with confidence.
      </p>
      <Button
        type="button"
        variant="outline"
        colorScheme="neutral"
        size="sm"
        className="mt-4 w-full"
      >
        Read the guide
      </Button>
    </div>
  );
}

function MobileLinkList({
  items,
}: {
  items: readonly { href: string; title: string; desc: string }[];
}) {
  return (
    <ul className="m-0 list-none p-0">
      {items.map((item) => (
        <li key={item.title}>
          <a
            href={item.href}
            className={[
              "block rounded-lg px-4 py-3.5 no-underline outline-none transition-colors",
              "hover:bg-surface-hover focus-visible:relative focus-visible:ring-2",
              "focus-visible:ring-border-focus focus-visible:ring-offset-2",
              "focus-visible:ring-offset-surface-primary",
            ].join(" ")}
          >
            <span className="block text-sm font-medium text-content-primary">
              {item.title}
            </span>
            <span className="mt-0.5 block text-xs text-content-tertiary">
              {item.desc}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

const mobileSections = [
  { id: "shoes" as const, label: "Shoes", items: shoesLinks },
  { id: "apparel" as const, label: "Apparel", items: apparelLinks },
  {
    id: "accessories" as const,
    label: "Accessories & tech",
    items: accessoriesLinks,
  },
];

type MobileSectionId = (typeof mobileSections)[number]["id"];

const mobileRootRowClass = [
  "flex w-full items-center justify-between gap-2 rounded-lg px-4 py-3.5 text-left text-sm font-medium",
  "text-content-primary no-underline outline-none transition-colors hover:bg-surface-hover",
  "focus-visible:relative focus-visible:ring-2 focus-visible:ring-border-focus",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary",
].join(" ");

const breadcrumbLinkClass = [
  "inline-block rounded-md px-2 py-1.5 text-content-secondary no-underline outline-none transition-colors",
  "hover:bg-surface-hover hover:text-content-primary hover:no-underline",
  "focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
  "focus-visible:ring-offset-surface-primary",
].join(" ");

/** Same IA as the mega menu: drill-down with breadcrumb (small viewports). */
function MobileNavPanel() {
  const [section, setSection] = React.useState<MobileSectionId | null>(null);

  const active = section
    ? mobileSections.find((s) => s.id === section)
    : null;

  return (
    <div>
      {active ? (
        <nav aria-label="Breadcrumb" className="mb-3 text-sm">
          <ol className="m-0 flex flex-wrap items-center gap-x-1.5 gap-y-1 px-1 py-0">
            <li className="flex min-w-0 items-center">
              <a
                href="#"
                className={breadcrumbLinkClass}
                onClick={(e) => {
                  e.preventDefault();
                  setSection(null);
                }}
              >
                Menu
              </a>
            </li>
            <li aria-hidden className="shrink-0 select-none text-content-tertiary">
              /
            </li>
            <li className="min-w-0 px-2 py-1.5 font-medium text-content-primary">
              <span aria-current="page">{active.label}</span>
            </li>
          </ol>
        </nav>
      ) : null}

      <nav aria-label="Main navigation">
        {active ? (
          active.id === "shoes" ? (
            <div className="flex flex-col">
              <MobileLinkList items={active.items} />
              <ShoesNavAsideCard className="mt-5 w-full" />
            </div>
          ) : (
            <MobileLinkList items={active.items} />
          )
        ) : (
          <div className="flex flex-col gap-1">
            <ul className="m-0 list-none p-0">
              {mobileSections.map((s) => (
                <li key={s.id}>
                  <a
                    href="#"
                    className={mobileRootRowClass}
                    onClick={(e) => {
                      e.preventDefault();
                      setSection(s.id);
                    }}
                  >
                    {s.label}
                    <RiArrowRightSLine
                      className="h-4 w-4 shrink-0 text-content-tertiary"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className={[
                "flex items-center rounded-lg px-4 py-3.5 text-sm font-medium text-content-brand",
                "no-underline outline-none transition-colors hover:bg-surface-hover",
                "focus-visible:relative focus-visible:ring-2 focus-visible:ring-border-focus",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary",
              ].join(" ")}
            >
              Deals
              <Badge variant="brand" size="sm" className="ml-2">
                New
              </Badge>
            </a>
          </div>
        )}
      </nav>
    </div>
  );
}

const meta = {
  title: "Ecommerce/Navigation",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Storefront header for a **second-hand running gear** marketplace (shoes, apparel, accessories & electronics). Built on [Base UI Navigation Menu](https://base-ui.com/react/components/navigation-menu). Compose `EcommerceNavigationMenu*` and place `EcommerceNavigationMegaViewport` once next to the list. Pass `mobileMenu` for a left drawer below `lg` (demo uses breadcrumb drill-down); the desktop mega menu stays for `lg` and up.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="min-h-[480px] bg-background-primary">
      <EcommerceNavigation
        brand={
          <a
            href="#"
            className="flex shrink-0 items-center rounded-lg no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            <Logo size="sm" aria-label="Runswap — Home" />
          </a>
        }
        mobileMenu={<MobileNavPanel />}
        menu={
          <EcommerceNavigationMenu>
            <EcommerceNavigationMenuList>
              <EcommerceNavigationMenuItem value="shoes">
                <EcommerceNavigationMenuTrigger>
                  Shoes
                </EcommerceNavigationMenuTrigger>
                <EcommerceNavigationMenuContent>
                  <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
                    <div className="min-w-0 flex-1">
                      <h2 className="m-0 mb-3 font-heading text-xl font-semibold text-content-primary">
                        Pre-loved running shoes
                      </h2>
                      <MegaLinkGrid items={shoesLinks} />
                    </div>
                    <div className="hidden w-52 shrink-0 lg:block">
                      <ShoesNavAsideCard />
                    </div>
                  </div>
                </EcommerceNavigationMenuContent>
              </EcommerceNavigationMenuItem>

              <EcommerceNavigationMenuItem value="apparel">
                <EcommerceNavigationMenuTrigger>
                  Apparel
                </EcommerceNavigationMenuTrigger>
                <EcommerceNavigationMenuContent>
                  <h2 className="m-0 mb-3 font-heading text-xl font-semibold text-content-primary">
                    Second-hand technical kit
                  </h2>
                  <MegaLinkGrid items={apparelLinks} />
                </EcommerceNavigationMenuContent>
              </EcommerceNavigationMenuItem>

              <EcommerceNavigationMenuItem value="accessories">
                <EcommerceNavigationMenuTrigger>
                  Accessories & tech
                </EcommerceNavigationMenuTrigger>
                <EcommerceNavigationMenuContent>
                  <h2 className="m-0 mb-3 font-heading text-xl font-semibold text-content-primary">
                    GPS, heart rate, cycling & more
                  </h2>
                  <MegaLinkGrid items={accessoriesLinks} />
                </EcommerceNavigationMenuContent>
              </EcommerceNavigationMenuItem>

              <EcommerceNavigationMenuItem value="deals">
                <EcommerceNavigationMenuLink
                  href="#"
                  className="inline-flex h-9 items-center px-2.5 text-sm font-medium text-content-brand"
                >
                  Deals
                  <Badge variant="brand" size="sm" className="ml-2">
                    New
                  </Badge>
                </EcommerceNavigationMenuLink>
              </EcommerceNavigationMenuItem>
            </EcommerceNavigationMenuList>
            <EcommerceNavigationMegaViewport />
          </EcommerceNavigationMenu>
        }
        utilities={
          <>
            <IconButton
              label="Search"
              variant="ghost"
              colorScheme="neutral"
              size="sm"
            >
              <RiSearchLine className="h-5 w-5" />
            </IconButton>
            <IconButton
              label="Account"
              variant="ghost"
              colorScheme="neutral"
              size="sm"
            >
              <RiUser3Line className="h-5 w-5" />
            </IconButton>
            <span className="relative inline-flex">
              <IconButton
                label="Cart, 3 items"
                variant="ghost"
                colorScheme="neutral"
                size="sm"
              >
                <RiShoppingCart2Line className="h-5 w-5" />
              </IconButton>
              <NotificationBadge
                count={3}
                className="absolute -right-0.5 -top-0.5 z-10"
                aria-hidden
              />
            </span>
          </>
        }
      />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm text-content-secondary">
          Page content — on wide screens, hover nav items for the mega menu; on
          narrow screens, use the menu control next to the logo.
        </p>
      </main>
    </div>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <div className="min-h-[360px] bg-background-primary">
      <EcommerceNavigation
        brand={
          <a
            href="#"
            className="flex shrink-0 items-center rounded-lg no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            <Logo size="sm" aria-label="Runswap — Home" />
          </a>
        }
        menu={
          <EcommerceNavigationMenu>
            <EcommerceNavigationMenuList>
              <EcommerceNavigationMenuItem value="accessories-tech">
                <EcommerceNavigationMenuTrigger>
                  Accessories & tech
                </EcommerceNavigationMenuTrigger>
                <EcommerceNavigationMenuContent>
                  <h2 className="m-0 mb-3 font-heading text-xs font-semibold uppercase tracking-wider text-content-tertiary">
                    Pre-owned electronics & sensors
                  </h2>
                  <MegaLinkGrid items={accessoriesLinks} />
                </EcommerceNavigationMenuContent>
              </EcommerceNavigationMenuItem>
            </EcommerceNavigationMenuList>
            <EcommerceNavigationMegaViewport showArrow />
          </EcommerceNavigationMenu>
        }
      />
    </div>
  ),
};
