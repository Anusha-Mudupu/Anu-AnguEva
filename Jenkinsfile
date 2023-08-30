{
    agent any
    environment {
        imageName = "angular-docker-container"
        registryCredentials = "nexus"
        registry = "http://103.12.1.167:8089/"
        dockerImage = ''
    }
    tools {
        // Install the Maven version configured as "M3" and add it to the path.
        maven "M3_HOME"
        nodejs "node"
    }

    stages {
        stage('Build') {
            steps {
                // Get some code from a GitHub repository
                git branch: 'Dev-Ops', credentialsId: 'bitbucket', url: 'https://ynarasimha@bitbucket.org/dmantz/ecomminventoryui.git'

                // Run Maven on a Unix agent.
                // sh 'ng build --base-href /pcjJewellers/ --configuration=qa'
                // sh "mvn -f pom.xml clean install"
                // sh "mvn clean install"
               // sh "mvn -f pom.xml clean install package -DskipTests"

                // To run Maven on a Windows agent, use
                // bat "mvn -Dmaven.test.failure.ignore=true clean package"
                // sh 'sudo cp -r /var/lib/jenkins/workspace/ecom-inventory-app /opt/kubernetes'
            }

        }
        stage('Docker build') {
            steps {
            ansiblePlaybook credentialsId: 'Ansible', disableHostKeyChecking: true, installation: 'ansible', inventory: '/var/lib/jenkins/workspace/Inventory-ui-app/hosts', playbook: '/var/lib/jenkins/workspace/Inventory-ui-app/ansible-docker-build.yml'  
            }
        }
         stage('Docker image uplaod to nexus repository') {
            steps {
             withCredentials([usernamePassword(credentialsId: 'nexus', passwordVariable: 'docker-password', usernameVariable: 'nexus')]) {
                sh '''
                echo Dmantz1 | docker login -u admin --password-stdin uat.evadella.com
                docker tag inventoyui-docker-container uat.evadella.com/repository/ui-docker-private-repo/inventoyui-docker-container:latest
                docker push uat.evadella.com/repository/ui-docker-private-repo/inventoyui-docker-container:latest
                docker rmi uat.evadella.com/repository/ui-docker-private-repo/inventoyui-docker-container:latest
                  '''
             }
            }
          }
         stage('Deployment Approval') {
            steps {
              script{
                  timeout(5){
                     mail bcc: '', body: "<br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> Go to build url and approval the deployment request <br> URL de build: ${env.BUILD_URL}", cc: 'shanti@dmantz.com', charset: 'UTF-8', from: '', mimeType: 'text/html', replyTo: '', subject: "${currentBuild.result} CI: Project name -> ${env.JOB_NAME}", to: "narasimha.y@dmantz.com"; 
                     //input(id: "Deploy Gate", message: "Deploy ${params.project_name}?", ok: 'Deploy')
                     input id: 'Deploy-Gate', message: 'Deploy ${params.project_name}?', ok: 'procced', submitter: 'Narasimha'
                  }
              }
            }

        }
        stage('Deployed into Kubernetes') {
            steps {
                 ansiblePlaybook credentialsId: 'Ansible', disableHostKeyChecking: true, installation: 'ansible', inventory: '/var/lib/jenkins/workspace/Inventory-ui-app/hosts', playbook: '/var/lib/jenkins/workspace/Inventory-ui-app/ans-k8s-deployment.yml'
            
            }

        }
       
    }
     post {
		  always {
			  mail bcc: '', body: "<br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL de build: ${env.BUILD_URL}", cc: '', charset: 'UTF-8', from: '', mimeType: 'text/html', replyTo: '', subject: "${currentBuild.result} CI: Project name -> ${env.JOB_NAME}", to: "narasimha.y@dmantz.com";  
		    }
    	}
}