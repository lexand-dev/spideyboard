"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <SidebarInset>
        <main className="h-full">
          <div className="flex gap-x-3 h-full">

            <div className="h-full flex-1">
              {children}
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
