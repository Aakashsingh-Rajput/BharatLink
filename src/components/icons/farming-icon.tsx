import { cn } from "@/lib/utils";
import React from "react";

export const FarmingIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M12 4v16" />
    <path d="M16 12H8" />
    <path d="M8 8c0-2.2 1.8-4 4-4s4 1.8 4 4" />
    <path d="m14 12-2 2-2-2" />
    <path d="m14 16-2 2-2-2" />
  </svg>
);
