"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";

export default function Home() {
  const router = useRouter();

  const handleWorkspaceCreated = (workspaceId: unknown, workspaceSlug: string) => {
    router.push(`/workspace/${workspaceSlug}`);
  };

  return (
    <div className="h-full w-full flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="flex justify-center">
          <Image
            src="/logo.svg"
            alt="App Logo"
            width={120}
            height={120}
            className="h-30 w-auto"
            priority
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Spidey Board
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Your collaborative workspace for visual thinking. Create boards,
            organize ideas, and bring your projects to life with an intuitive
          </p>
        </div>

        <div className="pt-4">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
          >
            <HugeiconsIcon icon={Add01Icon} className="h-5 w-5 mr-2" />
            Create Workspace
          </Button>
        </div>
      </div>
    </div>
  );
}
