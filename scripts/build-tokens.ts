#!/usr/bin/env tsx
/**
 * build-tokens.ts
 *
 * Reads JSON design token files and generates src/styles/tokens.css
 * with a Tailwind v4 @theme block. Supports light and dark mode via
 * data-theme attribute.
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

const CORE_FILES = [
  'src/tokens/core/color.json',
  'src/tokens/core/typography.json',
];

const SEMANTIC_SHARED = 'src/tokens/semantic/semantic-shared.json';
const SEMANTIC_LIGHT = 'src/tokens/semantic/semantic-light.json';
const SEMANTIC_DARK = 'src/tokens/semantic/semantic-dark.json';

const coreTokens = CORE_FILES.reduce<Record<string, string>>((acc, file) => {
  return { ...acc, ...flattenTokens(loadJson(file)) };
}, {});

const sharedTokens = flattenTokens(loadJson(SEMANTIC_SHARED));
const lightTokens = flattenTokens(loadJson(SEMANTIC_LIGHT));
const darkTokens = flattenTokens(loadJson(SEMANTIC_DARK));

// ── Reference resolver ────────────────────────────────────────────────────────

// {color.gray.950} → var(--color-gray-950)
function resolveValue(value: string): string {
  return value.replace(/\{([^}]+)\}/g, (_, ref: string) => {
    return `var(--${ref.replace(/\./g, '-')})`;
  });
}

// ── Category mapping ──────────────────────────────────────────────────────────

interface Mapping {
  tokenPath: string;
  cssPrefix: string;
  label: string;
}

const CORE_MAPPINGS: Mapping[] = [
  { tokenPath: 'color', cssPrefix: 'color', label: 'Core — Colors' },
  { tokenPath: 'font.family', cssPrefix: 'font', label: 'Core — Font families' },
];

const SEMANTIC_MAPPINGS: Mapping[] = [
  { tokenPath: 'velocity.background', cssPrefix: 'color-background', label: 'Semantic — Background' },
  { tokenPath: 'velocity.surface', cssPrefix: 'color-surface', label: 'Semantic — Surface' },
  { tokenPath: 'velocity.content', cssPrefix: 'color-content', label: 'Semantic — Content' },
  { tokenPath: 'velocity.border', cssPrefix: 'color-border', label: 'Semantic — Border' },
  { tokenPath: 'velocity.accent', cssPrefix: 'color-accent', label: 'Semantic — Accent' },
  { tokenPath: 'velocity.brand', cssPrefix: 'color-brand', label: 'Semantic — Brand' },
  { tokenPath: 'velocity.state', cssPrefix: 'color-state', label: 'Semantic — State' },
  { tokenPath: 'velocity.feedback', cssPrefix: 'color-feedback', label: 'Semantic — Feedback' },
  { tokenPath: 'velocity.elevation', cssPrefix: 'shadow', label: 'Semantic — Elevation' },
  { tokenPath: 'velocity.motion.duration', cssPrefix: 'duration', label: 'Semantic — Duration' },
  { tokenPath: 'velocity.motion.easing', cssPrefix: 'ease', label: 'Semantic — Easing' },
];

// ── Build variable block from tokens + mappings ───────────────────────────────

function buildVariableBlock(
  tokens: Record<string, string>,
  mappings: Mapping[],
  indent = '  '
): string {
  const sections: string[] = [];

  for (const { tokenPath, cssPrefix, label } of mappings) {
    const prefix = tokenPath + '.';
    const entries = Object.entries(tokens).filter(
      ([path]) => path === tokenPath || path.startsWith(prefix)
    );
    if (entries.length === 0) continue;

    const lines = entries.map(([path, value]) => {
      const suffix = path.startsWith(prefix) ? path.slice(prefix.length) : '';
      const varName = suffix
        ? `--${cssPrefix}-${suffix.replace(/\./g, '-')}`
        : `--${cssPrefix}`;
      return `${indent}${varName}: ${resolveValue(value)};`;
    });
    sections.push(`${indent}/* ${label} */\n${lines.join('\n')}`);
  }

  return sections.join('\n\n');
}

// ── Build @theme block (core + shared + light default) ──────────────────────────

function buildThemeBlock(): string {
  const allDefault = { ...coreTokens, ...sharedTokens, ...lightTokens };
  const coreAndShared = buildVariableBlock(allDefault, CORE_MAPPINGS);
  const semantic = buildVariableBlock(allDefault, SEMANTIC_MAPPINGS);

  return `${coreAndShared}

${semantic}`;
}

// ── Build [data-theme="dark"] overrides ────────────────────────────────────────

function buildDarkOverrides(): string {
  return buildVariableBlock(darkTokens, SEMANTIC_MAPPINGS, '  ');
}

// ── Compose CSS ───────────────────────────────────────────────────────────────

const css = `/* =============================================================================
 * tokens.css — AUTO-GENERATED by scripts/build-tokens.ts
 * Do not edit manually. Run \`npm run build:tokens\` to regenerate.
 *
 * Themes: light (default), dark (via data-theme="dark" on html/body)
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

/* Dark theme overrides */
[data-theme="dark"] {
${buildDarkOverrides()}
}
`;

// ── Write output ──────────────────────────────────────────────────────────────

const outPath = resolve(ROOT, 'src/styles/tokens.css');
mkdirSync(resolve(ROOT, 'src/styles'), { recursive: true });
writeFileSync(outPath, css, 'utf-8');

const tokenCount = Object.keys({ ...coreTokens, ...sharedTokens, ...lightTokens }).length;
console.log(`✓ Generated ${outPath}`);
console.log(`  ${tokenCount} tokens (light default + dark overrides)`);