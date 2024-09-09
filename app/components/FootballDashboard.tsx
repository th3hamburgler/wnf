import React from "react";
import LeagueTable from "./LeagueTable";
import PlayerStats from "./PlayerStats";
import { fetchFootballData } from "../lib/api";
import DataProcessor from "./DataProcessor";
import MatchResultsAndTeamSetup from "./MatchResultsAndTeamSetup";

export default async function FootballDashboard() {
  const data = await fetchFootballData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      <div className="flex flex-col gap-4 md:gap-8">
        <div>
          <MatchResultsAndTeamSetup
            matches={data.processedMatches}
            players={data.processedPlayers}
          />
        </div>
        <div className="flex flex-1">
          <PlayerStats
            players={data.processedPlayers}
            matches={data.processedMatches}
          />
        </div>
      </div>

      <LeagueTable players={data.processedPlayers} />

      <div className="md:col-span-2">
        <DataProcessor
          rawData={data.rawData}
          processedMatches={data.processedMatches}
          processedPlayers={data.processedPlayers}
        />
      </div>
    </div>
  );
}
