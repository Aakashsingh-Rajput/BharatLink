import { cn } from "@/lib/utils";
import React from "react";

export const WeavingIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-accent", className)}
      {...props}
    >
      <path d="M8 20V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v16" />
      <path d="M4 16h16" />
      <path d="M4 8h16" />
      <path d="M12 4v16" />
      <path d="M16 12H8" />
    </svg>
  );
