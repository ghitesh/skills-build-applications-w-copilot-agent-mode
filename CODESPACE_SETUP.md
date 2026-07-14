# Codespace Setup for Octofit Tracker Django Backend

## Setup Completed

### 1. Updated Django URLs Configuration
**File:** `octofit-tracker/backend/octofit_tracker/urls.py`

Added `/api/` prefix to tracker routes:
```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('tracker.urls')),
]
```

**Result:** All API endpoints now accessible at `https://$CODESPACE_NAME-8000.app.github.dev/api/[component]/`

### 2. Updated Django Settings for Codespace
**File:** `octofit-tracker/backend/octofit_tracker/settings.py`

Updated `ALLOWED_HOSTS` to support both localhost and codespace URLs using environment variables:
```python
codespace_name = os.getenv('CODESPACE_NAME')
ALLOWED_HOSTS = ['localhost', '127.0.0.1']
if codespace_name:
    ALLOWED_HOSTS.extend([
        f'{codespace_name}-8000.app.github.dev',
        f'{codespace_name}.github.dev',
    ])
```

**Result:** Django accepts requests from:
- `localhost` (local development)
- `127.0.0.1` (local loopback)
- `{CODESPACE_NAME}-8000.app.github.dev` (codespace HTTPS)
- `{CODESPACE_NAME}.github.dev` (codespace root domain)

### 3. VS Code Launch Configuration
**File:** `.vscode/launch.json`

The launch configuration is already set up with:
- **Django Backend:** Runs on `0.0.0.0:8000` with Python
- **Vite Frontend:** Runs on port 5173 with Node.js
- Both support `$CODESPACE_NAME` environment variable

## API Endpoints

All endpoints are now accessible at:
```
https://$CODESPACE_NAME-8000.app.github.dev/api/[endpoint]
```

### Available Endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/` | GET | API root - lists all collections |
| `/api/health/` | GET | Health check endpoint |
| `/api/users/` | GET | List all users |
| `/api/teams/` | GET | List all teams |
| `/api/activities/` | GET | List all activities |
| `/api/leaderboard/` | GET | Get leaderboard entries |
| `/api/workouts/` | GET | List all workouts |
| `/api/seeded-data/` | GET | Get seeded data summary |

## Testing Results

### Health Check
```bash
curl http://localhost:8000/api/health/
```
**Response:**
```json
{
    "status": "ok"
}
```

### API Root
```bash
curl http://localhost:8000/api/
```
**Response:**
```json
{
    "message": "Octofit Tracker API",
    "collections": ["users", "teams", "activities", "leaderboard", "workouts"],
    "endpoints": {
        "users": "/users/",
        "teams": "/teams/",
        "activities": "/activities/",
        "leaderboard": "/leaderboard/",
        "workouts": "/workouts/"
    }
}
```

### Data Endpoints
All data endpoints (users, teams, activities, workouts) return empty arrays initially:
```bash
curl http://localhost:8000/api/users/
```
**Response:** `[]` (empty - no seed data loaded yet)

## Starting the Server

### Option 1: Using VS Code Debug Launcher
1. Open VS Code command palette: `Ctrl+Shift+D`
2. Select "Launch Django Backend" configuration
3. Press F5 or click the play button
4. Server runs on `http://localhost:8000`

### Option 2: Using Terminal
```bash
cd octofit-tracker/backend
python3 manage.py runserver 0.0.0.0:8000
```

## Environment Variables

- `CODESPACE_NAME`: Automatically set in GitHub Codespaces
- Used in:
  - `.vscode/launch.json` (frontend Vite config)
  - `octofit_tracker/settings.py` (Django ALLOWED_HOSTS)

## Next Steps

1. **Seed the Database:** Run the seed script to populate test data
2. **Frontend Setup:** Install and run the Vite frontend on port 5173
3. **API Testing:** Test endpoints with curl or Postman
4. **Authentication:** Implement user authentication as needed

## Port Forwarding

- **Port 8000:** Backend API (public)
- **Port 5173:** Frontend (public)
- **Port 27017:** MongoDB (private)

All ports are configured per the project requirements.
