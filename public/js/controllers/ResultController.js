angular.module('voted').controller('ResultController', function ($scope, $routeParams, $http) {
	var route = '/polls/' + $routeParams.pollname
  $http.get(route).then(function(poll){
    $scope.poll = poll.data
		loadAverage()
  }, function(erro){
    $scope.mensagem = {
      texto: 'Could not find the poll.'
    }
    console.log(erro)
  })

	function loadAverage() {
		$scope.total = 0
    $scope.averages = []
    for (var i in $scope.poll.options){
      $scope.total += $scope.poll.options[i].value
    }
    for (var i in $scope.poll.options){
      $scope.poll.options[i].porc = $scope.poll.options[i].value / $scope.total
    }
	}
})
