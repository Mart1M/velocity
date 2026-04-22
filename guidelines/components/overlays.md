# Overlays

Dialog, Drawer, Tooltip, Popover, Toast — all built on Base UI portals.

```ts
import {
  Dialog, DialogTrigger, DialogPortal, DialogBackdrop, DialogPopup,
    DialogTitle, DialogDescription, DialogClose,
  Drawer, DrawerTrigger, DrawerPortal, DrawerBackdrop, DrawerPopup,
    DrawerTitle, DrawerDescription, DrawerClose,
  Tooltip, TooltipTrigger, TooltipPortal, TooltipPositioner, TooltipPopup,
    TooltipArrow, TooltipProvider,
  Popover, PopoverTrigger, PopoverPortal, PopoverPositioner, PopoverPopup,
    PopoverTitle, PopoverDescription, PopoverClose,
  ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription,
    ToastClose, ToastAction, useToast, createToastManager,
} from "velocity-ds";
```

## Required providers

Wrap the app root once:

```tsx
<ToastProvider>
  <TooltipProvider>
    <App />
  </TooltipProvider>
</ToastProvider>
```

Without `ToastProvider`, `useToast()` is a no-op. Without `TooltipProvider`, tooltip delays/groupings are not shared.

---

# Dialog compound

Modal dialog — focused task that blocks the rest of the UI.

## Parts

- `Dialog` — root (`open`, `defaultOpen`, `onOpenChange`)
- `DialogTrigger` — opens the dialog
- `DialogPortal` — renders in a portal (ALWAYS include)
- `DialogBackdrop` — scrim behind the popup (ALWAYS include)
- `DialogPopup` — the actual modal (`size`)
- `DialogTitle`, `DialogDescription` — accessible heading & description
- `DialogClose` — close button

## Example

```tsx
<Dialog>
  <DialogTrigger render={<Button variant="solid">Edit profile</Button>} />
  <DialogPortal>
    <DialogBackdrop />
    <DialogPopup size="md">
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Update your display name and photo.</DialogDescription>

      <Form layout="vertical">...</Form>

      <div className="flex justify-end gap-2 mt-4">
        <DialogClose render={<Button variant="outline">Cancel</Button>} />
        <Button variant="solid">Save</Button>
      </div>
    </DialogPopup>
  </DialogPortal>
</Dialog>
```

## Rules
- ALWAYS include `DialogPortal` + `DialogBackdrop`. Never render a `DialogPopup` directly.
- ALWAYS include `DialogTitle` (required for accessibility even if visually hidden).
- NEVER nest a `Dialog` inside another `Dialog`. Close the first before opening the second.
- For destructive confirmations, pair with `colorScheme="danger"` on the action button.

---

# Drawer compound

Side panel — navigation, filters, cart, settings.

## Parts
Same structure as `Dialog` (`Drawer`, `DrawerTrigger`, `DrawerPortal`, `DrawerBackdrop`, `DrawerPopup`, `DrawerTitle`, `DrawerDescription`, `DrawerClose`) + `side` prop on `Drawer`:

| Prop (`Drawer`) | Type | Default |
| --- | --- | --- |
| `side` | `"left" \| "right" \| "top" \| "bottom"` | `"right"` |

## Example — cart drawer

```tsx
<Drawer side="right">
  <DrawerTrigger render={<IconButton aria-label="Cart"><RiShoppingCart2Line /></IconButton>} />
  <DrawerPortal>
    <DrawerBackdrop />
    <DrawerPopup>
      <DrawerTitle>Your cart</DrawerTitle>
      <DrawerDescription>3 items · 129 €</DrawerDescription>

      <CartContent>...</CartContent>

      <DrawerClose render={<IconButton aria-label="Close"><RiCloseLine /></IconButton>} />
    </DrawerPopup>
  </DrawerPortal>
</Drawer>
```

## Dialog vs Drawer
- **Dialog** → focused task, centered (edit form, confirm destructive action).
- **Drawer** → side panel for navigation/listing (cart, filters, settings, mobile menu).

---

# Tooltip compound

Contextual hint on hover/focus. Use for icon-only controls, abbreviations, helper text for disabled buttons.

## Parts
- `TooltipProvider` — at the app root
- `Tooltip` — per-instance root
- `TooltipTrigger` — the element being described
- `TooltipPortal` / `TooltipPositioner` / `TooltipPopup` / `TooltipArrow`

## Example

```tsx
<Tooltip>
  <TooltipTrigger render={<IconButton aria-label="Add to favorites"><RiHeart3Line /></IconButton>} />
  <TooltipPortal>
    <TooltipPositioner>
      <TooltipPopup>
        Add to favorites
        <TooltipArrow />
      </TooltipPopup>
    </TooltipPositioner>
  </TooltipPortal>
</Tooltip>
```

## Rules
- Tooltip content is a **secondary hint**, not critical info. If the info is essential, display it inline.
- DO NOT put interactive elements inside a `TooltipPopup`. Use `Popover` instead.
- `aria-label` on the trigger (for screen readers) should match the tooltip text.

---

# Popover compound

Anchored floating panel — rich content, interactive controls.

## Parts
Same structure as `Tooltip` + `PopoverTitle`, `PopoverDescription`, `PopoverClose`.

## Example — share options

```tsx
<Popover>
  <PopoverTrigger render={<Button variant="outline" leftIcon={<RiShareLine />}>Share</Button>} />
  <PopoverPortal>
    <PopoverPositioner>
      <PopoverPopup>
        <PopoverTitle>Share this product</PopoverTitle>
        <div className="flex gap-2 mt-2">
          <IconButton aria-label="Copy link"><RiLink /></IconButton>
          <IconButton aria-label="Email"><RiMailLine /></IconButton>
        </div>
      </PopoverPopup>
    </PopoverPositioner>
  </PopoverPortal>
</Popover>
```

## Tooltip vs Popover
- **Tooltip** → passive, hover/focus, text-only, auto-dismiss.
- **Popover** → active, click-triggered, interactive content (buttons, inputs, lists).

---

# Toast

Transient notifications. Requires `ToastProvider` at the root.

## Parts & API

- `ToastProvider` — app root
- `ToastViewport` — where toasts render (usually once in `App`)
- `Toast`, `ToastTitle`, `ToastDescription`, `ToastClose`, `ToastAction` — used inside the render prop
- `useToast()` — hook to programmatically push toasts
- `createToastManager()` — factory for managing toasts outside React

## Example — programmatic

```tsx
const { toast } = useToast();

toast.success({
  title: "Saved",
  description: "Your profile has been updated.",
});

toast.error({
  title: "Could not save",
  description: "Please try again.",
  action: { label: "Retry", onClick: retry },
});
```

## Rules
- Toasts are for **transient** feedback (1–5 seconds). For persistent alerts, use `AlertBanner` ([banners.md](./banners.md)).
- ONE `ToastViewport` in the app. Don't render multiple viewports.
- Keep the title ≤ 50 chars, description ≤ 140 chars.
- Include an action only when the user can recover from an error (Retry, Undo).
- Do NOT stack >3 toasts visible. Use the queue behavior built into `ToastProvider`.

---

## Global rules (all overlays)

- ALWAYS use the portal parts (`*Portal`) — they ensure correct z-index stacking.
- ALWAYS include a `*Title` element (accessibility), even if visually hidden with `className="sr-only"`.
- NEVER open two modals at the same time. Close one before opening the next.
- For overlays carrying destructive actions, use `colorScheme="danger"` on the confirm button.
- Mobile: prefer `Drawer side="bottom"` over `Dialog` for touch-friendly interactions.
