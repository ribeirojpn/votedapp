angular.module('voted').controller('VotePollController', function ($scope,$resource, $routeParams) {
  var Poll = $resource('/usr/:pollname');
  $scope.choiced = {name:'asd'};
  $scope.mensagem = {text:''}
  Poll.get({pollname: $routeParams.pollname}, function(poll){
    $scope.poll = poll;
  }, function(erro){
    $scope.mensagem = {
      texto: 'Could not find the poll.'
    };
    console.log(erro);
  });

  $scope.votar = function () {
    for (var i in $scope.poll.options[0]){
      console.log($scope.poll.options[0][i].name);
      if ($scope.poll.options[0][i].name == $scope.choiced.name){
        $scope.poll.options[0][i].value += 1;
      }
    }
    $scope.poll.$save()
        .then(function () {
        $scope.mensagem.text = 'Thanks for your vote!'
    })
        .catch(function (erro) {
        console.error(erro);
        console.log('Não foi possivel registrar o voto');
    });
  }
});
