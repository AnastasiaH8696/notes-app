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
          withEnv(['DOCKERIMAGEFRONTEND=${dockerimagefrontend}',
                   'DOCKERIMAGEBACKEND=${dockerimagebackend}',
                   'DOCKERIMAGEDB=${dockerimagedb}']) {
            dockerImageFrontend = docker.build env.DOCKERIMAGEFRONTEND
            dockerImageBackend = docker.build env.DOCKERIMAGEBACKEND
            dockerImageDB = docker.build env.DOCKERIMAGEDB
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
