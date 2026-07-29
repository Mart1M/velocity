import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderRoot,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from "./Slider";

const meta = {
  title: "Components/Slider",
  component: SliderRoot,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Range input for selecting one or more values. Built on [Base UI Slider](https://base-ui.com/react/components/slider) with semantic Velocity tokens. Always provide a visible `<SliderLabel>` or `aria-label` on each `<SliderThumb>`.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    defaultValue: { control: "number" },
  },
  args: {
    size: "md",
    disabled: false,
    orientation: "horizontal",
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 40,
  },
  decorators: [
    (Story) => (
      <div className="w-80 max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SliderRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <SliderRoot {...args}>
      <SliderLabel>Volume</SliderLabel>
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
          <SliderThumb aria-label="Volume" />
        </SliderTrack>
      </SliderControl>
    </SliderRoot>
  ),
};

export const WithValue: Story = {
  render: (args) => (
    <SliderRoot {...args}>
      <div className="flex items-center justify-between gap-3">
        <SliderLabel>Brightness</SliderLabel>
        <SliderValue />
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
          <SliderThumb aria-label="Brightness" />
        </SliderTrack>
      </SliderControl>
    </SliderRoot>
  ),
};

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    min: 0,
    max: 100,
  },
  render: (args) => (
    <SliderRoot {...args}>
      <div className="flex items-center justify-between gap-3">
        <SliderLabel>Price range</SliderLabel>
        <SliderValue>
          {(formatted) => formatted.join(" – ")}
        </SliderValue>
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
          <SliderThumb index={0} aria-label="Minimum price" />
          <SliderThumb index={1} aria-label="Maximum price" />
        </SliderTrack>
      </SliderControl>
    </SliderRoot>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 60,
  },
  render: (args) => (
    <SliderRoot {...args}>
      <SliderLabel>Disabled</SliderLabel>
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
          <SliderThumb aria-label="Disabled slider" />
        </SliderTrack>
      </SliderControl>
    </SliderRoot>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    defaultValue: 35,
  },
  decorators: [
    (Story) => (
      <div className="h-64">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <SliderRoot {...args}>
      <SliderLabel>Level</SliderLabel>
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
          <SliderThumb aria-label="Level" />
        </SliderTrack>
      </SliderControl>
    </SliderRoot>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-8">
      {(["sm", "md", "lg"] as const).map((size) => (
        <SliderRoot key={size} size={size} defaultValue={50}>
          <SliderLabel className="capitalize">{size}</SliderLabel>
          <SliderControl>
            <SliderTrack>
              <SliderIndicator />
              <SliderThumb aria-label={`${size} slider`} />
            </SliderTrack>
          </SliderControl>
        </SliderRoot>
      ))}
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-10 rounded-2xl bg-surface-primary p-8">
      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          Single value
        </p>
        <Slider defaultValue={40}>
          <div className="flex items-center justify-between gap-3">
            <SliderLabel>Volume</SliderLabel>
            <SliderValue />
          </div>
          <SliderControl>
            <SliderTrack>
              <SliderIndicator />
              <SliderThumb aria-label="Volume" />
            </SliderTrack>
          </SliderControl>
        </Slider>
      </div>

      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          Range
        </p>
        <Slider defaultValue={[20, 80]}>
          <div className="flex items-center justify-between gap-3">
            <SliderLabel>Distance (km)</SliderLabel>
            <SliderValue>{(values) => values.join(" – ")}</SliderValue>
          </div>
          <SliderControl>
            <SliderTrack>
              <SliderIndicator />
              <SliderThumb index={0} aria-label="Minimum distance" />
              <SliderThumb index={1} aria-label="Maximum distance" />
            </SliderTrack>
          </SliderControl>
        </Slider>
      </div>

      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          Disabled
        </p>
        <Slider defaultValue={65} disabled>
          <SliderLabel>Unavailable</SliderLabel>
          <SliderControl>
            <SliderTrack>
              <SliderIndicator />
              <SliderThumb aria-label="Unavailable slider" />
            </SliderTrack>
          </SliderControl>
        </Slider>
      </div>
    </div>
  ),
  parameters: { layout: "padded" },
};
