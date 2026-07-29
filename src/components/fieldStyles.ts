/**
 * Shared motion + focus styles for form fields (Emil: explicit transitions, ease-standard, no transition-all).
 */

/** Border + focus ring on the field shell (wrapper with focus-within). */
export const fieldShellTransition =
  "transition-[border-color,box-shadow] duration-fast ease-standard motion-reduce:transition-none";

/** Drop zone shell (border + background on drag/hover). */
export const fieldDropZoneTransition =
  "transition-[border-color,box-shadow,background-color] duration-fast ease-standard motion-reduce:transition-none";

export const fieldFocusWithinDefault =
  "focus-within:ring-2 focus-within:ring-border-focus focus-within:border-border-brand";

export const fieldFocusWithinError =
  "focus-within:ring-2 focus-within:ring-state-error/40 focus-within:border-state-error";

/** Focus ring when the native control receives focus directly (textarea, button trigger). */
export const fieldFocusDefault =
  "focus:ring-2 focus:ring-border-focus focus:border-border-brand";

export const fieldFocusError =
  "focus:ring-2 focus:ring-state-error/40 focus:border-state-error";

export const fieldFocusVisibleDefault =
  "focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:border-border-brand";

export const fieldFocusVisibleError =
  "focus-visible:ring-2 focus-visible:ring-state-error/40 focus-visible:border-state-error";

export function fieldBorderClass(error: boolean): string {
  return error ? "border-state-error" : "border-border-default";
}

/** Dropdown / listbox panel — origin-aware, scale from 0.95 (not 0). */
export const fieldPopupMotion = [
  "origin-[var(--transform-origin)]",
  "transition-[transform,opacity] duration-normal ease-standard motion-reduce:transition-none",
  "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
  "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
].join(" ");

/** Highlighted option in Select / Combobox lists. */
export const fieldListItemMotion =
  "transition-colors duration-fast ease-standard data-[highlighted]:bg-surface-hover";

/** Stepper / icon buttons attached to fields (NumberField ±). */
export const fieldStepperButtonMotion = [
  "transition-[transform,background-color] duration-fast ease-standard",
  "motion-safe:active:scale-[0.97]",
  "motion-reduce:active:scale-100",
  "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-surface-hover",
  "active:bg-surface-active",
].join(" ");

/** Button-like field triggers (Select, DatePicker). */
export const fieldTriggerPressMotion = [
  "transition-[transform,border-color,box-shadow] duration-fast ease-standard",
  "motion-safe:active:scale-[0.99]",
  "motion-reduce:active:scale-100",
].join(" ");
