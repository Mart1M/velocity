import type { Meta, StoryObj } from "@storybook/react-vite";

/**
 * Showcase only — semantic roles come from `semantic-typography.json`
 * and ship as Tailwind `@utility` classes in `tokens.css` (e.g. `text-heading-1`).
 */
function TypographyScale() {
  return null;
}

const meta: Meta<typeof TypographyScale> = {
  title: "Foundations/Typography",
  component: TypographyScale,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Composite styles from `semantic-typography.json`: each **`text-*`** class sets font family, size, line height, weight, and letter-spacing. **`text-heading-*` uses Sora**; body/caption/overline use Inter (`font.family.sans`). Load Sora in your app or use Storybook’s font import.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sample =
  "Runswap — the community to swap and resell your race bibs.";

export const SemanticTextStyles: Story = {
  name: "Semantic text styles",
  parameters: {
    docs: {
      description: {
        story:
          'Use these classes after `@import "@runswap/velocity/styles"` (or the Storybook preview CSS that includes them).',
      },
    },
  },
  render: () => (
    <div className="mx-auto max-w-2xl space-y-10 font-sans text-content-primary">
      <header className="space-y-1 border-b border-border-default pb-6">
        <p className="text-overline uppercase text-content-tertiary">
          Foundations
        </p>
        <h2 className="text-heading-2">Type scale</h2>
        <p className="text-body text-content-secondary">
          Preview of <code className="text-caption">text-heading-*</code>,{" "}
          <code className="text-caption">text-body*</code>, <code className="text-caption">text-caption</code>, and{" "}
          <code className="text-caption">text-overline</code>.
        </p>
      </header>

      <section className="space-y-6">
        <h3 className="text-heading-4 text-content-tertiary">Headings</h3>
        <div className="space-y-0 divide-y divide-border-subtle *:py-6 first:*:pt-0">
          <div>
            <p className="text-caption mb-2 text-content-tertiary">text-heading-1</p>
            <p className="text-heading-1">{sample}</p>
          </div>
          <div>
            <p className="text-caption mb-2 text-content-tertiary">text-heading-2</p>
            <p className="text-heading-2">{sample}</p>
          </div>
          <div>
            <p className="text-caption mb-2 text-content-tertiary">text-heading-3</p>
            <p className="text-heading-3">{sample}</p>
          </div>
          <div>
            <p className="text-caption mb-2 text-content-tertiary">text-heading-4</p>
            <p className="text-heading-4">{sample}</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-heading-4 text-content-tertiary">Body</h3>
        <div className="space-y-0 divide-y divide-border-subtle *:py-6 first:*:pt-0">
          <div>
            <p className="text-caption mb-2 text-content-tertiary">text-body-lg</p>
            <p className="text-body-lg">{sample}</p>
          </div>
          <div>
            <p className="text-caption mb-2 text-content-tertiary">text-body</p>
            <p className="text-body">{sample}</p>
          </div>
          <div>
            <p className="text-caption mb-2 text-content-tertiary">text-body-sm</p>
            <p className="text-body-sm">{sample}</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-heading-4 text-content-tertiary">Meta & labels</h3>
        <div className="space-y-0 divide-y divide-border-subtle *:py-6 first:*:pt-0">
          <div>
            <p className="text-caption mb-2 text-content-tertiary">text-caption</p>
            <p className="text-caption text-content-secondary">{sample}</p>
          </div>
          <div>
            <p className="text-caption mb-2 text-content-tertiary">text-overline + uppercase</p>
            <p className="text-overline uppercase text-content-tertiary">New · Trail</p>
          </div>
        </div>
      </section>
    </div>
  ),
};

export const OnBrandBackground: Story = {
  name: "On brand background",
  parameters: {
    docs: {
      description: {
        story: "Same utilities with `text-content-inverse` on a brand background.",
      },
    },
  },
  render: () => (
    <div className="rounded-2xl bg-background-brand p-8 font-sans text-content-inverse">
      <p className="text-overline mb-3 uppercase opacity-90">Hero section</p>
      <p className="text-heading-3 mb-4">Ready for your next race?</p>
      <p className="text-body mb-6 opacity-95">{sample}</p>
      <p className="text-caption opacity-80">Price incl. tax — ships within 48h</p>
    </div>
  ),
};
