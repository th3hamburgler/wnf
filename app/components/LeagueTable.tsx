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
import { Input } from "@/components/ui/input";
import { ChevronUp, ChevronDown, Trophy } from "lucide-react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { ProcessedPlayer, Match } from "../lib/types";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface LeagueTableProps {
  players: ProcessedPlayer[];
  matches: Match[];
}

type SortKey = keyof ProcessedPlayer;
type SortOrder = "asc" | "desc";

export default function LeagueTable({ players, matches }: LeagueTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("TotalPoints");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [lastGames, setLastGames] = useState<number | "">(10);

  const filteredMatches = matches.filter((match) => {
    if (!startDate) return true;
    return new Date(match.date) >= startDate;
  });

  const calculatePlayerStats = (player: ProcessedPlayer) => {
    let gamesPlayed = 0;
    let wins = 0;
    let draws = 0;
    let losses = 0;
    let totalPoints = 0;

    const playerMatches = filteredMatches.filter(
      (match) =>
        match.teamA.includes(player.Player) ||
        match.teamB.includes(player.Player)
    );

    const matchesToConsider =
      typeof lastGames === "number" && lastGames > 0
        ? playerMatches.slice(-lastGames)
        : playerMatches;

    matchesToConsider.forEach((match) => {
      gamesPlayed++;
      if (match.teamA.includes(player.Player)) {
        if (match.GoalDifference > 0) {
          wins++;
          totalPoints += 3;
        } else if (match.GoalDifference === 0) {
          draws++;
          totalPoints += 1;
        } else {
          losses++;
        }
      } else {
        if (match.GoalDifference < 0) {
          wins++;
          totalPoints += 3;
        } else if (match.GoalDifference === 0) {
          draws++;
          totalPoints += 1;
        } else {
          losses++;
        }
      }
    });

    const pointsPerGame = gamesPlayed > 0 ? totalPoints / gamesPlayed : 0;

    return {
      ...player,
      GamesPlayed: gamesPlayed,
      Wins: wins,
      Draws: draws,
      Losses: losses,
      TotalPoints: totalPoints,
      PointsPerGame: pointsPerGame,
    };
  };

  const updatedPlayers = players.map(calculatePlayerStats);

  const sortedPlayers = [...updatedPlayers].sort((a, b) => {
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
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Start Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  {startDate ? (
                    format(startDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-black" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex-1">
            <label
              htmlFor="lastGames"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Last X Games
            </label>
            <Input
              type="number"
              id="lastGames"
              value={lastGames}
              onChange={(e) =>
                setLastGames(e.target.value ? parseInt(e.target.value) : "")
              }
              min="1"
              className="w-full bg-gray-800 text-white"
            />
          </div>
        </div>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow className="border-b">
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
