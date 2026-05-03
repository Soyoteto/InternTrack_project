import * as React from "react";
import { cn } from "@/lib/cn";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-xl border-2 border-slate-200 bg-white text-slate-950 shadow-sm", className)}
      {...props}
    />
  );
}