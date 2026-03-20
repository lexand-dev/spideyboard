"use client";

interface OrganizationSidebarProps {
  hidden?: boolean;
}

export const OrganizationSidebar = ({ hidden = false }: OrganizationSidebarProps) => {
  if (hidden) return null;
  
  return (
    <div className="hidden lg:flex lg:flex-col lg:space-y-6 w-[220px] pl-6 pt-6">
      <div className="flex items-center gap-3 px-2">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground text-sm font-bold">W</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">Workspace</span>
          <span className="text-xs text-muted-foreground">Free Plan</span>
        </div>
      </div>
    </div>
  );
};
