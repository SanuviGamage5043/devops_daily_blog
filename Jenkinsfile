pipeline {
    agent any

    environment {
        DOCKER_USER = credentials('dockerhub-creds') // Docker Hub credentials
        AWS_KEY     = credentials('aws-access-key')   // AWS credentials for Terraform
        AWS_SECRET  = credentials('aws-secret-key')
        KUBECONFIG = "/var/lib/jenkins/.kube/config"
    
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/SanuviGamage5043/devops_daily_blog.git'
            }
        }

        // Terraform stages
        stage('Terraform Init') {
            steps {
                sh 'terraform init'
            }
        }

        stage('Terraform Plan') {
            steps {
                sh 'terraform plan -out=tfplan'
            }
        }

        stage('Terraform Apply') {
            steps {
                sh 'terraform apply -auto-approve tfplan'
            }
        }

        // Docker stages
        stage('Build Docker Images') {
            steps {
                sh 'chmod +x ./scripts/build.sh'
                sh './scripts/build.sh'
            }
        }

        stage('Push Docker Images') {
            steps {
                sh 'chmod +x ./scripts/push.sh'
                sh "./scripts/push.sh $DOCKER_USER_USR $DOCKER_USER_PSW"
            }
        }

        // Ansible deployment stage
        stage('Ansible Deploy') {
            steps {
                sh 'sudo apt-get update && sudo apt-get install -y ansible'
                sh 'ansible-playbook -i ansible/inventory.ini ansible/deploy.yml'
            }
        }

        // Kubernetes deployment stage
        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl apply -f k8s/backend-deployment.yaml
                kubectl apply -f k8s/backend-service.yaml
                kubectl apply -f k8s/frontend-deployment.yaml
                kubectl apply -f k8s/frontend-service.yaml
                '''
            }
        }
    }
    post {
        success {
            echo "CI/CD pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Check Jenkins console for details."
        }
    }
}
