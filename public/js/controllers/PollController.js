angular.module('voted').controller("PollController", function ($scope,$routeParams,$resource) {
  var Poll = $resource('/dashboard/:id');

  Poll.get({id: $routeParams.pollid}, function(poll){
    $scope.poll = poll;
    console.log('poll recebida p.');
  }, function(erro){
    $scope.mensagem = {
      texto: 'Não foi possivel encontrar a enquete.'
    };
    console.log(erro);
  });
});
