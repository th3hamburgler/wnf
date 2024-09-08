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
  const [sortKey, setSortKey] = useState<SortKey>("PointsPerGame");
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
    <div className="bg-gray-900 p-6 rounded-3xl shadow-xl overflow-x-auto border-4 border-white">
      <h2 className="text-3xl font-extrabold tracking-tight text-white uppercase">
        League Table
      </h2>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-700">
            <TableHead className="w-[50px] px-2 text-gray-400 text-right">
              Pos
            </TableHead>
            <TableHead className="px-2 text-left">
              <Button
                variant="ghost"
                onClick={() => handleSort("Player")}
                className="font-semibold text-gray-200 hover:text-white hover:bg-gray-800 px-0"
              >
                Name <SortIcon columnKey="Player" />
              </Button>
            </TableHead>
            <TableHead className="px-2 text-right">
              <Button
                variant="ghost"
                onClick={() => handleSort("GamesPlayed")}
                className="font-semibold text-gray-200 hover:text-white hover:bg-gray-800 ml-auto px-0"
              >
                P <SortIcon columnKey="GamesPlayed" />
              </Button>
            </TableHead>
            <TableHead className="px-2 text-right">
              <Button
                variant="ghost"
                onClick={() => handleSort("Wins")}
                className="font-semibold text-gray-200 hover:text-white hover:bg-gray-800 ml-auto px-0"
              >
                W <SortIcon columnKey="Wins" />
              </Button>
            </TableHead>
            <TableHead className="px-2 text-right">
              <Button
                variant="ghost"
                onClick={() => handleSort("Draws")}
                className="font-semibold text-gray-200 hover:text-white hover:bg-gray-800 ml-auto px-0"
              >
                D <SortIcon columnKey="Draws" />
              </Button>
            </TableHead>
            <TableHead className="px-2 text-right">
              <Button
                variant="ghost"
                onClick={() => handleSort("Losses")}
                className="font-semibold text-gray-200 hover:text-white hover:bg-gray-800 ml-auto px-0"
              >
                L <SortIcon columnKey="Losses" />
              </Button>
            </TableHead>
            <TableHead className="px-2 text-right">
              <Button
                variant="ghost"
                onClick={() => handleSort("TotalPoints")}
                className="font-semibold text-gray-200 hover:text-white hover:bg-gray-800 ml-auto px-0"
              >
                Pts <SortIcon columnKey="TotalPoints" />
              </Button>
            </TableHead>
            <TableHead className="px-2 text-right">
              <Button
                variant="ghost"
                onClick={() => handleSort("PointsPerGame")}
                className="font-semibold text-gray-200 hover:text-white hover:bg-gray-800 ml-auto px-0"
              >
                PPG <SortIcon columnKey="PointsPerGame" />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPlayers.map((player, index) => (
            <TableRow
              key={player.Player}
              className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}
            >
              <TableCell className="font-medium px-2 text-gray-300 text-right">
                {index + 1}
              </TableCell>
              <TableCell className="px-2 text-white">{player.Player}</TableCell>
              <TableCell className="px-2 text-gray-300 text-right">
                {player.GamesPlayed}
              </TableCell>
              <TableCell className="px-2 text-gray-300 text-right">
                {player.Wins}
              </TableCell>
              <TableCell className="px-2 text-gray-300 text-right">
                {player.Draws}
              </TableCell>
              <TableCell className="px-2 text-gray-300 text-right">
                {player.Losses}
              </TableCell>
              <TableCell className="px-2 text-gray-300 text-right">
                {player.TotalPoints}
              </TableCell>
              <TableCell className="px-2 text-gray-300 text-right">
                {player.PointsPerGame.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
