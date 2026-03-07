pipeline {
    agent any

    environment {
        DOCKER_USER = credentials('dockerhub-creds')   
        SSH_KEY     = credentials('ec2-ssh-key')         // SSH private key content
        AWS_KEY     = credentials('aws-access-key')    
        AWS_SECRET  = credentials('aws-secret-key')
        KUBECONFIG  = '/var/lib/jenkins/.kube/config'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/SanuviGamage5043/devops_daily_blog.git'
            }
        }

        stage('Terraform Init') {
            steps {
                dir("${WORKSPACE}") {
                    sh 'terraform init -upgrade'
                }
            }
        }

        stage('Terraform Plan') {
            steps {
                dir("${WORKSPACE}") {
                    sh "terraform plan -var 'ssh_key=$SSH_KEY' -out=tfplan"
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                dir("${WORKSPACE}") {
                    sh "terraform apply -var 'ssh_key=$SSH_KEY' -auto-approve tfplan"
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                dir("${WORKSPACE}") {
                    sh 'chmod +x ./scripts/build.sh'
                    sh './scripts/build.sh'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                dir("${WORKSPACE}") {
                    sh 'chmod +x ./scripts/push.sh'
                    sh "./scripts/push.sh $DOCKER_USER_USR $DOCKER_USER_PSW"
                }
            }
        }

        stage('Ansible Deploy') {
            steps {
                dir("${WORKSPACE}") {
                    sh 'sudo apt-get update && sudo apt-get install -y ansible'
                    sh """
                    ansible-playbook -i ansible/inventory.ini ansible/deploy.yml \
                    --private-key <(echo "$SSH_KEY") -u ubuntu -v
                    """
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                dir("${WORKSPACE}") {
                    sh """
                    export KUBECONFIG=/var/lib/jenkins/.kube/config
                    kubectl apply -f k8s/backend-deployment.yaml
                    kubectl apply -f k8s/backend-service.yaml
                    kubectl apply -f k8s/frontend-deployment.yaml
                    kubectl apply -f k8s/frontend-service.yaml
                    kubectl get pods
                    kubectl get svc
                    """
                }
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