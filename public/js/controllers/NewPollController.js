angular.module('voted').controller('NewPollController',function ($scope,$resource) {
	var Poll = $resource('/dashboard/:id');
	$scope.poll = new Poll();
    $scope.placeholders = ['Option 1', 'Option 2'];
    $scope.mensagem = {
        texto:''
    };

	$scope.salva = function () {
				for (var i = 0; i < $scope.placeholders.length; i++) {
					  $scope.poll.options[i].value = 0;
						console.log($scope.poll.options[i]);
				}
        $scope.poll.$save()
            .then(function () {
            console.log('Salvo com sucesso');
            $scope.mensagem.texto = 'Enquete criada';
            $scope.poll = new Poll();
        })
            .catch(function (erro) {
				console.log('Não foi possivel salvar');
                $scope.mensagem.texto = 'Não foi possivel criar a enquete';
        });
    };

    $scope.addOption = function () {
        $scope.placeholders.push('New Option');
    }
});
