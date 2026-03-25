import * as React from "react";

// ── Types ──────────────────────────────────────────────────────────────────

export type TableSize = "sm" | "md" | "lg";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  /** Cell padding + text size for header/body/footer */
  size?: TableSize;
  /** Zebra striping on even body rows */
  striped?: boolean;
  /** Wrap the table for horizontal scrolling on small screens */
  scrollable?: boolean;
}

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** @default 'col' */
  scope?: React.ThHTMLAttributes<HTMLTableCellElement>["scope"];
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

// ── Context ────────────────────────────────────────────────────────────────

interface TableContextValue {
  size: TableSize;
  striped: boolean;
}

const TableContext = React.createContext<TableContextValue>({
  size: "md",
  striped: false,
});

function useTableContext() {
  return React.useContext(TableContext);
}

// ── Style maps ─────────────────────────────────────────────────────────────

const sizeClasses: Record<TableSize, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-sm",
  lg: "px-5 py-4 text-base",
};

const tableShell = [
  "w-full min-w-0 border-collapse",
  "text-left text-content-primary",
].join(" ");

const headCellClasses = "font-semibold text-content-primary";

const bodyRowClasses = "border-b border-border-subtle last:border-b-0";

// ── Table (root) ───────────────────────────────────────────────────────────

/**
 * Semantic HTML data table (`<table>`) styled with Velocity tokens.
 *
 * > **Note:** [Base UI](https://base-ui.com) does not provide a Table primitive; this component
 * > uses native accessible markup (`<th scope>`, optional `<caption>` via children).
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(function Table(
  { size = "md", striped = false, scrollable = true, className, children, ...props },
  ref,
) {
  const ctx = React.useMemo<TableContextValue>(() => ({ size, striped }), [size, striped]);

  const table = (
    <table
      ref={ref}
      className={[tableShell, className].filter(Boolean).join(" ")}
      {...props}
    >
      <TableContext.Provider value={ctx}>{children}</TableContext.Provider>
    </table>
  );

  if (!scrollable) {
    return table;
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border-default bg-surface-primary">
      {table}
    </div>
  );
});

Table.displayName = "Table";

// ── Sections ───────────────────────────────────────────────────────────────

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  function TableHeader({ className, children, ...props }, ref) {
    return (
      <thead
        ref={ref}
        className={[
          "border-b border-border-default bg-surface-secondary",
          "[&_tr]:border-b-0",
          "[&_tr:hover]:bg-transparent",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </thead>
    );
  },
);

TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  function TableBody({ className, children, ...props }, ref) {
    const { striped } = useTableContext();
    return (
      <tbody
        ref={ref}
        className={[
          striped ? "[&_tr:nth-child(even)]:bg-surface-secondary/60" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </tbody>
    );
  },
);

TableBody.displayName = "TableBody";

export const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  function TableFooter({ className, children, ...props }, ref) {
    return (
      <tfoot
        ref={ref}
        className={[
          "border-t border-border-default bg-surface-secondary/80 font-medium",
          "[&_tr:hover]:bg-transparent",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </tfoot>
    );
  },
);

TableFooter.displayName = "TableFooter";

// ── Row & cells ────────────────────────────────────────────────────────────

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow({ className, ...props }, ref) {
    return (
      <tr
        ref={ref}
        className={[
          bodyRowClasses,
          "transition-colors duration-200 hover:bg-surface-hover/80",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  },
);

TableRow.displayName = "TableRow";

/** Column header (`<th>`) — inherits padding/size from `Table`. */
export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  function TableHead({ className, scope = "col", ...props }, ref) {
    const { size } = useTableContext();
    return (
      <th
        ref={ref}
        scope={scope}
        className={[sizeClasses[size], headCellClasses, className].filter(Boolean).join(" ")}
        {...props}
      />
    );
  },
);

TableHead.displayName = "TableHead";

/** Body cell (`<td>`). */
export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  function TableCell({ className, ...props }, ref) {
    const { size } = useTableContext();
    return (
      <td
        ref={ref}
        className={[sizeClasses[size], "text-content-primary align-middle", className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  },
);

TableCell.displayName = "TableCell";
