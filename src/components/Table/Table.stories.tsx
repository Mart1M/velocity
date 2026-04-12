import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Semantic HTML table (`<table>`, `<thead>`, `<tbody>`) with Velocity tokens. **Base UI** does not provide a Table primitive — native markup + accessible styles (`<th scope=\"col\">`).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    striped: { control: "boolean" },
    scrollable: { control: "boolean" },
  },
  args: {
    size: "md",
    striped: false,
    scrollable: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleRows = [
  { id: "1", name: "Paris Marathon", date: "Apr 6, 2025", status: "Registration open" },
  { id: "2", name: "Nice Half Marathon", date: "Mar 2, 2025", status: "Sold out" },
  { id: "3", name: "Ridge Trail Run", date: "Oct 12, 2025", status: "Open" },
];

export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>Event</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleRows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.date}</TableCell>
            <TableCell>{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Striped: Story = {
  args: { striped: true },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>Event</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleRows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithFooter: Story = {
  name: "With footer",
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Race bib</TableCell>
          <TableCell className="text-right tabular-nums">€45.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Insurance</TableCell>
          <TableCell className="text-right tabular-nums">€5.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-right tabular-nums font-semibold">€50.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size}>
          <p className="mb-2 text-caption text-content-tertiary">size=&quot;{size}&quot;</p>
          <Table size={size} scrollable={false}>
            <TableHeader>
              <TableRow>
                <TableHead>A</TableHead>
                <TableHead>B</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>2</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  ),
};

export const NoScrollWrapper: Story = {
  name: "No outer scroll (scrollable=false)",
  args: { scrollable: false },
  render: (args) => (
    <div className="rounded-xl border border-border-default p-4">
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead>Column</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Content embedded inside another frame.</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};
