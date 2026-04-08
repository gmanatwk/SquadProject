# =============================
# SquadProject - Build All Script
# =============================
# Description: Builds frontend (npm), backend (.NET), and validates Terraform infrastructure.
# Usage: Run from project root. Exits with 0 on success, non-zero on failure.

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

# --- Main logic ---
Write-Status "[SquadProject] Build All Script Starting..." 'Yellow'
$startTime = Get-Date

# 1. Check prerequisites
Write-Status "Checking prerequisites..." 'Yellow'
Check-Command 'npm' 'npm (Node.js)'
Check-Command 'dotnet' 'dotnet (.NET)'
Check-Command 'terraform' 'terraform'

$frontendOk = $false
$backendOk = $false
$infraOk = $false

# 2. Build frontend
Write-Status "Building frontend (npm)..." 'Yellow'
try {
    Push-Location "${PSScriptRoot}\frontend"
    npm install
    npm run build
    Pop-Location
    Write-Success "Frontend build succeeded."
    $frontendOk = $true
} catch {
    Write-Failure "Frontend build failed: $_"
    Pop-Location
}

# 3. Build backend
Write-Status "Building backend (.NET)..." 'Yellow'
try {
    Push-Location "${PSScriptRoot}\backend\SquadProject.Api"
    dotnet restore
    dotnet build
    Pop-Location
    Write-Success "Backend build succeeded."
    $backendOk = $true
} catch {
    Write-Failure "Backend build failed: $_"
    Pop-Location
}

# 4. Validate Terraform
Write-Status "Validating infrastructure (Terraform)..." 'Yellow'
try {
    Push-Location "${PSScriptRoot}\infra\terraform"
    terraform init -input=false
    terraform validate
    Pop-Location
    Write-Success "Terraform validation succeeded."
    $infraOk = $true
} catch {
    Write-Failure "Terraform validation failed: $_"
    Pop-Location
}

# 5. Summary
$endTime = Get-Date
$duration = $endTime - $startTime
Write-Host "\n================ Build Summary ================"
Write-Host ("Started:   {0}" -f $startTime)
Write-Host ("Finished:  {0}" -f $endTime)
Write-Host ("Duration:  {0}" -f $duration)
Write-Host ("Frontend:  {0}" -f ($frontendOk ? 'SUCCESS' : 'FAIL'))
Write-Host ("Backend:   {0}" -f ($backendOk ? 'SUCCESS' : 'FAIL'))
Write-Host ("Infra:     {0}" -f ($infraOk ? 'SUCCESS' : 'FAIL'))
Write-Host "=============================================="

if ($frontendOk -and $backendOk -and $infraOk) {
    Write-Success "All builds succeeded."
    exit 0
} else {
    Write-Failure "One or more steps failed."
    exit 1
}
