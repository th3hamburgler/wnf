"use client";

import React, { useState, useEffect } from "react";
import { fetchFootballData } from "../lib/api";
import { FootballData, ProcessedPlayer, Match } from "../lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function DataProcessor() {
  const [footballData, setFootballData] = useState<FootballData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchFootballData();
        setFootballData(data);
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  if (isLoading) {
    return <div className="p-4 text-center">Loading data...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  if (!footballData) {
    return <div className="p-4 text-center">No data available</div>;
  }

  const renderPlayerTable = (players: ProcessedPlayer[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>DOB</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Star Sign</TableHead>
          <TableHead>Games Played</TableHead>
          <TableHead>Wins</TableHead>
          <TableHead>Draws</TableHead>
          <TableHead>Losses</TableHead>
          <TableHead>Total Points</TableHead>
          <TableHead>Points per Game</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((player, index) => (
          <TableRow key={index}>
            <TableCell>{player.Player}</TableCell>
            <TableCell>{player.DOB || "N/A"}</TableCell>
            <TableCell>{player.Age !== null ? player.Age : "N/A"}</TableCell>
            <TableCell>{player.StarSign || "N/A"}</TableCell>
            <TableCell>{player.GamesPlayed}</TableCell>
            <TableCell>{player.Wins}</TableCell>
            <TableCell>{player.Draws}</TableCell>
            <TableCell>{player.Losses}</TableCell>
            <TableCell>{player.TotalPoints}</TableCell>
            <TableCell>{player.PointsPerGame.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderMatchTable = (matches: Match[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Team A</TableHead>
          <TableHead>Team B</TableHead>
          <TableHead>Total Players</TableHead>
          <TableHead>Goal Difference</TableHead>
          <TableHead>Who Picked Teams</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {matches.map((match, index) => (
          <TableRow key={index}>
            <TableCell>{match.date}</TableCell>
            <TableCell>{match.teamA.join(", ")}</TableCell>
            <TableCell>{match.teamB.join(", ")}</TableCell>
            <TableCell>{match.TotalPlayers}</TableCell>
            <TableCell>{match.GoalDifference}</TableCell>
            <TableCell>{match.WhoPickedTeams}</TableCell>
            <TableCell>
              {match.abandoned ? (
                <Badge variant="destructive">Abandoned</Badge>
              ) : (
                <Badge variant="default">Completed</Badge>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Processed Football Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="processedPlayers">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="processedPlayers">
              Processed Players
            </TabsTrigger>
            <TabsTrigger value="processedMatches">
              Processed Matches
            </TabsTrigger>
            <TabsTrigger value="rawData">Raw Data</TabsTrigger>
          </TabsList>
          <TabsContent value="processedPlayers">
            {renderPlayerTable(footballData.processedPlayers)}
          </TabsContent>
          <TabsContent value="processedMatches">
            {renderMatchTable(footballData.processedMatches)}
          </TabsContent>
          <TabsContent value="rawData">
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96 text-xs">
              {JSON.stringify(footballData.rawData, null, 2)}
            </pre>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
