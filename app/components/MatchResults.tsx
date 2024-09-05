"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Match } from "../lib/types";

interface MatchResultsProps {
  matches: Match[];
}

export default function MatchResults({ matches }: MatchResultsProps) {
  const [currentMatchIndex, setCurrentMatchIndex] = useState(
    matches.length - 1
  );
  const [playerStats, setPlayerStats] = useState<Record<string, string>>({});

  const handlePreviousMatch = () => {
    setCurrentMatchIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextMatch = () => {
    setCurrentMatchIndex((prev) => Math.min(matches.length - 1, prev + 1));
  };

  const currentMatch = matches[currentMatchIndex];

  useEffect(() => {
    if (currentMatch) {
      // console.log("Current Match:", JSON.stringify(currentMatch, null, 2));
      const stats: Record<string, string> = {};

      // Attempt to find playerStats in different possible locations
      const possiblePlayerStats =
        currentMatch.playerStats ||
        currentMatch["Player Stats"] ||
        currentMatch;

      if (Array.isArray(possiblePlayerStats)) {
        possiblePlayerStats.forEach((player) => {
          if (player.Player && player["Points per game"]) {
            stats[player.Player] = player["Points per game"];
          }
        });
      } else if (typeof possiblePlayerStats === "object") {
        Object.entries(possiblePlayerStats).forEach(([key, value]) => {
          if (typeof value === "object" && "Points per game" in value) {
            stats[key] = value["Points per game"];
          }
        });
      }

      // console.log("Processed Player Stats:", stats);
      setPlayerStats(stats);
    }
  }, [currentMatch]);

  const formatDate = (dateString: string) => {
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const PlayerList = ({
    players,
    teamName,
    alignRight = false,
  }: {
    players: string[];
    teamName: string;
    alignRight?: boolean;
  }) => (
    <div className={`border rounded-lg p-4 ${alignRight ? "text-right" : ""}`}>
      <h3 className="text-xl font-semibold mb-4">{teamName}</h3>
      <ul className="space-y-2">
        {players.map((playerName, index) => {
          const ppg = playerStats[playerName] || "N/A";
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
                  <User className="h-6 w-6 text-gray-500" />
                </div>
              </div>
              <div
                className={`flex flex-col ${
                  alignRight ? "items-end" : "items-start"
                }`}
              >
                <span className="text-lg">{playerName}</span>
                <Badge variant="secondary" className="text-xs">
                  PPG: {ppg}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PlayerList players={currentMatch.teamA} teamName="Team A" />
          <PlayerList
            players={currentMatch.teamB}
            teamName="Team B"
            alignRight={true}
          />
        </div>
        <div className="mt-4 text-center">
          <span className="text-2xl font-bold">
            Score: {currentMatch.score}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
