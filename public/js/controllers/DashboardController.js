angular.module('voted').controller('DashboardController',function ($scope,$resource) {
	$scope.polls = [];
	$scope.myPolls = {
		text : ''
	}
	var Polls = $resource('/dashboard/:id');

	function getPolls(){
		Polls.query(function(polls){
			$scope.polls = polls;
			if (polls.length == 0){
				$scope.myPolls.text = "You don't have polls. Create a new one ";
			} else {
				$scope.myPolls.text = '';
			}
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
