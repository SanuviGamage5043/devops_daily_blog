pipeline {
    agent any

    environment {
        DOCKER_USER = credentials('dockerhub-creds')   
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/SanuviGamage5043/devops_daily_blog.git'
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

        stage('Deploy to EC2') {
            steps {
                sshagent(['ubuntu']) { // Jenkins SSH key ID
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@65.2.128.22 'bash -s' <<'ENDSSH'
                    cd /home/ubuntu/blog-app
                    chmod +x deploy.sh
                    ./deploy.sh $DOCKER_USER_USR $DOCKER_USER_PSW
                    ENDSSH
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