REPO="devdocker.wifa.uni-leipzig.de:5000"
IMAGE_TAG = "de4l/app-hub-frontend"
BUILD = BRANCH_NAME == 'master' ? 'latest' : BRANCH_NAME
node('master') {
  checkout scm
  echo "Build: ${BUILD}"

  echo "Writing GIT hash to config file"
  def GIT_COMMIT_HASH = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
  sh "sed -i \"s/@@GIT_COMMIT_HASH@@/${GIT_COMMIT_HASH}/g\" \"./docker/config.template.json\""

  withCredentials([usernamePassword(credentialsId: 'docker-registry-devdocker', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USER')]) {
    sh "sudo docker login -u ${DOCKER_USER} -p ${DOCKER_PASSWORD} ${REPO}"
  }
  stage('Build Docker image') {
    echo "Build: ${BUILD}"
    sh "sudo docker build -t ${REPO}/${IMAGE_TAG}:${BUILD} ."
    sh "sudo docker push ${REPO}/${IMAGE_TAG}:${BUILD}"
  }

//  stage('Update Rancher') {
//    build job: 'jenkins-job-update-rancher',
//      parameters: [
//        string(name: 'service', value: 's2des-stack-frontend'),
//        string(name: 'stack', value: 's2des-events-development'),
//        string(name: 'image', value: IMAGE_TAG),
//        string(name: 'build', value: BUILD)
//      ]
//  }
}

