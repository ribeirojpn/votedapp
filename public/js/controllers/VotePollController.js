angular.module('voted').controller('VotePollController', function ($scope, $routeParams,$http) {
  $scope.choiced = {name:'asd'};
  $scope.mensagem = {text:''}
  $http.get('/polls/' + $routeParams.pollname, function(poll){
    $scope.poll = poll;
  }, function(erro){
    $scope.mensagem = {
      texto: 'Could not find the poll.'
    };
    console.log(erro);
  });

  $scope.votar = function () {
		var vote = {
			option: choiced.name
		};
		var route = '/polls/' + $routeParams.pollname
		$http.put(route, vote, function(poll){
			$scope.mensagem.text = 'Thanks for your vote!'
	  }, function(erro){
			console.error(erro);
			console.log('Não foi possivel registrar o voto');
	  });
  }
});
