"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/sidebar";
import { OrganizationSidebarWrapper } from "./_components/organization-sidebar-wrapper";
import { Navbar } from "./_components/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <main className="h-full">
          <div className="flex gap-x-3 h-full">
            <OrganizationSidebarWrapper />
            <div className="h-full flex-1">
              <Navbar />
              {children}
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
