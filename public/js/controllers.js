var intelliSolBlogControllers = angular.module('blogControllers', []);

intelliSolBlogControllers.controller('BlogListCtrl', ['$scope', '$http', 
	function BlogListCtrl($scope, $http) {
		$.ajax(
		{
			url:'http://api.tumblr.com/v2/blog/intellisol.tumblr.com/posts?api_key=T87SJzAER6jBO2qpIkDcvgqxMxTTZ3KClAQL04uJZJ0I878USq',
			dataType: 'jsonp',
			success: function(data) {
				if (typeof data == 'string') {
					data = JSON.parse(data);
				}
				// Because using jQuery ajax is out of the world of angular, we need to wrap our $scope assignment inside:
				$scope.$apply(function(){
				    $scope.blogs = data.response.posts;
				});
			}
		});
	}
]);

intelliSolBlogControllers.controller('BlogCtrl', ['$scope', '$routeParams', '$http', 
	function BlogCtrl($scope, $routeParams, $http) {
		console.log('hi');
		console.log($routeParams.blogId);
		$.ajax(
		{
			url:'http://api.tumblr.com/v2/blog/intellisol.tumblr.com/posts?api_key=T87SJzAER6jBO2qpIkDcvgqxMxTTZ3KClAQL04uJZJ0I878USq&id=' + $routeParams.blogId,
			dataType: 'jsonp',
			success: function(data) {
				if (typeof data == 'string') {
					data = JSON.parse(data);
				}
				
				console.log(data);
				// Because using jQuery ajax is out of the world of angular, we need to wrap our $scope assignment inside:
				$scope.$apply(function(){
					$scope.title = data.response.posts[0].title;
				    $scope.text = data.response.posts[0].body;
				});
			}
		});
	}
])
