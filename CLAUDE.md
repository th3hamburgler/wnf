# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WNF Dashboard is a Next.js 14 web application for tracking player statistics and match results for Wednesday Night Football (5-a-side matches). It's a client-side application that fetches data from SheetDB API and processes it in the browser.

## Development Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm start        # Run production server
npm run lint     # ESLint with Next.js rules
```

No test framework is configured.

## Architecture

### Data Flow
1. `app/page.tsx` renders `FootballDashboard` component
2. `FootballDashboard` calls `fetchFootballData()` from `app/lib/api.ts`
3. API fetches from SheetDB (`https://sheetdb.io/api/v1/l5soyy61olxh3`)
4. `app/lib/dataProcessing.ts` transforms raw data into typed structures
5. Processed data flows to child components (LeagueTable, PlayerStats, MatchResults)

### Key Directories
- `app/components/` - Main React components (FootballDashboard, LeagueTable, PlayerStats, MatchResults, TeamSetup)
- `app/lib/` - Core logic: `types.ts` (interfaces), `api.ts` (SheetDB fetch), `dataProcessing.ts` (data transformation), `rawData.ts` (fallback seeded data)
- `app/utils/` - Helper functions for player calculations and date formatting
- `components/ui/` - shadcn/ui components

### Core Types (app/lib/types.ts)
- `RawPlayerData` - Raw API response with dynamic match columns
- `ProcessedPlayer` - Player with calculated stats (age, star sign, W/D/L, points)
- `Match` - Match record with teams, date, goal difference
- `FootballData` - Complete dataset container

### Styling
Uses Tailwind CSS with custom theme colors defined in `tailwind.config.ts`:
- Primary: blue-900/950 (dark background)
- Accent: wheat-100/500 (borders/highlights)
- Success/Destructive: green-500/red-500

UI components from shadcn/ui with dark mode enabled (class-based).

## Local Development

Running `npm run dev` uses seeded data from `app/lib/rawData.ts` as fallback if the API is unavailable.
