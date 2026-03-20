"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Home01Icon, Settings01Icon } from "@hugeicons/core-free-icons";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home01Icon,
    href: "/",
    isActive: true,
  },
];

const bottomMenuItems = [
  {
    title: "Settings",
    icon: Settings01Icon,
    href: "/settings",
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu className="">
          <SidebarMenuItem className="flex items-center justify-end">
            <SidebarTrigger className="h-10 w-8 hover:text-muted-foreground hover:bg-sidebar-accent transition-colors rounded-lg group" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium uppercase tracking-wider px-2 text-sidebar-foreground/50">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    tooltip={item.title}
                    className="w-full justify-start hover:bg-sidebar-accent data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:hover:bg-primary/90 transition-all"
                  >
                    <a href={item.href}>
                      <HugeiconsIcon icon={item.icon} className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          {bottomMenuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className="w-full justify-start hover:bg-sidebar-accent transition-colors"
              >
                <a href={item.href}>
                  <HugeiconsIcon icon={item.icon} className="h-4 w-4" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
