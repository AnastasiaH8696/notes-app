pipeline {
  agent any

  environment {
    dockerimagefrontend = 'anastasiah8696/notes-app-ui'
    dockerImageFrontend = ''
    dockerimagebackend = 'anastasiah8696/notes-app-backend'
    dockerImageBackend = ''
    dockerimagedb = 'mongo'
    dockerImageDB = ''
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
            dockerImageFrontend = docker.build dockerimagefrontend
            dockerImageBackend = docker.build dockerimagebackend
            dockerImageDB = docker.build dockerimagedb
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
            dockerImageFrontend.push('latest')
            dockerImageBackend.push('latest')
            dockerImageDB.push('latest')
          }
        }
      }
    }

    stage('Deploying notes-app container to Kubernetes') {
      steps {
        script {
          kubernetesDeploy(configs: 'deployment.yaml', 'service.yaml')
        }
      }
    }
  }
}
