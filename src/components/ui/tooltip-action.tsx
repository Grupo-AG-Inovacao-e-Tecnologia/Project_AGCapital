"use client";

import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipActionProps {
  title: React.ReactNode;
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
}

function TooltipAction({
  title,
  asChild = false,
  className,
  children,
}: TooltipActionProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild={asChild}>
        {asChild ? children : <span className="inline-block">{children}</span>}
      </TooltipTrigger>
      <TooltipContent className={className}>{title}</TooltipContent>
    </Tooltip>
  );
}

export { TooltipAction };
