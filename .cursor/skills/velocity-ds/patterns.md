# Velocity DS — Composition Patterns

Reusable recipes built entirely from DS components and semantic tokens.

---

## Form Patterns

### Vertical Login Form

```tsx
import { Form, FormField, FormLabel, FormMessage, FormActions } from '@runswap/velocity';
import { Input, Button, Checkbox } from '@runswap/velocity';

function LoginForm({ onSubmit, isLoading, errors }) {
  return (
    <div className="w-full max-w-md mx-auto rounded-2xl border border-border-default bg-surface-primary shadow-sm p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-content-primary">Sign in</h1>
        <p className="text-sm text-content-secondary">Welcome back.</p>
      </div>

      <Form layout="vertical" onSubmit={onSubmit}>
        {/* Email */}
        <FormField name="email" invalid={!!errors.email}>
          <FormLabel required>Email address</FormLabel>
          <Input type="email" size="md" placeholder="you@example.com" error={!!errors.email} />
          <FormMessage>{errors.email}</FormMessage>
        </FormField>

        {/* Password */}
        <FormField name="password" invalid={!!errors.password}>
          <div className="flex items-center justify-between">
            <FormLabel required>Password</FormLabel>
            <Button variant="link" colorScheme="primary" size="sm" type="button">
              Forgot password?
            </Button>
          </div>
          <Input type="password" size="md" placeholder="••••••••" error={!!errors.password} />
          <FormMessage>{errors.password}</FormMessage>
        </FormField>

        {/* Remember me */}
        <Checkbox name="rememberMe" size="md">Remember me</Checkbox>

        <FormActions>
          <Button variant="solid" colorScheme="primary" size="md" type="submit" fullWidth loading={isLoading}>
            Sign in
          </Button>
        </FormActions>
      </Form>

      <p className="mt-6 text-center text-sm text-content-secondary">
        No account?{' '}
        <Button variant="link" colorScheme="primary" size="sm">Sign up</Button>
      </p>
    </div>
  );
}
```

---

### Settings Form (Horizontal sections)

```tsx
<Form layout="vertical">
  <FormSection title="Profile" description="Update your public-facing information.">
    <FormField name="displayName">
      <FormLabel>Display name</FormLabel>
      <Input size="md" placeholder="Your name" />
    </FormField>
    <FormField name="bio">
      <FormLabel>Bio</FormLabel>
      <Textarea size="md" rows={3} />
    </FormField>
  </FormSection>

  <Separator />

  <FormSection title="Notifications" description="Choose how you receive alerts.">
    <div className="flex flex-col gap-3">
      <Switch size="md" defaultChecked>Email notifications</Switch>
      <Switch size="md">Push notifications</Switch>
    </div>
  </FormSection>

  <FormActions>
    <Button variant="outline" colorScheme="neutral" type="button">Cancel</Button>
    <Button variant="solid" colorScheme="primary" type="submit">Save changes</Button>
  </FormActions>
</Form>
```

---

### Multi-select Form Field

```tsx
<FormField name="tags" invalid={!!errors.tags}>
  <FormLabel>Tags</FormLabel>
  <Combobox multiple placeholder="Select tags…" onValueChange={setTags}>
    <ComboboxOption value="design">Design</ComboboxOption>
    <ComboboxOption value="dev">Development</ComboboxOption>
    <ComboboxOption value="marketing">Marketing</ComboboxOption>
  </Combobox>
  <FormMessage>Select at least one tag.</FormMessage>
</FormField>
```

---

## Card Patterns

### Stat Card

```tsx
<Card variant="default" size="md">
  <CardContent>
    <p className="text-caption text-content-tertiary uppercase tracking-widest">Revenue</p>
    <p className="mt-1 text-heading-3 text-content-primary">$12,450</p>
    <Badge variant="soft" size="sm" className="mt-2">+8.2% this month</Badge>
  </CardContent>
</Card>
```

### Action Card

