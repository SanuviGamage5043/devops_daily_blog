#!/bin/bash
set -e

echo "Building updated frontend Docker image..."
docker build -t sanuvi5043/blogapp-frontend:latest ./blog-app

echo "Building updated backend Docker image..."
docker build -t sanuvi5043/blogapp-backend:latest ./backend

echo "Build completed!"
