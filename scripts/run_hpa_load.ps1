# Run a stronger load test using 'hey' to trigger HPA
# Requires kubectl and internet access (to pull the loadimpact/hey image)
# Usage: Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; .\scripts\run_hpa_load.ps1

param(
    [int]$concurrency = 50,
    [string]$duration = '2m',
    [string]$target = 'http://todo-service:3005/api/todo'
)

Write-Host "Restarting backend deployment to ensure resource changes are in effect..."
kubectl rollout restart deployment todo-backend
Start-Sleep -Seconds 3

Write-Host "Opening a new window to run 'hey' load generator ($concurrency concurrency for $duration)"
$heyCmd = "kubectl run -i --tty hey --rm --image=loadimpact/hey --restart=Never -- /bin/sh -c \"hey -z $duration -c $concurrency $target\""
Start-Process -FilePath powershell -ArgumentList '-NoExit','-Command',$heyCmd

Start-Sleep -Milliseconds 500
Write-Host "Opening a new window to watch HPA..."
Start-Process -FilePath powershell -ArgumentList '-NoExit','-Command','kubectl get hpa todo-backend -w'

Start-Sleep -Milliseconds 500
Write-Host "Opening a new window to watch backend pods..."
Start-Process -FilePath powershell -ArgumentList '-NoExit','-Command','kubectl get pods -l app=todo-backend -w'

Write-Host "Started load and watchers. Close the 'hey' window or press Ctrl+C in it to stop the load."