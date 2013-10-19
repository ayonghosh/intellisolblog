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
		otherwise({
			redirectTo: '/blogs'
		});
	}
]);