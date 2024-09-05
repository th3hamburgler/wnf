"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Match } from "../lib/types";

interface MatchResultsProps {
  matches: Match[];
}

export default function MatchResults({ matches }: MatchResultsProps) {
  const [currentWeek, setCurrentWeek] = useState(0);

  const handlePreviousWeek = () =>
    setCurrentWeek((prev) => Math.max(0, prev - 1));
  const handleNextWeek = () =>
    setCurrentWeek((prev) => Math.min(matches.length - 1, prev + 1));

  const currentMatch = matches[currentWeek];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Match Results</h2>
      <div className="flex justify-between items-center mb-4">
        <Button onClick={handlePreviousWeek} disabled={currentWeek === 0}>
          Previous Week
        </Button>
        <span className="text-lg font-medium">Week {currentWeek + 1}</span>
        <Button
          onClick={handleNextWeek}
          disabled={currentWeek === matches.length - 1}
        >
          Next Week
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Team A</TableHead>
            <TableHead>Team B</TableHead>
            <TableHead>Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{currentMatch.date}</TableCell>
            <TableCell>{currentMatch.teamA.join(", ")}</TableCell>
            <TableCell>{currentMatch.teamB.join(", ")}</TableCell>
            <TableCell>{currentMatch.score}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
