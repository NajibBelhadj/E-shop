pipeline{
	agent any
	environment {
		NEW_VERSION= '1.3.0'
		SERVER_CREDENTIALS= credentials('najib_belhadj')
	}
	stages {
		stage("build") {
			when{
				expression {
					BRANCH_NAME == 'master'
				}
			}	
			steps{
				echo 'building the application...'
				echo "bulding version ${NEW_VERSION}"
			}
		}
		stage("test") {
			when{
				expression {
					BRANCH_NAME == 'dev'
				}
			}	
			steps{
				echo 'testing the application...'
			}
		}
		stage("deploy") {
			steps{
				echo 'deploying the application...'
				echo "deploying with ${SERVER_CREDENTIALS}"
			
			}
		}
	}
}

