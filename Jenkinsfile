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
    }
}