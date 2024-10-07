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
                sh "docker build -t ${DOCKER_IMAGE}:${env.BUILD_ID} ."
            }
        }

        stage('Test') {
            steps {
                sh "docker run --rm ${DOCKER_IMAGE}:${env.BUILD_ID} npm test"
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    sh "docker push ${DOCKER_IMAGE}:${env.BUILD_ID}"
                    sh "docker tag ${DOCKER_IMAGE}:${env.BUILD_ID} ${DOCKER_IMAGE}:latest"
                    sh "docker push ${DOCKER_IMAGE}:latest"
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