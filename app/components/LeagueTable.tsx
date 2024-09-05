"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Player } from "../lib/types";

interface LeagueTableProps {
  players: Player[];
}

type SortKey = keyof Player;
type SortOrder = "asc" | "desc";

export default function LeagueTable({ players }: LeagueTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("points");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const sortedPlayers = [...players].sort((a, b) => {
    if (sortKey === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      return sortOrder === "asc"
        ? (a[sortKey] as number) - (b[sortKey] as number)
        : (b[sortKey] as number) - (a[sortKey] as number);
    }
  });

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (columnKey !== sortKey) return null;
    return sortOrder === "asc" ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
        League Table
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] px-2">Pos</TableHead>
            <TableHead className="px-2">
              <Button
                variant="ghost"
                onClick={() => handleSort("name")}
                className="font-semibold"
              >
                Name <SortIcon columnKey="name" />
              </Button>
            </TableHead>
            <TableHead className="px-2">
              <Button
                variant="ghost"
                onClick={() => handleSort("played")}
                className="font-semibold"
              >
                P <SortIcon columnKey="played" />
              </Button>
            </TableHead>
            <TableHead className="px-2">
              <Button
                variant="ghost"
                onClick={() => handleSort("won")}
                className="font-semibold"
              >
                W <SortIcon columnKey="won" />
              </Button>
            </TableHead>
            <TableHead className="px-2">
              <Button
                variant="ghost"
                onClick={() => handleSort("drawn")}
                className="font-semibold"
              >
                D <SortIcon columnKey="drawn" />
              </Button>
            </TableHead>
            <TableHead className="px-2">
              <Button
                variant="ghost"
                onClick={() => handleSort("lost")}
                className="font-semibold"
              >
                L <SortIcon columnKey="lost" />
              </Button>
            </TableHead>
            <TableHead className="px-2">
              <Button
                variant="ghost"
                onClick={() => handleSort("points")}
                className="font-semibold"
              >
                Pts <SortIcon columnKey="points" />
              </Button>
            </TableHead>
            <TableHead className="px-2">
              <Button
                variant="ghost"
                onClick={() => handleSort("pointsPerGame")}
                className="font-semibold"
              >
                PPG <SortIcon columnKey="pointsPerGame" />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPlayers.map((player, index) => (
            <TableRow key={player.id}>
              <TableCell className="font-medium px-2">{index + 1}</TableCell>
              <TableCell className="px-2">{player.name}</TableCell>
              <TableCell className="px-2">{player.played}</TableCell>
              <TableCell className="px-2">{player.won}</TableCell>
              <TableCell className="px-2">{player.drawn}</TableCell>
              <TableCell className="px-2">{player.lost}</TableCell>
              <TableCell className="px-2">{player.points}</TableCell>
              <TableCell className="px-2">
                {player.pointsPerGame.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
