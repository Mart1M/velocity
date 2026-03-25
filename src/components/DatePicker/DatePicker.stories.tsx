import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { DatePicker } from './DatePicker';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Local **date selection** (`YYYY-MM-DD`). Use `mode="range"` for an inclusive **start/end** range. Built with **Popover** (Base UI) and an accessible calendar grid. There is no dedicated `@base-ui` date picker in the current package version.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    weekStartsOn: { control: 'select', options: [0, 1] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: {
    size: 'md',
    disabled: false,
    error: false,
    placeholder: 'Select a date',
    weekStartsOn: 1,
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultStory() {
    const [value, setValue] = React.useState<string | null>(null);
    return (
      <div className="w-72">
        <DatePicker value={value} onValueChange={setValue} label="Date" />
      </div>
    );
  },
};

export const WithValue: Story = {
  render: function WithValueStory() {
    const [value, setValue] = React.useState<string | null>('2026-06-15');
    return (
      <div className="w-72">
        <DatePicker value={value} onValueChange={setValue} label="Event" />
      </div>
    );
  },
};

export const Range: Story = {
  render: function RangeStory() {
    const [value, setValue] = React.useState<{
      start: string;
      end: string;
    } | null>(null);
    return (
      <div className="w-80">
        <DatePicker
          mode="range"
          value={value}
          onValueChange={setValue}
          label="Check-in / check-out"
          helperText="First click: start date. Second click: end date."
        />
      </div>
    );
  },
};

export const RangeWithValue: Story = {
  render: function RangeWithValueStory() {
    const [value, setValue] = React.useState<{
      start: string;
      end: string;
    } | null>({
      start: '2026-03-10',
      end: '2026-03-24',
    });
    return (
      <div className="w-80">
        <DatePicker
          mode="range"
          value={value}
          onValueChange={setValue}
          label="Trip"
          nameStart="startDate"
          nameEnd="endDate"
        />
      </div>
    );
  },
};

export const MinMax: Story = {
  render: function MinMaxStory() {
    const [value, setValue] = React.useState<string | null>(null);
    return (
      <div className="w-72">
        <DatePicker
          value={value}
          onValueChange={setValue}
          label="Within range"
          minDate="2026-01-01"
          maxDate="2026-12-31"
          helperText="Between Jan 1 and Dec 31, 2026"
        />
      </div>
    );
  },
};

export const Error: Story = {
  render: function ErrorStory() {
    const [value, setValue] = React.useState<string | null>(null);
    return (
      <div className="w-72">
        <DatePicker
          value={value}
          onValueChange={setValue}
          label="Required date"
          error
          helperText="Pick a date to continue."
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: function SizesStory() {
    const [a, setA] = React.useState<string | null>(null);
    const [b, setB] = React.useState<string | null>(null);
    const [c, setC] = React.useState<string | null>(null);
    return (
      <div className="flex w-80 flex-col gap-4">
        <DatePicker size="sm" value={a} onValueChange={setA} label="Small" />
        <DatePicker size="md" value={b} onValueChange={setB} label="Medium" />
        <DatePicker size="lg" value={c} onValueChange={setC} label="Large" />
      </div>
    );
  },
  parameters: { layout: 'padded' },
};

export const FrenchLocale: Story = {
  render: function FrenchLocaleStory() {
    const [value, setValue] = React.useState<string | null>(null);
    return (
      <div className="w-72">
        <DatePicker value={value} onValueChange={setValue} label="French locale (fr-FR)" locale="fr-FR" />
      </div>
    );
  },
};

export const Overview: Story = {
  render: function OverviewStory() {
    const [value, setValue] = React.useState<string | null>('2026-03-15');
    return (
      <div className="rounded-2xl bg-surface-primary p-8">
        <div className="w-72">
          <DatePicker
            value={value}
            onValueChange={setValue}
            label="Date"
            helperText="Light theme / primary surface"
          />
        </div>
      </div>
    );
  },
  parameters: { layout: 'fullscreen' },
};
