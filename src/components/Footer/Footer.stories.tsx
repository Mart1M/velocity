import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Footer,
  FooterBottom,
  FooterContent,
  FooterLink,
  FooterSection,
  FooterSectionTitle,
} from "./Footer";

const meta = {
  title: "Components/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Page footer composed of semantic sub-components. Use `FooterContent` for the main column grid, `FooterSection` + `FooterSectionTitle` + `FooterLink` for link groups, and `FooterBottom` for the copyright bar.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "brand", "inverse"],
      description: "Visual style variant of the footer",
    },
  },
  args: {
    variant: "default",
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Shared content helper ──────────────────────────────────────────────────

function SampleContent() {
  return (
    <>
      <FooterContent>
        <FooterSection>
          <FooterSectionTitle>Shop</FooterSectionTitle>
          <FooterLink href="#">Running Shoes</FooterLink>
          <FooterLink href="#">Apparel</FooterLink>
          <FooterLink href="#">Accessories</FooterLink>
          <FooterLink href="#">Sale</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterSectionTitle>Sell</FooterSectionTitle>
          <FooterLink href="#">List an Item</FooterLink>
          <FooterLink href="#">Seller Guide</FooterLink>
          <FooterLink href="#">Pricing</FooterLink>
          <FooterLink href="#">Shipping</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterSectionTitle>Support</FooterSectionTitle>
          <FooterLink href="#">Help Center</FooterLink>
          <FooterLink href="#">Returns</FooterLink>
          <FooterLink href="#">Size Guide</FooterLink>
          <FooterLink href="#">Contact Us</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterSectionTitle>Company</FooterSectionTitle>
          <FooterLink href="#">About Runcycl</FooterLink>
          <FooterLink href="#">Blog</FooterLink>
          <FooterLink href="#">Careers</FooterLink>
          <FooterLink href="#">Press</FooterLink>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p className="text-body-sm text-content-tertiary">
          © 2024 Runcycl. All rights reserved.
        </p>
        <nav className="flex gap-6" aria-label="Legal links">
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
          <FooterLink href="#">Cookie Settings</FooterLink>
        </nav>
      </FooterBottom>
    </>
  );
}

// ── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => (
    <Footer {...args}>
      <SampleContent />
    </Footer>
  ),
};

// ── Brand ──────────────────────────────────────────────────────────────────

export const Brand: Story = {
  args: { variant: "brand" },
  render: (args) => (
    <Footer {...args}>
      <SampleContent />
    </Footer>
  ),
};

// ── Inverse ────────────────────────────────────────────────────────────────

export const Inverse: Story = {
  args: { variant: "inverse" },
  render: (args) => (
    <Footer {...args}>
      <SampleContent />
    </Footer>
  ),
};

// ── Minimal ────────────────────────────────────────────────────────────────

export const Minimal: Story = {
  render: (args) => (
    <Footer {...args}>
      <FooterBottom>
        <p className="text-body-sm text-content-tertiary">
          © 2024 Runcycl. All rights reserved.
        </p>
        <nav className="flex gap-6" aria-label="Legal links">
          <FooterLink href="#">Privacy</FooterLink>
          <FooterLink href="#">Terms</FooterLink>
        </nav>
      </FooterBottom>
    </Footer>
  ),
};

// ── Overview ───────────────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-0">
      <div className="px-6 py-3 bg-surface-tertiary">
        <p className="text-caption text-content-tertiary uppercase tracking-widest font-medium">
          Default
        </p>
      </div>
      <Footer variant="default">
        <SampleContent />
      </Footer>

      <div className="px-6 py-3 bg-surface-tertiary">
        <p className="text-caption text-content-tertiary uppercase tracking-widest font-medium">
          Brand
        </p>
      </div>
      <Footer variant="brand">
        <SampleContent />
      </Footer>

      <div className="px-6 py-3 bg-surface-tertiary">
        <p className="text-caption text-content-tertiary uppercase tracking-widest font-medium">
          Inverse
        </p>
      </div>
      <Footer variant="inverse">
        <SampleContent />
      </Footer>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};
