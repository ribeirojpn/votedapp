angular.module('voted').controller('VotePollController', function ($scope,$resource, $routeParams) {
  var Poll = $resource('/usr/:pollname');

  Poll.get({pollname: $routeParams.pollname}, function(poll){
    $scope.poll = poll;
    console.log('poll recebida p.name');
  }, function(erro){
    $scope.mensagem = {
      texto: 'Não foi possivel encontrar a enquete.'
    };
    console.log(erro);
  });

  /*
  * Ponto de interrogação(?) = %3F
  */
});
