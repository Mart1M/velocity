import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Pagination navigation for product listings, order history, and data tables. Built as a native compound component with automatic page-range truncation and keyboard-accessible controls.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the pagination controls",
    },
    currentPage: {
      control: { type: "number", min: 1 },
      description: "Current active page (1-based)",
    },
    totalPages: {
      control: { type: "number", min: 1 },
      description: "Total number of pages",
    },
    siblingCount: {
      control: { type: "number", min: 0, max: 3 },
      description: "Number of sibling pages shown around the current page",
    },
  },
  args: {
    size: "md",
    currentPage: 1,
    totalPages: 10,
    siblingCount: 1,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

// Middle page (shows both ellipses)
export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
  },
};

// Last page (next disabled)
export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
  },
};

// Few pages (no ellipsis needed)
export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 5,
  },
};

// Many pages
export const ManyPages: Story = {
  args: {
    currentPage: 25,
    totalPages: 50,
    siblingCount: 2,
  },
};

// Small size
export const Small: Story = {
  args: {
    size: "sm",
    currentPage: 3,
    totalPages: 10,
  },
};

// Large size
export const Large: Story = {
  args: {
    size: "lg",
    currentPage: 3,
    totalPages: 10,
  },
};

// Interactive
function InteractivePagination() {
  const [page, setPage] = React.useState(1);
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-sm text-content-secondary">
        Page {page} of 20
      </span>
      <Pagination currentPage={page} totalPages={20} onPageChange={setPage} />
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractivePagination />,
};

// Composable building blocks
export const Composable: Story = {
  render: () => (
    <Pagination currentPage={1} totalPages={1} size="md">
      <PaginationContent>
        <PaginationPrevious disabled onClick={() => undefined} />
        <PaginationItem page={1} isActive onClick={() => undefined} />
        <PaginationItem page={2} onClick={() => undefined} />
        <PaginationItem page={3} onClick={() => undefined} />
        <PaginationEllipsis />
        <PaginationItem page={10} onClick={() => undefined} />
        <PaginationNext onClick={() => undefined} />
      </PaginationContent>
    </Pagination>
  ),
};

// Overview
export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8 rounded-2xl bg-surface-primary">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-content-tertiary uppercase tracking-widest">
          Small
        </span>
        <Pagination size="sm" currentPage={3} totalPages={10} />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-content-tertiary uppercase tracking-widest">
          Medium (default)
        </span>
        <Pagination size="md" currentPage={5} totalPages={10} />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-content-tertiary uppercase tracking-widest">
          Large
        </span>
        <Pagination size="lg" currentPage={5} totalPages={10} />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-content-tertiary uppercase tracking-widest">
          First page (previous disabled)
        </span>
        <Pagination currentPage={1} totalPages={20} />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-content-tertiary uppercase tracking-widest">
          Last page (next disabled)
        </span>
        <Pagination currentPage={20} totalPages={20} />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-content-tertiary uppercase tracking-widest">
          Few pages (no ellipsis)
        </span>
        <Pagination currentPage={2} totalPages={4} />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-content-tertiary uppercase tracking-widest">
          Many pages (sibling count 2)
        </span>
        <Pagination currentPage={25} totalPages={50} siblingCount={2} />
      </div>
    </div>
  ),
  parameters: { layout: "padded" },
};
