import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Form } from './Form';
import {
  FormSection,
  FormField,
  FormLabel,
  FormDescription,
  FormMessage,
  FormActions,
} from './Form';
import { Input } from '../Input/Input';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Composable form layout primitives built on Base UI Field. Provides accessible label/error/description linking without coupling to a specific validation library.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    layout: { control: 'select', options: ['vertical', 'horizontal'] },
  },
  args: {
    layout: 'vertical',
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => (
    <Form {...args} className="max-w-md">
      <FormField name="name">
        <FormLabel required>Full name</FormLabel>
        <Input placeholder="Jane Doe" />
      </FormField>
      <FormField name="email">
        <FormLabel required>Email address</FormLabel>
        <Input type="email" placeholder="jane@example.com" />
      </FormField>
      <FormActions>
        <Button type="submit">Save changes</Button>
        <Button variant="ghost" colorScheme="neutral" type="reset">
          Cancel
        </Button>
      </FormActions>
    </Form>
  ),
};

// ── WithValidation ─────────────────────────────────────────────────────────

export const WithValidation: Story = {
  render: (args) => {
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState('');
    const emailInvalid = submitted && !email.includes('@');

    return (
      <Form
        {...args}
        className="max-w-md"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <FormField name="email" invalid={emailInvalid}>
          <FormLabel required>Email address</FormLabel>
          <Input
            type="email"
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailInvalid}
          />
          <FormMessage>Please enter a valid email address.</FormMessage>
        </FormField>
        <FormActions>
          <Button type="submit">Submit</Button>
        </FormActions>
      </Form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Click Submit with an invalid email to see the error state. `FormField invalid` triggers `Field.Root` context so `FormMessage` (Field.Error) renders automatically.',
      },
    },
  },
};

// ── WithDescription ────────────────────────────────────────────────────────

export const WithDescription: Story = {
  render: (args) => (
    <Form {...args} className="max-w-md">
      <FormField name="username">
        <FormLabel>Username</FormLabel>
        <Input placeholder="jane_doe" />
        <FormDescription>
          Only letters, numbers, and underscores. 3–20 characters.
        </FormDescription>
      </FormField>
      <FormField name="bio">
        <FormLabel>Bio</FormLabel>
        <Textarea placeholder="Tell us a little about yourself…" />
        <FormDescription>Maximum 160 characters.</FormDescription>
      </FormField>
      <FormActions>
        <Button type="submit">Update profile</Button>
      </FormActions>
    </Form>
  ),
};

// ── Disabled ───────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: (args) => (
    <Form {...args} className="max-w-md">
      <FormField name="name" disabled>
        <FormLabel>Full name</FormLabel>
        <Input placeholder="Jane Doe" disabled />
        <FormDescription>This field cannot be edited.</FormDescription>
      </FormField>
      <FormField name="email" disabled>
        <FormLabel required>Email address</FormLabel>
        <Input type="email" placeholder="jane@example.com" disabled />
      </FormField>
      <FormActions>
        <Button disabled>Save changes</Button>
      </FormActions>
    </Form>
  ),
};

// ── WithSections ───────────────────────────────────────────────────────────

export const WithSections: Story = {
  render: (args) => (
    <Form {...args} className="max-w-lg">
      <FormSection
        title="Personal information"
        description="This information will be displayed on your public profile."
      >
        <FormField name="firstName">
          <FormLabel required>First name</FormLabel>
          <Input placeholder="Jane" />
        </FormField>
        <FormField name="lastName">
          <FormLabel required>Last name</FormLabel>
          <Input placeholder="Doe" />
        </FormField>
        <FormField name="bio">
          <FormLabel>Bio</FormLabel>
          <Textarea placeholder="Tell us about yourself…" />
          <FormDescription>Maximum 160 characters.</FormDescription>
        </FormField>
      </FormSection>
      <FormSection
        title="Contact"
        description="How can we reach you?"
      >
        <FormField name="email">
          <FormLabel required>Email</FormLabel>
          <Input type="email" placeholder="jane@example.com" />
        </FormField>
        <FormField name="phone">
          <FormLabel>Phone</FormLabel>
          <Input type="tel" placeholder="+1 555 000 0000" />
          <FormDescription>Optional — for account recovery only.</FormDescription>
        </FormField>
      </FormSection>
      <FormActions>
        <Button type="submit">Save profile</Button>
        <Button variant="ghost" colorScheme="neutral" type="reset">
          Discard
        </Button>
      </FormActions>
    </Form>
  ),
};

// ── Overview ───────────────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-10 p-8 rounded-2xl bg-surface-primary max-w-lg">
      {/* Normal state */}
      <div>
        <p className="text-xs font-semibold text-content-tertiary uppercase tracking-wider mb-4">
          Default
        </p>
        <Form className="max-w-md">
          <FormField name="name">
            <FormLabel required>Full name</FormLabel>
            <Input placeholder="Jane Doe" />
          </FormField>
          <FormField name="email">
            <FormLabel required>Email</FormLabel>
            <Input type="email" placeholder="jane@example.com" />
            <FormDescription>We'll never share your email.</FormDescription>
          </FormField>
          <FormActions>
            <Button type="submit">Submit</Button>
          </FormActions>
        </Form>
      </div>

      {/* Error state */}
      <div>
        <p className="text-xs font-semibold text-content-tertiary uppercase tracking-wider mb-4">
          Validation error
        </p>
        <Form className="max-w-md">
          <FormField name="email" invalid>
            <FormLabel required>Email</FormLabel>
            <Input
              type="email"
              placeholder="jane@example.com"
              error
              defaultValue="not-an-email"
            />
            <FormMessage>Please enter a valid email address.</FormMessage>
          </FormField>
          <FormActions>
            <Button type="submit">Submit</Button>
          </FormActions>
        </Form>
      </div>

      {/* Disabled state */}
      <div>
        <p className="text-xs font-semibold text-content-tertiary uppercase tracking-wider mb-4">
          Disabled
        </p>
        <Form className="max-w-md">
          <FormField name="email" disabled>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="jane@example.com"
              disabled
              defaultValue="jane@example.com"
            />
            <FormDescription>This field is read-only.</FormDescription>
          </FormField>
          <FormActions>
            <Button disabled>Submit</Button>
          </FormActions>
        </Form>
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
};
