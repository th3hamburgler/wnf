# PRD: Season Filter for League Table

## 1. Introduction

Add a season filter to the League Table that allows users to view player statistics for a specific calendar year. Currently, the table shows all-time stats. Users want to see performance within individual seasons to track yearly progress and determine seasonal champions.

## 2. Goals

- Allow users to filter league table stats by calendar year (Jan-Dec)
- Default to current year on page load
- Dynamically detect available seasons from match data
- Include "All Time" option for historical view
- Recalculate player stats (W/D/L/Pts/PPG) based on filtered matches

## 3. User Stories

### US-001: Extract available seasons from match data

**Description:** As a developer, I need a utility function that extracts unique calendar years from match dates so that the UI can display available season options.

**Acceptance Criteria:**
- [ ] Create `getAvailableSeasons(matches: Match[]): number[]` in `app/utils/seasonUtils.ts`
- [ ] Returns array of years sorted descending (most recent first)
- [ ] Parses dates in `dd/mm/yyyy` format
- [ ] Typecheck passes

---

### US-002: Create function to filter matches by season

**Description:** As a developer, I need a function to filter matches by calendar year so that stats can be recalculated for a specific season.

**Acceptance Criteria:**
- [ ] Create `filterMatchesBySeason(matches: Match[], year: number | null): Match[]` in `app/utils/seasonUtils.ts`
- [ ] When year is `null`, return all matches (All Time)
- [ ] Filter matches where date year matches the provided year
- [ ] Typecheck passes

---

### US-003: Create function to calculate player stats from filtered matches

**Description:** As a developer, I need a function to recalculate player statistics from a subset of matches so that seasonal stats can be displayed.

**Acceptance Criteria:**
- [ ] Create `calculatePlayerStatsFromMatches(rawData: RawPlayerData[], matches: Match[]): ProcessedPlayer[]` in `app/utils/seasonUtils.ts`
- [ ] Calculate GamesPlayed, Wins, Draws, Losses, TotalPoints, PointsPerGame for each player based only on provided matches
- [ ] Preserve Player, DOB, Age, StarSign from existing data
- [ ] Typecheck passes

---

### US-004: Add season selector dropdown to LeagueTable

**Description:** As a user, I want a dropdown above the league table to select a season so that I can view stats for a specific year.

**Acceptance Criteria:**
- [ ] Add Select component from shadcn/ui next to existing "8 games or more" toggle
- [ ] Options: Current year (default), previous years detected from data, "All Time"
- [ ] Display format: "2024", "2023", etc. and "All Time"
- [ ] Styled consistently with existing UI (wheat/gray theme)
- [ ] Typecheck passes

---

### US-005: Integrate season filter with LeagueTable stats

**Description:** As a user, I want the league table to update when I change the season filter so that I see stats for the selected period.

**Acceptance Criteria:**
- [ ] LeagueTable receives `rawData` and `matches` as additional props
- [ ] When season changes, recalculate player stats using `calculatePlayerStatsFromMatches`
- [ ] Default selected season is current calendar year
- [ ] "All Time" shows original unfiltered stats
- [ ] Table re-renders with updated stats when season changes
- [ ] Typecheck passes

---

### US-006: Update FootballDashboard to pass required data to LeagueTable

**Description:** As a developer, I need to update the parent component to pass raw data and matches to LeagueTable for season filtering.

**Acceptance Criteria:**
- [ ] FootballDashboard passes `rawData` and `matches` props to LeagueTable
- [ ] No changes to existing data fetching logic
- [ ] Typecheck passes

## 4. Functional Requirements

- FR-1: The system must display a season selector dropdown in the LeagueTable header
- FR-2: The system must default to showing current calendar year stats
- FR-3: The system must dynamically populate season options from match data
- FR-4: The system must include an "All Time" option that shows unfiltered stats
- FR-5: The system must recalculate W/D/L/Pts/PPG when season filter changes
- FR-6: The system must preserve existing sorting and minimum games filter functionality

## 5. Non-Goals

- Filtering PlayerStats or MatchResults views (each view has independent state per user choice)
- Persisting filter selection across page reloads
- Custom date range selection beyond calendar years
- Football season (Aug-May) support - using calendar year only

## 6. Technical Considerations

- Match dates are stored as `dd/mm/yyyy` strings in the data
- Current stats are pre-aggregated in `dataProcessing.ts` - seasonal filtering requires recalculating from raw match results
- Raw data contains per-match results as columns (W/L/D1/D2) keyed by date
- LeagueTable currently only receives `ProcessedPlayer[]` - needs additional props for raw data access
