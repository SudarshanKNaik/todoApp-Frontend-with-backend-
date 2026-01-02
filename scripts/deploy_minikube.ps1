# PowerShell deploy script for Minikube (Windows)
param()

Write-Host "Starting Minikube..."
minikube start --driver=docker

Write-Host "Configuring Docker env for Minikube..."
& minikube -p minikube docker-env --shell powershell | Out-String | Invoke-Expression

Write-Host "Enabling metrics-server addon (required for HPA)..."
minikube addons enable metrics-server

Write-Host "Building images..."
docker build -t todo-backend ./Backend
docker build -t todo-frontend ./Frontend

Write-Host "Loading images into minikube node (optional but helpful)..."
minikube image load todo-backend:latest
minikube image load todo-frontend:latest

Write-Host "Applying manifests..."
kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/todo-backend-hpa.yaml
kubectl apply -f k8s/todo-frontend-hpa.yaml

Write-Host "Front-end URL:"
minikube service todo-frontend --url
