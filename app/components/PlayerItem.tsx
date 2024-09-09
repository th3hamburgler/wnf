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
    <li className="flex items-center justify-between bg-gray-800 rounded-full p-3 lg:p-4 transition-colors hover:bg-blue-900">
      <div className="flex items-center flex-1 min-w-0">
        <div className="bg-gray-200 rounded-full p-2 lg:p-3 mr-3 lg:mr-4 flex-shrink-0">
          <IconComponent
            className="h-6 w-6 lg:h-8 lg:w-8 text-gray-700"
            aria-hidden="true"
          />
        </div>
        <span className="text-lg lg:text-xl xl:text-2xl font-medium truncate text-white">
          {player.Player}
        </span>
      </div>
      <div className="flex items-center">
        <Badge
          variant={ppgVariant}
          className="text-sm lg:text-base mr-2 whitespace-nowrap px-3 py-1"
        >
          {totalPoints}pts | {ppg.toFixed(2)} avg
        </Badge>
        {actions}
      </div>
    </li>
  );
};
