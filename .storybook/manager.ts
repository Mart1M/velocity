import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const velocityLightTokens = {
  backgroundPrimary: '#ffffff',
  surfacePrimary: '#ffffff',
  surfaceSecondary: '#f9f9f9',
  contentPrimary: '#0d0d0d',
  contentSecondary: '#4e4e4e',
  borderDefault: '#e5e5e5',
  borderStrong: '#242424',
  brandPrimary: '#d0f400',
};

const velocityManagerTheme = create({
  base: 'light',
  brandTitle: 'Runswap Velocity',
  brandUrl: 'https://runswap.io',
  appBg: velocityLightTokens.backgroundPrimary,
  appContentBg: velocityLightTokens.surfacePrimary,
  appBorderColor: velocityLightTokens.borderDefault,
  appBorderRadius: 10,
  colorPrimary: velocityLightTokens.brandPrimary,
  colorSecondary: velocityLightTokens.contentSecondary,
  barBg: velocityLightTokens.surfaceSecondary,
  barTextColor: velocityLightTokens.contentSecondary,
  barSelectedColor: velocityLightTokens.contentPrimary,
  barHoverColor: velocityLightTokens.contentPrimary,
  inputBg: velocityLightTokens.surfacePrimary,
  inputBorder: velocityLightTokens.borderDefault,
  inputTextColor: velocityLightTokens.contentPrimary,
  inputBorderRadius: 8,
  textColor: velocityLightTokens.contentPrimary,
  textInverseColor: velocityLightTokens.surfacePrimary,
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode:
    '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  buttonBg: velocityLightTokens.surfacePrimary,
  buttonBorder: velocityLightTokens.borderDefault,
});

addons.setConfig({
  theme: velocityManagerTheme,
  showPanel: true,
  panelPosition: 'bottom',
  sidebar: {
    showRoots: true,
  },
  toolbar: {
    title: { hidden: false },
  },
});
