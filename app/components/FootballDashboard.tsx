"use client";

import React, { useState, useEffect } from "react";
import LeagueTable from "./LeagueTable";
import PlayerStats from "./PlayerStats";
import { fetchFootballData } from "../lib/api";
import DataProcessor from "./DataProcessor";
import MatchResultsAndTeamSetup from "./MatchResultsAndTeamSetup";
import { FootballData } from "../lib/types";

export default function FootballDashboard() {
  const [data, setData] = useState<FootballData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        console.log("Fetching football data...");
        const footballData = await fetchFootballData();
        console.log("Football data fetched successfully:", footballData);
        setData(footballData);
      } catch (err) {
        console.error("Error fetching football data:", err);
        setError(
          "Failed to fetch data. Please check the console for more details."
        );
      }
    }

    loadData();
  }, []);

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!data) {
    return <div className="text-white p-4">Loading...</div>;
  }

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

      <LeagueTable
        players={data.processedPlayers}
        matches={data.processedMatches}
      />

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
