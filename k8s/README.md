# Kubernetes deployment for todoApp

This folder contains manifests and local instructions to run the todo app on Minikube.

Prerequisites
- Docker
- Minikube
- kubectl

Steps (Linux / macOS):
1. Start minikube with Docker driver:
   ```bash
   minikube start --driver=docker
   eval $(minikube docker-env)
   ```

2. Build images using Minikube's Docker daemon (in repo root):
   ```bash
   docker build -t todo-backend ./Backend
   docker build -t todo-frontend ./Frontend
   ```

   Note: Frontend will be built with the default VITE_API_URL build arg pointing to the cluster service `http://todo-service:3005` — this is set in `Frontend/Dockerfile`.

3. Enable metrics-server and apply manifests:
   ```bash
   # Enable Metrics API (required by HPA)
   minikube addons enable metrics-server

   kubectl apply -f k8s/mongo-deployment.yaml
   kubectl apply -f k8s/backend-deployment.yaml
   kubectl apply -f k8s/frontend-deployment.yaml
   kubectl apply -f k8s/todo-backend-hpa.yaml
   kubectl apply -f k8s/todo-frontend-hpa.yaml
   ```

4. Expose frontend and get URL:
   ```bash
   minikube service todo-frontend --url
   ```

5. Visit the returned URL in your browser and test the app.

Windows notes:
- Use `minikube docker-env` PowerShell instructions: `minikube -p minikube docker-env --shell powershell` and then run the output as suggested by minikube, or build images via `docker build` and push to a registry accessible to minikube.

Troubleshooting
- If the backend cannot connect to Mongo, check `kubectl get pods` and `kubectl logs` for the services.
- To rebuild and redeploy: rebuild images (after `eval $(minikube docker-env)`) and then `kubectl rollout restart deployment/todo-backend` and `deployment/todo-frontend`.
