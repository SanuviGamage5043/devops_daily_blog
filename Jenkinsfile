pipeline {
    agent any

    environment {
        DOCKER_USER = credentials('dockerhub-creds')   
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

        // stage('Build Docker Images') {
        //     steps {
        //         dir("${WORKSPACE}") {
        //             sh 'chmod +x ./scripts/build.sh'
        //             sh './scripts/build.sh'
        //         }
        //     }
        // }

        // stage('Push Docker Images') {
        //     steps {
        //         dir("${WORKSPACE}") {
        //             sh 'chmod +x ./scripts/push.sh'
        //             sh "./scripts/push.sh $DOCKER_USER_USR $DOCKER_USER_PSW"
        //         }
        //     }
        // }

        // stage('Ansible Deploy') {
        //     steps {
        //         dir("${WORKSPACE}") {
        //             sh 'sudo apt-get update && sudo apt-get install -y ansible'
        //             withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'SSH_KEY_FILE')]) {
        //                 sh """
        //                 ansible-playbook -i ansible/inventory.ini ansible/deploy.yml \
        //                 --private-key $SSH_KEY_FILE -u ubuntu -v
        //                 """
        //             }
        //         }
        //     }
        // }

        // stage('Deploy to Kubernetes') {
        //     steps {
        //         dir("${WORKSPACE}") {
        //             sh """
        //             export KUBECONFIG=/var/lib/jenkins/.kube/config
        //             kubectl apply -f k8s/backend-deployment.yaml
        //             kubectl apply -f k8s/backend-service.yaml
        //             kubectl apply -f k8s/frontend-deployment.yaml
        //             kubectl apply -f k8s/frontend-service.yaml
        //             kubectl get pods
        //             kubectl get svc
        //             """
        //         }
        //     }
        // }
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