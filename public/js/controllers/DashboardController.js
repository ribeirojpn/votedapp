angular.module('voted').controller('DashboardController',function ($scope,$resource) {
	$scope.polls = [];
	var Polls = $resource('/dashboard/:id');

	function getPolls(){
		Polls.query(function(polls){
			$scope.polls = polls;
			console.log('Polls coletadas');
		}, function (erro) {
			console.log(erro);
		});
	}
	getPolls();

	$scope.deletePoll = function(poll) {
		Polls.delete({id: poll._id}, getPolls, function (erro) {
			console.log('Não foi possivel remover a enquete');
			console.log(erro);
		});
	}
});
