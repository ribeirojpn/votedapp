angular.module('voted',['ngRoute','ngResource']).config(function ($routeProvider,$httpProvider) {

	$httpProvider.interceptors.push('meuInterceptor');

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

	$routeProvider.when('/dashboard/:pollid', {
		templateUrl: 'partials/poll.html',
		controller: 'PollController'
	});

	$routeProvider.when('/usr/:pollname', {
		templateUrl: 'partials/votepoll.html',
		controller: 'VotePollController'
	});
	$routeProvider.when('/result/:pollname', {
		templateUrl: 'partials/poll.html',
		controller: 'ResultController'
	});

	$routeProvider.when('/auth',{
		templateUrl:'partials/auth.html'
	});

	$routeProvider.otherwise({redirectTo:'/'});
});
