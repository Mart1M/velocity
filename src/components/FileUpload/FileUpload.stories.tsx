import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileUpload } from "./FileUpload";

const meta = {
  title: "Components/FileUpload",
  component: FileUpload,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Native file input with drag-and-drop, optional size/count validation, and a file list. Not a Base UI primitive — built for Velocity tokens and accessibility.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    orientation: { control: "select", options: ["vertical", "horizontal"] },
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    showFileList: { control: "boolean" },
  },
  args: {
    size: "md",
    multiple: false,
    disabled: false,
    error: false,
    showFileList: true,
    label: "Upload a file",
    description: "PNG, JPG or PDF — max 10 MB",
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[min(100%,28rem)]">
      <FileUpload {...args} />
    </div>
  ),
};

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    label: "Add files",
    description: "Drag here or click — compact row layout",
  },
  render: (args) => (
    <div className="w-[min(100%,36rem)]">
      <FileUpload {...args} />
    </div>
  ),
};

export const HorizontalWithList: Story = {
  args: {
    orientation: "horizontal",
    multiple: true,
    label: "Attachments",
    description: "List appears beside the zone from lg breakpoint",
  },
  render: (args) => (
    <div className="w-[min(100%,42rem)]">
      <FileUpload {...args} />
    </div>
  ),
};

export const Multiple: Story = {
  args: {
    multiple: true,
    label: "Upload files",
    description: "You can select several files",
  },
  render: (args) => (
    <div className="w-[min(100%,28rem)]">
      <FileUpload {...args} />
    </div>
  ),
};

export const WithValidation: Story = {
  args: {
    multiple: true,
    maxFiles: 3,
    maxSizeMb: 2,
    label: "Up to 3 files, 2 MB each",
    helperText: "Oversized files are skipped; check the Actions panel for validation callbacks.",
  },
  render: function Render(args) {
    const [issues, setIssues] = React.useState<string>("");
    return (
      <div className="w-[min(100%,28rem)] space-y-2">
        <FileUpload
          {...args}
          onValidationError={(list) => {
            setIssues(
              list.map((i) => `${i.file.name}: ${i.reason}`).join(" · "),
            );
          }}
        />
        {issues ? (
          <p className="text-xs text-content-tertiary">{issues}</p>
        ) : null}
      </div>
    );
  },
};

export const Error: Story = {
  args: {
    error: true,
    helperText: "Upload failed — try again with a supported format.",
  },
  render: (args) => (
    <div className="w-[min(100%,28rem)]">
      <FileUpload {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div className="w-[min(100%,28rem)]">
      <FileUpload {...args} />
    </div>
  ),
};

export const AcceptImages: Story = {
  args: {
    accept: "image/png,image/jpeg,image/webp",
    label: "Upload images",
    description: "PNG, JPEG or WebP",
  },
  render: (args) => (
    <div className="w-[min(100%,28rem)]">
      <FileUpload {...args} />
    </div>
  ),
};

export const Controlled: Story = {
  render: function Controlled() {
    const [files, setFiles] = React.useState<File[]>([]);
    return (
      <div className="w-[min(100%,28rem)] space-y-2">
        <FileUpload
          label="Controlled"
          description={`${files.length} file(s) selected`}
          value={files}
          onFilesChange={setFiles}
          multiple
        />
        <button
          type="button"
          className="text-sm text-content-brand underline"
          onClick={() => setFiles([])}
        >
          Clear from parent
        </button>
      </div>
    );
  },
};

export const Overview: Story = {
  render: () => (
    <div className="flex w-full max-w-lg flex-col gap-8 rounded-2xl bg-surface-primary p-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
        File upload
      </p>
      <FileUpload
        size="sm"
        label="Small dropzone"
        description="sm size"
      />
      <FileUpload
        size="md"
        label="Medium (default)"
        description="md size"
      />
      <FileUpload
        size="lg"
        label="Large dropzone"
        description="lg size"
      />
      <FileUpload
        orientation="horizontal"
        size="md"
        label="Horizontal"
        description="Icon + text in a row"
      />
    </div>
  ),
  parameters: { layout: "padded" },
};
