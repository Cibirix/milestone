# Boss Buildings Clone (Isolated)

This folder contains a standalone mirrored clone of `https://www.bossbuildings.com`.

- Source mirror root: `bossbuildings-mirror/`
- Crawl status/state: `bossbuildings-mirror/_mirror-state.json`
- Latest status summary: run `npm run mirror:status`

## Commands

- Continue/refresh mirror in 10-minute chunks:
  - `npm run mirror:chunk`
- Short chunk (2 minutes):
  - `npm run mirror:quick`
- Show current completion stats:
  - `npm run mirror:status`
- Serve locally:
  - `npm run serve`
  - Open `http://localhost:3080`

## Notes

- This clone is fully isolated from the existing House Transformers app.
- Internal absolute links were rewritten to local paths.
- Current mirror completion can always be verified via `npm run mirror:status`.
