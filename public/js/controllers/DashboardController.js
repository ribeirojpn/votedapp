angular.module('voted').controller('DashboardController',function ($scope,$http) {
	$scope.polls = []
	$scope.myPolls = {
		text : ''
	}
	var route = '/user/polls/'

	function getPolls(){
		$http.get(route).then(function(polls){
			$scope.polls = polls.data
			if ($scope.polls.length == 0){
				$scope.myPolls.text = "You don't have polls. Create a new one "
			} else {
				$scope.myPolls.text = ''
			}
		}, function (erro) {
			console.log(erro)
		})
	}

	getPolls()

	$scope.deletePoll = function(poll) {
		$http.delete(route + poll._id).then(getPolls, function (erro) {
			console.log('Não foi possivel remover a enquete')
			console.log(erro)
		})
	}
})
