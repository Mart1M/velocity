import * as React from "react";
import { Slider as BaseSlider } from "@base-ui-components/react/slider";

// ── Types ──────────────────────────────────────────────────────────────────

export type SliderSize = "sm" | "md" | "lg";

export type SliderRootProps = React.ComponentPropsWithoutRef<
  typeof BaseSlider.Root
> & {
  /** Visual size of the track and thumbs */
  size?: SliderSize;
};

export type SliderControlProps = React.ComponentPropsWithoutRef<
  typeof BaseSlider.Control
>;

export type SliderTrackProps = React.ComponentPropsWithoutRef<
  typeof BaseSlider.Track
>;

export type SliderIndicatorProps = React.ComponentPropsWithoutRef<
  typeof BaseSlider.Indicator
>;

export type SliderThumbProps = React.ComponentPropsWithoutRef<
  typeof BaseSlider.Thumb
>;

export type SliderValueProps = React.ComponentPropsWithoutRef<
  typeof BaseSlider.Value
>;

export type SliderLabelProps = React.ComponentPropsWithoutRef<"label">;

// ── Context ────────────────────────────────────────────────────────────────

const SliderSizeContext = React.createContext<SliderSize>("md");

function useSliderSize(): SliderSize {
  return React.useContext(SliderSizeContext);
}

// ── Style maps ─────────────────────────────────────────────────────────────

const trackThicknessClasses: Record<SliderSize, string> = {
  sm: "data-[orientation=horizontal]:h-1 data-[orientation=vertical]:w-1",
  md: "data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5",
  lg: "data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2",
};

const thumbSizeClasses: Record<SliderSize, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};

const valueSizeClasses: Record<SliderSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const focusRing = [
  "data-focused:outline-none",
  "data-focused:ring-2 data-focused:ring-border-focus",
  "data-focused:ring-offset-2 data-focused:ring-offset-background-primary",
].join(" ");

// ── Parts ──────────────────────────────────────────────────────────────────

export const SliderRoot = React.forwardRef<HTMLDivElement, SliderRootProps>(
  function SliderRoot(
    {
      size = "md",
      className,
      thumbAlignment = "edge",
      children,
      ...props
    },
    ref,
  ) {
    return (
      <SliderSizeContext.Provider value={size}>
        <BaseSlider.Root
          ref={ref}
          thumbAlignment={thumbAlignment}
          className={[
            "flex w-full min-w-0 flex-col gap-2",
            "data-[orientation=vertical]:h-64 data-[orientation=vertical]:w-auto",
            "data-disabled:opacity-50",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {children}
        </BaseSlider.Root>
      </SliderSizeContext.Provider>
    );
  },
);

SliderRoot.displayName = "SliderRoot";

/** Accessible label for the slider group (use with visible text or `sr-only`). */
export const SliderLabel = React.forwardRef<HTMLLabelElement, SliderLabelProps>(
  function SliderLabel({ className, ...props }, ref) {
    return (
      <label
        ref={ref}
        className={[
          "text-sm font-medium leading-snug text-content-primary",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  },
);

SliderLabel.displayName = "SliderLabel";

export const SliderValue = React.forwardRef<HTMLOutputElement, SliderValueProps>(
  function SliderValue({ className, ...props }, ref) {
    const size = useSliderSize();

    return (
      <BaseSlider.Value
        ref={ref}
        className={[
          "tabular-nums text-content-secondary",
          valueSizeClasses[size],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  },
);

SliderValue.displayName = "SliderValue";

export const SliderControl = React.forwardRef<HTMLDivElement, SliderControlProps>(
  function SliderControl({ className, ...props }, ref) {
    return (
      <BaseSlider.Control
        ref={ref}
        className={[
          "relative flex w-full touch-none select-none",
          "data-[orientation=horizontal]:items-center data-[orientation=horizontal]:py-2",
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-col",
          "data-[orientation=vertical]:items-center data-[orientation=vertical]:px-2",
          "data-disabled:cursor-not-allowed",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  },
);

SliderControl.displayName = "SliderControl";

export const SliderTrack = React.forwardRef<HTMLDivElement, SliderTrackProps>(
  function SliderTrack({ className, ...props }, ref) {
    const size = useSliderSize();

    return (
      <BaseSlider.Track
        ref={ref}
        className={[
          "relative flex rounded-full bg-border-strong",
          "data-[orientation=horizontal]:w-full",
          "data-[orientation=vertical]:h-full",
          trackThicknessClasses[size],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  },
);

SliderTrack.displayName = "SliderTrack";

export const SliderIndicator = React.forwardRef<
  HTMLDivElement,
  SliderIndicatorProps
>(function SliderIndicator({ className, ...props }, ref) {
  return (
    <BaseSlider.Indicator
      ref={ref}
      className={[
        "absolute rounded-full bg-accent-primary",
        "data-[orientation=horizontal]:h-full",
        "data-[orientation=vertical]:w-full",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
});

SliderIndicator.displayName = "SliderIndicator";

export const SliderThumb = React.forwardRef<HTMLDivElement, SliderThumbProps>(
  function SliderThumb({ className, ...props }, ref) {
    const size = useSliderSize();

    return (
      <BaseSlider.Thumb
        ref={ref}
        className={[
          "block rounded-full border-2 border-accent-primary bg-background-primary shadow-sm",
          "cursor-grab active:cursor-grabbing",
          "transition-[transform,box-shadow] duration-200",
          "data-dragging:scale-110",
          "data-disabled:cursor-not-allowed",
          focusRing,
          thumbSizeClasses[size],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  },
);

SliderThumb.displayName = "SliderThumb";

/** Alias for `SliderRoot`. */
export const Slider = SliderRoot;
