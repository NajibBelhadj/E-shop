CODE_CHANGES == getGitChanges()
pipeline{
	agent any
	stages {
		stage("build") {
			when{
				expression {
					BRANCH_NAME == 'dev' && CODE_CHANGES == true
				}
			}	
			steps{
				echo 'building the application...'
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

