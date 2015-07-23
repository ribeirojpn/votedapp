angular.module('voted',['ngRoute','ngResource']).config(function ($routeProvider) {
	$routeProvider.when('/',{
		templateUrl: 'partials/lpage.html',
		controller: 'LandingPageController'
	});

	$routeProvider.when('/dashboard',{
		templateUrl: 'partials/dashboard.html',
		controller: 'DashboardController'
	});

	$routeProvider.when('/newpoll',{
		templateUrl: 'partials/newpoll.html',
		controller: 'NewPollController'
	});

	$routeProvider.when('/usr/:pollname', {
		templateUrl: 'partials/poll.html',
		controller: 'PollController'
	});

	$routeProvider.otherwise({redirectTo:'/'});
});
