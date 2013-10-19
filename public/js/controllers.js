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
				console.log(data.response.posts);
				$scope.blogs = data.response.posts;
			}
		});
	}
]);

intelliSolBlogControllers.controller('BlogCtrl', ['$scope', '$http', 
	function BlogCtrl($scope, $http) {
		// TODO 
	}
])
