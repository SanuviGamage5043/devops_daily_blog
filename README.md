# 🚀 Automated CI/CD Pipeline

## 📌 Project Overview

This project demonstrates a complete DevOps automation pipeline for deploying a cloud-native blog application on an EC2-based infrastructure.

The system provisions infrastructure using Terraform, configures servers using Ansible, containerizes the application with Docker, orchestrates containers using Kubernetes, and automates CI/CD using Jenkins — all hosted on an EC2 instance.

## 🔑 Key Highlights

- Infrastructure provisioning using Terraform

- EC2-based deployment architecture

- Configuration management using Ansible

- Containerization with Docker

- Kubernetes orchestration

- CI/CD pipeline with Jenkins

- Automated end-to-end deployment

## 🏗 Architecture Overview
    Developer → GitHub → Jenkins (EC2)
                         ↓
                    Docker Build
                         ↓
                 Kubernetes Cluster (EC2)
                         ↓
                  Blog Application

All core components (Jenkins, Docker, Kubernetes cluster) are deployed on an EC2 instance.

## 🛠 Technology Stack

| Layer                    | Technology          | Purpose                      |
| ------------------------ | ------------------- | ---------------------------- |
| Cloud Provider           | Amazon Web Services | Cloud infrastructure         |
| Compute                  | Amazon EC2          | Virtual server hosting       |
| Infrastructure as Code   | Terraform           | Provision EC2 and networking |
| Configuration Management | Ansible             | Server setup and automation  |
| Containerization         | Docker              | Application packaging        |
| Orchestration            | Kubernetes          | Manage and scale containers  |
| CI/CD                    | Jenkins             | Automated pipeline           |
| Backend                  | Node.js / Express   | REST API                     |
| Frontend                 | React               | Web UI                       |

## 🗂 Project Structure

    Devops_daily_blog

    ├── ansible/            # Configuration management and EC2 setup
    ├── backend/            # Backend API source code
    ├── blog-app/           # Frontend React application
    ├── k8s/                # Kubernetes manifests (Deployments, Services, Ingress)
    ├── scripts/            # Automation and utility scripts
    ├── terraform/          # IaC for provisioning EC2 instance
    ├── docker-compose.yml  # Local development orchestration
    └── Jenkinsfile         # CI/CD pipeline definition

## ⚡ Features

### 🏗 Infrastructure Provisioning

- EC2 instance creation using Terraform

- Security groups and networking configuration

- Reproducible infrastructure setup

### ⚙️ Server Configuration

- Automated installation of Docker, Kubernetes, and Jenkins using Ansible

- Environment preparation on EC2

### 🐳 Containerized Deployment

- Docker images for backend and frontend

- Docker Compose for local testing

### ☸️ Kubernetes Deployment

- Deployment and Service manifests

- Scalable application pods

- Rolling updates support

### 🔁 CI/CD Automation

- Automatic build on code push

- Docker image creation

- Deployment to Kubernetes cluster on EC2

- Fully automated pipeline

## 🏃 How to Run

### 🔹 Prerequisites

- AWS Account

- Terraform installed

- Ansible installed

- Docker installed

- kubectl installed

- Jenkins server

### 1️⃣ Provision EC2 Infrastructure

    cd terraform
    terraform init
    terraform apply

### 2️⃣ Configure EC2 Server

    cd ansible
    ansible-playbook deploy.yml

### 3️⃣ Local Development

    docker-compose up --build

### 4️⃣ Deploy to Kubernetes (on EC2)

    kubectl apply -f k8s/
    kubectl get pods
    kubectl get services

### 5️⃣ CI/CD Pipeline Execution

Push code to repository → Jenkins automatically:

- Builds Docker images

- Runs pipeline stages

- Deploys updated containers to Kubernetes

## 🎯 Learning Outcomes

- Deploying applications on EC2

- Infrastructure as Code using Terraform

- Configuration management with Ansible

- Container orchestration with Kubernetes

- Building real-world CI/CD pipelines


