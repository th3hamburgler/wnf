import React from "react";
import { ProcessedPlayer } from "../lib/types";
import { calculateTeamStats } from "../utils/playerUtils";
import { PlayerItem } from "./PlayerItem";

interface PlayerListProps {
  players: string[];
  teamName: string;
  allPlayers: ProcessedPlayer[];
  goalDifference: number;
  isTeamA: boolean;
}

export const PlayerList: React.FC<PlayerListProps> = ({
  players,
  teamName,
  allPlayers,
}) => {
  const teamStats = calculateTeamStats(allPlayers, players);

  return (
    <div className="w-full">
      <h3 className="text-2xl lg:text-3xl font-semibold mb-6 text-wheat-100">
        {teamName}
      </h3>
      <dl className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className="bg-gray-800 rounded-lg p-4 text-center flex flex-col justify-between"
          aria-label="Points Per Game"
        >
          <dt className="text-sm uppercase text-gray-400 mb-1">
            Points Per Game
          </dt>
          <dd className="text-2xl font-bold text-wheat-100">
            {teamStats.averagePPG.toFixed(2)}
          </dd>
        </div>
        <div
          className="bg-gray-800 rounded-lg p-4 text-center flex flex-col justify-between"
          aria-label="Total Points"
        >
          <dt className="text-sm uppercase text-gray-400 mb-1">Total Points</dt>
          <dd className="text-2xl font-bold text-wheat-100">
            {teamStats.totalWNF}
          </dd>
        </div>
        <div
          className="bg-gray-800 rounded-lg p-4 text-center flex flex-col justify-between"
          aria-label="Average Age"
        >
          <dt className="text-sm uppercase text-gray-400 mb-1">Average Age</dt>
          <dd className="text-2xl font-bold text-wheat-100">
            {teamStats.averageAge.toFixed(1)}
          </dd>
        </div>
      </dl>
      <ul className="space-y-4">
        {players.map((playerName) => {
          const playerStats = allPlayers.find((p) => p.Player === playerName);
          return playerStats ? (
            <PlayerItem key={playerName} player={playerStats} />
          ) : null;
        })}
      </ul>
    </div>
  );
};
