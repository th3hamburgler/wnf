"use client";

import React from "react";
import { FormResult } from "../utils/formUtils";

interface FormBadgeProps {
  result: FormResult;
  className?: string;
}

const colorMap: Record<FormResult, string> = {
  W: "bg-green-500",
  D: "bg-wheat-500",
  L: "bg-red-500",
};

export default function FormBadge({ result, className = "" }: FormBadgeProps) {
  return (
    <div
      className={`
        h-6 w-6 lg:h-7 lg:w-7
        rounded-full
        flex items-center justify-center
        text-white text-xs lg:text-sm font-bold
        ${colorMap[result]}
        ${className}
      `}
    >
      {result}
    </div>
  );
}
