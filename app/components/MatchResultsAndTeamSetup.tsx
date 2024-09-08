"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Loader2,
  X,
  CheckIcon,
  ChevronsUpDown,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Match, ProcessedPlayer } from "../lib/types";
import Image from "next/image";
import * as ZodiacIcons from "../icons";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

  const formatDate = useCallback((dateString: string) => {
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  const getPlayerStats = useCallback(
    (playerName: string) => {
      return players.find((player) => player.Player === playerName);
    },
    [players]
  );

  const sortPlayersByPPG = useCallback(
    (playerNames: string[]) => {
      return playerNames
        .map((name) => {
          const stats = getPlayerStats(name);
          return { name, ppg: stats ? stats.PointsPerGame : 0 };
        })
        .sort((a, b) => b.ppg - a.ppg)
        .map((player) => player.name);
    },
    [getPlayerStats]
  );

  const getPPGColor = useCallback((ppg: number) => {
    if (ppg >= 0 && ppg < 1) return "bg-red-500 text-white";
    if (ppg >= 1 && ppg < 2) return "bg-amber-500 text-white";
    if (ppg >= 2 && ppg <= 3) return "bg-green-500 text-white";
    return "bg-gray-500 text-white";
  }, []);

  const calculateTeamStats = useCallback(
    (teamPlayers: string[]) => {
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
    },
    [getPlayerStats]
  );

  const getTeamNames = useCallback((match: Match) => {
    if (match.GoalDifference > 0) {
      return { teamA: "Baghdad Winner", teamB: "Bibs Loser" };
    } else if (match.GoalDifference < 0) {
      return { teamA: "Baghdad Loser", teamB: "Bibs Winner" };
    } else {
      return { teamA: "Baghdad Draw", teamB: "Bibs Draw" };
    }
  }, []);

  const sortedTeamA = useMemo(
    () => sortPlayersByPPG(currentMatch.teamA),
    [currentMatch.teamA, sortPlayersByPPG]
  );
  const sortedTeamB = useMemo(
    () => sortPlayersByPPG(currentMatch.teamB),
    [currentMatch.teamB, sortPlayersByPPG]
  );

  const teamAStats = useMemo(
    () => calculateTeamStats(currentMatch.teamA),
    [currentMatch.teamA, calculateTeamStats]
  );
  const teamBStats = useMemo(
    () => calculateTeamStats(currentMatch.teamB),
    [currentMatch.teamB, calculateTeamStats]
  );

  const teamNames = useMemo(
    () => getTeamNames(currentMatch),
    [currentMatch, getTeamNames]
  );

  const PlayerList = useCallback(
    ({
      players,
      teamName,
      teamStats,
    }: {
      players: string[];
      teamName: string;
      teamStats: ReturnType<typeof calculateTeamStats>;
    }) => (
      <div className="rounded-lg p-4 w-full bg-gray-800 border-none">
        <h3 className="text-xl font-semibold mb-4">{teamName}</h3>
        <div className="mb-4 space-y-2">
          <p className="flex justify-between">
            <span>Points Per Game:</span>
            <span>{teamStats.averagePPG.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Total WNF Points:</span>
            <span>{teamStats.totalWNF}</span>
          </p>
          <p className="flex justify-between">
            <span>Average Age:</span>
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
              <li key={index} className="flex items-center justify-between">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="bg-gray-200 rounded-full p-2 mr-3 flex-shrink-0">
                    <IconComponent
                      className="h-6 w-6 text-gray-500"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-lg truncate">{playerName}</span>
                </div>
                <Badge
                  variant="secondary"
                  className={`text-xs ${ppgColor} ml-2 whitespace-nowrap`}
                >
                  {totalPoints}pts | {ppg.toFixed(2)}
                </Badge>
              </li>
            );
          })}
        </ul>
      </div>
    ),
    [getPlayerStats, getPPGColor]
  );

  const availablePlayers = useMemo(() => {
    return players.filter(
      (player) =>
        !baghdad.some((p) => p.Player === player.Player) &&
        !bibs.some((p) => p.Player === player.Player)
    );
  }, [players, baghdad, bibs]);

  const TeamSetupPlayerList = useCallback(
    ({
      team,
      teamName,
      removePlayer,
    }: {
      team: ProcessedPlayer[];
      teamName: string;
      removePlayer: (player: ProcessedPlayer) => void;
    }) => {
      const teamStats = calculateTeamStats(team.map((p) => p.Player));

      return (
        <div className="border rounded-lg p-4 w-full bg-gray-800">
          <h3 className="text-xl font-semibold mb-4">{teamName}</h3>
          <div className="mb-4 space-y-2">
            <p className="flex justify-between">
              <span>Points Per Game:</span>
              <span>{teamStats.averagePPG.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Total WNF Points:</span>
              <span>{teamStats.totalWNF}</span>
            </p>
            <p className="flex justify-between">
              <span>Average Age:</span>
              <span>{teamStats.averageAge.toFixed(1)}</span>
            </p>
          </div>
          <ul className="space-y-2">
            {team.map((player, index) => {
              const ppgColor = getPPGColor(player.PointsPerGame);
              const IconComponent =
                player.StarSign && player.StarSign in ZodiacIcons
                  ? ZodiacIcons[player.StarSign as keyof typeof ZodiacIcons]
                  : User;
              return (
                <li key={index} className="flex items-center justify-between">
                  <div className="flex items-center flex-1 min-w-0">
                    <div className="bg-gray-200 rounded-full p-2 mr-3 flex-shrink-0">
                      <IconComponent
                        className="h-6 w-6 text-gray-500"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-lg truncate">{player.Player}</span>
                  </div>
                  <div className="flex items-center">
                    <Badge
                      variant="secondary"
                      className={`text-xs ${ppgColor} ml-2 whitespace-nowrap`}
                    >
                      {player.TotalPoints}pts |{" "}
                      {player.PointsPerGame.toFixed(2)}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2"
                      onClick={() => removePlayer(player)}
                      aria-label={`Remove ${player.Player}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    },
    [calculateTeamStats, getPPGColor]
  );

  const ComboBox = ({
    team,
    setTeam,
    open,
    setOpen,
    label,
  }: {
    team: ProcessedPlayer[];
    setTeam: React.Dispatch<React.SetStateAction<ProcessedPlayer[]>>;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    label: string;
  }) => (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between hover:text-gray-200 text-gray-300 border rounded-lg p-4"
        >
          {team.length > 0
            ? `${team.length} player${team.length > 1 ? "s" : ""} selected`
            : `Select players for ${label}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 text-black">
        <Command>
          <CommandInput
            placeholder="Search player..."
            className="h-9 placeholder-gray-500"
          />
          <CommandList>
            <CommandEmpty>No player found.</CommandEmpty>
            <CommandGroup>
              {availablePlayers.map((player) => (
                <CommandItem
                  key={player.Player}
                  value={player.Player}
                  onSelect={(currentValue) => {
                    setTeam((prev) => {
                      const isSelected = prev.some(
                        (p) => p.Player === currentValue
                      );
                      if (isSelected) {
                        return prev.filter((p) => p.Player !== currentValue);
                      } else {
                        const playerToAdd = availablePlayers.find(
                          (p) => p.Player === currentValue
                        );
                        return playerToAdd ? [...prev, playerToAdd] : prev;
                      }
                    });
                  }}
                >
                  <div className="flex justify-between items-center w-full">
                    <span>{player.Player}</span>
                    <span className="text-sm text-gray-500">
                      PPG: {player.PointsPerGame.toFixed(2)}
                    </span>
                  </div>
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      team.some((p) => p.Player === player.Player)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );

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
    <Card className="w-full Match bg-gray-900 rounded-3xl shadow-xl overflow-x-auto text-white border-4 border-white">
      <CardHeader>
        <CardTitle className="text-3xl font-extrabold tracking-tight text-white uppercase">
          {isSelectingTeams ? "Set Up Teams" : "Match Results"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
          <Button
            onClick={handlePreviousMatch}
            disabled={currentMatchIndex === 0 || isLoading}
            aria-label="Previous Match"
            className="w-full sm:w-auto"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous Match
          </Button>
          <span className="text-lg font-medium order-first sm:order-none">
            {isSelectingTeams ? "Next Match" : formatDate(currentMatch.date)}
          </span>
          <Button
            onClick={handleNextMatch}
            disabled={isLoading}
            aria-label={
              currentMatchIndex === matches.length - 1
                ? "Select Teams"
                : "Next Match"
            }
            className={cn(
              "w-full sm:w-auto",
              currentMatchIndex === matches.length - 1
                ? "bg-accent text-accent-foreground hover:bg-accent/90"
                : ""
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
            <div className="mt-4 mb-4 text-center">
              <div className="text-4xl font-bold" aria-live="polite">
                {currentMatch.GoalDifference
                  ? `+ ${currentMatch.GoalDifference}`
                  : "Draw"}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
              <PlayerList
                players={sortedTeamA}
                teamName={teamNames.teamA}
                teamStats={teamAStats}
              />
              <PlayerList
                players={sortedTeamB}
                teamName={teamNames.teamB}
                teamStats={teamBStats}
              />
            </div>
          </div>
        )}

        {!isSelectingTeams && (
          <div className="mt-4 text-center">
            <span className="text-lg">
              Teams Picked By: {currentMatch.WhoPickedTeams}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
