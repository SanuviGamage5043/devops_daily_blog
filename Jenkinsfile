pipeline {
    agent any

    environment {
        DOCKER_USER = credentials('dockerhub-creds') // Docker Hub credentials
        AWS_KEY     = credentials('aws-access-key')   // AWS credentials for Terraform
        AWS_SECRET  = credentials('aws-secret-key')
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

        stage('Deploy Containers') {
            steps {
                sh 'chmod +x ./scripts/deploy.sh'
                sh './scripts/deploy.sh'
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