```tsx
<Card variant="elevated" size="md">
  <CardHeader separator>
    <CardTitle>Invite team member</CardTitle>
    <CardDescription>Send an invitation to collaborate.</CardDescription>
  </CardHeader>
  <CardContent>
    <FormField name="inviteEmail">
      <FormLabel>Email address</FormLabel>
      <Input type="email" size="md" placeholder="colleague@company.com" />
    </FormField>
  </CardContent>
  <CardFooter separator>
    <div className="flex gap-2 justify-end">
      <Button variant="outline" colorScheme="neutral">Cancel</Button>
      <Button variant="solid" colorScheme="primary">Send invite</Button>
    </div>
  </CardFooter>
</Card>
```

---

## Overlay Patterns

### Confirmation Dialog

```tsx
<Dialog>
  <DialogTrigger render={<Button variant="outline" colorScheme="danger">Delete account</Button>} />
  <DialogPortal>
    <DialogBackdrop />
    <DialogPopup>
      <DialogTitle>Delete account?</DialogTitle>
      <DialogDescription>
        All your data will be permanently removed. This action cannot be undone.
      </DialogDescription>
      <div className="flex gap-3 justify-end mt-6">
        <DialogClose render={<Button variant="outline" colorScheme="neutral">Cancel</Button>} />
        <Button variant="solid" colorScheme="danger" onClick={handleDelete}>
          Yes, delete
        </Button>
      </div>
    </DialogPopup>
  </DialogPortal>
</Dialog>
```

### Form in Dialog

```tsx
<Dialog open={open} onOpenChange={setOpen} size="md">
  <DialogPortal>
    <DialogBackdrop />
    <DialogPopup>
      <DialogTitle>Add address</DialogTitle>
      <Form layout="vertical" onSubmit={handleSubmit} className="mt-4">
        <FormField name="street" invalid={!!errors.street}>
          <FormLabel required>Street</FormLabel>
          <Input size="md" />
          <FormMessage>{errors.street}</FormMessage>
        </FormField>
        <FormActions>
          <Button variant="outline" colorScheme="neutral" type="button" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="solid" colorScheme="primary" type="submit">Save</Button>
        </FormActions>
      </Form>
    </DialogPopup>
  </DialogPortal>
</Dialog>
```

### Side Drawer (filters panel)

```tsx
<Drawer side="right">
  <DrawerTrigger render={<Button variant="outline" startIcon={<RiFilter3Line />}>Filters</Button>} />
  <DrawerPortal>
    <DrawerBackdrop />
    <DrawerPopup>
      <DrawerTitle>Filter products</DrawerTitle>
      {/* filter content */}
      <DrawerClose render={<Button variant="outline" colorScheme="neutral" fullWidth className="mt-6">Close</Button>} />
    </DrawerPopup>
  </DrawerPortal>
</Drawer>
```

---

## Navigation Patterns

### Tabs with URL sync

```tsx
const [tab, setTab] = useSearchParams('tab', 'overview');

<Tabs value={tab} onValueChange={setTab}>
  <TabsList>
    <TabsTab value="overview">Overview</TabsTab>
    <TabsTab value="activity">Activity</TabsTab>
    <TabsTab value="settings">Settings</TabsTab>
  </TabsList>
  <TabsPanels>
    <TabsPanel value="overview"><OverviewPanel /></TabsPanel>
    <TabsPanel value="activity"><ActivityPanel /></TabsPanel>
    <TabsPanel value="settings"><SettingsPanel /></TabsPanel>
  </TabsPanels>
</Tabs>
```

### Vertical Tabs (sidebar navigation)

```tsx
<Tabs orientation="vertical" defaultValue="general">
  <TabsList className="w-48 shrink-0">
    <TabsTab value="general">General</TabsTab>
    <TabsTab value="security">Security</TabsTab>
    <TabsTab value="billing">Billing</TabsTab>
  </TabsList>
  <TabsPanels>
    <TabsPanel value="general"><GeneralSettings /></TabsPanel>
    <TabsPanel value="security"><SecuritySettings /></TabsPanel>
    <TabsPanel value="billing"><BillingSettings /></TabsPanel>
  </TabsPanels>
</Tabs>
```

