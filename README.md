# 1. 🚀 Project Overview

This project demonstrates a full CI/CD pipeline integrating modern DevOps tools to automate the build, test, and deployment process of applications.

It covers:

    - Continuous Integration / Continuous Deployment with Jenkins

    - Containerization with Docker

    - Infrastructure as Code with Terraform

    - Configuration Management with Ansible

    - Orchestration with Kubernetes

    - Cloud Deployment on AWS EC2

    - Webhook Integration with GitHub

This repo serves as a hands-on example of a production-ready DevOps workflow.

# 2. 🛠 Tools Used

    Docker          -> Containerization of apps for consistent environments

    GitHub Webhooks -> Trigger Jenkins pipeline on code changes

    Jenkins         -> Automate CI/CD tasks

    AWS EC2	        -> Cloud hosting and deployment

    Terraform       -> Infrastructure provisioning

    Ansible         -> Server configuration & deployment

    Kubernetes      -> Container orchestration & scaling

# 3. 🌐 Architecture

Below is the high-level pipeline workflow:

1. A[Code Commit to GitHub] --> B[GitHub Webhook Trigger];
2. B --> C[Jenkins Pipeline];
3. C --> D[Docker Build & Test];
4. D --> E[Push Docker Image to Registry];
5. E --> F[Teraform: Provision EC2 & Infra];
6. F --> G[Ansible: Configure & Deploy App];
7. G --> H[Kubernetes: Orchestrate & Manage Containers];

# 4. 🏗 Pipeline Workflow

    - Code Commit → Push code to GitHub.

    - CI Trigger → Webhook triggers Jenkins pipeline.

    - Build & Test → Jenkins builds Docker images & runs tests.

    - Container Deployment → Docker image pushed to registry.

    - Infrastructure Provisioning → Terraform provisions AWS EC2 & required resources.

    - Configuration Management → Ansible installs dependencies and deploys the application.

    - Orchestration → Kubernetes handles scaling, health checks, and rolling updates.

# 5. ⚡ Setup Instructions

Prerequisites

    Git

    Docker

    Jenkins installed & configured

    AWS account with EC2 access

    Terraform & Ansible installed

    Kubernetes cluster (local or cloud)1

# Steps

Clone the Repository

    git clone https://github.com/SanuviGamage5043/devops_daily_blog.git
    cd devops_daily_blog


Configure GitHub Webhook

Settings → Webhooks → Add Jenkins webhook:

    http://<JENKINS_URL>/github-webhook/


Build Docker Image

    docker build -t devops-daily-blog .


Provision Infrastructure with Terraform

    cd terraform
    terraform init
    terraform apply


Deploy App with Ansible

    cd ansible
    ansible-playbook deploy.yml -i hosts.ini


Deploy on Kubernetes

    kubectl apply -f k8s-deployment.yml