import * as React from "react";
import { createPortal } from "react-dom";
import {
  ProductCard,
  ProductCardBrand,
  ProductCardContent,
  ProductCardImage,
  ProductCardPrice,
  ProductCardTitle,
} from "../ProductCard/ProductCard";
import {
  EcommerceSearchInput,
  type EcommerceSearchInputProps,
} from "./EcommerceSearchInput";

// ── Types ──────────────────────────────────────────────────────────────────

export interface EcommerceSearchResultItem {
  id?: string;
  title: string;
  brand: string;
  price: string;
  originalPrice?: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
  /** Optional category label — included in default text search */
  category?: string;
}

export interface EcommerceNavigationSearchProps
  extends Omit<
    EcommerceSearchInputProps,
    "role" | "aria-expanded" | "aria-controls" | "aria-autocomplete"
  > {
  /** Static product list — filtered by query when provided */
  suggestions?: readonly EcommerceSearchResultItem[];
  /** Custom filter — overrides default matching on `suggestions` */
  getSuggestions?: (query: string) => EcommerceSearchResultItem[];
  /** Called when the shopper selects a product */
  onResultSelect?: (item: EcommerceSearchResultItem) => void;
  /** Shown when the query has no matches */
  emptyMessage?: (query: string) => React.ReactNode;
  /** Heading above the results list */
  resultsHeading?: (query: string) => React.ReactNode;
  /** Max items in the dropdown */
  maxResults?: number;
  /** Horizontal product card size in the results panel */
  resultSize?: "sm" | "md";
}

// ── Helpers ────────────────────────────────────────────────────────────────

function defaultFilter(
  items: readonly EcommerceSearchResultItem[],
  query: string,
  maxResults: number,
): EcommerceSearchResultItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return items
    .filter((item) => {
      const haystack = [item.title, item.brand, item.category]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    })
    .slice(0, maxResults);
}

function SearchResultProductCard({
  item,
  size,
}: {
  item: EcommerceSearchResultItem;
  size: "sm" | "md";
}) {
  return (
    <ProductCard
      layout="horizontal"
      size={size}
      variant="ghost"
      href={item.href ?? "#"}
    >
      <ProductCardImage src={item.imageSrc} alt={item.imageAlt} />
      <ProductCardContent>
        <ProductCardBrand>{item.brand}</ProductCardBrand>
        <ProductCardTitle>{item.title}</ProductCardTitle>
        <ProductCardPrice
          price={item.price}
          originalPrice={item.originalPrice}
        />
      </ProductCardContent>
    </ProductCard>
  );
}

// ── Component ──────────────────────────────────────────────────────────────

/**
 * Storefront nav search: focuses the field on click, dims + blurs the full
 * viewport (including the nav header), and shows horizontal product cards in a
 * dropdown anchored to the input via a portal.
 */
export const EcommerceNavigationSearch = React.forwardRef<
  HTMLInputElement,
  EcommerceNavigationSearchProps
