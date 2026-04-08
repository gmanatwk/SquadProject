<#
.SYNOPSIS
  Interactive helper to select an Azure account (subscription) and set it with Azure CLI.

.DESCRIPTION
  Reads a JSON array of subscriptions (from `az account list` or a JSON file),
  presents a numbered selection menu, and runs `az account set --subscription <id>` for the chosen entry.

.PARAMETER JsonFile
  Optional path to a JSON file containing the array of accounts. If omitted the script
  will try to use `az account list --output json`.

EXAMPLE
  .\select-azure-account.ps1
  .\select-azure-account.ps1 -JsonFile .\accounts.json
#>

param(
    [string]$JsonFile = "$PSScriptRoot\azure_accounts.json"
)

function Get-Accounts {
    if (Get-Command az -ErrorAction SilentlyContinue) {
        try {
            $json = az account list --output json 2>$null
            if (-not $json) { throw "empty" }
        } catch {
            if (Test-Path $JsonFile) {
                $json = Get-Content $JsonFile -Raw
            } else {
                Write-Error "Unable to list accounts via 'az' and no JSON file found at: $JsonFile"
                return $null
            }
        }
    } else {
        if (Test-Path $JsonFile) {
            $json = Get-Content $JsonFile -Raw
        } else {
            Write-Error "Azure CLI 'az' not found and no JSON file at: $JsonFile"
            return $null
        }
    }

    return $json | ConvertFrom-Json
}

$accounts = Get-Accounts

if (-not $accounts -or $accounts.Count -eq 0) {
    Write-Error "No accounts/subscriptions available to select."
    exit 1
}

Write-Host "Available subscriptions:"
for ($i = 0; $i -lt $accounts.Count; $i++) {
    $a = $accounts[$i]
    $mark = if ($a.isDefault) { '*' } else { ' ' }
    $index = $i + 1
    Write-Host "[$index] $mark $($a.name) - $($a.id) (Tenant: $($a.tenantId))"
}

while ($true) {
    $input = Read-Host "Enter the number of the account to set (or 'q' to quit)"
    if ($input -match '^[Qq]$') {
        Write-Host "Cancelled by user."
        exit 0
    }
    if ($input -match '^[0-9]+$') {
        $num = [int]$input
        if ($num -ge 1 -and $num -le $accounts.Count) {
            $selected = $accounts[$num - 1]
            break
        }
    }
    Write-Host "Invalid selection. Please enter a number between 1 and $($accounts.Count) or 'q'."
}

Write-Host "Selected: $($selected.name) ($($selected.id)) Tenant: $($selected.tenantId)"

if (Get-Command az -ErrorAction SilentlyContinue) {
    try {
        az account set --subscription $selected.id
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Subscription set to $($selected.name) ($($selected.id))."
        } else {
            Write-Warning "'az account set' returned non-zero exit code. You may need to login first: az login --tenant $($selected.tenantId)"
        }
    } catch {
        Write-Warning "Failed to run 'az account set'. You may need to run 'az login' first. Error: $_"
    }
} else {
    Write-Host "Azure CLI not available. Run the following command manually to set the subscription:"
    Write-Host "az account set --subscription $($selected.id)"
}
