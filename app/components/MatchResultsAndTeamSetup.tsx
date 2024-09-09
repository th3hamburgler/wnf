"use client";

import React, { useState, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight, Medal, Loader2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Match, ProcessedPlayer } from "../lib/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatDate } from "../utils/dateFormatters";
import { sortPlayersByPPG, getTeamNames } from "../utils/playerUtils";
import { PlayerList } from "./PlayerList";
import { TeamSetupPlayerList } from "./TeamSetupPlayerList";
import { ComboBox } from "./ComboBox";

interface MatchResultsAndTeamSetupProps {
  matches: Match[];
  players: ProcessedPlayer[];
}

export default function MatchResultsAndTeamSetup({
  matches,
  players,
}: MatchResultsAndTeamSetupProps) {
  const [currentMatchIndex, setCurrentMatchIndex] = useState(
    matches.length - 1
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSelectingTeams, setIsSelectingTeams] = useState(false);
  const [baghdad, setBaghdad] = useState<ProcessedPlayer[]>([]);
  const [bibs, setBibs] = useState<ProcessedPlayer[]>([]);
  const [openBaghdad, setOpenBaghdad] = useState(false);
  const [openBibs, setOpenBibs] = useState(false);

  const handlePreviousMatch = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentMatchIndex((prev) => Math.max(0, prev - 1));
      setIsLoading(false);
      setIsSelectingTeams(false);
    }, 500);
  }, []);

  const handleNextMatch = useCallback(() => {
    if (currentMatchIndex === matches.length - 1) {
      setIsSelectingTeams(true);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentMatchIndex((prev) => Math.min(matches.length - 1, prev + 1));
        setIsLoading(false);
      }, 500);
    }
  }, [currentMatchIndex, matches.length]);

  const currentMatch = matches[currentMatchIndex];

  const sortedTeamA = useMemo(
    () => sortPlayersByPPG(players, currentMatch.teamA),
    [currentMatch.teamA, players]
  );
  const sortedTeamB = useMemo(
    () => sortPlayersByPPG(players, currentMatch.teamB),
    [currentMatch.teamB, players]
  );

  const teamNames = useMemo(
    () => getTeamNames(currentMatch.GoalDifference),
    [currentMatch.GoalDifference]
  );

  const availablePlayers = useMemo(() => {
    return players.filter(
      (player) =>
        !baghdad.some((p) => p.Player === player.Player) &&
        !bibs.some((p) => p.Player === player.Player)
    );
  }, [players, baghdad, bibs]);

  const removePlayerFromTeam = useCallback(
    (
      player: ProcessedPlayer,
      team: ProcessedPlayer[],
      setTeam: React.Dispatch<React.SetStateAction<ProcessedPlayer[]>>
    ) => {
      setTeam(team.filter((p) => p.Player !== player.Player));
    },
    []
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
    <Card className="w-full Match bg-gray-900 rounded-3xl shadow-xl overflow-x-auto text-white border-4 border-wheat-100">
      <CardHeader>
        <div className="flex items-center">
          <Medal className="w-8 h-8 lg:w-16 lg:h-16 text-wheat-100 mr-3 lg:mr-5" />
          <h2 className="text-3xl lg:text-6xl font-extrabold tracking-tight text-wheat-100 uppercase">
            {isSelectingTeams ? "Set Up Teams" : "Match Results"}
          </h2>
        </div>
      </CardHeader>
      <CardContent>
        {/* Navigation buttons */}
        <div className="flex flex-col items-center mb-4 space-y-2">
          <span className="text-lg font-medium mb-2">
            {isSelectingTeams ? "Next Match" : formatDate(currentMatch.date)}
          </span>
          <div className="flex w-full  mx-auto justify-between space-x-2">
            <Button
              onClick={handlePreviousMatch}
              disabled={currentMatchIndex === 0 || isLoading}
              aria-label="Previous Match"
              className="flex-1 bg-blue-800 text-white hover:bg-blue-700 transition-colors md:max-w-56"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous Match
            </Button>
            <Button
              onClick={handleNextMatch}
              disabled={isLoading || isSelectingTeams}
              aria-label={
                currentMatchIndex === matches.length - 1
                  ? "Select Teams"
                  : "Next Match"
              }
              className={cn(
                "flex-1",
                currentMatchIndex === matches.length - 1
                  ? "bg-green-600 text-white hover:bg-green-700 transition-colors md:max-w-56"
                  : "bg-blue-800 text-white hover:bg-blue-700 transition-colors md:max-w-56"
              )}
            >
              {currentMatchIndex === matches.length - 1 ? (
                <>
                  <Users className="h-4 w-4 mr-2" />
                  Select Teams
                </>
              ) : (
                <>
                  Next Match
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Main content */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="sr-only">Loading...</span>
          </div>
        ) : isSelectingTeams ? (
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
            <div className="w-full lg:w-1/2 space-y-4">
              <TeamSetupPlayerList
                team={baghdad}
                teamName="Baghdad"
                removePlayer={(player) =>
                  removePlayerFromTeam(player, baghdad, setBaghdad)
                }
              />
              <ComboBox
                team={baghdad}
                setTeam={setBaghdad}
                open={openBaghdad}
                setOpen={setOpenBaghdad}
                label="Baghdad"
                availablePlayers={availablePlayers}
              />
            </div>
            <div className="w-full lg:w-1/2 space-y-4">
              <TeamSetupPlayerList
                team={bibs}
                teamName="Bibs"
                removePlayer={(player) =>
                  removePlayerFromTeam(player, bibs, setBibs)
                }
              />
              <ComboBox
                team={bibs}
                setTeam={setBibs}
                open={openBibs}
                setOpen={setOpenBibs}
                label="Bibs"
                availablePlayers={availablePlayers}
              />
            </div>
          </div>
        ) : currentMatch.abandoned ? (
          <div className="text-center mb-4">
            <Badge variant="destructive" className="text-lg">
              Match Abandoned
            </Badge>
            <div className="mt-4 flex justify-center">
              <Image
                src="/images/Diana_Ross_Misses_Penalty.gif"
                alt="Match Abandoned"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="mt-8 mb-8 text-center">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 blur-lg opacity-50"></div>
                <div
                  className="relative z-10 text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500 py-4 px-8 rounded-lg shadow-lg"
                  aria-live="polite"
                >
                  {currentMatch.GoalDifference > 0 && "+"}
                  {currentMatch.GoalDifference || "Draw"}
                </div>
              </div>
              <div className="mt-4 text-2xl font-semibold text-gray-300">
                Goal Difference
              </div>
            </div>
            <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
              <PlayerList
                players={sortedTeamA}
                teamName={teamNames.teamA}
                allPlayers={players}
                goalDifference={currentMatch.GoalDifference}
                isTeamA={true}
              />
              <PlayerList
                players={sortedTeamB}
                teamName={teamNames.teamB}
                allPlayers={players}
                goalDifference={currentMatch.GoalDifference}
                isTeamA={false}
              />
            </div>
          </div>
        )}

        {!isSelectingTeams && (
          <div className="mt-6 text-center">
            <span className="text-xl">
              Teams Picked By: {currentMatch.WhoPickedTeams}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
