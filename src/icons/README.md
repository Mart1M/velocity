# Icons

Velocity uses **[Hugeicons](https://hugeicons.com/)** via [`@hugeicons/react`](https://hugeicons.com/docs/integrations/react/quick-start) and `@hugeicons/core-free-icons`.

## In Velocity components

Internal components import named icons from `src/icons`:

```tsx
import { CloseIcon, SearchIcon } from "../../icons";
```

## In consuming apps

Use the curated exports shipped with the design system:

```tsx
import { CloseIcon, HeartIcon, Icon } from "velocity-ds/icons";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

<CloseIcon className="size-4" aria-hidden />
<Icon icon={Search01Icon} className="size-4" />
```

`@hugeicons/react` and `@hugeicons/core-free-icons` are **dependencies** of `velocity-ds` — you do not need `react-icons`.

To migrate an existing app from Remix/Lucide/etc., see the [Hugeicons migration tool](https://hugeicons.com/docs/migration-tool).
