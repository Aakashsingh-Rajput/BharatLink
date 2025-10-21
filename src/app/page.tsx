"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChakraLoader } from "@/components/ui/loader";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <ChakraLoader className="h-12 w-12" />
        <p className="text-muted-foreground">Loading your workspace...</p>
      </div>
    </div>
  );
}
