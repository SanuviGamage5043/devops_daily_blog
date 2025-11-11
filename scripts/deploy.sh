#!/bin/bash
set -e

echo "Stopping existing containers..."
docker stop blogapp_front || true
docker rm blogapp_front || true
docker stop blogapp_back || true
docker rm blogapp_back || true
docker stop blogapp_db || true
docker rm blogapp_db || true

echo "Deploying MongoDB container..."
docker run -d -p 27017:27017 --name blogapp_db mongo:7.0

echo "Deploying backend container..."
docker run -d -p 5000:5000 --name blogapp_back \
  --link blogapp_db:mongodb \
  sanuvi5043/blogapp-backend:latest

echo "Deploying frontend container..."
docker run -d -p 3000:3000 --name blogapp_front \
  --link blogapp_back:backend \
  sanuvi5043/blogapp-frontend:latest

echo "Deployment complete. Running containers:"
docker ps
