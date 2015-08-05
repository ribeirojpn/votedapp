angular.module('voted').controller('ResultController', function ($scope,$resource, $routeParams) {
  var Poll = $resource('/usr/:pollname');

  Poll.get({pollname: $routeParams.pollname}, function(poll){

    $scope.poll = poll;
    $scope.total = 0;
    $scope.medias = []
    for (var i in poll.options[0]){
      $scope.total += poll.options[0][i].value;
    }
    console.log('poll recebida p.name');
  }, function(erro){
    $scope.mensagem = {
      texto: 'Não foi possivel encontrar a enquete.'
    };
    console.log(erro);
  });

});