>(function EcommerceNavigationSearch(
  {
    suggestions,
    getSuggestions,
    onResultSelect,
    emptyMessage = (query) => <>Aucun résultat pour « {query} »</>,
    resultsHeading = (query) => <>Résultats pour « {query} »</>,
    maxResults = 8,
    resultSize = "sm",
    className,
    value: valueProp,
    defaultValue,
    onChange,
    onFocus,
    onKeyDown,
    ...inputProps
  },
  ref,
) {
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listId = React.useId();
  const portalId = `nav-search-portal-${listId.replace(/:/g, "")}`;
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [anchorRect, setAnchorRect] = React.useState<DOMRect | null>(null);

  const isControlled = valueProp !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(() =>
    String(defaultValue ?? ""),
  );
  const query = isControlled ? String(valueProp ?? "") : uncontrolledValue;
  const trimmed = query.trim();

  React.useEffect(() => setMounted(true), []);

  const mergedInputRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref],
  );

  const syncAnchorRect = React.useCallback(() => {
    const el = anchorRef.current;
    if (!el) return;
    setAnchorRect(el.getBoundingClientRect());
  }, []);

  const filtered = React.useMemo(() => {
    if (getSuggestions) return getSuggestions(query).slice(0, maxResults);
    if (suggestions) return defaultFilter(suggestions, query, maxResults);
    return [];
  }, [getSuggestions, suggestions, query, maxResults]);

  const showResults = trimmed.length > 0 && filtered.length > 0;
  const showEmpty = trimmed.length > 0 && filtered.length === 0;
  const panelOpen = open && (showResults || showEmpty);

  const close = React.useCallback(() => {
    setOpen(false);
  }, []);

  React.useLayoutEffect(() => {
    syncAnchorRect();

    const onResize = () => syncAnchorRect();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, true);

    const ro = anchorRef.current
      ? new ResizeObserver(() => syncAnchorRect())
      : null;
    if (anchorRef.current && ro) {
      ro.observe(anchorRef.current);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize, true);
      ro?.disconnect();
    };
  }, [syncAnchorRect]);

  React.useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      const portal = document.getElementById(portalId);
      if (portal?.contains(target)) return;
      close();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        inputRef.current?.blur();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close, portalId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledValue(event.target.value);
    }
    setOpen(true);
    onChange?.(event);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setOpen(true);
    onFocus?.(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    onKeyDown?.(event);
  };

  const selectResult = (item: EcommerceSearchResultItem) => {
    if (!item.href) {
      if (!isControlled) {
        setUncontrolledValue(item.title);
      }
      const input = inputRef.current;
      if (input) {
        input.value = item.title;
        const changeEvent = {
          target: input,
          currentTarget: input,
        } as React.ChangeEvent<HTMLInputElement>;
        Object.defineProperty(changeEvent.target, "value", {
          value: item.title,
          configurable: true,
        });
        onChange?.(changeEvent);
      }
    }
    onResultSelect?.(item);
    close();
  };

  const resultsPanel = panelOpen ? (
    <div
      className={[
        "absolute left-0 right-0 top-full z-50 mt-1.5 w-full",
        "overflow-hidden rounded-xl border border-border-default",
        "bg-surface-primary shadow-lg",
      ].join(" ")}
    >
      <p className="m-0 border-b border-border-default px-4 py-2.5 text-sm font-medium text-content-primary">
        {resultsHeading(trimmed)}
      </p>

      {showResults ? (
        <ul
          id={listId}
          role="list"
          aria-label="Résultats de recherche"
          className="m-0 max-h-[min(24rem,70vh)] list-none overflow-y-auto p-2"
        >
          {filtered.map((item) => (
            <li
              key={item.id ?? item.title}
              className="p-1"
              onClick={() => selectResult(item)}
            >
              <SearchResultProductCard item={item} size={resultSize} />
            </li>
          ))}
        </ul>
      ) : null}

      {showEmpty ? (
        <p className="m-0 px-4 py-3 text-sm text-content-tertiary">
          {emptyMessage(trimmed)}
        </p>
      ) : null}
    </div>
  ) : null;

  const overlay =
    open && mounted
      ? createPortal(
          <div
            className={[
              "fixed inset-0 z-100",
              "bg-surface-overlay/55 backdrop-blur-md",
              "transition-opacity duration-200",
            ].join(" ")}
            aria-hidden
            onMouseDown={(event) => {
              event.preventDefault();
              close();
              inputRef.current?.blur();
            }}
          />,
          document.body,
        )
      : null;

  const portaledSearch =
    mounted && anchorRect
      ? createPortal(
          <div
            id={portalId}
            className={open ? "fixed z-110" : "fixed z-40"}
            style={{
              top: anchorRect.top,
              left: anchorRect.left,
              width: anchorRect.width,
            }}
          >
            <EcommerceSearchInput
              ref={mergedInputRef}
              role="combobox"
              aria-autocomplete="list"
              aria-controls={panelOpen ? listId : undefined}
              aria-expanded={panelOpen}
              className="min-w-0 w-full"
              value={isControlled ? valueProp : undefined}
              defaultValue={isControlled ? undefined : defaultValue}
              onChange={handleChange}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              {...inputProps}
            />
            {resultsPanel}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      {overlay}
      {portaledSearch}
      <div
        ref={anchorRef}
        className={["relative min-w-0", className].filter(Boolean).join(" ")}
        aria-hidden
      >
        <div className="min-h-10 w-full pointer-events-none" />
      </div>
    </>
  );
});

EcommerceNavigationSearch.displayName = "EcommerceNavigationSearch";
