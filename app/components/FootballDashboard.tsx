import React from "react";
import MatchResults from "./MatchResults";
import LeagueTable from "./LeagueTable";
import PlayerStats from "./PlayerStats.tsx";
import { fetchFootballData } from "../lib/api";
import DataProcessor from "./DataProcessor";

export default async function FootballDashboard() {
  const data = await fetchFootballData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-8">
        <div>
          <MatchResults
            matches={data.processedMatches}
            players={data.processedPlayers}
          />
        </div>
        <div className="flex-1">
          <PlayerStats players={data.players} />
        </div>
      </div>

      <LeagueTable players={data.players} />
      <div className="col-span-2">
        <DataProcessor />
      </div>
    </div>
  );
}
