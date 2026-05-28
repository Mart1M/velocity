import type { Meta, StoryObj } from "@storybook/react";
import {
  RiDashboardLine,
  RiFileListLine,
  RiSettings3Line,
  RiShoppingBag3Line,
} from "react-icons/ri";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "./Sidebar";

const meta = {
  title: "Components/Sidebar",
  component: SidebarProvider,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Composable application sidebar (Shadcn Base UI pattern). Desktop: collapsible rail; mobile: **Drawer**. Toggle with **SidebarTrigger** or `Cmd/Ctrl+B`. Built from Velocity primitives and semantic tokens.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SidebarProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" isActive>
              <RiShoppingBag3Line aria-hidden />
              <span>Runswap Admin</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive tooltip="Tableau de bord">
                  <RiDashboardLine aria-hidden />
                  <span>Tableau de bord</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Annonces">
                  <RiFileListLine aria-hidden />
                  <span>Annonces</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Paramètres">
                  <RiSettings3Line aria-hidden />
                  <span>Paramètres</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <span className="truncate text-xs text-content-secondary">
                martin@runswap.fr
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b border-border-default px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium text-content-primary">
            Tableau de bord
          </span>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-6">
          <p className="text-sm text-content-secondary">
            Contenu principal de l&apos;application. Réduisez la barre latérale
            avec le bouton ou <kbd className="rounded border px-1">⌘/Ctrl+B</kbd>
            .
          </p>
        </main>
      </SidebarInset>
    </SidebarProvider>
  ),
};

export const IconCollapsed: Story = {
  name: "Icon collapse",
  render: () => (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b border-border-default px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium">Mode icône</span>
        </header>
        <main className="p-6 text-sm text-content-secondary">
          La sidebar démarre réduite — survolez les icônes pour les tooltips.
        </main>
      </SidebarInset>
    </SidebarProvider>
  ),
};

export const WithSearch: Story = {
  name: "With search",
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <RiShoppingBag3Line aria-hidden />
                <span>Runswap</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-2">
              <input
                type="search"
                placeholder="Rechercher…"
                className="h-8 w-full rounded-md border border-border-default bg-surface-primary px-2 text-sm"
              />
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <RiDashboardLine aria-hidden />
                    <span>Accueil</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b border-border-default px-4">
          <SidebarTrigger />
        </header>
      </SidebarInset>
    </SidebarProvider>
  ),
};
