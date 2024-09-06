"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Match, ProcessedPlayer } from "../lib/types";
import * as ZodiacIcons from "../icons";
import { User } from "lucide-react";

interface PlayerStatsProps {
  players: ProcessedPlayer[];
  matches: Match[];
}

const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
};

const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const getWeeksAgo = (date: Date): string => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
  return diffWeeks === 1 ? "1 week ago" : `${diffWeeks} weeks ago`;
};

const getPPGColor = (ppg: number) => {
  if (ppg >= 0 && ppg < 1) return "bg-red-500 text-white";
  if (ppg >= 1 && ppg < 2) return "bg-amber-500 text-white";
  if (ppg >= 2 && ppg <= 3) return "bg-green-500 text-white";
  return "bg-gray-500 text-white";
};

const formatStreak = (streak: number): string => {
  return `${streak} ${streak === 1 ? "game" : "games"}`;
};

export default function PlayerStats({ players, matches }: PlayerStatsProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => a.Player.localeCompare(b.Player));
  }, [players]);

  const calculatePlayerStats = (player: ProcessedPlayer) => {
    const teammateCounts: { [key: string]: number } = {};
    const opponentCounts: { [key: string]: number } = {};
    let firstAppearance: Date | null = null;
    let lastAppearance: Date | null = null;
    let winStreak = 0;
    let loseStreak = 0;
    let maxWinStreak = 0;
    let maxLoseStreak = 0;

    matches.forEach((match) => {
      const date = parseDate(match.date);
      const playerInMatch =
        match.teamA.includes(player.Player) ||
        match.teamB.includes(player.Player);
      const playerResult = playerInMatch
        ? match.teamA.includes(player.Player)
          ? match.GoalDifference > 0
            ? "W"
            : match.GoalDifference < 0
            ? "L"
            : "D"
          : match.GoalDifference < 0
          ? "W"
          : match.GoalDifference > 0
          ? "L"
          : "D"
        : null;

      if (
        playerResult &&
        (playerResult === "W" || playerResult === "L" || playerResult === "D")
      ) {
        if (!firstAppearance) firstAppearance = date;
        lastAppearance = date;

        if (match.teamA.includes(player.Player)) {
          match.teamA.forEach((teammate) => {
            if (teammate !== player.Player) {
              teammateCounts[teammate] = (teammateCounts[teammate] || 0) + 1;
            }
          });
          match.teamB.forEach((opponent) => {
            opponentCounts[opponent] = (opponentCounts[opponent] || 0) + 1;
          });
        } else if (match.teamB.includes(player.Player)) {
          match.teamB.forEach((teammate) => {
            if (teammate !== player.Player) {
              teammateCounts[teammate] = (teammateCounts[teammate] || 0) + 1;
            }
          });
          match.teamA.forEach((opponent) => {
            opponentCounts[opponent] = (opponentCounts[opponent] || 0) + 1;
          });
        }

        if (playerResult === "W") {
          winStreak++;
          loseStreak = 0;
        } else if (playerResult === "L") {
          loseStreak++;
          winStreak = 0;
        } else {
          winStreak = 0;
          loseStreak = 0;
        }

        maxWinStreak = Math.max(maxWinStreak, winStreak);
        maxLoseStreak = Math.max(maxLoseStreak, loseStreak);
      }
    });

    const formatPlayerList = (counts: { [key: string]: number }) => {
      const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      if (sortedCounts.length === 0) {
        return "N/A";
      }
      const maxCount = sortedCounts[0][1];
      const players = sortedCounts
        .filter(([, count]) => count === maxCount)
        .map(([name, count]) => `${name} (${count})`);
      return players.join(", ");
    };

    const mostFrequentTeammate = formatPlayerList(teammateCounts);
    const mostFrequentOpponent = formatPlayerList(opponentCounts);

    const appearancePercentage = (player.GamesPlayed / matches.length) * 100;
    const daysActive =
      lastAppearance && firstAppearance
        ? Math.floor(
            ((lastAppearance as Date).getTime() -
              (firstAppearance as Date).getTime()) /
              (1000 * 3600 * 24)
          )
        : 0;

    let daysUntilBirthday = "N/A";
    if (player.DOB) {
      const birthday = parseDate(player.DOB);
      if (!isNaN(birthday.getTime())) {
        const today = new Date();
        const nextBirthday = new Date(
          today.getFullYear(),
          birthday.getMonth(),
          birthday.getDate()
        );
        if (nextBirthday < today) {
          nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
        }
        const daysUntil = Math.ceil(
          (nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );
        daysUntilBirthday = daysUntil.toString();
      }
    }

    return {
      mostFrequentTeammate,
      mostFrequentOpponent,
      appearancePercentage: appearancePercentage.toFixed(2),
      firstAppearance: firstAppearance
        ? `${formatDate(firstAppearance)} (${getWeeksAgo(firstAppearance)})`
        : "N/A",
      lastAppearance: lastAppearance
        ? `${formatDate(lastAppearance)} (${getWeeksAgo(lastAppearance)})`
        : "N/A",
      daysActive,
      daysUntilBirthday,
      longestWinningStreak: formatStreak(maxWinStreak),
      longestLosingStreak: formatStreak(maxLoseStreak),
    };
  };

  const currentPlayer = selectedPlayer
    ? players.find((p) => p.Player === selectedPlayer)
    : null;
  const playerStats = currentPlayer
    ? calculatePlayerStats(currentPlayer)
    : null;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-semibold">
          Player Statistics
        </CardTitle>
        <Select value={selectedPlayer || ""} onValueChange={setSelectedPlayer}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a player" />
          </SelectTrigger>
          <SelectContent>
            {sortedPlayers.map((player) => (
              <SelectItem key={player.Player} value={player.Player}>
                {player.Player}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {currentPlayer && playerStats ? (
          <>
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-gray-200 rounded-full p-4">
                {currentPlayer.StarSign &&
                currentPlayer.StarSign in ZodiacIcons ? (
                  React.createElement(
                    ZodiacIcons[
                      currentPlayer.StarSign as keyof typeof ZodiacIcons
                    ],
                    { className: "h-16 w-16 text-gray-500" }
                  )
                ) : (
                  <User className="h-16 w-16 text-gray-500" />
                )}
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold">
                  {currentPlayer.Player}
                </h3>
                <p className="text-sm text-gray-500">
                  {currentPlayer.StarSign || "Unknown Star Sign"}
                </p>
              </div>
              <div
                className={`flex flex-col items-center justify-center rounded-full w-24 h-24 ${getPPGColor(
                  currentPlayer.PointsPerGame
                )}`}
              >
                <span className="text-2xl font-bold">
                  {currentPlayer.TotalPoints}pts
                </span>
                <span className="text-sm">
                  {currentPlayer.PointsPerGame.toFixed(2)}
                </span>
              </div>
            </div>

            <Table>
              <TableBody>
                <TableRow>
                  <TableHead>Most Frequent Teammate(s)</TableHead>
                  <TableCell>{playerStats.mostFrequentTeammate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Most Frequent Opponent(s)</TableHead>
                  <TableCell>{playerStats.mostFrequentOpponent}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Appearance %</TableHead>
                  <TableCell>{playerStats.appearancePercentage}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>First Appearance</TableHead>
                  <TableCell>{playerStats.firstAppearance}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Last Appearance</TableHead>
                  <TableCell>{playerStats.lastAppearance}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Days Active</TableHead>
                  <TableCell>{playerStats.daysActive}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Days Until Birthday</TableHead>
                  <TableCell>{playerStats.daysUntilBirthday}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Longest Winning Streak</TableHead>
                  <TableCell>{playerStats.longestWinningStreak}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Longest Losing Streak</TableHead>
                  <TableCell>{playerStats.longestLosingStreak}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-gray-500">
              Select a player to view their statistics
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
