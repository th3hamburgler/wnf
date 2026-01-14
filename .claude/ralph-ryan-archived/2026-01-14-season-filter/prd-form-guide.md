# PRD: Player Form Guide

## 1. Introduction

Add a form guide to the League Table showing each player's last 5 results in the standard football format (e.g., WWDLW). Results are displayed as overlapping colored circles to save space. The table should be sortable by form to identify players in good/bad runs.

## 2. Goals

- Display last 5 match results for each player in the league table
- Use colored circles: green (W), wheat (D), red (L)
- Circles overlap horizontally to save space
- Order: oldest result on left, most recent on right
- Players with fewer than 5 games show only their available results
- Add form as a sortable column (points-based: W=3, D=1, L=0)

## 3. User Stories

### US-001: Create utility to extract player's recent results

**Description:** As a developer, I need a function that extracts a player's last N match results in chronological order so that form can be displayed and calculated.

**Acceptance Criteria:**
- [ ] Create `getPlayerRecentResults(playerName: string, rawData: RawPlayerData[], matches: Match[], count: number): ('W' | 'D' | 'L')[]` in `app/utils/formUtils.ts`
- [ ] Returns array of results ordered oldest to newest (last element is most recent game)
- [ ] Only includes matches where the player participated
- [ ] Returns fewer than `count` results if player has played fewer games
- [ ] Handles D1/D2 raw values as 'D'
- [ ] Typecheck passes

---

### US-002: Create utility to calculate form points

**Description:** As a developer, I need a function to calculate form points from recent results so that the table can be sorted by form.

**Acceptance Criteria:**
- [ ] Create `calculateFormPoints(results: ('W' | 'D' | 'L')[]): number` in `app/utils/formUtils.ts`
- [ ] W = 3 points, D = 1 point, L = 0 points
- [ ] Returns sum of points (max 15 for 5 games)
- [ ] Handles arrays shorter than 5 (returns points for available games)
- [ ] Typecheck passes

---

### US-003: Create FormBadge component for single result circle

**Description:** As a developer, I need a reusable component that renders a single result as a colored circle with a letter.

**Acceptance Criteria:**
- [ ] Create `FormBadge` component in `app/components/FormBadge.tsx`
- [ ] Props: `result: 'W' | 'D' | 'L'`, `className?: string`
- [ ] Colors: W = green-500, D = wheat-500, L = red-500
- [ ] White text letter centered in circle
- [ ] Circle size appropriate for table row (h-6 w-6 on mobile, h-7 w-7 on lg)
- [ ] Typecheck passes

---

### US-004: Create FormDisplay component for overlapping circles

**Description:** As a user, I want to see my recent form as overlapping colored circles so that I can quickly see my run of results without taking too much table space.

**Acceptance Criteria:**
- [ ] Create `FormDisplay` component in `app/components/FormDisplay.tsx`
- [ ] Props: `results: ('W' | 'D' | 'L')[]`
- [ ] Renders FormBadge for each result with negative margin overlap (e.g., -ml-2)
- [ ] Results ordered left-to-right: oldest to newest
- [ ] Handles 1-5 results (shows only what's available)
- [ ] Empty array shows nothing or dash
- [ ] Typecheck passes

---

### US-005: Add form data to ProcessedPlayer type

**Description:** As a developer, I need to extend the ProcessedPlayer type to include form data so it can be used in the LeagueTable.

**Acceptance Criteria:**
- [ ] Add `Form: ('W' | 'D' | 'L')[]` to ProcessedPlayer interface in `app/lib/types.ts`
- [ ] Add `FormPoints: number` to ProcessedPlayer interface
- [ ] Typecheck passes

---

### US-006: Calculate form data in data processing

**Description:** As a developer, I need to populate form data when processing raw data so that it's available to the LeagueTable.

**Acceptance Criteria:**
- [ ] Update `processRawData` in `app/lib/dataProcessing.ts` to calculate Form and FormPoints
- [ ] Use utilities from `formUtils.ts`
- [ ] Form is last 5 results (or fewer if player has less)
- [ ] FormPoints calculated from Form array
- [ ] Typecheck passes

---

### US-007: Add Form column to LeagueTable

**Description:** As a user, I want to see a Form column in the league table showing my recent results as colored circles.

**Acceptance Criteria:**
- [ ] Add "Form" column header before "PPG" column
- [ ] Column header is sortable (clicking sorts by FormPoints)
- [ ] Display FormDisplay component for each player
- [ ] Column responsive (works on mobile and desktop)
- [ ] Typecheck passes

---

### US-008: Enable sorting by form in LeagueTable

**Description:** As a user, I want to sort the league table by form so that I can see who is in the best/worst run of results.

**Acceptance Criteria:**
- [ ] Add "FormPoints" to SortKey type
- [ ] Clicking Form header sorts by FormPoints descending (best form first)
- [ ] Second click reverses to ascending
- [ ] Sort icon appears when Form is active sort column
- [ ] Typecheck passes

## 4. Functional Requirements

- FR-1: The system must display a Form column in the league table before the PPG column
- FR-2: The system must show up to 5 recent results as overlapping colored circles
- FR-3: The system must use green for wins, wheat for draws, and red for losses
- FR-4: The system must order results oldest-to-newest (most recent game last/rightmost)
- FR-5: The system must allow sorting by form points (W=3, D=1, L=0)
- FR-6: The system must gracefully handle players with fewer than 5 games

## 5. Non-Goals

- Showing form on hover/tooltip with match details
- Form guide in PlayerStats or MatchResults views
- Configurable form length (always 5 games)
- Form streak indicators (e.g., "3 wins in a row")

## 6. Technical Considerations

- Raw data contains per-match results as columns keyed by date (W/L/D1/D2 values)
- Matches need to be sorted by date to determine recency
- D1 and D2 both represent draws (team A draw vs team B draw)
- Match dates are in `dd/mm/yyyy` format - need to parse for sorting
- Overlapping circles achieved with negative margins and proper z-index stacking
