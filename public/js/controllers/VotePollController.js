angular.module('voted').controller('VotePollController', function ($scope,$resource, $routeParams) {
  var Poll = $resource('/usr/:pollname');

  $scope.choiced = {name:'asd'};

  Poll.get({pollname: $routeParams.pollname}, function(poll){
    $scope.poll = poll;
    console.log('poll recebida p.name');
  }, function(erro){
    $scope.mensagem = {
      texto: 'Não foi possivel encontrar a enquete.'
    };
    console.log(erro);
  });

  $scope.votar = function () {
    console.log('bosta');
    for (var i in $scope.poll.options[0]){
      console.log($scope.poll.options[0][i].name);
      if ($scope.poll.options[0][i].name == $scope.choiced.name){
        $scope.poll.options[0][i].value += 1;
        console.log('adicionado');
      }
    }
    $scope.poll.$save()
        .then(function () {
        console.log('Voto adicionado a enquete');
    })
        .catch(function (erro) {
        console.error(erro);
        console.log('Não foi possivel registrar o voto');
    });
  }
});
