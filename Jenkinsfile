pipeline {
    agent any

    environment {
        DOCKER_USER = credentials('dockerhub-creds')   
        AWS_KEY     = credentials('aws-access-key')    
        AWS_SECRET  = credentials('aws-secret-key')
        KUBECONFIG  = '/var/lib/jenkins/.kube/config'
        ANSIBLE_KEY = '/var/lib/jenkins/.ssh/NewDevopsKey.pem'
    }

    stages {

        stage('Checkout Code') {
            steps {
                // Pull repo into Jenkins workspace
                git branch: 'main', url: 'https://github.com/SanuviGamage5043/devops_daily_blog.git'
            }
        }

        // Terraform stages
        // stage('Terraform Init') {
        //     steps {
        //         dir("${WORKSPACE}") {
        //         sh 'terraform init -upgrade'
        //         }   
        //     }
        // }

        // stage('Terraform Plan') {
        //     steps {
        //         dir("${WORKSPACE}") {
        //             sh 'terraform plan -out=tfplan'
        //         }
        //     }
        // }

        // stage('Terraform Apply') {
        //     steps {
        //         dir("${WORKSPACE}") {
        //             sh 'terraform apply -auto-approve tfplan'
        //         }
        //     }
        // }

        // Docker stages
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

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                sh """
                ssh -o StrictHostKeyChecking=no ubuntu@EC2_PUBLIC_IP '
                cd /home/ubuntu/blog-app
                chmod +x deploy.sh
                ./deploy.sh $DOCKER_USER_USR $DOCKER_USER_PSW
            '
            """
        }
    }
}
        // Ansible deployment stage
        // stage('Ansible Deploy') {
        //     steps {
                
        //         sh 'sudo apt-get update && sudo apt-get install -y ansible'

                
        //         dir("${WORKSPACE}") {
        //             sh """
        //             ansible-playbook -i ansible/inventory.ini ansible/deploy.yml \
        //             --private-key $ANSIBLE_KEY -u ubuntu -v
        //             """
        //         }
        //     }
        // }


        // Kubernetes deployment stage
        // stage('Deploy to Kubernetes') {
        //     steps {
        //         dir("${WORKSPACE}") {
        //             sh """
        //             export KUBECONFIG=$KUBECONFIG
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

        // stage('Test Kubernetes') {
        //     steps {
        //         sh """
        //         export KUBECONFIG=$KUBECONFIG
        //         kubectl get nodes
        //         kubectl get pods -n default
        //         """
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
