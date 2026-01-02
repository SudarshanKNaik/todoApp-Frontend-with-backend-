# Docker Setup for TODO App

This project is containerized using Docker Compose with separate containers for frontend, backend, and MongoDB.

## Ports

- **Frontend**: http://localhost:5174
- **Backend API**: http://localhost:3005
- **MongoDB**: localhost:27018 (external access)

## Prerequisites

- Docker Desktop installed and running
- Docker Compose installed (comes with Docker Desktop)

## Running the Application

### Build and Start All Services

```bash
docker-compose up --build
```

### Start in Detached Mode (Background)

```bash
docker-compose up -d --build
```

### View Logs

```bash
docker-compose logs -f
```

### Stop All Services

```bash
docker-compose down
```

### Stop and Remove Volumes (Clean Slate)

```bash
docker-compose down -v
```

## Services

1. **mongodb**: MongoDB 6 database
   - Internal port: 27017
   - External port: 27018
   - Database: `todo`
   - Collection: `todoitems`

2. **backend**: Node.js Express backend
   - Port: 3005
   - API endpoint: http://localhost:3005/api/todo

3. **frontend**: React + Vite frontend (served via Nginx)
   - Port: 5174
   - URL: http://localhost:5174

## Accessing MongoDB

To access MongoDB from outside Docker:

```bash
mongosh mongodb://localhost:27018/todo
```

Or use MongoDB Compass with connection string:
```
mongodb://localhost:27018/todo
```

## Troubleshooting

### If containers fail to start:
1. Check if ports 3005, 5174, or 27018 are already in use
2. Ensure Docker Desktop is running
3. Check logs: `docker-compose logs [service-name]`

### To rebuild after code changes:
```bash
docker-compose up --build
```

### To access container shell:
```bash
docker exec -it todo-backend sh
docker exec -it todo-frontend sh
docker exec -it todo-mongo mongosh
```

