"use client";

import { UserButton } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";

export const Navbar = () => {
  return (
    <div className="flex items-center gap-x-4 p-6 border-b border-border bg-background/50 backdrop-blur-sm">
      <div className="hidden lg:flex lg:flex-1">
        <div className="relative w-full max-w-md">
          <HugeiconsIcon 
            icon={Search01Icon} 
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" 
          />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 bg-muted/50 border-transparent focus:border-primary focus:bg-background transition-all"
          />
        </div>
      </div>
      <div className="ml-auto">
        <UserButton 
          appearance={{
            elements: {
              userButtonBox: "hover:bg-accent rounded-lg transition-colors"
            }
          }}
        />
      </div>
    </div>
  );
};
