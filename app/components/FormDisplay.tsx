"use client";

import React from "react";
import FormBadge from "./FormBadge";
import { FormResult } from "../utils/formUtils";

interface FormDisplayProps {
  results: FormResult[];
}

export default function FormDisplay({ results }: FormDisplayProps) {
  if (results.length === 0) {
    return <span className="text-gray-500">-</span>;
  }

  return (
    <div className="flex items-center">
      {results.map((result, index) => (
        <FormBadge
          key={index}
          result={result}
          className={index > 0 ? "-ml-2" : ""}
        />
      ))}
    </div>
  );
}
