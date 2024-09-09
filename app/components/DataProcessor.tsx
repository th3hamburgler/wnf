"use client";

import React from "react";
import { ProcessedPlayer, Match, RawPlayerData } from "../lib/types";

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
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Calendar, Trophy, Database, Users, Bug } from "lucide-react";

interface DataProcessorProps {
  rawData: RawPlayerData[];
  processedMatches: Match[];
  processedPlayers: ProcessedPlayer[];
}

export default function DataProcessor({
  rawData,
  processedMatches,
  processedPlayers,
}: DataProcessorProps) {
  const renderPlayerTable = (players: ProcessedPlayer[]) => (
    <ScrollArea className="h-[600px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Name</TableHead>
            <TableHead>DOB</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Star Sign</TableHead>
            <TableHead>Games</TableHead>
            <TableHead>W</TableHead>
            <TableHead>D</TableHead>
            <TableHead>L</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>PPG</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{player.Player}</TableCell>
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
    </ScrollArea>
  );

  const renderMatchTable = (matches: Match[]) => (
    <ScrollArea className="h-[600px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Team A</TableHead>
            <TableHead>Team B</TableHead>
            <TableHead>Players</TableHead>
            <TableHead>Goal Diff</TableHead>
            <TableHead>Picked By</TableHead>
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
    </ScrollArea>
  );

  return (
    <Card className="w-full bg-gray-900 text-white border-4 border-wheat-100 rounded-3xl">
      <CardHeader>
        <div className="flex items-center">
          <Bug className="w-8 h-8 lg:w-16 lg:h-16 text-wheat-100 mr-3 lg:mr-5" />
          <h2 className="text-3xl xl:text-4xl 2xl:text-6xl font-extrabold tracking-tight text-wheat-100 uppercase">
            Data Debugging
          </h2>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="processedPlayers" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger
              value="processedPlayers"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <User className="w-4 h-4 mr-2" />
              Players
            </TabsTrigger>
            <TabsTrigger
              value="processedMatches"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Matches
            </TabsTrigger>
            <TabsTrigger
              value="rawData"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Database className="w-4 h-4 mr-2" />
              Raw Data
            </TabsTrigger>
          </TabsList>
          <TabsContent value="processedPlayers" className="border-none p-0">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Processed Players
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {renderPlayerTable(processedPlayers)}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="processedMatches" className="border-none p-0">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Processed Matches
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {renderMatchTable(processedMatches)}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="rawData" className="border-none p-0">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  Raw Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] w-full">
                  <pre className="bg-gray-900 p-4 rounded-md text-xs text-gray-300 whitespace-pre-wrap">
                    {JSON.stringify(rawData, null, 2)}
                  </pre>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
