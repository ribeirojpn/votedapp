angular.module('voted').controller('NewPollController',function ($scope,$http) {
	$scope.poll = {
		options: []
	}
  $scope.placeholders = ['Option 1', 'Option 2']
  $scope.mensagem = {
      texto:'',
			link:''
  }
	console.log($scope.poll)

	$scope.salva = function () {
				console.log($scope.poll)
				$scope.poll.name =  $scope.poll.name.split('?').join('')
				$scope.poll.options.forEach(function (item,index) {
					$scope.poll.options[index].value = 0
				})
				console.log($scope.poll.options)
        $http.post('/user/polls/',$scope.poll)
            .then(function () {
            $scope.mensagem.texto = 'Poll created. Available in:'
						$scope.mensagem.link = window.location.protocol + '//' + window.location.host + '/#/poll/' + $scope.poll.name
            $scope.poll = {}
        })
            .catch(function (erro) {
							console.log('Não foi possivel salvar')
              $scope.mensagem.texto = 'Could not create the poll'
        })
    }

		$scope.createNewPoll = function () {
			$scope.mensagem.texto = ''
			$scope.mensagem.link = ''
			$scope.poll = {}
		}

    $scope.addOption = function () {
        $scope.placeholders.push('New Option')
    }
})
