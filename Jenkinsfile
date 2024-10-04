pipeline {
    agent any 

    stages {
        stage('Checkout') {
            steps {
                // Clone the repository
                git 'https://github.com/Piipip/expressci-pipeline.git'
            }
        }
        stage('Build') {
            steps {
                // Build Docker image
                script {
                    def app = docker.build("expressci-app:${env.BUILD_ID}")
                }
            }
        }
        stage('Test') {
            steps {
                // Run tests (you can replace this with your actual test command)
                script {
                    sh 'npm run test' // Make sure you have tests defined
                }
            }
        }
        stage('Deploy') {
            steps {
                // Push Docker image to Docker Hub
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
            // Notify on success (optional)
            echo 'Build completed successfully!'
        }
        failure {
            // Notify on failure (optional)
            echo 'Build failed!'
        }
    }
}

