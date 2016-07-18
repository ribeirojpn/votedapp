angular.module('voted').controller('ResultController', function ($scope,$resource, $routeParams) {
  var Poll = $resource('/polls/:pollname')

  Poll.get({pollname: $routeParams.pollname}, function(poll){

    $scope.poll = poll;
    $scope.total = 0;
    $scope.medias = []
    for (var i in poll.options){
      $scope.total += poll.options[i].value;
    }
    for (var i in poll.options){
      $scope.poll.options[i].porc = poll.options[i].value / $scope.total;
    }
  }, function(erro){
    $scope.mensagem = {
      texto: 'Could not find the poll.'
    };
    console.log(erro)
  });

});
