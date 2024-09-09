import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ProcessedPlayer } from "../lib/types";
import { PlayerItem } from "./PlayerItem";
import { calculateTeamStats } from "../utils/playerUtils";

interface TeamSetupPlayerListProps {
  team: ProcessedPlayer[];
  teamName: string;
  removePlayer: (player: ProcessedPlayer) => void;
}

export const TeamSetupPlayerList: React.FC<TeamSetupPlayerListProps> = ({
  team,
  teamName,
  removePlayer,
}) => {
  const teamStats = calculateTeamStats(
    team,
    team.map((p) => p.Player)
  );

  return (
    <div className="w-full">
      <h3 className="text-2xl lg:text-3xl font-semibold mb-6 text-wheat-100">
        {teamName}
      </h3>
      {team.length === 0 ? (
        <p className="text-gray-400 my-5 lg:my-10 text-center">
          No players selected
        </p>
      ) : (
        <>
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
              <dt className="text-sm uppercase text-gray-400 mb-1">
                Total Points
              </dt>
              <dd className="text-2xl font-bold text-wheat-100">
                {teamStats.totalWNF}
              </dd>
            </div>
            <div
              className="bg-gray-800 rounded-lg p-4 text-center flex flex-col justify-between"
              aria-label="Average Age"
            >
              <dt className="text-sm uppercase text-gray-400 mb-1">
                Average Age
              </dt>
              <dd className="text-2xl font-bold text-wheat-100">
                {teamStats.averageAge.toFixed(1)}
              </dd>
            </div>
          </dl>
          <ul className="space-y-4">
            {team.map((player) => (
              <PlayerItem
                key={player.Player}
                player={player}
                actions={
                  <Button
                    onClick={() => removePlayer(player)}
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove player</span>
                  </Button>
                }
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
