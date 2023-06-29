pipeline {
  agent {
    label 'docker-agent-alpine-00002sr9frlza'
  }

  environment {
    dockerimage = 'anastasiah8696/notes-app-ui'
    dockerImageFrontend = ''
    dockerImageBackend = ''
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
            dockerImageFrontend = docker.build dockerimage
            dockerimage = 'anastasiah8696/notes-app-backend'
            dockerImageBackend = docker.build dockerimage
            dockerimage = 'mongo'
            dockerImageDB = docker.build dockerimage
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
