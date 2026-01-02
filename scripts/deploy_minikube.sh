#!/usr/bin/env bash
set -euo pipefail

# Start minikube (using docker driver)
minikube start --driver=docker

# Use minikube's docker daemon so images are available to the cluster
eval "$(minikube docker-env)"

# Build images
docker build -t todo-backend ./Backend
docker build -t todo-frontend ./Frontend

# Deploy manifests
kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

# Show frontend URL
minikube service todo-frontend --url
