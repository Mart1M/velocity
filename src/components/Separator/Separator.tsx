import * as React from "react";
import { Separator as BaseSeparator } from "@base-ui-components/react/separator";

// ── Types ──────────────────────────────────────────────────────────────────

export type SeparatorOrientation = "horizontal" | "vertical";

export interface SeparatorProps
  extends Omit<
    React.ComponentPropsWithRef<typeof BaseSeparator>,
    "orientation"
  > {
  orientation?: SeparatorOrientation;
  className?: string;
}

// ── Styles ────────────────────────────────────────────────────────────────

const orientationClasses: Record<SeparatorOrientation, string> = {
  horizontal: "h-px w-full min-w-0 shrink-0 border-0 bg-border-subtle",
  vertical: "h-4 w-px shrink-0 border-0 bg-border-default",
};

// ── Component ─────────────────────────────────────────────────────────────

/**
 * Visual and semantic divider (`role="separator"`). Built on
 * [Base UI Separator](https://base-ui.com/react/components/separator).
 */
export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  function Separator(
    { className, orientation = "horizontal", ...props },
    ref,
  ) {
    return (
      <BaseSeparator
        ref={ref}
        orientation={orientation}
        className={[
          orientationClasses[orientation],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  },
);

Separator.displayName = "Separator";
