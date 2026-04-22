# Form inputs

## When to use
Read this file for any form field or control: text, numbers, booleans, selection from options, dates. Always use these over native HTML (`<input>`, `<select>`, `<textarea>`).

```ts
import {
  Input, Textarea, NumberField,
  Checkbox, RadioGroup, RadioItem, Switch,
  Label,
  Select, SelectOption, SelectGroup,
  Combobox, ComboboxOption, ComboboxGroup,
  SelectBox, SelectBoxGroup,
  DatePicker,
} from "velocity-ds";
```

---

# Input

Single-line text entry.

| Prop | Type | Default |
| --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `error` | `boolean` | `false` |
| `leadingSlot` / `trailingSlot` | `ReactNode` | — |
| `disabled` | `boolean` | `false` |

Accepts all native `<input>` HTML attributes (`type`, `placeholder`, `value`, `onChange`, `name`...).

```tsx
<Input type="email" placeholder="you@runswap.com" />
<Input size="sm" leadingSlot={<RiSearchLine />} placeholder="Search" />
<Input error value={email} onChange={(e) => setEmail(e.target.value)} />
```

---

# Textarea

Multi-line text entry.

| Prop | Type | Default |
| --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `resize` | `"none" \| "vertical" \| "horizontal" \| "both"` | `"vertical"` |

```tsx
<Textarea rows={4} placeholder="Tell us about your ride" />
```

---

# NumberField

Numeric input with +/- steppers. Exposed as a compound via `NumberFieldParts` for custom layouts.

| Prop | Type | Default |
| --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `min` / `max` / `step` | `number` | — |

```tsx
<NumberField min={1} max={99} step={1} defaultValue={1} />
```

Use `NumberFieldParts.{Root, Input, Increment, Decrement, ScrubArea}` when you need to re-order the stepper buttons.

---

# Checkbox

Boolean form field.

| Prop | Type | Default |
| --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `indeterminate` | `boolean` | `false` |
| `checked` / `defaultChecked` | `boolean` | — |
| `onCheckedChange` | `(checked: boolean) => void` | — |

```tsx
<Checkbox defaultChecked>Subscribe to newsletter</Checkbox>
```

---

# RadioGroup + RadioItem

Mutually exclusive choice (≤5 options). Always wrap `RadioItem`s in a `RadioGroup`.

| Prop (`RadioGroup`) | Type |
| --- | --- |
| `value` / `defaultValue` | `string` |
| `onValueChange` | `(value: string) => void` |
| `size` | `"sm" \| "md" \| "lg"` |

```tsx
<RadioGroup defaultValue="road">
  <RadioItem value="road">Road</RadioItem>
  <RadioItem value="trail">Trail</RadioItem>
  <RadioItem value="track">Track</RadioItem>
</RadioGroup>
```

---

# Switch

On/off toggle setting (notifications, dark mode, feature flags).

| Prop | Type |
| --- | --- |
| `size` | `"sm" \| "md" \| "lg"` |
| `checked` / `defaultChecked` | `boolean` |
| `onCheckedChange` | `(checked: boolean) => void` |

```tsx
<Switch defaultChecked>Email notifications</Switch>
```

### Checkbox vs Switch
- **Checkbox** → form field, value is submitted with a form, multi-select list item.
- **Switch** → settings toggle, effect is immediate (no Save button needed).

---

# Label

Accessible label for custom form controls. Most field components wire their own label via `Form` / `FormLabel`; use `Label` only for ad-hoc cases.

```tsx
<Label htmlFor="email">Email</Label>
<input id="email" />
```

Prefer `FormField` + `FormLabel` when inside a `Form` ([form.md](./form.md)).

---

# Select (+ `SelectOption`, `SelectGroup`)

Accessible dropdown, single-value, built on Base UI.

