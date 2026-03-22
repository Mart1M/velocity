import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A multi-line text input for customer reviews, order messages, and other long-form content. Built on a native `<textarea>` element with semantic token styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Visual size of the textarea',
    },
    error: {
      control: 'boolean',
      description: 'Error state — red border and error-styled helper text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the textarea',
    },
    label: {
      control: 'text',
      description: 'Accessible label rendered above the textarea',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the textarea',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    rows: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Number of visible text rows',
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Resize behaviour',
    },
  },
  args: {
    size: 'md',
    error: false,
    disabled: false,
    placeholder: 'Type something…',
    rows: 4,
    resize: 'vertical',
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Core states ────────────────────────────────────────────────────────────

export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: { placeholder: 'Write your review here…' },
};

export const WithLabelAndHelper: Story = {
  args: {
    label: 'Customer review',
    placeholder: 'Share your experience with this product…',
    helperText: 'Your review helps other shoppers make better decisions.',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Order message',
    placeholder: 'Add a note to your order…',
    error: true,
    helperText: 'This field is required.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled textarea',
    placeholder: 'Cannot interact',
    disabled: true,
    helperText: 'This textarea is currently disabled.',
  },
};

// ─── Resize variants ────────────────────────────────────────────────────────

export const NoResize: Story = {
  args: {
    label: 'Fixed height',
    placeholder: 'This textarea cannot be resized…',
    resize: 'none',
  },
};

export const ResizeBoth: Story = {
  args: {
    label: 'Resize both directions',
    placeholder: 'Drag the corner to resize…',
    resize: 'both',
  },
};

// ─── Sizes ──────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Textarea size="sm" placeholder="Small textarea" label="Small (sm)" rows={3} />
      <Textarea size="md" placeholder="Medium textarea" label="Medium (md)" rows={3} />
      <Textarea size="lg" placeholder="Large textarea" label="Large (lg)" rows={3} />
    </div>
  ),
  parameters: { layout: 'padded' },
};

// ─── E-commerce overview ─────────────────────────────────────────────────────

export const EcommerceOverview: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8 bg-background-primary rounded-2xl w-[480px]">
      <div>
        <span className="text-xs font-semibold text-content-tertiary uppercase tracking-widest">
          Customer Review
        </span>
        <div className="mt-2">
          <Textarea
            label="Your review"
            placeholder="What did you think of this product?"
            helperText="Minimum 20 characters."
            rows={4}
          />
        </div>
      </div>

      <div>
        <span className="text-xs font-semibold text-content-tertiary uppercase tracking-widest">
          Order Note
        </span>
        <div className="mt-2">
          <Textarea
            label="Message to seller"
            placeholder="Add gift wrapping instructions, delivery notes…"
            helperText="Optional — the seller will see this with your order."
            rows={3}
          />
        </div>
      </div>

      <div>
        <span className="text-xs font-semibold text-content-tertiary uppercase tracking-widest">
          Return Reason
        </span>
        <div className="mt-2">
          <Textarea
            label="Why are you returning this item?"
            placeholder="Please describe the issue…"
            rows={3}
            resize="none"
          />
        </div>
      </div>

      <div>
        <span className="text-xs font-semibold text-content-tertiary uppercase tracking-widest">
          Error State
        </span>
        <div className="mt-2">
          <Textarea
            label="Feedback"
            placeholder="Tell us what went wrong…"
            error
            helperText="Please provide at least 20 characters."
            rows={3}
          />
        </div>
      </div>

      <div>
        <span className="text-xs font-semibold text-content-tertiary uppercase tracking-widest">
          Disabled
        </span>
        <div className="mt-2">
          <Textarea
            label="Archived feedback"
            defaultValue="This product was amazing! Great quality and fast shipping."
            disabled
            rows={3}
            resize="none"
          />
        </div>
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
};
