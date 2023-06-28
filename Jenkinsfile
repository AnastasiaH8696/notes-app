pipeline {
  agent {
    label 'docker-agent-alpine-00002sr9frlza'
  }

  environment {
    dockerimagefrontend = "anastasiah8696/notes-app-ui"
    dockerimagebackend = "anastasiah8696/notes-app-backend"
    dockerimagedb = "mongo"
  }

  stages {
    stage('Checkout Source') {
      steps {
        git 'https://github.com/AnastasiaH8696/notes-app.git'
      }
    }

    stage('Build image') {
      steps {
        script {
          withEnv(['DOCKER_IMAGE_FRONTEND=${dockerimagefrontend}',
                   'DOCKER_IMAGE_BACKEND=${dockerimagebackend}',
                   'DOCKER_IMAGE_DB=${dockerimagedb}']) {
            dockerImageFrontend = docker.build env.DOCKER_IMAGE_FRONTEND
            dockerImageBackend = docker.build env.DOCKER_IMAGE_BACKEND
            dockerImageDB = docker.build env.DOCKER_IMAGE_DB
          }
        }
      }
    }

    stage('Pushing Image') {
      environment {
        registryCredential = 'dockerhub-credentials'
      }
      steps {
        script {
          docker.withRegistry('https://registry.hub.docker.com', registryCredential) {
            dockerImageFrontend.push("latest")
            dockerImageBackend.push("latest")
            dockerImageDB.push("latest")
          }
        }
      }
    }

    stage('Deploying React.js container to Kubernetes') {
      steps {
        script {
          kubernetesDeploy(configs: "deployment.yaml", "service.yaml")
        }
      }
    }
  }
}
