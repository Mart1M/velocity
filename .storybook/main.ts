import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, '..');

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],

  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    '@storybook/addon-docs',
    '@storybook/addon-mcp',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  async viteFinal(config) {
    return mergeConfig(config, {
      envDir: packageRoot,
      plugins: [tailwindcss()],
      // Patched Base UI (patch-package) must not be served from a stale Vite pre-bundle cache.
      optimizeDeps: {
        include: ['use-sync-external-store/shim', 'use-sync-external-store/shim/with-selector'],
        exclude: [
          '@base-ui-components/react',
          '@base-ui-components/react/popover',
          '@base-ui-components/react/tooltip',
        ],
      },
    });
  }
};

export default config;
