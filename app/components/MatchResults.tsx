"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Match, ProcessedPlayer } from "../lib/types";
import Image from "next/image";
import * as ZodiacIcons from "../icons";

interface MatchResultsProps {
  matches: Match[];
  players: ProcessedPlayer[];
}

export default function MatchResults({ matches, players }: MatchResultsProps) {
  const [currentMatchIndex, setCurrentMatchIndex] = useState(
    matches.length - 1
  );

  const handlePreviousMatch = () => {
    setCurrentMatchIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextMatch = () => {
    setCurrentMatchIndex((prev) => Math.min(matches.length - 1, prev + 1));
  };

  const currentMatch = matches[currentMatchIndex];

  const formatDate = (dateString: string) => {
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getPlayerStats = (playerName: string) => {
    return players.find((player) => player.Player === playerName);
  };

  const sortPlayersByPPG = (playerNames: string[]) => {
    return playerNames
      .map((name) => {
        const stats = getPlayerStats(name);
        return { name, ppg: stats ? stats.PointsPerGame : 0 };
      })
      .sort((a, b) => b.ppg - a.ppg)
      .map((player) => player.name);
  };

  const getPPGColor = (ppg: number) => {
    if (ppg >= 0 && ppg < 1) return "bg-red-500 text-white";
    if (ppg >= 1 && ppg < 2) return "bg-amber-500 text-white";
    if (ppg >= 2 && ppg <= 3) return "bg-green-500 text-white";
    return "bg-gray-500 text-white"; // Default color for values outside the specified ranges
  };

  const calculateTeamStats = (teamPlayers: string[]) => {
    const teamStats = teamPlayers.reduce(
      (acc, playerName) => {
        const playerStats = getPlayerStats(playerName);
        if (playerStats) {
          acc.totalPPG += playerStats.PointsPerGame;
          acc.totalWNF += playerStats.TotalPoints;
          acc.totalAge += playerStats.Age || 0;
          acc.playerCount++;
        }
        return acc;
      },
      { totalPPG: 0, totalWNF: 0, totalAge: 0, playerCount: 0 }
    );

    return {
      averagePPG: teamStats.totalPPG / teamStats.playerCount || 0,
      totalWNF: teamStats.totalWNF,
      averageAge: teamStats.totalAge / teamStats.playerCount || 0,
    };
  };

  const getTeamNames = (match: Match) => {
    if (match.GoalDifference > 0) {
      return { teamA: "Team Winner", teamB: "Team Loser" };
    } else if (match.GoalDifference < 0) {
      return { teamA: "Team Loser", teamB: "Team Winner" };
    } else {
      return { teamA: "Team Draw", teamB: "Team Draw" };
    }
  };

  const sortedTeamA = useMemo(
    () => sortPlayersByPPG(currentMatch.teamA),
    [currentMatch.teamA, players]
  );
  const sortedTeamB = useMemo(
    () => sortPlayersByPPG(currentMatch.teamB),
    [currentMatch.teamB, players]
  );

  const teamAStats = useMemo(
    () => calculateTeamStats(currentMatch.teamA),
    [currentMatch.teamA, players]
  );
  const teamBStats = useMemo(
    () => calculateTeamStats(currentMatch.teamB),
    [currentMatch.teamB, players]
  );

  const teamNames = useMemo(() => getTeamNames(currentMatch), [currentMatch]);

  const PlayerList = ({
    players,
    teamName,
    alignRight = false,
    teamStats,
  }: {
    players: string[];
    teamName: string;
    alignRight?: boolean;
    teamStats: ReturnType<typeof calculateTeamStats>;
  }) => (
    <div className={`border rounded-lg p-4 ${alignRight ? "text-right" : ""}`}>
      <h3 className="text-xl font-semibold mb-4">{teamName}</h3>
      <div className="mb-4">
        <p className="flex justify-between">
          <span>Points Per Game:</span>{" "}
          <span>{teamStats.averagePPG.toFixed(2)}</span>
        </p>
        <p className="flex justify-between">
          <span>Total WNF Points:</span> <span>{teamStats.totalWNF}</span>
        </p>
        <p className="flex justify-between">
          <span>Average Age:</span>{" "}
          <span>{teamStats.averageAge.toFixed(1)}</span>
        </p>
      </div>
      <ul className="space-y-2">
        {players.map((playerName, index) => {
          const playerStats = getPlayerStats(playerName);
          const ppg = playerStats ? playerStats.PointsPerGame : 0;
          const totalPoints = playerStats ? playerStats.TotalPoints : 0;
          const ppgColor = getPPGColor(ppg);
          const starSign = playerStats?.StarSign;
          const IconComponent =
            starSign && starSign in ZodiacIcons
              ? ZodiacIcons[starSign as keyof typeof ZodiacIcons]
              : User;
          return (
            <li
              key={index}
              className={`flex items-center ${
                alignRight ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex items-center ${alignRight ? "ml-3" : "mr-3"}`}
              >
                <div className="bg-gray-200 rounded-full p-2">
                  <IconComponent className="h-6 w-6 text-gray-500" />
                </div>
              </div>
              <div
                className={`flex flex-col ${
                  alignRight ? "items-end" : "items-start"
                }`}
              >
                <span className="text-lg">{playerName}</span>
                <Badge variant="secondary" className={`text-xs ${ppgColor}`}>
                  {totalPoints}pts | {ppg.toFixed(2)}
                </Badge>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  if (!currentMatch) {
    return (
      <Card className="w-full">
        <CardContent>
          <p className="text-center">No match data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Match Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Button
            onClick={handlePreviousMatch}
            disabled={currentMatchIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous Match
          </Button>
          <span className="text-lg font-medium">
            {formatDate(currentMatch.date)}
          </span>
          <Button
            onClick={handleNextMatch}
            disabled={currentMatchIndex === matches.length - 1}
          >
            Next Match
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {currentMatch.abandoned ? (
          <div className="text-center mb-4">
            <Badge variant="destructive" className="text-lg">
              Match Abandoned
            </Badge>
            <div className="mt-4 flex justify-center">
              <Image
                src="/images/Diana_Ross_Misses_Penalty.gif"
                alt="Match Abandoned"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto"
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="mt-4 mb-4 text-center">
              <div className="text-4xl font-bold">
                {currentMatch.GoalDifference
                  ? `+ ${currentMatch.GoalDifference}`
                  : "Draw"}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PlayerList
                players={sortedTeamA}
                teamName={teamNames.teamA}
                teamStats={teamAStats}
              />
              <PlayerList
                players={sortedTeamB}
                teamName={teamNames.teamB}
                alignRight={true}
                teamStats={teamBStats}
              />
            </div>
          </div>
        )}

        <div className="mt-4 text-center">
          <span className="text-lg">
            Teams Picked By: {currentMatch.WhoPickedTeams}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
