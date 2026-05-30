# Live Score Integration

## Overview

Integrate live score APIs to automatically update match results and user points in real-time.

## Current State

Currently, admins manually update fixture scores via the admin panel:
1. Admin edits fixture via `/admin/fixtures` or `/admin/round-fixtures`
2. Backend recalculates user points
3. Users see updated points on refresh

## Proposed Integration

### Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Score API     │────▶│   Backend       │────▶│   Frontend      │
│   Provider      │     │   Worker        │     │   (auto-refresh)│
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                      │                       │
         │                      ▼                       │
         │              ┌─────────────────┐            │
         │              │   Database      │◀───────────┘
         │              │   (fixtures)    │
         └─────────────▶└─────────────────┘
```

### Integration Options

#### Option 1: Webhook Polling (Recommended)
- Run a background job every 30-60 seconds
- Poll score API for active matches
- Update database when scores change
- Recalculate points automatically

**Pros:**
- Simple to implement
- No external service requirements
- Full control over timing

**Cons:**
- API rate limits
- Latency between goal and update

#### Option 2: Webhooks
- Register webhook with score provider
- Receive push notifications on score changes

**Pros:**
- Real-time updates
- Efficient bandwidth

**Cons:**
- Requires public endpoint
- More complex setup
- Provider dependency

#### Option 3: Third-Party Service
- Use a service like Firebase Realtime Database
- Sync scores to frontend in real-time

**Pros:**
- Built-in real-time capabilities
- Handles offline scenarios

**Cons:**
- Additional service dependency
- Cost considerations

## Recommended Score APIs

### Free Options
1. **Football-Data.org** (API-Football)
   - Free tier: 10 requests/minute
   - Good coverage of major tournaments
   
2. **API-Sports (RapidAPI)**
   - Free tier: 100 requests/day
   - Comprehensive data

3. **SportMonks**
   - Free tier available
   - Good World Cup coverage

### Paid Options
1. **Football-Data.org**
   - Paid plans: €15-150/month
   - Higher rate limits
   
2. **SportRadar**
   - Enterprise pricing
   - Official data source

## Implementation Plan

### Phase 1: API Integration
```typescript
// backend/services/liveScores.ts
interface ScoreProvider {
  getMatches(tournamentId: string): Promise<Match[]>;
  getMatch(matchId: string): Promise<Match>;
}

interface Match {
  id: string;
  homeScore: number;
  awayScore: number;
  status: "pending" | "live" | "finished";
  minute?: number;
}
```

### Phase 2: Background Worker
```typescript
// backend/workers/scoreUpdater.ts
const updateScores = async () => {
  const activeMatches = await scoreProvider.getMatches("wc-2026");
  
  for (const match of activeMatches) {
    const currentMatch = await getMatch(match.id);
    
    if (currentMatch.homeScore !== match.homeScore ||
        currentMatch.awayScore !== match.awayScore) {
      await updateFixture(match);
      await recalculatePoints(match.id);
    }
  }
};

// Run every 30 seconds
setInterval(updateScores, 30_000);
```

### Phase 3: Frontend Updates
- Auto-refresh fixture data every 30 seconds
- Show "live" indicator for active matches
- Optional: WebSocket for instant updates

```typescript
// In React Query config
const { data } = useQuery({
  queryKey: ['fixtures'],
  queryFn: getFixtures,
  refetchInterval: 30_000, // Auto-refresh every 30s
});
```

### Phase 4: Notification System (Future)
- Send push notifications on score changes
- Alert users when their predictions are affected

## Security Considerations

1. **API Key Protection**
   - Store keys in environment variables
   - Never commit to repository
   
2. **Rate Limiting**
   - Implement request throttling
   - Cache responses where possible

3. **Fallback**
   - Graceful degradation if API is down
   - Manual override capability for admins

## Cost Estimates

| Provider | Free Tier | Paid Tier |
|----------|-----------|-----------|
| Football-Data | 10 req/min | €15/month |
| API-Sports | 100 req/day | $10/month |
| SportMonks | Limited | $15/month |

## Environment Variables

```bash
# .env (NEVER COMMIT)
SCORE_API_KEY=your-api-key
SCORE_API_PROVIDER=football-data
```

## Checklist

- [ ] Research and select score API provider
- [ ] Create score service abstraction
- [ ] Implement background polling worker
- [ ] Add fixture update logic
- [ ] Add point recalculation trigger
- [ ] Update frontend for live updates
- [ ] Add admin override capability
- [ ] Test with development data
- [ ] Monitor API usage and costs
- [ ] Document for production

## Related

- [[2026-world-cup]] - World Cup planning
- [[seeding-improvements]] - Data seeding strategy
- [[backend]] - Backend architecture
