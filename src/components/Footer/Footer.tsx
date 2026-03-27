import * as React from "react";

// ── Types ──────────────────────────────────────────────────────────────────

export type FooterVariant = "default" | "brand" | "inverse";

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual style variant — default uses background-secondary, brand uses background-brand, inverse uses a dark background */
  variant?: FooterVariant;
  children?: React.ReactNode;
  /** Additional CSS classes applied to the `<footer>` element */
  className?: string;
}

export interface FooterContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export interface FooterSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export interface FooterSectionTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export interface FooterLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export interface FooterBottomProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

// ── Context ────────────────────────────────────────────────────────────────

interface FooterContextValue {
  variant: FooterVariant;
}

const FooterContext = React.createContext<FooterContextValue>({
  variant: "default",
});

function useFooter() {
  return React.useContext(FooterContext);
}

// ── Style maps ─────────────────────────────────────────────────────────────

const variantClasses: Record<FooterVariant, string> = {
  default: "bg-background-secondary text-content-primary",
  brand: "bg-background-brand text-content-inverse",
  inverse: "bg-background-inverse text-content-inverse",
};

const sectionTitleVariantClasses: Record<FooterVariant, string> = {
  default: "text-content-primary",
  brand: "text-content-inverse",
  inverse: "text-content-inverse",
};

const linkVariantClasses: Record<FooterVariant, string> = {
  default: "text-content-secondary hover:text-content-primary",
  brand: "text-content-inverse/70 hover:text-content-inverse",
  inverse: "text-content-inverse/70 hover:text-content-inverse",
};

const dividerVariantClasses: Record<FooterVariant, string> = {
  default: "border-border-subtle",
  brand: "border-border-subtle/30",
  inverse: "border-border-subtle/30",
};

// ── Footer (root) ──────────────────────────────────────────────────────────

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  function Footer({ variant = "default", className, children, ...props }, ref) {
    const ctx = React.useMemo<FooterContextValue>(
      () => ({ variant }),
      [variant],
    );

    return (
      <FooterContext.Provider value={ctx}>
        <footer
          ref={ref}
          className={["w-full", variantClasses[variant], className]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {children}
        </footer>
      </FooterContext.Provider>
    );
  },
);

Footer.displayName = "Footer";

// ── FooterContent ──────────────────────────────────────────────────────────

export const FooterContent = React.forwardRef<
  HTMLDivElement,
  FooterContentProps
>(function FooterContent({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={[
        "mx-auto px-6 py-12",
        "grid grid-cols-1 gap-8",
        "sm:grid-cols-2 lg:grid-cols-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
});

FooterContent.displayName = "FooterContent";

// ── FooterSection ──────────────────────────────────────────────────────────

export const FooterSection = React.forwardRef<
  HTMLDivElement,
  FooterSectionProps
>(function FooterSection({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={["flex flex-col gap-3", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
});

FooterSection.displayName = "FooterSection";

// ── FooterSectionTitle ─────────────────────────────────────────────────────

export const FooterSectionTitle = React.forwardRef<
  HTMLHeadingElement,
  FooterSectionTitleProps
>(function FooterSectionTitle({ className, children, ...props }, ref) {
  const { variant } = useFooter();

  return (
    <h3
      ref={ref}
      className={[
        "text-body-sm font-semibold uppercase tracking-widest",
        sectionTitleVariantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </h3>
  );
});

FooterSectionTitle.displayName = "FooterSectionTitle";

// ── FooterLink ─────────────────────────────────────────────────────────────

export const FooterLink = React.forwardRef<HTMLAnchorElement, FooterLinkProps>(
  function FooterLink({ className, children, ...props }, ref) {
    const { variant } = useFooter();

    return (
      <a
        ref={ref}
        className={[
          "text-body-sm transition-colors duration-[200ms]",
          linkVariantClasses[variant],
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-border-focus focus-visible:ring-offset-2",
          "focus-visible:ring-offset-background-primary",
          "rounded-sm w-fit",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </a>
    );
  },
);

FooterLink.displayName = "FooterLink";

// ── FooterBottom ───────────────────────────────────────────────────────────

export const FooterBottom = React.forwardRef<
  HTMLDivElement,
  FooterBottomProps
>(function FooterBottom({ className, children, ...props }, ref) {
  const { variant } = useFooter();

  return (
    <div
      ref={ref}
      className={[
        "border-t px-6 py-6",
        "flex flex-col items-center gap-4",
        "sm:flex-row sm:justify-between",
        dividerVariantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
});

FooterBottom.displayName = "FooterBottom";
