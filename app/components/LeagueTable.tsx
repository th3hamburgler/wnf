"use client";

import React, { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, Trophy } from "lucide-react";
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
      <ChevronUp className="ml-2 h-4 w-4 lg:h-6 lg:w-6" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4 lg:h-6 lg:w-6" />
    );
  };

  return (
    <Card className="w-full Match bg-gray-900 rounded-3xl shadow-xl overflow-x-auto text-white border-4 border-wheat-100">
      <CardHeader>
        <div className="flex items-center mb-4 lg:mb-8">
          <Trophy className="w-8 h-8 lg:w-16 lg:h-16 text-wheat-100 mr-3 lg:mr-5" />
          <h2 className="text-3xl xl:text-4xl 2xl:text-6xl font-extrabold tracking-tight text-wheat-100 uppercase">
            League Table
          </h2>
        </div>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow className="  border-b">
            <TableHead className="w-[50px] px-2 lg:px-4 text-gray-400 text-right text-sm lg:text-xl">
              #
            </TableHead>
            <TableHead className="px-2 lg:px-4 text-left">
              <Button
                variant="ghost"
                onClick={() => handleSort("Player")}
                className="font-semibold text-gray-200 hover:text-white hover:bg-gray-800 px-0 text-sm lg:text-xl"
              >
                Name <SortIcon columnKey="Player" />
              </Button>
            </TableHead>
            <TableHead className="px-2 lg:px-4 text-right">
              <Button
                variant="ghost"
                onClick={() => handleSort("GamesPlayed")}
                className="font-semibold text-gray-200 hover:text-white hover:bg-gray-800 ml-auto px-0 text-sm lg:text-xl"
              >
                P <SortIcon columnKey="GamesPlayed" />
              </Button>
            </TableHead>
            <TableHead className="px-2 lg:px-4 text-right">
              <Button
                variant="ghost"
                onClick={() => handleSort("Wins")}
                className="font-semibold text-gray-200 hover:text-white hover:bg-gray-800 ml-auto px-0 text-sm lg:text-xl"
              >
                W <SortIcon columnKey="Wins" />
              </Button>
            </TableHead>
            <TableHead className="px-2 lg:px-4 text-right">
              <Button
                variant="ghost"
                onClick={() => handleSort("Draws")}
                className="font-semibold text-gray-200 hover:text-white hover:bg-gray-800 ml-auto px-0 text-sm lg:text-xl"
              >
                D <SortIcon columnKey="Draws" />
              </Button>
            </TableHead>
            <TableHead className="px-2 lg:px-4 text-right">
              <Button
                variant="ghost"
                onClick={() => handleSort("Losses")}
                className="font-semibold text-gray-200 hover:text-white hover:bg-gray-800 ml-auto px-0 text-sm lg:text-xl"
              >
                L <SortIcon columnKey="Losses" />
              </Button>
            </TableHead>
            <TableHead className="px-2 lg:px-4 text-right">
              <Button
                variant="ghost"
                onClick={() => handleSort("TotalPoints")}
                className="font-semibold text-gray-200 hover:text-white hover:bg-gray-800 ml-auto px-0 text-sm lg:text-xl"
              >
                Pts <SortIcon columnKey="TotalPoints" />
              </Button>
            </TableHead>
            <TableHead className="px-2 lg:px-4 text-right">
              <Button
                variant="ghost"
                onClick={() => handleSort("PointsPerGame")}
                className="font-semibold text-gray-200 hover:text-white hover:bg-gray-800 ml-auto px-0 text-sm lg:text-xl"
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
              className={`${
                index % 2 === 0
                  ? "bg-gray-900 border-none"
                  : "bg-gray-950/50 border-none"
              } transition-colors hover:bg-gray-800`}
            >
              <TableCell className="font-medium px-2 lg:px-4 text-gray-300 text-right text-sm lg:text-xl">
                {index + 1}
              </TableCell>
              <TableCell className="px-2 lg:px-4 text-white font-semibold text-sm lg:text-xl">
                {player.Player}
              </TableCell>
              <TableCell className="px-2 lg:px-4 text-gray-300 text-right text-sm lg:text-xl">
                {player.GamesPlayed}
              </TableCell>
              <TableCell className="px-2 lg:px-4 text-gray-300 text-right text-sm lg:text-xl">
                {player.Wins}
              </TableCell>
              <TableCell className="px-2 lg:px-4 text-gray-300 text-right text-sm lg:text-xl">
                {player.Draws}
              </TableCell>
              <TableCell className="px-2 lg:px-4 text-gray-300 text-right text-sm lg:text-xl">
                {player.Losses}
              </TableCell>
              <TableCell className="px-2 lg:px-4 text-gray-300 text-right font-semibold text-sm lg:text-xl">
                {player.TotalPoints}
              </TableCell>
              <TableCell className="px-2 lg:px-4 text-gray-300 text-right font-semibold text-sm lg:text-xl">
                {player.PointsPerGame.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