| Prop (`Select`) | Type |
| --- | --- |
| `value` / `defaultValue` | `string` |
| `onValueChange` | `(value: string) => void` |
| `size` | `"sm" \| "md" \| "lg"` |
| `placeholder` | `string` |
| `disabled` | `boolean` |

```tsx
<Select defaultValue="s" placeholder="Choose a size">
  <SelectGroup label="Standard">
    <SelectOption value="xs">XS</SelectOption>
    <SelectOption value="s">S</SelectOption>
    <SelectOption value="m">M</SelectOption>
    <SelectOption value="l">L</SelectOption>
  </SelectGroup>
</Select>
```

---

# Combobox (+ `ComboboxOption`, `ComboboxGroup`)

Searchable dropdown. Use for long lists (>10 options).

```tsx
<Combobox defaultValue="paris" placeholder="Search a city">
  <ComboboxOption value="paris">Paris</ComboboxOption>
  <ComboboxOption value="lyon">Lyon</ComboboxOption>
  <ComboboxOption value="marseille">Marseille</ComboboxOption>
</Combobox>
```

### Select vs Combobox
- **Select** → short predefined list (sizes, countries with ≤20 options).
- **Combobox** → long list or when the user's natural behavior is to type.

---

# SelectBox + SelectBoxGroup

Large, card-style selection with rich content (icon + title + description). Two modes:

- `SelectBoxGroup mode="radio"` — single choice
- `SelectBoxGroup mode="checkbox"` — multi choice

| Prop (`SelectBoxGroup`) | Type |
| --- | --- |
| `mode` | `"radio" \| "checkbox"` |
| `value` / `defaultValue` | `string` (radio) or `string[]` (checkbox) |
| `onValueChange` | `(value) => void` |
| `size` | `"sm" \| "md" \| "lg"` |

```tsx
{/* Single-select cards */}
<SelectBoxGroup mode="radio" defaultValue="standard">
  <SelectBox value="standard" title="Standard" description="3–5 days" />
  <SelectBox value="express" title="Express" description="24h" />
</SelectBoxGroup>

{/* Multi-select cards */}
<SelectBoxGroup mode="checkbox" defaultValue={["road"]}>
  <SelectBox value="road" title="Road" />
  <SelectBox value="trail" title="Trail" />
</SelectBoxGroup>
```

For custom item rendering, use `useSelectBoxGroupContext()`.

---

# DatePicker

Single date or range picker.

```tsx
{/* Single date */}
<DatePicker
  mode="single"
  value={date}
  onValueChange={setDate}
/>

{/* Range */}
<DatePicker
  mode="range"
  value={range}
  onValueChange={setRange}   // range: { from: Date; to: Date }
/>
```

Props are split across `DatePickerSingleProps` and `DatePickerRangeProps`. Use the `DateRangeValue` type for ranges.

---

## Decision tree — which input to pick

```
┌─ "How should the user provide this input?"
│
├─ Short free text?                → Input
├─ Long free text?                 → Textarea
├─ Numeric with steppers?          → NumberField
├─ Boolean in a form?              → Checkbox
├─ Boolean that toggles a setting? → Switch
├─ One of few (≤5) options?        → RadioGroup
├─ One of many predefined?         → Select
├─ One of many, searchable?        → Combobox
├─ Rich card-style options?        → SelectBox + SelectBoxGroup
└─ A date or date range?           → DatePicker
```

## Rules

- NEVER use native `<input>`, `<select>`, `<textarea>`, `<input type="checkbox">`, `<input type="radio">` when a Velocity equivalent exists.
- ALWAYS wrap inputs inside a `Form` + `FormField` for proper label/description/error wiring (see [form.md](./form.md)).
- NEVER use `Switch` for form values that need a submit action — it's for immediate-effect settings.
- For radio buttons, ALWAYS put `RadioItem`s inside a `RadioGroup`. Never render `RadioItem` standalone.
- Validation errors on an `Input`/`Textarea` must set `error` AND render a `FormMessage` below.
