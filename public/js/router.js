var intelliSolBlogApp = angular.module('intelliSolBlogApp', ['ngRoute', 'blogControllers', 'ngSanitize']);

intelliSolBlogApp.config(['$routeProvider', 
	function($routeProvider) {
		$routeProvider.when('/blogs', {
			templateUrl: 'bloglist.html',
			controller: 'BlogListCtrl'
		}).
		when('/blogs/:blogId', {
			templateUrl: 'blog.html', 
			controller: 'BlogCtrl'
		}).
		when('/about', {
			templateUrl: 'about.html', 
			controller: 'AboutCtrl'
		}).
		otherwise({
			redirectTo: '/blogs'
		});
	}
]);

// Enable CORS (doesn't work)
/*
intelliSolBlogApp.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
*/
