pipeline {
  agent any

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

    stage('Deploying React.js container to Kubernetes') {
      steps {
        script {
          kubernetesDeploy(configs: "deployment.yaml", "service.yaml")
        }
      }
    }
  }
}
