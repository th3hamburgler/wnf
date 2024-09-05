"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Player } from "../lib/types";

interface PlayerStatsProps {
  players: Player[];
}

export default function PlayerStats({ players }: PlayerStatsProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
      <h2 className="text-2xl font-semibold mb-4">Player Statistics</h2>
      <Select
        onValueChange={(value) =>
          setSelectedPlayer(players.find((p) => p.id === value) || null)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a player" />
        </SelectTrigger>
        <SelectContent>
          {players.map((player) => (
            <SelectItem key={player.id} value={player.id}>
              {player.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedPlayer && (
        <div className="mt-4">
          <h3 className="text-xl font-medium mb-2">{selectedPlayer.name}</h3>
          <p>Games Played: {selectedPlayer.played}</p>
          <p>Wins: {selectedPlayer.won}</p>
          <p>Draws: {selectedPlayer.drawn}</p>
          <p>Losses: {selectedPlayer.lost}</p>
          <p>Total Points: {selectedPlayer.points}</p>
          <p>
            Win Rate:{" "}
            {((selectedPlayer.won / selectedPlayer.played) * 100).toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
}
