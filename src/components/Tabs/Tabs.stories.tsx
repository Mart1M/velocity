import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTab, TabsPanel } from "./Tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible tabs for toggling between related panels. Built on Base UI Tabs.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
  args: {
    orientation: "horizontal",
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tabs defaultValue="description" {...args}>
      <TabsList>
        <TabsTab value="description">Description</TabsTab>
        <TabsTab value="reviews">Reviews</TabsTab>
        <TabsTab value="specs">Specifications</TabsTab>
      </TabsList>
      <TabsPanel value="description">
        <p>
          Premium wireless headphones with active noise cancellation. Enjoy
          crystal-clear audio and all-day comfort with memory foam ear cushions.
        </p>
      </TabsPanel>
      <TabsPanel value="reviews">
        <p>
          ★★★★★ &mdash; &ldquo;Best headphones I&rsquo;ve ever owned. The noise
          cancellation is incredible.&rdquo;
        </p>
      </TabsPanel>
      <TabsPanel value="specs">
        <ul className="list-disc pl-5 space-y-1">
          <li>Driver size: 40mm</li>
          <li>Frequency response: 20Hz–20kHz</li>
          <li>Battery life: 30 hours</li>
          <li>Bluetooth 5.3</li>
        </ul>
      </TabsPanel>
    </Tabs>
  ),
};

export const WithDisabledTab: Story = {
  render: (args) => (
    <Tabs defaultValue="description" {...args}>
      <TabsList>
        <TabsTab value="description">Description</TabsTab>
        <TabsTab value="reviews">Reviews</TabsTab>
        <TabsTab value="specs" disabled>
          Specifications
        </TabsTab>
      </TabsList>
      <TabsPanel value="description">
        <p>This product has a detailed description.</p>
      </TabsPanel>
      <TabsPanel value="reviews">
        <p>Customer reviews will appear here.</p>
      </TabsPanel>
      <TabsPanel value="specs">
        <p>Specifications are currently unavailable.</p>
      </TabsPanel>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="description" orientation="vertical">
      <TabsList>
        <TabsTab value="description">Description</TabsTab>
        <TabsTab value="reviews">Reviews</TabsTab>
        <TabsTab value="specs">Specifications</TabsTab>
      </TabsList>
      <TabsPanel value="description">
        <div className="pl-4">
          <p>
            Premium wireless headphones with active noise cancellation and
            all-day comfort.
          </p>
        </div>
      </TabsPanel>
      <TabsPanel value="reviews">
        <div className="pl-4">
          <p>★★★★★ &mdash; &ldquo;Incredible sound quality.&rdquo;</p>
        </div>
      </TabsPanel>
      <TabsPanel value="specs">
        <div className="pl-4">
          <ul className="list-disc pl-5 space-y-1">
            <li>40mm drivers</li>
            <li>30-hour battery</li>
            <li>Bluetooth 5.3</li>
          </ul>
        </div>
      </TabsPanel>
    </Tabs>
  ),
};

export const NumericValues: Story = {
  render: (args) => (
    <Tabs defaultValue={0} {...args}>
      <TabsList>
        <TabsTab value={0}>Tab 1</TabsTab>
        <TabsTab value={1}>Tab 2</TabsTab>
        <TabsTab value={2}>Tab 3</TabsTab>
      </TabsList>
      <TabsPanel value={0}>
        <p>Content for Tab 1</p>
      </TabsPanel>
      <TabsPanel value={1}>
        <p>Content for Tab 2</p>
      </TabsPanel>
      <TabsPanel value={2}>
        <p>Content for Tab 3</p>
      </TabsPanel>
    </Tabs>
  ),
};

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-10 p-8 rounded-2xl bg-surface-primary min-w-[480px]">
      {/* Horizontal */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          Horizontal
        </p>
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTab value="description">Description</TabsTab>
            <TabsTab value="reviews">Reviews</TabsTab>
            <TabsTab value="specs">Specifications</TabsTab>
          </TabsList>
          <TabsPanel value="description">
            <p>Premium wireless headphones with active noise cancellation.</p>
          </TabsPanel>
          <TabsPanel value="reviews">
            <p>★★★★★ &mdash; &ldquo;Best headphones ever.&rdquo;</p>
          </TabsPanel>
          <TabsPanel value="specs">
            <p>40mm drivers · 30h battery · Bluetooth 5.3</p>
          </TabsPanel>
        </Tabs>
      </div>

      {/* With disabled tab */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          Disabled tab
        </p>
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTab value="description">Description</TabsTab>
            <TabsTab value="reviews">Reviews</TabsTab>
            <TabsTab value="specs" disabled>
              Specifications
            </TabsTab>
          </TabsList>
          <TabsPanel value="description">
            <p>The Specifications tab is disabled.</p>
          </TabsPanel>
          <TabsPanel value="reviews">
            <p>Customer reviews appear here.</p>
          </TabsPanel>
          <TabsPanel value="specs">
            <p>Specifications unavailable.</p>
          </TabsPanel>
        </Tabs>
      </div>

      {/* Vertical */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
          Vertical
        </p>
        <Tabs defaultValue="description" orientation="vertical">
          <TabsList>
            <TabsTab value="description">Description</TabsTab>
            <TabsTab value="reviews">Reviews</TabsTab>
            <TabsTab value="specs">Specifications</TabsTab>
          </TabsList>
          <TabsPanel value="description">
            <div className="pl-4">
              <p>Content panel for vertical tabs layout.</p>
            </div>
          </TabsPanel>
          <TabsPanel value="reviews">
            <div className="pl-4">
              <p>Reviews panel for vertical layout.</p>
            </div>
          </TabsPanel>
          <TabsPanel value="specs">
            <div className="pl-4">
              <p>Specifications panel for vertical layout.</p>
            </div>
          </TabsPanel>
        </Tabs>
      </div>
    </div>
  ),
  parameters: { layout: "padded" },
};
