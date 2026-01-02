<#
PowerShell helper: run an HPA test for the todo-backend

What it does:
- deletes an existing `load-generator` pod if present
- opens a new PowerShell window to run the load generator (busybox + wget loop)
- opens two additional PowerShell windows to watch HPA and backend pods

Usage (from repo root):
  Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
  .\scripts\run_hpa_test.ps1

Stop the load generator by closing the load window or pressing Ctrl+C in it.
#>

param()

function Check-CommandExists {
    param([string]$cmd)
    $which = Get-Command $cmd -ErrorAction SilentlyContinue
    return $null -ne $which
}

if (-not (Check-CommandExists -cmd 'kubectl')) {
    Write-Error "kubectl not found in PATH. Install kubectl and try again."
    exit 1
}

Write-Host "Deleting any existing load-generator pod (if present)..."
kubectl delete pod load-generator --ignore-not-found | Out-Null

$loadCmd = 'kubectl run -i --tty load-generator --rm --image=busybox:1.28 --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://todo-service:3005/api/todo; done"'
$hpaWatchCmd = 'kubectl get hpa todo-backend -w'
$podsWatchCmd = 'kubectl get pods -l app=todo-backend -w'

Write-Host "Opening a new PowerShell window to run the load generator..."
Start-Process -FilePath powershell -ArgumentList '-NoExit', '-Command', $loadCmd

Start-Sleep -Milliseconds 500
Write-Host "Opening a new PowerShell window to watch HPA..."
Start-Process -FilePath powershell -ArgumentList '-NoExit', '-Command', $hpaWatchCmd

Start-Sleep -Milliseconds 500
Write-Host "Opening a new PowerShell window to watch backend pods..."
Start-Process -FilePath powershell -ArgumentList '-NoExit', '-Command', $podsWatchCmd

Write-Host "All windows started. Stop the load generator by closing its window or pressing Ctrl+C in it."