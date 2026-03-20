#!/usr/bin/env tsx
/**
 * build-tokens.ts
 *
 * Reads JSON design token files and generates src/styles/tokens.css
 * with a Tailwind v4 @theme block.
 *
 * Token references like {color.gray.950} are resolved to var(--color-gray-950).
 *
 * Usage:
 *   npm run build:tokens
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ── Types ─────────────────────────────────────────────────────────────────────

type RawToken = { $value: string; $type?: string };
type RawTokenTree = { [key: string]: RawTokenTree | RawToken };

// ── Load & flatten token files ────────────────────────────────────────────────

function loadJson(relativePath: string): RawTokenTree {
  const raw = readFileSync(resolve(ROOT, relativePath), 'utf-8');
  return JSON.parse(raw) as RawTokenTree;
}

function flattenTokens(node: RawTokenTree, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    const path = prefix ? `${prefix}.${key}` : key;

    if (value !== null && typeof value === 'object' && '$value' in value) {
      result[path] = String((value as RawToken).$value);
    } else if (value !== null && typeof value === 'object') {
      Object.assign(result, flattenTokens(value as RawTokenTree, path));
    }
  }

  return result;
}

const TOKEN_FILES = [
  'src/tokens/core/color.json',
  'src/tokens/core/typography.json',
  'src/tokens/semantic/semantic.json',
];

const allTokens = TOKEN_FILES.reduce<Record<string, string>>((acc, file) => {
  return { ...acc, ...flattenTokens(loadJson(file)) };
}, {});

// ── Reference resolver ────────────────────────────────────────────────────────

// {color.gray.950} → var(--color-gray-950)
function resolveValue(value: string): string {
  return value.replace(/\{([^}]+)\}/g, (_, ref: string) => {
    return `var(--${ref.replace(/\./g, '-')})`;
  });
}

// ── Category mapping ──────────────────────────────────────────────────────────
//
// Each entry maps a token path prefix to a CSS variable prefix.
// The order determines the order in the generated CSS.

interface Mapping {
  tokenPath: string; // prefix in the flat token map
  cssPrefix: string; // CSS variable prefix (without --)
  label: string;     // section comment
}

const MAPPINGS: Mapping[] = [
  // Core
  { tokenPath: 'color',                   cssPrefix: 'color',              label: 'Core — Colors'            },
  { tokenPath: 'font.family',             cssPrefix: 'font',               label: 'Core — Font families'     },

  // Semantic — Colors
  { tokenPath: 'velocity.background',     cssPrefix: 'color-background',   label: 'Semantic — Background'    },
  { tokenPath: 'velocity.surface',        cssPrefix: 'color-surface',      label: 'Semantic — Surface'       },
  { tokenPath: 'velocity.content',        cssPrefix: 'color-content',      label: 'Semantic — Content'       },
  { tokenPath: 'velocity.border',         cssPrefix: 'color-border',       label: 'Semantic — Border'        },
  { tokenPath: 'velocity.accent',         cssPrefix: 'color-accent',       label: 'Semantic — Accent'        },
  { tokenPath: 'velocity.brand',          cssPrefix: 'color-brand',        label: 'Semantic — Brand'         },
  { tokenPath: 'velocity.state',          cssPrefix: 'color-state',        label: 'Semantic — State'         },
  { tokenPath: 'velocity.feedback',       cssPrefix: 'color-feedback',     label: 'Semantic — Feedback'      },

  // Semantic — Other
  { tokenPath: 'velocity.elevation',      cssPrefix: 'shadow',             label: 'Semantic — Elevation'     },
  { tokenPath: 'velocity.motion.duration',cssPrefix: 'duration',           label: 'Semantic — Duration'      },
  { tokenPath: 'velocity.motion.easing',  cssPrefix: 'ease',               label: 'Semantic — Easing'        },
];

// ── Build @theme block ────────────────────────────────────────────────────────

function buildThemeBlock(): string {
  const sections: string[] = [];

  for (const { tokenPath, cssPrefix, label } of MAPPINGS) {
    const prefix = tokenPath + '.';

    const entries = Object.entries(allTokens).filter(
      ([path]) => path === tokenPath || path.startsWith(prefix)
    );

    if (entries.length === 0) continue;

    const lines = entries.map(([path, value]) => {
      const suffix = path.startsWith(prefix) ? path.slice(prefix.length) : '';
      const varName = suffix
        ? `--${cssPrefix}-${suffix.replace(/\./g, '-')}`
        : `--${cssPrefix}`;
      return `  ${varName}: ${resolveValue(value)};`;
    });

    sections.push(`  /* ${label} */\n${lines.join('\n')}`);
  }

  return sections.join('\n\n');
}

// ── Compose CSS ───────────────────────────────────────────────────────────────

const css = `/* =============================================================================
 * tokens.css — AUTO-GENERATED by scripts/build-tokens.ts
 * Do not edit manually. Run \`npm run build:tokens\` to regenerate.
 * ============================================================================= */

@import "tailwindcss";

@theme {
${buildThemeBlock()}

  /* Component — Button shadows */
  --shadow-button-primary: 0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3), inset 0 -1px 0 rgba(0,0,0,0.2);
  --shadow-button-success:  0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3), inset 0 -1px 0 rgba(0,0,0,0.2);
  --shadow-button-warning:  0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3), inset 0 -1px 0 rgba(0,0,0,0.2);
  --shadow-button-danger:   0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3), inset 0 -1px 0 rgba(0,0,0,0.2);
  --shadow-button-neutral:  0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3), inset 0 -1px 0 rgba(0,0,0,0.2);
}
`;

// ── Write output ──────────────────────────────────────────────────────────────

const outPath = resolve(ROOT, 'src/styles/tokens.css');
mkdirSync(resolve(ROOT, 'src/styles'), { recursive: true });
writeFileSync(outPath, css, 'utf-8');

const tokenCount = Object.keys(allTokens).length;
console.log(`✓ Generated ${outPath}`);
console.log(`  ${tokenCount} tokens processed across ${TOKEN_FILES.length} files`);
