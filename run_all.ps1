# =============================
# SquadProject - Run All Script
# =============================
# Description: Builds and runs backend (.NET) and frontend (npm) for local development.
# Usage: Run from project root. Ctrl+C to stop both servers.

param()

# --- Error handling setup ---
$ErrorActionPreference = 'Stop'

# --- Color setup ---
$Host.UI.RawUI.ForegroundColor = 'White'
function Write-Status {
    param([string]$Message, [string]$Color = 'Yellow')
    $orig = $Host.UI.RawUI.ForegroundColor
    $Host.UI.RawUI.ForegroundColor = $Color
    Write-Host $Message
    $Host.UI.RawUI.ForegroundColor = $orig
}
function Write-Success {
    param([string]$Message)
    Write-Status $Message 'Green'
}
function Write-Failure {
    param([string]$Message)
    Write-Status $Message 'Red'
}
function Check-Command {
    param([string]$Cmd, [string]$ToolName)
    if (-not (Get-Command $Cmd -ErrorAction SilentlyContinue)) {
        Write-Failure "ERROR: Required tool '$ToolName' not found in PATH."
        exit 1
    }
}

# --- Functions to start/stop processes ---
$backendProc = $null
$frontendProc = $null
function Start-Backend {
    Write-Status "Starting backend API server..." 'Yellow'
    $apiPath = "${PSScriptRoot}\backend\SquadProject.Api"
    $backendProc = Start-Process 'dotnet' -ArgumentList 'run' -WorkingDirectory $apiPath -NoNewWindow -PassThru
}
function Start-Frontend {
    Write-Status "Starting frontend dev server..." 'Yellow'
    $frontendPath = "${PSScriptRoot}\frontend"
    $frontendProc = Start-Process 'npm' -ArgumentList 'run start' -WorkingDirectory $frontendPath -NoNewWindow -PassThru
}
function Stop-All {
    Write-Status "Stopping all processes..." 'Yellow'
    if ($backendProc -and !$backendProc.HasExited) { $backendProc | Stop-Process -Force }
    if ($frontendProc -and !$frontendProc.HasExited) { $frontendProc | Stop-Process -Force }
    Write-Status "All processes stopped." 'Green'
}

# --- Main logic ---
Write-Status "[SquadProject] Run All Script Starting..." 'Yellow'

# 1. Check prerequisites
Write-Status "Checking prerequisites..." 'Yellow'
Check-Command 'npm' 'npm (Node.js)'
Check-Command 'dotnet' 'dotnet (.NET)'

# 2. Build backend
Write-Status "Building backend (.NET)..." 'Yellow'
try {
    Push-Location "${PSScriptRoot}\backend\SquadProject.Api"
    dotnet restore
    dotnet build
    Pop-Location
    Write-Success "Backend build succeeded."
} catch {
    Write-Failure "Backend build failed: $_"
    Pop-Location
    exit 1
}

# 3. Build frontend
Write-Status "Building frontend (npm)..." 'Yellow'
try {
    Push-Location "${PSScriptRoot}\frontend"
    npm install
    npm run build
    Pop-Location
    Write-Success "Frontend build succeeded."
} catch {
    Write-Failure "Frontend build failed: $_"
    Pop-Location
    exit 1
}

# 4. Start backend
Start-Backend

# 5. Wait for backend to be ready
Write-Status "Waiting for backend to be ready on http://localhost:5000 ..." 'Yellow'
$maxTries = 20
$ready = $false
for ($i=0; $i -lt $maxTries; $i++) {
    try {
        $resp = Invoke-WebRequest -Uri 'http://localhost:5000' -UseBasicParsing -TimeoutSec 2
        if ($resp.StatusCode -eq 200) {
            $ready = $true
            break
        }
    } catch {}
    Start-Sleep -Seconds 1
}
if (-not $ready) {
    Write-Failure "Backend did not start in time."
    Stop-All
    exit 1
}
Write-Success "Backend is ready."

# 6. Start frontend
Start-Frontend

# 7. Wait for frontend to be ready
Write-Status "Waiting for frontend to be ready on http://localhost:3000 ..." 'Yellow'
$maxTries = 20
$ready = $false
for ($i=0; $i -lt $maxTries; $i++) {
    try {
        $resp = Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing -TimeoutSec 2
        if ($resp.StatusCode -eq 200) {
            $ready = $true
            break
        }
    } catch {}
    Start-Sleep -Seconds 1
}
if (-not $ready) {
    Write-Failure "Frontend did not start in time."
    Stop-All
    exit 1
}
Write-Success "Frontend is ready."

Write-Host "\n================= Servers Running ================="
Write-Host "Frontend: http://localhost:3000"
Write-Host "Backend:  http://localhost:5000"
Write-Host "=================================================="
Write-Host "(Press Ctrl+C to stop both servers)"

# 8. Handle Ctrl+C (cleanup)
$stopped = $false
$null = Register-EngineEvent PowerShell.Exiting -Action {
    if (-not $stopped) {
        $stopped = $true
        Stop-All
    }
}

# Wait indefinitely
while ($true) { Start-Sleep -Seconds 60 }
