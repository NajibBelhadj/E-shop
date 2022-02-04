pipeline{
	agent any
	stages {
		stage("build") {
			when{
				expression {
					BRANCH_NAME == 'master'
				}
			}	
			steps{
				echo 'building the application...'
				echo CHANGE_TITLE
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
			}
		}
	}
}

