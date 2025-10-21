import { cn } from "@/lib/utils";
import React from "react";

export const PotteryIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M6 14c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-2.8-2.2-5-5-5S7 6.2 7 9v5Z" />
    <path d="M16 16c0 2.2-1.8 4-4 4s-4-1.8-4-4" />
    <path d="M5 11h14" />
  </svg>
);
