# run_all_docker.ps1
# Docker Compose orchestrator for SquadProject
#
# Builds and runs all services, checks health, and manages lifecycle.

param()

# --- Color Setup ---
$Host.UI.RawUI.ForegroundColor = 'White'
function Write-Status {
    param(
        [string]$Message,
        [ValidateSet('Green','Red','Yellow','White')] [string]$Color = 'White'
    )
    $orig = $Host.UI.RawUI.ForegroundColor
    $Host.UI.RawUI.ForegroundColor = $Color
    Write-Host $Message
    $Host.UI.RawUI.ForegroundColor = $orig
}

# --- Error Handling ---
$ErrorActionPreference = 'Stop'

# --- Functions ---
function Check-Docker {
    Write-Status 'Checking Docker Desktop...' 'Yellow'
    try {
        docker --version | Out-Null
        docker ps | Out-Null
    } catch {
        Write-Status 'Docker Desktop is not running or not installed.' 'Red'
        exit 1
    }
    Write-Status 'Docker is running.' 'Green'
    Write-Status 'Checking docker-compose...' 'Yellow'
    try {
        docker-compose --version | Out-Null
    } catch {
        Write-Status 'docker-compose is not available.' 'Red'
        exit 1
    }
    Write-Status 'docker-compose is available.' 'Green'
}

function Check-ComposeFile {
    if (-not (Test-Path './docker-compose.yml')) {
        Write-Status 'docker-compose.yml not found at project root.' 'Red'
        exit 1
    }
    Write-Status 'docker-compose.yml found.' 'Green'
}

function Wait-ForPort {
    param(
        [int]$Port,
        [int]$TimeoutSec = 60,
        [string]$Name = 'Service'
    )
    $sw = [System.Diagnostics.Stopwatch]::StartNew()
    while ($sw.Elapsed.TotalSeconds -lt $TimeoutSec) {
        try {
            $tcp = New-Object Net.Sockets.TcpClient('localhost', $Port)
            $tcp.Close()
            Write-Status "$Name is responding on port $Port." 'Green'
            return $true
        } catch {
            Start-Sleep -Seconds 2
        }
    }
    Write-Status "$Name did not respond on port $Port within $TimeoutSec seconds." 'Red'
    return $false
}

function Cleanup {
    param([switch]$RemoveVolumes)
    Write-Status 'Stopping containers...' 'Yellow'
    if ($RemoveVolumes) {
        docker-compose down -v
    } else {
        docker-compose down
    }
    Write-Status 'Containers stopped.' 'Green'
}

# --- Main ---
Write-Status '=== SquadProject Docker Compose Orchestrator ===' 'White'
Check-Docker
Check-ComposeFile

try {
    Write-Status 'Building images with docker-compose...' 'Yellow'
    docker-compose build
    Write-Status 'Starting all services...' 'Yellow'
    docker-compose up -d
} catch {
    Write-Status 'Failed to build or start services.' 'Red'
    exit 1
}

Write-Status 'Waiting for services to become healthy...' 'Yellow'
$apiReady = Wait-ForPort -Port 5000 -Name 'Backend API'
$frontendReady = Wait-ForPort -Port 3000 -Name 'Frontend'
$dbReady = Wait-ForPort -Port 1433 -Name 'Database'

if ($apiReady -and $frontendReady -and $dbReady) {
    Write-Status 'All services are healthy!' 'Green'
    Write-Host 'Frontend:   http://localhost:3000'
    Write-Host 'Backend:    http://localhost:5000'
    Write-Host 'Database:   localhost:1433 (SQL Server)'
} else {
    Write-Status 'One or more services failed healthcheck.' 'Red'
    Cleanup
    exit 1
}

Write-Status 'Showing running containers:' 'Yellow'
docker-compose ps

Write-Status 'Streaming logs. Press Ctrl+C to stop and cleanup.' 'Yellow'

# Trap Ctrl+C for cleanup
$cleanupCalled = $false
trap {
    if (-not $cleanupCalled) {
        $cleanupCalled = $true
        Write-Status 'Ctrl+C detected. Cleaning up...' 'Yellow'
        $remove = Read-Host 'Remove volumes as well? (y/N)'
        if ($remove -eq 'y' -or $remove -eq 'Y') {
            Cleanup -RemoveVolumes
        } else {
            Cleanup
        }
        exit
    }
}

try {
    docker-compose logs -f
} catch {
    Write-Status 'Log streaming ended.' 'Yellow'
    Cleanup
}
