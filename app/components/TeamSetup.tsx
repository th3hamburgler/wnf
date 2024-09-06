"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProcessedPlayer } from "../lib/types";
import * as ZodiacIcons from "../icons";

interface TeamSetupProps {
  processedPlayers: ProcessedPlayer[];
}

export default function TeamSetup({ processedPlayers }: TeamSetupProps) {
  const [baghdad, setBaghdad] = React.useState<ProcessedPlayer[]>([]);
  const [bibs, setBibs] = React.useState<ProcessedPlayer[]>([]);
  const [openBaghdad, setOpenBaghdad] = React.useState(false);
  const [openBibs, setOpenBibs] = React.useState(false);

  const availablePlayers = React.useMemo(() => {
    return processedPlayers.filter(
      (player) =>
        !baghdad.some((p) => p.Player === player.Player) &&
        !bibs.some((p) => p.Player === player.Player)
    );
  }, [processedPlayers, baghdad, bibs]);

  const calculateTeamStats = React.useCallback((team: ProcessedPlayer[]) => {
    const stats = team.reduce(
      (acc, player) => {
        acc.totalPPG += player.PointsPerGame;
        acc.totalPoints += player.TotalPoints;
        acc.totalAge += player.Age || 0;
        acc.playerCount++;
        return acc;
      },
      { totalPPG: 0, totalPoints: 0, totalAge: 0, playerCount: 0 }
    );

    return {
      averagePPG: stats.totalPPG / stats.playerCount || 0,
      totalPoints: stats.totalPoints,
      averageAge: stats.totalAge / stats.playerCount || 0,
    };
  }, []);

  const getPPGColor = React.useCallback((ppg: number) => {
    if (ppg >= 0 && ppg < 1) return "bg-red-500 text-white";
    if (ppg >= 1 && ppg < 2) return "bg-amber-500 text-white";
    if (ppg >= 2 && ppg <= 3) return "bg-green-500 text-white";
    return "bg-gray-500 text-white";
  }, []);

  const PlayerList = React.useCallback(
    ({
      team,
      teamName,
      removePlayer,
    }: {
      team: ProcessedPlayer[];
      teamName: string;
      removePlayer: (player: ProcessedPlayer) => void;
    }) => {
      const teamStats = calculateTeamStats(team);

      return (
        <div className="border rounded-lg p-4 w-full">
          <h3 className="text-xl font-semibold mb-4">{teamName}</h3>
          <div className="mb-4 space-y-2">
            <p className="flex justify-between">
              <span>Points Per Game:</span>
              <span>{teamStats.averagePPG.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Total WNF Points:</span>
              <span>{teamStats.totalPoints}</span>
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
          className="w-full justify-between"
        >
          {team.length > 0
            ? `${team.length} player${team.length > 1 ? "s" : ""} selected`
            : `Select players for ${label}...`}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search player..." className="h-9" />
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
                      PPG: {player.PointsPerGame.toFixed(2)} | Apps:{" "}
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

  const removePlayerFromTeam = React.useCallback(
    (
      player: ProcessedPlayer,
      team: ProcessedPlayer[],
      setTeam: React.Dispatch<React.SetStateAction<ProcessedPlayer[]>>
    ) => {
      setTeam(team.filter((p) => p.Player !== player.Player));
    },
    []
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Set Up Teams</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
          <div className="w-full lg:w-1/2 space-y-4">
            <PlayerList
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
            <PlayerList
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
      </CardContent>
    </Card>
  );
}
