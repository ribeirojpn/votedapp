angular.module('voted').controller("PollController", function ($scope,$routeParams,$resource) {
  var Poll = $resource('/user/polls/:id');
  Poll.get({id: $routeParams.pollid}, function(poll){
    $scope.poll = poll;
    $scope.total = 0;
    $scope.medias = []
    for (var i in poll.options[0]){
      $scope.total += poll.options[0][i].value;
    }
  }, function(erro){
    $scope.mensagem = {
      texto: 'Could not find the poll.'
    };
    console.log(erro);
  });
});
