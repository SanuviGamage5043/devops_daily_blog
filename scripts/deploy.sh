#!/bin/bash
set -e

DOCKER_USER=$1
DOCKER_PASS=$2

echo "Stopping existing containers..."
docker stop blogapp_front || true
docker rm blogapp_front || true
docker stop blogapp_back || true
docker rm blogapp_back || true

echo "Logging in to DockerHub..."
echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin

echo "Pulling latest backend image..."
docker pull sanuvi5043/blogapp-backend:latest

echo "Pulling latest frontend image..."
docker pull sanuvi5043/blogapp-frontend:latest

echo "Deploying backend container..."
docker run -d --name blogapp_back \
  -e MONGO_URI="mongodb+srv://sanuvigamage5043_db_user:y7a018npyvXGyswB@clusterdevops.6vrvfmw.mongodb.net/blogapp_db" \
  -e JWT_SECRET="supersecretkey123" \
  -p 5000:5000 \
  sanuvi5043/blogapp-backend:latest

echo "Deploying frontend container..."
docker run -d --name blogapp_front \
  --link blogapp_back:backend \
  -p 80:80 \
  sanuvi5043/blogapp-frontend:latest

echo "Deployment complete. Running containers:"
docker ps