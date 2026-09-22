pipeline {
    agent any

    environment {
        IMAGE = 'wajihaahmed/assignment-1'
    }

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE%:%BUILD_NUMBER% .'
                bat 'docker tag %IMAGE%:%BUILD_NUMBER% %IMAGE%:latest'
            }
        }

        stage('Security Scan') {
            steps {
                bat 'docker scout cves %IMAGE%:%BUILD_NUMBER%'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    bat 'echo %DOCKER_PASSWORD%| docker login -u %DOCKER_USERNAME% --password-stdin'
                    bat 'docker push %IMAGE%:%BUILD_NUMBER%'
                    bat 'docker push %IMAGE%:latest'
                }
            }
        }

        stage('Deploy to Kubernetes') {
        steps {
            bat 'kubectl get nodes'
            bat 'kubectl set image deployment/assignment-1 assignment-1=%IMAGE%:%BUILD_NUMBER%'
            bat 'kubectl rollout status deployment/assignment-1'
        }
    }

    }
}