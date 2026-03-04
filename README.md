# TV Remote

Web-based remote control for home entertainment systems across multiple rooms. Built with Vue 3, Vuetify 3, and TypeScript.

## Features

- **Multi-room support** - Family Room and Master Bedroom with room-specific device configurations
- **Input switching** - Select TV, Roku, consoles; auto-configures receiver + TV HDMI inputs
- **Quick launch** - One-tap streaming app launch (Netflix, Prime, Plex, etc.)
- **Volume control** - Receiver volume with configurable intervals (Family Room) or direct TV volume (Master Bedroom)
- **TV controls** - D-pad navigation, channels, media playback
- **Roku controls** - D-pad navigation, Home, Back, media playback
- **Mobile-first** - Dark theme, 48px touch targets, responsive layout
- **Docker deployment** - Multi-stage build with nginx serving

## Prerequisites

- Node.js 22 LTS
- Docker & Docker Compose (for deployment)

## Development

```bash
npm install
cp .env.example .env.local  # Adjust API endpoints for your setup
npm run dev                  # Start dev server on port 3001
```

## Testing

```bash
npm run test          # Watch mode
npm run test:unit     # Single run
npm run test:coverage # With coverage
npm run test:e2e      # Playwright E2E tests
npm run type-check    # TypeScript validation
```

## Deployment

### Docker (recommended)

```bash
docker compose up -d --build
```

### Remote deploy

```bash
./deploy.sh  # rsync + docker compose on media-server
```

### Reverse proxy (optional)

A virtual host config is provided in `nginx-reverse-proxy.conf` to serve the app at `http://tv-remote.apps.home`.

1. Copy the config to your host nginx:
   ```bash
   sudo cp nginx-reverse-proxy.conf /etc/nginx/sites-available/tv-remote
   sudo ln -s /etc/nginx/sites-available/tv-remote /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   ```
2. Add a DNS entry (or `/etc/hosts` line) pointing `tv-remote.apps.home` to the server IP.

## Configuration

All API endpoints are configured via environment variables (see `.env.example`):

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_FR_TV_HOST` | Family Room TV API | `http://192.168.72.20:8080` |
| `VITE_FR_ROKU_HOST` | Family Room Roku API | `http://192.168.72.91:8080` |
| `VITE_FR_RECEIVER_HOST` | Family Room Receiver API | `http://192.168.72.91:8081` |
| `VITE_MBR_TV_HOST` | Master Bedroom TV API | `http://192.168.72.25:8080` |
| `VITE_MBR_ROKU_HOST` | Master Bedroom Roku API | `http://192.168.72.91:8080` |

## Adding a New Room

1. Add env vars for the room's device hosts in `.env` and `.env.example`
2. Add a `RoomConfig` object in `src/config/rooms.ts`
3. Register it in the `rooms` Record in the same file
4. The room auto-appears in navigation and gets its own `/room/{id}` route

## Architecture

```
src/
  config/       # Room definitions, types, quick launch apps
  composables/  # Business logic (input switching, volume, device APIs)
  components/   # Reusable UI (DPad, VolumeControls, InputSelector, etc.)
  views/        # RoomView.vue - single parameterized view for all rooms
  plugins/      # Vuetify + Router setup
```
