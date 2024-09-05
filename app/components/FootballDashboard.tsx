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
      <div className="col-span-2">
        <DataProcessor />
      </div>
      <MatchResults matches={data.matches} />
      <LeagueTable players={data.players} />
      <PlayerStats players={data.players} />
    </div>
  );
}
