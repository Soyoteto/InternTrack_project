import * as React from "react";
import { cn } from "../../lib/cn";

// A simple styled container to wrap content in a card UI
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-xl border bg-white text-gray-950 shadow", className)}
      {...props}
    />
  );
}