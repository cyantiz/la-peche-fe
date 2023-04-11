String DOCKER_REGISTRY="registry.hub.docker.com"
String DOCKER_REPOSITORY="psycholog1st/la-peche-api"
String DOCKER_IMAGE="${DOCKER_REGISTRY}/${DOCKER_REPOSITORY}"
String DOCKER_TAG_BUILD="0.2-${env.BUILD_NUMBER}"

pipeline {
  agent any
  options {
	ansiColor('xterm')
    disableConcurrentBuilds()
  }

  environment {
    TIMESTAMP = """${sh(
      returnStdout: true,
      script: 'date --utc +%Y%m%d_%H%M%SZ'
      ).trim()}"""
    DOCKER_USERNAME = credentials('DOCKER_USERNAME')
    DOCKER_PASSWORD = credentials('DOCKER_PASSWORD')
  }

  parameters {
    string (name: "gitBranch", defaultValue: "develop", description: "Branch to build")
  }

  triggers {
    GenericTrigger(
      genericVariables: [
        [key: 'gitBranch', value: '$.ref'],
        [key: 'git_sha', value: '$.after'],
        //[key: 'changed_files', value: '$.commits[*].["modified","added","removed"][*]']
      ],

      causeString: 'Triggered on $gitBranch',

      token: "app-build",

      printContributedVariables: true,
      printPostContent: true,

      silentResponse: false,

      regexpFilterText: '$gitBranch',
      regexpFilterExpression: '^refs/heads/develop'
      )
  }

  stages {
    stage('Checkout') {
      steps {
        checkout ( [$class: 'GitSCM',
          extensions: [[$class: 'CloneOption', timeout: 30]],
          branches: [[name: "${gitBranch}" ]],
          userRemoteConfigs: [[
            url: "git@github.com:cyantiz/la-peche-fe.git"]]])
      }
    }

	  stage('Build') {
	    steps {
        sh """
            docker login ${DOCKER_REGISTRY} --username ${DOCKER_USERNAME} --password ${DOCKER_PASSWORD}
            docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG_BUILD} -t ${DOCKER_IMAGE}:latest .
            docker push ${DOCKER_IMAGE}:${DOCKER_TAG_BUILD}
            docker push ${DOCKER_IMAGE}:latest
        """
      }
	  }

    stage('Deploy') {
      steps {
        sh """
          docker service update --image=${DOCKER_IMAGE}:${DOCKER_TAG_BUILD} lapeche_fe
        """
      }
    }
  }

  post {
    always {
      cleanWs()
    }
  }
}
