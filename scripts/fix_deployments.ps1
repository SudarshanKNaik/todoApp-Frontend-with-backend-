# PowerShell helper: ensure images are loaded into Minikube, apply manifests, and restart deployments
# Run from repository root: .\scripts\fix_deployments.ps1

Write-Host "1) Ensuring Minikube is running..."
minikube start --driver=docker

Write-Host "2) Building Docker images (local)..."
docker build -t todo-backend ./Backend
docker build -t todo-frontend ./Frontend

Write-Host "3) Loading images into Minikube node (so kubelet can use them)..."
minikube image load todo-backend:latest
minikube image load todo-frontend:latest

Write-Host "4) Enable metrics-server addon (required for HPA)..."
minikube addons enable metrics-server

Write-Host "5) Apply k8s manifests (ensure imagePullPolicy is respected)..."
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/todo-backend-hpa.yaml
kubectl apply -f k8s/todo-frontend-hpa.yaml

Write-Host "6) Restart deployments to pick up changes..."
kubectl rollout restart deployment/todo-backend
kubectl rollout restart deployment/todo-frontend

Write-Host "6) Waiting for pods to become ready (timeout 120s per deployment)..."
try {
    kubectl wait --for=condition=ready deployment/todo-backend --timeout=120s
} catch {
    Write-Warning "todo-backend did not become ready within timeout"
}
try {
    kubectl wait --for=condition=ready deployment/todo-frontend --timeout=120s
} catch {
    Write-Warning "todo-frontend did not become ready within timeout"
}

Write-Host "7) Current pod status:"
kubectl get pods -o wide

Write-Host "8) Useful checks (events & logs):"
Write-Host "--- recent events ---"
kubectl get events --sort-by='.metadata.creationTimestamp' | tail -n 50

Write-Host "--- backend logs (last 200 lines) ---"
kubectl logs deployment/todo-backend --tail=200
if ($LASTEXITCODE -ne 0) { Write-Warning "No logs for todo-backend" }

Write-Host "--- frontend logs (last 200 lines) ---"
kubectl logs deployment/todo-frontend --tail=200
if ($LASTEXITCODE -ne 0) { Write-Warning "No logs for todo-frontend" }

Write-Host "Done. If pods still aren't Running, please paste the output above and I'll help debug further."
