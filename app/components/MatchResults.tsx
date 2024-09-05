"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Match, ProcessedPlayer } from "../lib/types";
import * as ZodiacIcons from "../icons";

interface MatchResultsProps {
  matches: Match[];
  players: ProcessedPlayer[];
}

const zodiacIcons: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } =
  {
    Aries: ZodiacIcons.Aries,
    Taurus: ZodiacIcons.Taurus,
    Gemini: ZodiacIcons.Gemini,
    Cancer: ZodiacIcons.Cancer,
    Leo: ZodiacIcons.Leo,
    Virgo: ZodiacIcons.Virgo,
    Libra: ZodiacIcons.Libra,
    Scorpio: ZodiacIcons.Scorpio,
    Sagittarius: ZodiacIcons.Sagittarius,
    Capricorn: ZodiacIcons.Capricorn,
    Aquarius: ZodiacIcons.Aquarius,
    Pisces: ZodiacIcons.Pisces,
  };

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
        <p>Average PPG: {teamStats.averagePPG.toFixed(2)}</p>
        <p>Total WNF Points: {teamStats.totalWNF}</p>
        <p>Average Age: {teamStats.averageAge.toFixed(1)}</p>
      </div>
      <ul className="space-y-2">
        {players.map((playerName, index) => {
          const playerStats = getPlayerStats(playerName);
          const ppg = playerStats ? playerStats.PointsPerGame : 0;
          const ppgColor = getPPGColor(ppg);
          const starSign = playerStats?.StarSign;
          const IconComponent =
            starSign && starSign in zodiacIcons ? zodiacIcons[starSign] : User;
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
                  PPG: {ppg.toFixed(2)}
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
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PlayerList
              players={sortedTeamA}
              teamName="Team A"
              teamStats={teamAStats}
            />
            <PlayerList
              players={sortedTeamB}
              teamName="Team B"
              alignRight={true}
              teamStats={teamBStats}
            />
          </div>
        )}
        <div className="mt-4 text-center">
          <span className="text-2xl font-bold">
            {currentMatch.abandoned
              ? "N/A"
              : `Goal Difference: ${currentMatch.GoalDifference}`}
          </span>
        </div>
        <div className="mt-2 text-center">
          <span className="text-lg">
            Total Players: {currentMatch.TotalPlayers}
          </span>
        </div>
        <div className="mt-2 text-center">
          <span className="text-lg">
            Teams Picked By: {currentMatch.WhoPickedTeams}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
