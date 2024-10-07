pipeline {
    agent any 

    environment {
        DOCKER_IMAGE = "expressci-app"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Piipip/express-ci-pipeline.git'
            }
        }

        stage('Build') {
            steps {
                script {
                    app = docker.build("${DOCKER_IMAGE}:${env.BUILD_ID}")
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Run tests inside a Node.js container
                    docker.image('node:14').inside {
                        sh 'sudo chown -R 113:120 /.npm'
                        sh 'npm install'
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        app.push("latest")
                        app.push("${env.BUILD_ID}")
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}