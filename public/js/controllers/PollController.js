angular.module('voted').controller("PollController", function ($scope,$routeParams,$http) {
	var route = '/user/polls/' + $routeParams.pollid
  $http.get(route).then(function(poll){
    $scope.poll = poll.data
    $scope.total = 0
    $scope.medias = []
    for (var i in $scope.poll.options){
      $scope.total += $scope.poll.options[i].value
    }
  }, function(erro){
    $scope.mensagem = {
      texto: 'Could not find the poll.'
    }
    console.log(erro)
  })
})
