# Form, FileUpload, Rating

## When to use
Read this file whenever you're building a form — login, registration, checkout, settings page. `Form` is the opinionated layout shell that wires labels, descriptions, and error messages.

```ts
import {
  Form, FormSection, FormField,
  FormLabel, FormDescription, FormMessage, FormActions,
  FileUpload, Rating,
} from "velocity-ds";
```

---

# Form compound

## Parts

| Part | Purpose |
| --- | --- |
| `Form` | Root, handles `size` and `layout` |
| `FormSection` | Visual grouping of related fields |
| `FormField` | Wraps ONE control with its label / description / message |
| `FormLabel` | Accessible label (auto-wires `htmlFor`) |
| `FormDescription` | Helper text below the label |
| `FormMessage` | Inline validation error |
| `FormActions` | Footer with submit/cancel buttons |

## Props

### `Form`
| Prop | Type | Default |
| --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `layout` | `"vertical" \| "horizontal"` | `"vertical"` |

### `FormSection`
| Prop | Type |
| --- | --- |
| `title` | `string` (optional) |
| `description` | `string` (optional) |

## Example — login

```tsx
<Form layout="vertical" size="md" onSubmit={handleSubmit}>
  <FormSection title="Sign in">
    <FormField>
      <FormLabel>Email</FormLabel>
      <Input type="email" value={email} onChange={...} />
      <FormMessage>{errors.email}</FormMessage>
    </FormField>

    <FormField>
      <FormLabel>Password</FormLabel>
      <Input type="password" value={password} onChange={...} />
      <FormDescription>Minimum 8 characters.</FormDescription>
      <FormMessage>{errors.password}</FormMessage>
    </FormField>
  </FormSection>

  <FormActions>
    <Button variant="outline" colorScheme="neutral">Cancel</Button>
    <Button variant="solid" colorScheme="primary" type="submit">
      Sign in
    </Button>
  </FormActions>
</Form>
```

## Example — multi-section settings

```tsx
<Form layout="horizontal" size="md">
  <FormSection title="Profile" description="Displayed publicly.">
    <FormField>
      <FormLabel>Display name</FormLabel>
      <Input value={name} onChange={...} />
    </FormField>
  </FormSection>

  <FormSection title="Notifications">
    <FormField>
      <FormLabel>Email updates</FormLabel>
      <Switch checked={emailOptIn} onCheckedChange={setEmailOptIn} />
    </FormField>
  </FormSection>

  <FormActions>
    <Button variant="solid" colorScheme="primary" type="submit">Save</Button>
  </FormActions>
</Form>
```

## Rules

- ONE control per `FormField`. If you need two inputs on the same row, use two `FormField`s inside a `FormSection` with a horizontal layout, don't stuff two controls into one field.
- ALWAYS pair validation state with `FormMessage`. Don't invent custom error styling.
- NEVER put submit/cancel buttons outside `FormActions`.
- For async submission, use `<Button loading>` inside `FormActions`.
- For inline field grids (e.g. first/last name), set `layout="horizontal"` on `Form` OR compose with flex in the consumer — do NOT override `FormField` internals.

---

# FileUpload

Drag-and-drop file uploader with built-in validation.

| Prop | Type | Default |
| --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` |
| `accept` | `string` (MIME list) | — |
| `multiple` | `boolean` | `false` |
| `maxSize` | `number` (bytes) | — |
| `onFilesChange` | `(files: File[]) => void` | — |
| `onValidationIssue` | `(issue: FileUploadValidationIssue) => void` | — |

```tsx
<FileUpload
  accept="image/png,image/jpeg"
  maxSize={5 * 1024 * 1024}
  onFilesChange={setFiles}
  onValidationIssue={(issue) => toast.error(issue.message)}
/>
```

## Rules

- ALWAYS set `accept` for upload flows. Don't allow arbitrary file types.
- ALWAYS set `maxSize` when size matters (uploads > 5 MB usually need backend confirmation).
- Display upload errors via `Toast` or `FormMessage`, never via `alert()`.

---

# Rating

Star rating (1–5).

| Prop | Type | Default |
| --- | --- | --- |
| `value` / `defaultValue` | `number` (0–5) | — |
| `onValueChange` | `(value: number) => void` | — |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `labelPosition` | `"start" \| "end" \| "none"` | `"none"` |
| `readOnly` | `boolean` | `false` |

```tsx
{/* Interactive */}
<Rating value={rating} onValueChange={setRating} labelPosition="end" />

{/* Display only (product card) */}
<Rating value={4.5} readOnly size="sm" />
```

## Rules

- Use `readOnly` for display on product cards, reviews lists.
- Use `labelPosition="end"` when next to the value ("4.5 out of 5").
- NEVER build star ratings with custom icons + math. Use `Rating`.
