# Velocity DS — Component Reference

All components import from `@runswap/velocity`.

---

## Button

```tsx
import { Button } from '@runswap/velocity';
```

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `solid\|outline\|ghost\|link` | `solid` | |
| `colorScheme` | `primary\|success\|warning\|danger\|neutral` | `primary` | |
| `size` | `sm\|md\|lg` | `md` | |
| `loading` | `boolean` | `false` | Shows spinner, disables interaction |
| `fullWidth` | `boolean` | `false` | `w-full` |
| `startIcon` | `ReactNode` | — | Left icon |
| `endIcon` | `ReactNode` | — | Right icon |
| `disabled` | `boolean` | — | Native disabled |
| `focusableWhenDisabled` | `boolean` | — | Base UI: keep focus when disabled |
| `render` | `ReactElement \| fn` | — | Render as `<Link>`, `<a>`, etc. |

```tsx
// Primary CTA
<Button variant="solid" colorScheme="primary" size="md">Save</Button>

// Link button
<Button variant="link" colorScheme="primary" render={<Link href="/settings" />}>Settings</Button>

// Loading state
<Button loading={isSubmitting} fullWidth>Submit</Button>

// With icon
<Button startIcon={<RiAddLine />} variant="outline">Add item</Button>
```

---

## IconButton

```tsx
import { IconButton } from '@runswap/velocity';
```

Same props as `Button`. Always provide `aria-label`.

```tsx
<IconButton aria-label="Close dialog" variant="ghost" colorScheme="neutral">
  <RiCloseLine />
</IconButton>
```

---

## Input

```tsx
import { Input } from '@runswap/velocity';
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `sm\|md\|lg` | `md` |
| `error` | `boolean` | `false` |
| `helperText` | `string` | — |
| `label` | `string` | — |
| `leadingIcon` | `ReactNode` | — |
| `trailingIcon` | `ReactNode` | — |
| `leadingAddon` | `ReactNode` | — |
| `trailingAddon` | `ReactNode` | — |
| `placeholder` | `string` | — |
| `type` | `string` | `text` |
| `disabled` | `boolean` | `false` |

```tsx
// Basic
<Input placeholder="Enter email" type="email" size="md" />

// With error (use FormField for proper binding)
<Input error={!!errors.email} size="md" />

// With addons
<Input leadingAddon="https://" trailingAddon=".com" />

// Password with toggle
<Input
  type={showPwd ? 'text' : 'password'}
  trailingIcon={
    <button type="button" aria-label={showPwd ? 'Hide' : 'Show'} onClick={toggle}>
      {showPwd ? <RiEyeOffLine /> : <RiEyeLine />}
    </button>
  }
/>
```

---

## Textarea

```tsx
import { Textarea } from '@runswap/velocity';
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `sm\|md\|lg` | `md` |
| `error` | `boolean` | `false` |
| `resize` | `none\|vertical\|horizontal\|both` | `vertical` |
| `rows` | `number` | — |

---

## Select + SelectOption + SelectGroup

```tsx
import { Select, SelectOption, SelectGroup } from '@runswap/velocity';
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `sm\|md\|lg` | `md` |
| `placeholder` | `string` | — |
| `value` | `string` | — |
| `defaultValue` | `string` | — |
| `onValueChange` | `(v: string) => void` | — |
| `disabled` | `boolean` | `false` |
| `error` | `boolean` | `false` |

```tsx
<Select placeholder="Choose country" onValueChange={setCountry}>
  <SelectGroup label="Europe">
    <SelectOption value="fr">France</SelectOption>
    <SelectOption value="de">Germany</SelectOption>
  </SelectGroup>
</Select>
```

---

## Combobox + ComboboxOption + ComboboxGroup

Same API as Select. Adds typeahead filtering.

| Extra prop | Type | Default |
|------------|------|---------|
| `multiple` | `boolean` | `false` |
| `filterFn` | `(query, option) => boolean` | built-in |

---

## Checkbox

```tsx
import { Checkbox } from '@runswap/velocity';
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `sm\|md\|lg` | `md` |
| `checked` | `boolean` | — |
| `defaultChecked` | `boolean` | — |
| `onCheckedChange` | `(checked: boolean) => void` | — |
| `disabled` | `boolean` | `false` |
| `name` | `string` | — |

```tsx
<Checkbox size="md" checked={agreed} onCheckedChange={setAgreed}>
  I agree to the terms
</Checkbox>
```

---

## RadioGroup + RadioItem

```tsx
import { RadioGroup, RadioItem } from '@runswap/velocity';
```

```tsx
<RadioGroup value={plan} onValueChange={setPlan}>
  <RadioItem value="free">Free</RadioItem>
  <RadioItem value="pro">Pro</RadioItem>
</RadioGroup>
```

---

## Switch

