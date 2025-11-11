#!/bin/bash
set -e

DOCKER_USER=$1
DOCKER_PASS=$2

echo "Logging in to Docker Hub..."
echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin

echo "Pushing frontend image..."
docker push sanuvi5043/blogapp-frontend:latest

echo "Pushing backend image..."
docker push sanuvi5043/blogapp-backend:latest

echo "Images pushed successfully!"
