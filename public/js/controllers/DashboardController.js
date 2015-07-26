angular.module('voted').controller('DashboardController',function ($scope,$resource) {
	$scope.polls = [];
	var Polls = $resource('/dashboard');

	function getPolls(){
		Polls.query(function(polls){
			$scope.polls = polls;
			console.log('Polls coletadas');
		}, function (erro) {
			console.log(erro);
		});
	}
	getPolls();

	function deletePoll(id) {
		Polls.fin
	}
});
