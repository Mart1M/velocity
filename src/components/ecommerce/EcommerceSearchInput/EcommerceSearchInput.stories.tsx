import type { Meta, StoryObj } from "@storybook/react-vite";
import { MapPinIcon } from "../../../icons";
import { EcommerceSearchInput } from "./EcommerceSearchInput";

const meta: Meta<typeof EcommerceSearchInput> = {
  title: "Ecommerce/EcommerceSearchInput",
  component: EcommerceSearchInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "Header / catalog **product search** field. Wraps `Input` with a default magnifier, `role='searchbox'`, and a **Hugeicons** clear control when the field has a value.",
          "Override `placeholder` and `aria-label` for your locale.",
        ].join(" "),
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
  },
  args: {
    size: "md",
    disabled: false,
    error: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FrenchLocale: Story = {
  args: {
    placeholder: "Rechercher un produit…",
    "aria-label": "Rechercher sur le site",
    clearLabel: "Effacer la recherche",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Search catalog",
    placeholder: "Brand, model, size…",
  },
};

export const WithError: Story = {
  args: {
    error: true,
    helperText: "Enter a search term to continue.",
    defaultValue: "",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "Nike Pegasus",
    clearLabel: "Clear search",
  },
};

export const CustomLeadingIcon: Story = {
  args: {
    leadingIcon: <MapPinIcon className="size-full" aria-hidden />,
    placeholder: "City or postcode…",
    "aria-label": "Search by location",
  },
};
