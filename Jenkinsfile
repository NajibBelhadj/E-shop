//pre-defined structure
CODE_CHANGES == getGitChanges()
pipeline{		//must bee top-level	
	agent any	//where to execute
	stages {	//where the "work" happens
		stage("build") {		//stage and stape
			when{
				expression {
					BRANCH_NAME == 'dev' && CODE_CHANGES == true
				}
			}	
			steps{
				sh 'npm install'	//for js
				sh 'npm build'	//for js
				echo 'building the application...'
			}
		}
		stage("test") {	
			when{
				expression {
					BRANCH_NAME == 'dev' || BRANCH_NAME == 'master'
				}
			}	
			steps{
				echo 'testing the application...'
			}
		}
		stage("deploy") {
			steps{
				echo 'deploying the application...'
			}
		}
	}
	post { 			//Execute some logic After all stages executed build statut
		always {
			//err or success
		}
		success {
			// on the success
		}
		failure {
			// failure
		}
	}
}

