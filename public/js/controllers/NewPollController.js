angular.module('voted').controller('NewPollController',function ($scope,$resource) {
	var Poll = $resource('/dashboard/:id');
	$scope.poll = new Poll();
  $scope.placeholders = ['Option 1', 'Option 2'];
  $scope.mensagem = {
      texto:'',
			link:''
  };
	
	$scope.salva = function () {
				for (var i = 0; i < $scope.placeholders.length; i++) {
					  $scope.poll.options[i].value = 0;
						console.log($scope.poll.options[i]);
				}
				$scope.poll.name =  $scope.poll.name.split('?').join('');
        $scope.poll.$save()
            .then(function () {
            console.log('Salvo com sucesso');
            $scope.mensagem.texto = 'Enquete criada. Compartilhe o link abaixo para que outras pessoas possam votar.';
						$scope.mensagem.link = 'http://localhost:3000/#/usr/' + $scope.poll.name;
            $scope.poll = new Poll();
        })
            .catch(function (erro) {
				console.log('Não foi possivel salvar');
                $scope.mensagem.texto = 'Não foi possivel criar a enquete';
        });
    };
		$scope.createNewPoll = function () {
			$scope.mensagem.texto = '';
			$scope.mensagem.link = '';
			$scope.poll = new Poll();
		};

    $scope.addOption = function () {
        $scope.placeholders.push('New Option');
    }
});
