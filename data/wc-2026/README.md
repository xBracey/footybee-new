# WC 2026 Data Scripts

Scripts to fetch tournament data from the Live Score API.

## Prerequisites

1. Set environment variables (from root `.env`):
   ```bash
   export LIVE_SCORE_API_KEY=your_key
   export LIVE_SCORE_API_SECRET=your_secret
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Scripts

### Fetch Teams
```bash
npm run fetch:teams
```
Fetches all teams from the competition fixtures and saves to `teams.json`.

### Fetch Fixtures
```bash
npm run fetch:fixtures
```
Fetches all fixtures, groups them by `group_id`, and saves to `fixtures.json`.

### Fetch Squads
```bash
npm run fetch:squads
```
Fetches squad/player data for each team and saves to `squads.json`.

**Note:** Requires `teams.json` to exist (run `fetch:teams` first).

### Download Flags
```bash
npm run fetch:flags
```
Downloads country flag PNGs to the `flags/` folder.

**Note:** Requires `teams.json` to exist (run `fetch:teams` first).

### Fetch All
```bash
npm run fetch:all
```
Runs all fetch scripts in sequence.

## Output Files

| File | Description |
|------|-------------|
| `teams.json` | All teams with their Live Score API IDs |
| `fixtures.json` | All fixtures with group assignments |
| `squads.json` | Player squads for each team |
| `flags/` | Downloaded flag PNG images |
| `flags-mapping.json` | Mapping of team IDs to flag filenames |

## API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `/fixtures/matches.json?competition_id=362` | Get fixtures and teams |
| `/competitions/squads.json` | Get team squads/players |
| `/countries/flag.json` | Get team flag images |

## Competition IDs

| Competition | ID |
|-------------|-----|
| FIFA World Cup | 362 |

To use a different competition, update `COMPETITION_ID` in each script.