---

## Accordion Patterns

### FAQ Section

```tsx
<Accordion multiple defaultValue={['q1']}>
  <AccordionItem value="q1">
    <AccordionTrigger>What is the return policy?</AccordionTrigger>
    <AccordionPanel>
      Items can be returned within 30 days in original condition.
    </AccordionPanel>
  </AccordionItem>
  <AccordionItem value="q2">
    <AccordionTrigger>How long does shipping take?</AccordionTrigger>
    <AccordionPanel>
      Standard shipping takes 3–5 business days.
    </AccordionPanel>
  </AccordionItem>
  <AccordionItem value="q3" disabled>
    <AccordionTrigger>International shipping (coming soon)</AccordionTrigger>
    <AccordionPanel>Not yet available.</AccordionPanel>
  </AccordionItem>
</Accordion>
```

---

## Data Table Patterns

### Table with status badges

```tsx
<Card variant="default">
  <CardHeader>
    <CardTitle>Orders</CardTitle>
  </CardHeader>
  <CardContent className="p-0">
    <Table size="md">
      <TableHeader>
        <TableRow>
          <TableHead>Order</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map(o => (
          <TableRow key={o.id}>
            <TableCell className="font-medium">#{o.id}</TableCell>
            <TableCell>{o.customer}</TableCell>
            <TableCell>
              <Badge
                variant="soft"
                size="sm"
                className={
                  o.status === 'paid' ? 'text-state-success' :
                  o.status === 'pending' ? 'text-state-warning' :
                  'text-state-error'
                }
              >
                {o.status}
              </Badge>
            </TableCell>
            <TableCell>${o.amount.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </CardContent>
</Card>
```

---

## Toast Patterns

```tsx
// Setup: wrap app root
<ToastProvider swipeDirection="right">
  <App />
  <ToastViewport />
</ToastProvider>

// Trigger toasts
const { toast } = useToast();

// Success
toast({ title: 'Changes saved', variant: 'success' });

// Error with description
toast({
  title: 'Upload failed',
  description: 'File size exceeds the 10MB limit.',
  variant: 'error',
  duration: 6000,
});

// With action
toast({
  title: 'Item deleted',
  variant: 'default',
  action: { label: 'Undo', onClick: () => restoreItem() },
});
```

---

## Loading & Empty States

### Loading skeleton

```tsx
<Card variant="default">
  <CardContent className="flex gap-3 items-center">
    <Skeleton variant="circular" className="w-10 h-10 shrink-0" />
    <div className="flex-1 flex flex-col gap-2">
      <Skeleton variant="text" className="h-4 w-3/4" />
      <Skeleton variant="text" className="h-3 w-1/2" />
    </div>
  </CardContent>
</Card>
```

### Async button

```tsx
const [loading, setLoading] = useState(false);

async function handleSave() {
  setLoading(true);
  try {
    await saveData();
    toast({ title: 'Saved', variant: 'success' });
  } catch {
    toast({ title: 'Error saving', variant: 'error' });
  } finally {
    setLoading(false);
  }
}

<Button variant="solid" colorScheme="primary" loading={loading} onClick={handleSave}>
  Save changes
</Button>
```

---

## Accessibility Checklist

- ✅ All form inputs wrapped in `FormField` with `name` and `invalid` props
- ✅ `FormLabel` (not `Label`) used inside `FormField`
- ✅ `IconButton` always has `aria-label`
- ✅ Dialogs use `DialogTitle` + `DialogDescription` for screen reader context
- ✅ `Button loading` prop used instead of custom disabled+spinner
- ✅ No raw hex colors (zero visual regression risk with theme changes)
- ✅ Focus rings use `ring-border-focus` and `ring-offset-background-primary`
- ✅ Interactive elements not inside other interactive elements
