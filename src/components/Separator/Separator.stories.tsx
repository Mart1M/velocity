import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "./Separator";

const meta = {
  title: "Components/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Accessible divider with role="separator" and aria-orientation. Wraps [Base UI Separator](https://base-ui.com/react/components/separator) with semantic border tokens.',
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};

export const VerticalInToolbar: Story = {
  args: {
    orientation: "vertical",
    className: "h-5",
  },
  decorators: [
    (Story) => (
      <div className="flex items-center gap-2">
        <span className="text-sm text-content-secondary">A</span>
        <Story />
        <span className="text-sm text-content-secondary">B</span>
      </div>
    ),
  ],
};
