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
import { Match, ProcessedPlayer } from "../lib/types";
import * as ZodiacIcons from "../icons";
import {
  User,
  Trophy,
  Frown,
  Calendar,
  Users,
  UserMinus,
  Zap,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  return "bg-blue-500 text-white";
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
      return players.join("\n");
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
    <Card className="w-full bg-gray-900 text-white border-4 border-white rounded-3xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-3xl font-extrabold tracking-tight text-white uppercase">
          Player Statistics
        </CardTitle>
        <Select value={selectedPlayer || ""} onValueChange={setSelectedPlayer}>
          <SelectTrigger className="w-[180px] bg-gray-800 text-white border-gray-700">
            <SelectValue placeholder="Select a player" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white border-gray-700">
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
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-6">
              <div className="bg-gray-800 rounded-full p-6 flex-shrink-0">
                {currentPlayer.StarSign &&
                currentPlayer.StarSign in ZodiacIcons ? (
                  React.createElement(
                    ZodiacIcons[
                      currentPlayer.StarSign as keyof typeof ZodiacIcons
                    ],
                    { className: "h-20 w-20 text-primary" }
                  )
                ) : (
                  <User className="h-20 w-20 text-primary" />
                )}
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-3xl font-bold mb-2">
                  {currentPlayer.Player}
                </h3>
                <p className="text-lg text-gray-400 mb-4">
                  {currentPlayer.StarSign || "Unknown Star Sign"}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {currentPlayer.Age} years old
                  </Badge>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {currentPlayer.GamesPlayed} games played
                  </Badge>
                  <Badge
                    className={`text-lg px-3 py-1 ${getPPGColor(
                      currentPlayer.PointsPerGame
                    )}`}
                  >
                    {currentPlayer.TotalPoints} pts |{" "}
                    {currentPlayer.PointsPerGame.toFixed(2)} PPG
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard
                icon={<Trophy className="h-6 w-6 text-yellow-500" />}
                title="Longest Winning Streak"
                value={playerStats.longestWinningStreak}
              />
              <StatCard
                icon={<Frown className="h-6 w-6 text-red-500" />}
                title="Longest Losing Streak"
                value={playerStats.longestLosingStreak}
              />
              <StatCard
                icon={<Calendar className="h-6 w-6 text-green-500" />}
                title="Days Active"
                value={playerStats.daysActive.toString()}
              />
              <StatCard
                icon={<Users className="h-6 w-6 text-blue-500" />}
                title="Most Frequent Teammate(s)"
                value={playerStats.mostFrequentTeammate}
                multiline
              />
              <StatCard
                icon={<UserMinus className="h-6 w-6 text-purple-500" />}
                title="Most Frequent Opponent(s)"
                value={playerStats.mostFrequentOpponent}
                multiline
              />
              <StatCard
                icon={<Zap className="h-6 w-6 text-amber-500" />}
                title="Appearance %"
                value={`${playerStats.appearancePercentage}%`}
              />
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">First Appearance</h4>
                <p>{playerStats.firstAppearance}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Last Appearance</h4>
                <p>{playerStats.lastAppearance}</p>
              </div>
            </div>

            {playerStats.daysUntilBirthday !== "N/A" && (
              <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">
                  Days Until Birthday
                </h4>
                <p>{playerStats.daysUntilBirthday}</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <User className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-xl text-gray-400">
              Select a player to view their statistics
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function StatCard({
  icon,
  title,
  value,
  multiline = false,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div className="bg-gray-800 p-4 flex items-start space-x-4">
      <div className="bg-gray-700 rounded-full p-3 mt-1">{icon}</div>
      <div>
        <h4 className="text-sm font-medium text-gray-400">{title}</h4>
        {multiline ? (
          <div className="text-base font-semibold whitespace-pre-line">
            {value}
          </div>
        ) : (
          <p className="text-lg font-semibold">{value}</p>
        )}
      </div>
    </div>
  );
}