```tsx
import { Switch } from '@runswap/velocity';
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `sm\|md\|lg` | `md` |
| `checked` | `boolean` | — |
| `defaultChecked` | `boolean` | — |
| `onCheckedChange` | `(checked: boolean) => void` | — |

---

## NumberField + NumberFieldParts

```tsx
import { NumberField, NumberFieldParts } from '@runswap/velocity';
```

For custom controls, use `NumberFieldParts.Root`, `.Input`, `.Increment`, `.Decrement`.

---

## Form Suite

```tsx
import {
  Form, FormSection, FormField, FormLabel,
  FormDescription, FormMessage, FormActions
} from '@runswap/velocity';
```

### Form
| Prop | Type | Default |
|------|------|---------|
| `layout` | `vertical\|horizontal` | `vertical` |
| `size` | `sm\|md\|lg` | `md` |

### FormField
| Prop | Type | Notes |
|------|------|-------|
| `name` | `string` | Required — used by Base UI Field |
| `invalid` | `boolean` | Surfaces FormMessage, triggers error styles |
| `disabled` | `boolean` | Disables all children |

### FormLabel
| Prop | Type | Notes |
|------|------|-------|
| `required` | `boolean` | Shows `*` (aria-hidden) |

### FormSection
| Prop | Type |
|------|------|
| `title` | `string?` |
| `description` | `string?` |

> **Rule**: `FormMessage` renders only when its parent `FormField` has `invalid={true}`.  
> **Rule**: Always use `FormLabel` (not `Label`) inside `FormField`.

---

## Label

```tsx
import { Label } from '@runswap/velocity';
```

Standalone label — do **not** use inside `FormField` (use `FormLabel` there).

| Prop | Type | Default |
|------|------|---------|
| `size` | `sm\|md\|lg` | `md` |
| `required` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

---

## Card + Parts

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@runswap/velocity';
```

| Prop | Type | Default |
|------|------|---------|
| `variant` | `default\|elevated\|outline\|muted` | `default` |
| `size` | `sm\|md\|lg` | `md` |

`CardHeader` and `CardFooter` accept `separator?: boolean` (adds a divider line).

```tsx
<Card variant="elevated" size="md">
  <CardHeader separator>
    <CardTitle>Settings</CardTitle>
    <CardDescription>Manage your account preferences.</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter separator>
    <Button variant="solid" colorScheme="primary">Save</Button>
  </CardFooter>
</Card>
```

---

## Tabs + Parts

```tsx
import { Tabs, TabsList, TabsTab, TabsIndicator, TabsPanels, TabsPanel } from '@runswap/velocity';
```

| Prop | Type | Default |
|------|------|---------|
| `value` | `any` | — |
| `defaultValue` | `any` | — |
| `onValueChange` | `(v: any) => void` | — |
| `orientation` | `horizontal\|vertical` | `horizontal` |

```tsx
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTab value="overview">Overview</TabsTab>
    <TabsTab value="settings">Settings</TabsTab>
    <TabsTab value="billing" disabled>Billing</TabsTab>
  </TabsList>
  <TabsPanels>
    <TabsPanel value="overview">…</TabsPanel>
    <TabsPanel value="settings">…</TabsPanel>
    <TabsPanel value="billing">…</TabsPanel>
  </TabsPanels>
</Tabs>
```

> Use `TabsPanels` to avoid layout shift when switching tabs. `TabsIndicator` is rendered automatically inside `TabsList`.

---

## Accordion + Parts

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from '@runswap/velocity';
```

| Prop | Type | Default |
|------|------|---------|
| `multiple` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `defaultValue` | `string[]` | — |
| `value` | `string[]` | — |
| `loopFocus` | `boolean` | `true` |

`AccordionTrigger` accepts `hideIcon?: boolean` (hides the chevron).  
`AccordionPanel` accepts `keepMounted?: boolean` (keep DOM when closed).

---

## Dialog + Parts

```tsx
import { Dialog, DialogTrigger, DialogPortal, DialogBackdrop, DialogPopup,
         DialogTitle, DialogDescription, DialogClose } from '@runswap/velocity';
```

| Prop on `Dialog` | Type | Default |
|------|------|---------|
| `size` | `sm\|md\|lg\|xl\|full` | `md` |
| `open` | `boolean` | — |
| `onOpenChange` | `(open: boolean) => void` | — |

```tsx
<Dialog>
  <DialogTrigger render={<Button>Open</Button>} />
  <DialogPortal>
    <DialogBackdrop />
    <DialogPopup>
      <DialogTitle>Confirm delete</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
      <div className="flex gap-3 justify-end mt-4">
        <DialogClose render={<Button variant="outline" colorScheme="neutral">Cancel</Button>} />
        <Button variant="solid" colorScheme="danger">Delete</Button>
      </div>
    </DialogPopup>
  </DialogPortal>
</Dialog>
```

---

## Drawer + Parts

Same API as Dialog. Adds `side: top | right | bottom | left` prop on `Drawer`.

---

## Tooltip + TooltipProvider

```tsx
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipPortal,
         TooltipPositioner, TooltipPopup } from '@runswap/velocity';
