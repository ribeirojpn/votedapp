angular.module('voted').controller('ResultController', function ($scope,$resource, $routeParams) {
  var Poll = $resource('/usr/:pollname');

  Poll.get({pollname: $routeParams.pollname}, function(poll){

    $scope.poll = poll;
    $scope.total = 0;
    $scope.medias = []
    for (var i in poll.options[0]){
      $scope.total += poll.options[0][i].value;
    }
    for (var i in poll.options[0]){
      $scope.poll.options[0][i].porc = poll.options[0][i].value / $scope.total;
    }
  }, function(erro){
    $scope.mensagem = {
      texto: 'Could not find the poll.'
    };
    console.log(erro);
  });

});
