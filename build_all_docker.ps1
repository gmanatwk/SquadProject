# build_all_docker.ps1
# Docker image builder for SquadProject
#
# Builds backend and frontend Docker images, verifies results, and outputs a summary.

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

function Build-Image {
    param(
        [string]$Path,
        [string]$Tag
    )
    Write-Status "Building image $Tag from $Path..." 'Yellow'
    $sw = [System.Diagnostics.Stopwatch]::StartNew()
    try {
        docker build -t $Tag $Path
        Write-Status "Built $Tag successfully in $($sw.Elapsed.TotalSeconds) sec." 'Green'
    } catch {
        Write-Status "Failed to build $Tag." 'Red'
        exit 1
    }
}

function List-Images {
    Write-Status 'Listing SquadProject images:' 'Yellow'
    docker images | Select-String 'squadproject' | ForEach-Object { Write-Host $_ }
}

# --- Main ---
$global:sw = [System.Diagnostics.Stopwatch]::StartNew()
Write-Status '=== SquadProject Docker Image Builder ===' 'White'
Check-Docker

Build-Image './backend' 'squadproject-api:latest'
Build-Image './frontend' 'squadproject-frontend:latest'

Write-Status 'Verifying images...' 'Yellow'
$images = docker images | Select-String 'squadproject'
if ($images) {
    Write-Status 'Images built:' 'Green'
    $images | ForEach-Object { Write-Host $_ }
    Write-Status ("Build completed in $($global:sw.Elapsed.TotalSeconds) sec.") 'Green'
    exit 0
} else {
    Write-Status 'No SquadProject images found. Build failed.' 'Red'
    exit 1
}