```

Mount `<TooltipProvider>` once at app root (or layout).

```tsx
<Tooltip>
  <TooltipTrigger render={<IconButton aria-label="Info"><RiInformationLine /></IconButton>} />
  <TooltipPortal>
    <TooltipPositioner side="top">
      <TooltipPopup>Helpful tooltip text</TooltipPopup>
    </TooltipPositioner>
  </TooltipPortal>
</Tooltip>
```

---

## Popover + Parts

```tsx
import { Popover, PopoverTrigger, PopoverPortal, PopoverPositioner,
         PopoverPopup, PopoverTitle, PopoverDescription, PopoverClose } from '@runswap/velocity';
```

`PopoverPositioner` accepts `side: top | right | bottom | left`.

---

## Toast

```tsx
import { ToastProvider, ToastViewport, useToast } from '@runswap/velocity';
```

**Setup** (app root):
```tsx
<ToastProvider>
  <App />
  <ToastViewport />
</ToastProvider>
```

**Usage**:
```tsx
const { toast } = useToast();
toast({ title: 'Profile saved', variant: 'success', duration: 3000 });
toast({ title: 'Error', description: 'Something went wrong', variant: 'error' });
```

Toast variants: `default | success | warning | error | info`

---

## Table + Parts

```tsx
import { Table, TableHeader, TableBody, TableFooter,
         TableRow, TableHead, TableCell } from '@runswap/velocity';
```

| Prop on `Table` | Type | Default |
|------|------|---------|
| `size` | `sm\|md\|lg` | `md` |

```tsx
<Table size="md">
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {rows.map(r => (
      <TableRow key={r.id}>
        <TableCell>{r.name}</TableCell>
        <TableCell><Badge variant="soft">{r.status}</Badge></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

---

## Badge / Chip / NotificationBadge

```tsx
import { Badge, Chip, NotificationBadge } from '@runswap/velocity';
```

| Component | Key props |
|-----------|-----------|
| `Badge` | `variant` solid\|soft\|outline · `size` sm\|md\|lg |
| `Chip` | `variant` · `size` · `onDismiss` |
| `NotificationBadge` | `count` · `variant` · `size` · `max` |

```tsx
<Badge variant="soft" size="sm">Active</Badge>
<Chip onDismiss={() => removeTag(id)}>Design</Chip>
<NotificationBadge count={5} max={99} />
```

---

## Avatar

```tsx
import { Avatar, AvatarParts } from '@runswap/velocity';
```

| Prop | Type | Default |
|------|------|---------|
| `src` | `string` | — |
| `fallback` | `string` | — Initials |
| `size` | `xs\|sm\|md\|lg\|xl` | `md` |

---

## Spinner / Skeleton

```tsx
import { Spinner, Skeleton } from '@runswap/velocity';
```

```tsx
<Spinner size="md" colorScheme="primary" />

<Skeleton variant="text" className="w-48 h-4" />
<Skeleton variant="circular" className="w-10 h-10" />
<Skeleton variant="rectangular" className="w-full h-32" />
```

---

## AlertBanner

```tsx
import { AlertBanner } from '@runswap/velocity';
```

| Prop | Type |
|------|------|
| `variant` | `info\|success\|warning\|error` |
| `action` | `{ label: string; onClick: () => void }` |

---

## Breadcrumb + Parts

```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@runswap/velocity';
```

```tsx
<Breadcrumb size="sm">
  <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem><BreadcrumbLink href="/products">Products</BreadcrumbLink></BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem aria-current="page">Details</BreadcrumbItem>
</Breadcrumb>
```

---

## Pagination

```tsx
import { Pagination, PaginationContent, PaginationItem,
         PaginationPrevious, PaginationNext, PaginationEllipsis } from '@runswap/velocity';
```

| Prop | Type |
|------|------|
| `size` | `sm\|md\|lg` |
| `count` | `number` (total pages) |
| `page` | `number` |
| `onPageChange` | `(page: number) => void` |

---

## FileUpload

```tsx
import { FileUpload } from '@runswap/velocity';
```

| Prop | Type |
|------|------|
| `accept` | `string` |
| `maxSize` | `number` (bytes) |
| `multiple` | `boolean` |
| `size` | `sm\|md\|lg` |
| `orientation` | `horizontal\|vertical` |
| `onFilesChange` | `(files: File[]) => void` |

---

## Rating

```tsx
import { Rating } from '@runswap/velocity';
```

| Prop | Type | Default |
|------|------|---------|
| `value` | `number` | — |
| `defaultValue` | `number` | — |
| `max` | `number` | `5` |
| `readOnly` | `boolean` | `false` |
| `size` | `sm\|md\|lg` | `md` |
| `labelPosition` | `left\|right\|top\|bottom` | — |
