import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-white/20 text-xs xl:text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-xs mr-2 whitespace-nowrap px-1.5 py-0.5 max-w-full w-fit",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-green-500 hover:bg-green-500/80 text-white",
        secondary:
          "border-transparent bg-wheat-100 hover:bg-wheat-100/80 text-black",
        destructive:
          "border-transparent bg-red-500 hover:bg-red-500/80 text-white",
        outline: "text-white bg-white/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
