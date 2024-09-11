import React from "react";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import * as ZodiacIcons from "../icons";
import { ProcessedPlayer } from "../lib/types";
import { getPPGVariant } from "../utils/playerUtils";

interface PlayerItemProps {
  player: ProcessedPlayer;
  actions?: React.ReactNode;
}

export const PlayerItem: React.FC<PlayerItemProps> = ({ player, actions }) => {
  const ppg = player.PointsPerGame;
  const totalPoints = player.TotalPoints;
  const ppgVariant = getPPGVariant(ppg);
  const IconComponent =
    player.StarSign && player.StarSign in ZodiacIcons
      ? ZodiacIcons[player.StarSign as keyof typeof ZodiacIcons]
      : User;

  return (
    <li className="flex items-center justify-between bg-gray-800 rounded-lg sm:rounded-full p-3 lg:p-4 transition-colors hover:bg-blue-900 relative">
      <div className="flex items-center flex-1 min-w-0 pr-12">
        <div className="bg-gray-200 rounded-full p-2 lg:p-3 mr-3 lg:mr-4 flex-shrink-0">
          <IconComponent
            className="h-4 w-4 lg:h-6 lg:w-6 text-gray-700"
            aria-hidden="true"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center flex-1 min-w-0">
          <span className="text-lg lg:text-xl font-medium truncate text-white mr-2">
            {player.Player}
          </span>
          <Badge variant={ppgVariant} className="mt-1 sm:mt-0">
            {totalPoints}pts | {ppg.toFixed(2)}
          </Badge>
        </div>
      </div>
      {actions && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {actions}
        </div>
      )}
    </li>
  );
};
