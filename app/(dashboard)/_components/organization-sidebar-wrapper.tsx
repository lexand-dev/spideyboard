"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { OrganizationSidebar } from "./organization-sidebar";

export function OrganizationSidebarWrapper() {
  const { state } = useSidebar();
  
  const isCollapsed = state === "collapsed";
  
  return <OrganizationSidebar hidden={isCollapsed} />;
}
