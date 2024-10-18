pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "kwakowus/expressci-app"
        DOCKER_REGISTRY = "docker.io"
    }

    options {
        skipDefaultCheckout()
        preserveStashes()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Cache Dependencies') {
            steps {
                script {
                    if (fileExists('.npm-cache')) {
                        unstash 'npm-cache'
                    } else {
                        sh 'npm ci'
                        stash includes: 'node_modules/**/*', name: 'npm-cache'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    def dockerArgs = "--cache-from ${DOCKER_IMAGE}:latest"
                    sh "docker pull ${DOCKER_IMAGE}:latest || true"
                    sh "docker build ${dockerArgs} -t ${DOCKER_IMAGE}:${env.BUILD_ID} ."
                }
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
                    script {
                        // Login to Docker Hub
                        sh '''
                            echo "$DOCKER_PASS" | docker login ${DOCKER_REGISTRY} -u "$DOCKER_USER" --password-stdin
                            docker push ${DOCKER_IMAGE}:${BUILD_ID}
                            docker tag ${DOCKER_IMAGE}:${BUILD_ID} ${DOCKER_IMAGE}:latest
                            docker push ${DOCKER_IMAGE}:latest
                        '''
                    }
                }
                // SSH into Production Environment and deploy the new image
                sshagent(['ssh-credentials']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no root@142.93.115.8 "
                            docker pull ${DOCKER_IMAGE}:latest
                            docker-compose -f /root/prod-env/docker-compose.yml down
                            docker-compose -f /root/prod-env/docker-compose.yml up -d
                        "
                    '''
                }
            }
        }
    }

    post {
        success {
            mail to: 'kwakowus77777@gmail.com',
                 subject: "SUCCESS: ${currentBuild.fullDisplayName}",
                 body: "Build completed successfully!"
        }
        failure {
            mail to: 'kwakowus77777@gmail.com',
                 subject: "FAILURE: ${currentBuild.fullDisplayName}",
                 body: "Build failed. Please check the logs."
        }
        always {
            cleanWs()
        }
    }
}
