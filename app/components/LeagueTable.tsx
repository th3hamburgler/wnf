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
import { ProcessedPlayer } from "../lib/types";

interface LeagueTableProps {
  players: ProcessedPlayer[];
}

type SortKey = keyof ProcessedPlayer;
type SortOrder = "asc" | "desc";

export default function LeagueTable({ players }: LeagueTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("TotalPoints");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const sortedPlayers = [...players].sort((a, b) => {
    if (sortKey === "Player") {
      return sortOrder === "asc"
        ? a.Player.localeCompare(b.Player)
        : b.Player.localeCompare(a.Player);
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
                onClick={() => handleSort("Player")}
                className="font-semibold"
              >
                Name <SortIcon columnKey="Player" />
              </Button>
            </TableHead>
            <TableHead className="px-2">
              <Button
                variant="ghost"
                onClick={() => handleSort("GamesPlayed")}
                className="font-semibold"
              >
                P <SortIcon columnKey="GamesPlayed" />
              </Button>
            </TableHead>
            <TableHead className="px-2">
              <Button
                variant="ghost"
                onClick={() => handleSort("Wins")}
                className="font-semibold"
              >
                W <SortIcon columnKey="Wins" />
              </Button>
            </TableHead>
            <TableHead className="px-2">
              <Button
                variant="ghost"
                onClick={() => handleSort("Draws")}
                className="font-semibold"
              >
                D <SortIcon columnKey="Draws" />
              </Button>
            </TableHead>
            <TableHead className="px-2">
              <Button
                variant="ghost"
                onClick={() => handleSort("Losses")}
                className="font-semibold"
              >
                L <SortIcon columnKey="Losses" />
              </Button>
            </TableHead>
            <TableHead className="px-2">
              <Button
                variant="ghost"
                onClick={() => handleSort("TotalPoints")}
                className="font-semibold"
              >
                Pts <SortIcon columnKey="TotalPoints" />
              </Button>
            </TableHead>
            <TableHead className="px-2">
              <Button
                variant="ghost"
                onClick={() => handleSort("PointsPerGame")}
                className="font-semibold"
              >
                PPG <SortIcon columnKey="PointsPerGame" />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPlayers.map((player, index) => (
            <TableRow key={player.Player}>
              <TableCell className="font-medium px-2">{index + 1}</TableCell>
              <TableCell className="px-2">{player.Player}</TableCell>
              <TableCell className="px-2">{player.GamesPlayed}</TableCell>
              <TableCell className="px-2">{player.Wins}</TableCell>
              <TableCell className="px-2">{player.Draws}</TableCell>
              <TableCell className="px-2">{player.Losses}</TableCell>
              <TableCell className="px-2">{player.TotalPoints}</TableCell>
              <TableCell className="px-2">
                {player.PointsPerGame.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
