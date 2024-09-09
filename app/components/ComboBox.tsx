import React from "react";
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
import { ChevronsUpDown, CheckIcon } from "lucide-react";
import { ProcessedPlayer } from "../lib/types";
import { cn } from "@/lib/utils";

interface ComboBoxProps {
  team: ProcessedPlayer[];
  setTeam: React.Dispatch<React.SetStateAction<ProcessedPlayer[]>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  availablePlayers: ProcessedPlayer[];
}

export const ComboBox: React.FC<ComboBoxProps> = ({
  team,
  setTeam,
  open,
  setOpen,
  label,
  availablePlayers,
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
    <PopoverContent className="w-full p-0 text-white bg-blue-950">
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
                    avg: {player.PointsPerGame.toFixed(2)}
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
