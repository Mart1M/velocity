import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../Badge";
import {
  RaceCard,
  RaceCardBadges,
  RaceCardContent,
  RaceCardDate,
  RaceCardDistances,
  RaceCardImage,
  RaceCardLocation,
  RaceCardTitle,
} from "./RaceCard";

const meta: Meta<typeof RaceCard> = {
  title: "Components/RaceCard",
  component: RaceCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Race listing card based on the same composition model as **ProductCard**: image with **`RaceCardBadges`** for the **type de course** (e.g. badge « Course sur route »), then date, name, location, and distances (string or list as pills). Use **`RaceCardRaceType`** in the body when you need the type repeated with the run icon. **Remix icons** (`react-icons/ri`) prefix date, type, title, location, and distances; set `showIcons={false}` to hide them. Use `href` for a linked card.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    showIcons: { control: "boolean" },
  },
  args: {
    size: "md",
    disabled: false,
    showIcons: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const IMG =
  "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=400&fit=crop";

export const Default: Story = {
  render: (args) => (
    <div className="w-[320px]">
      <RaceCard {...args} href="#">
        <RaceCardImage src={IMG} alt="">
          <RaceCardBadges>
            <Badge variant="brand" size="sm">
              Course sur route
            </Badge>
          </RaceCardBadges>
        </RaceCardImage>
        <RaceCardContent>
          <RaceCardDate>12 octobre 2026</RaceCardDate>
          <RaceCardTitle>10 km de Lille</RaceCardTitle>
          <RaceCardLocation>Lille, France</RaceCardLocation>
          <RaceCardDistances distances={["5 km", "10 km", "Semi-marathon"]} />
        </RaceCardContent>
      </RaceCard>
    </div>
  ),
};

export const DistancesAsString: Story = {
  name: "Distances (single line)",
  render: () => (
    <div className="w-[320px]">
      <RaceCard href="#">
        <RaceCardImage src={IMG} alt="">
          <RaceCardBadges>
            <Badge variant="brand" size="sm">
              Trail
            </Badge>
          </RaceCardBadges>
        </RaceCardImage>
        <RaceCardContent>
          <RaceCardDate>12 octobre 2026</RaceCardDate>
          <RaceCardTitle>Wildstrubel by UTMB</RaceCardTitle>
          <RaceCardLocation>Crans-Montana, Suisse</RaceCardLocation>
          <RaceCardDistances distances="Wild 110 · Wild 70 · Wild 55" />
        </RaceCardContent>
      </RaceCard>
    </div>
  ),
};
