# Live Score API Integration

## Overview

Footybee uses the [Live Score API](https://live-score-api.com) to fetch:
- Tournament teams
- Match fixtures
- Player squads
- Country flags

## API Credentials

Stored in `.env` at project root:
```
LIVE_SCORE_API_KEY=your_key
LIVE_SCORE_API_SECRET=your_secret
```

**⚠️ Never commit `.env` files**

## API Endpoints

### 1. Fixtures & Teams
```
GET https://livescore-api.com/api-client/fixtures/matches.json
```

**Parameters:**
| Param | Description |
|-------|-------------|
| `key` | API key |
| `secret` | API secret |
| `competition_id` | Competition ID (362 = World Cup) |

**Response:**
```json
{
  "success": true,
  "data": {
    "fixtures": [
      {
        "id": 1825339,
        "round": "1",
        "date": "2026-06-11",
        "time": "19:00:00",
        "home_id": 1450,
        "home_name": "Mexico",
        "away_id": 2767,
        "away_name": "South Africa",
        "group_id": 4286,
        "location": "Estadio Azteca, Mexico City"
      }
    ]
  }
}
```

**Used for:**
- Extracting unique teams (home_id, away_id → name)
- Group assignment via group_id
- Match dates and times

### 2. Squads (Players)
```
GET https://livescore-api.com/api-client/competitions/squads.json
```

**Parameters:**
| Param | Description |
|-------|-------------|
| `key` | API key |
| `secret` | API secret |
| `competition_id` | Competition ID |
| `team_id` | Team ID from fixtures endpoint |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "132521",
      "name": "Francisco Guillermo Ochoa Magaña",
      "shirt_number": "0",
      "position": "GK"
    }
  ]
}
```

**Used for:**
- Player squads for bonus predictions
- Top scorer tracking

### 3. Country Flags
```
GET https://livescore-api.com/api-client/countries/flag.json
```

**Parameters:**
| Param | Description |
|-------|-------------|
| `key` | API key |
| `secret` | API secret |
| `team_id` | Team ID from fixtures endpoint |

**Response:**
Binary PNG image of the team flag.

**Output location:**
```
frontend/public/flags/{team_name}.png
```

## Competition IDs

| Competition | ID |
|-------------|-----|
| FIFA World Cup | 362 |
| UEFA Euro | Check with provider |

## Data Fetching Scripts

Located in `data/wc-2026/`:

| Script | Output | Description |
|--------|--------|-------------|
| `fetch-teams.ts` | `teams.json` | Extracts all teams |
| `fetch-fixtures.ts` | `fixtures.json` | All fixtures with groups |
| `fetch-squads.ts` | `squads.json` | Player squads per team |
| `download-flags.ts` | `flags/` | Downloads flag images |
| `fetch-all.ts` | All | Runs all scripts |

## Usage

```bash
cd data/wc-2026

# Set environment variables
source ../../.env

# Install dependencies
npm install

# Run individual scripts
npm run fetch:teams
npm run fetch:fixtures
npm run fetch:squads
npm run fetch:flags

# Or run all at once
npm run fetch:all
```

## Output Format

### teams.json
```typescript
interface Team {
  id: number;      // Live Score API team ID
  name: string;    // Team name
}
// 49 teams for World Cup 2026
```

### fixtures.json
```typescript
interface Fixture {
  id: number;
  round: string;
  date: string;
  time: string;
  homeTeamId: number;
  homeTeamName: string;
  awayTeamId: number;
  awayTeamName: string;
  groupId: number;
  groupLetter: string | null;  // Assigned as A, B, C...
  location: string;
  dateTime: number;  // Unix ms timestamp
}
```

### squads.json
```typescript
interface Squad {
  teamId: number;
  teamName: string;
  players: {
    id: string;
    name: string;
    shirtNumber: string;
    position: string;  // GK, DEF, MID, FWD
  }[];
}
```

## Rate Limiting

The API has rate limits. Scripts include 500ms delays between requests.

If you hit rate limits:
- Add longer delays
- Run scripts during off-peak hours
- Consider caching responses

## Error Handling

Common errors:

| Error | Cause | Solution |
|-------|-------|----------|
| `This API key and secret do not have access` | Wrong credentials or no data access | Check API subscription |
| `Team with id does not exist` | Team has no squad data | Skip team, continue |
| `Response is not an image` | Flag not available | Skip flag, use fallback |

## Updating for 2026 World Cup

1. Verify competition_id is correct
2. Run `npm run fetch:all`
3. Review generated JSON files
4. Map group_ids to desired group letters
5. Update seeding scripts to use new data

## Related

- [[seeding-improvements]] - Seeding strategy
- [[2026-world-cup]] - 2026 World Cup planning
