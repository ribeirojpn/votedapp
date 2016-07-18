angular.module('voted').controller('VotePollController', function ($scope, $routeParams,$http) {
  $scope.choiced = {name: ''}
  $scope.mensagem = {text:''}
  var route = '/polls/' + $routeParams.pollname

  $http.get(route).then(function(poll){
    $scope.poll = poll.data
		console.log($scope.poll)
  }, function(erro){
    $scope.mensagem = {
      texto: 'Could not find the poll.'
    };
    console.log(erro);
  });

  $scope.votar = function () {
		var vote = {
			option: $scope.choiced.name
		};

		$http.put(route, vote).then( function(poll){
			$scope.mensagem.text = 'Thanks for your vote!'
	  }, function(erro){
			console.error(erro)
			console.log('Não foi possivel registrar o voto')
	  });
  }
});
