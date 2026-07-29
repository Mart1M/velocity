# Brand logo SVGs

Local assets for `<BrandLogo />`. No runtime CDN — logos are committed in this folder.

## Refresh logos

1. Use Brandfetch MCP `get_brand` per domain (see [Brandfetch MCP](https://docs.brandfetch.com/mcp/overview)).
2. Copy the best `logo.svg` URL (or PNG wordmark if no vector) into `scripts/brand-logo-urls.json`.
3. Run `pnpm fetch:brands` from `packages/velocity`.

Raster sources are wrapped in SVG with an embedded image so the component still loads a single local file.
